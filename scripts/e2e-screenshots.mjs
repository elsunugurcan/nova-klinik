// Uçtan uca test + gerçek ekran görüntüleri. Önce: npm run build && npm start (port 3000)
import { chromium } from "playwright";
import fs from "node:fs/promises";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const OUT = process.env.OUT ?? "screenshots";
await fs.mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("pageerror", (e) => errors.push(e.message)); page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
const ok = (c, m) => { if (!c) throw new Error("TEST BAŞARISIZ: " + m); console.log("✓", m); };
const shot = async (name, opts = {}) => { await page.waitForLoadState("networkidle"); await page.waitForTimeout(250); await page.screenshot({ path: `${OUT}/${name}.png`, ...opts }); console.log("📸", name); };
const go = async (p) => { await page.goto(BASE + p); await page.waitForLoadState("networkidle"); };

// 1) Ana sayfa ve SEO
await go("/"); await shot("01-home");
ok((await page.locator("h1").count()) === 1, "ana sayfada tek H1");
ok((await page.locator('script[type="application/ld+json"]').count()) >= 2, "JSON-LD (MedicalClinic + FAQ) var");
ok((await page.locator("text=Lazer Epilasyon").count()) >= 1, "hizmetler listeleniyor");

// 2) Hizmet detayı
await go("/hizmetler/lazer-epilasyon"); await shot("02-service");
ok((await page.locator("h1").innerText()) === "Lazer Epilasyon", "hizmet sayfası");
ok((await page.locator("text=Elif Kaya").count()) >= 1, "hizmeti veren hekimler listeleniyor");

// 3) Hekim sayfası
await go("/hekimler/mert-aydin"); await shot("03-doctor");
ok((await page.locator("text=Salı").count()) >= 1 && (await page.locator("text=Cumartesi").count()) >= 1, "hekim programı görünüyor");

// 4) Randevu sihirbazı: hizmet → hekim → tarih/saat → bilgiler
await go("/randevu?hizmet=lazer-epilasyon");
await page.getByRole("button", { name: /Elif Kaya/ }).click();
await page.waitForSelector("button:has-text(':')", { timeout: 15000 });
await shot("04-booking-slots");
const slotButtons = page.locator("button", { hasText: /^\d{2}:\d{2}$/ });
const availableSlots = await slotButtons.evaluateAll((els) => els.filter((e) => !e.disabled).map((e) => e.textContent));
ok(availableSlots.length >= 3, `uygun saatler üretildi (${availableSlots.length} slot, ilk: ${availableSlots[0]})`);
const chosen = availableSlots[1];
const chosenDate = await page.evaluate(() => { const el = document.querySelector("aside dl"); return el?.textContent ?? ""; });
await slotButtons.filter({ hasText: chosen }).first().click();
await page.getByRole("button", { name: "Devam et" }).click();
// doğrulama hataları
await page.getByRole("button", { name: "Randevuyu onayla" }).click();
await page.waitForTimeout(600);
ok((await page.locator("text=Ad soyad en az 3 karakter").count()) === 1 && (await page.locator("text=KVKK aydınlatma metnini onaylamanız gerekir").count()) === 1, "Zod doğrulama hataları görünüyor");
await shot("05-booking-validation");
await page.getByLabel("Ad Soyad").fill("Uğur Can Elsun");
await page.getByLabel("Telefon").fill("0536 522 15 23");
await page.getByLabel("E-posta (opsiyonel)").fill("test@novaklinik.example");
await page.getByLabel("Not (opsiyonel)").fill("Kol bölgesi, daha önce lazer olmadım.");
await page.getByRole("checkbox").check();
await page.getByRole("button", { name: "Randevuyu onayla" }).click();
await page.waitForURL(/\/randevu\/NK-/, { timeout: 15000 });
await shot("06-confirmation");
const code = page.url().split("/").pop();
ok(/^NK-[A-Z2-9]{6}$/.test(code), "randevu oluştu: " + code);
ok((await page.locator("text=" + chosen).count()) >= 1, "onay sayfası doğru saati gösteriyor");

// 5) Aynı saat artık dolu (çift rezervasyon engeli)
await go("/randevu?hizmet=lazer-epilasyon");
await page.getByRole("button", { name: /Elif Kaya/ }).click();
await page.waitForSelector("button:has-text(':')", { timeout: 15000 });
const disabledNow = await page.locator("button", { hasText: chosen }).first().isDisabled();
ok(disabledNow, `alınan saat (${chosen}) artık kapalı görünüyor`);

// 6) İptal: yanlış telefon reddedilir, doğru telefon iptal eder
await go("/randevu/iptal");
await page.getByLabel("Randevu kodu").fill(code); await page.getByLabel("Telefon").fill("05000000000");
await page.getByRole("button", { name: "Randevuyu iptal et" }).click(); await page.waitForTimeout(500);
ok((await page.locator("text=Randevu bulunamadı").count()) === 1, "yanlış telefonla iptal reddedildi");
await page.getByLabel("Telefon").fill("05365221523");
await page.getByRole("button", { name: "Randevuyu iptal et" }).click(); await page.waitForTimeout(500);
ok((await page.locator("text=Randevunuz iptal edildi").count()) === 1, "doğru telefonla iptal edildi");

// 7) İletişim formu
await go("/iletisim");
await page.getByRole("button", { name: "Gönder" }).click(); await page.waitForTimeout(500);
ok((await page.locator("text=Ad soyad en az 3 karakter").count()) === 1, "iletişim formu doğrulama");
await page.getByLabel("Ad Soyad").fill("Ayşe Demir"); await page.getByLabel("E-posta").fill("ayse@example.com"); await page.getByLabel("Konu").fill("Saç ekimi fiyat bilgisi"); await page.getByLabel("Mesaj").fill("Merhaba, saç ekimi için ön görüşme almak istiyorum. Uygun gün var mı?"); await page.getByRole("checkbox").check();
await page.getByRole("button", { name: "Gönder" }).click(); await page.waitForTimeout(600);
ok((await page.locator("text=Mesajınız ulaştı").count()) === 1, "iletişim mesajı kaydedildi");

// 8) Blog
await go("/blog/lazer-epilasyon-oncesi-bilmeniz-gerekenler"); await shot("07-blog");
ok((await page.locator("h1").count()) === 1 && (await page.locator("h2").count()) >= 5, "blog yazısı markdown ile render edildi");

// 9) Admin
await go("/admin"); ok(page.url().includes("/admin/login"), "admin girişsiz yönlendirildi");
await page.getByLabel("Şifre").fill("nova123"); await page.getByRole("button", { name: "Giriş" }).click();
await page.waitForURL(/\/admin$/);
await go("/admin?gun=tumu"); await shot("08-admin");
ok((await page.locator("text=" + code).count()) >= 1, "randevu admin listesinde (iptal durumuyla)");
await go("/admin/mesajlar");
ok((await page.locator("text=Saç ekimi fiyat bilgisi").count()) >= 1, "mesaj admin panelinde");

// 10) Sitemap & robots
const sm = await page.goto(BASE + "/sitemap.xml"); ok(sm.status() === 200 && (await sm.text()).includes("/hizmetler/lazer-epilasyon"), "sitemap hizmetleri içeriyor");
const rb = await page.goto(BASE + "/robots.txt"); ok((await rb.text()).includes("/admin"), "robots admin'i kapatıyor");

// 11) Mobil
const m = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
await m.goto(BASE + "/"); await m.waitForLoadState("networkidle"); await m.screenshot({ path: `${OUT}/m1-home.png` });
await m.goto(BASE + "/randevu?hizmet=dolgu-ve-botoks&hekim=mert-aydin"); await m.waitForLoadState("networkidle"); await m.waitForTimeout(800); await m.screenshot({ path: `${OUT}/m2-booking.png` });
console.log("📸 mobil");
const real = errors.filter((e) => !/Falling back to browser navigation/.test(e));
ok(real.length === 0, "konsolda hata yok" + (real.length ? " (" + real.join(" | ").slice(0, 300) + ")" : ""));
await browser.close();
console.log("\nTÜM TESTLER GEÇTİ");
