# Nova Klinik — Kurumsal Klinik Web Sitesi ve Online Randevu

Estetik, dermatoloji, lazer ve saç ekimi kliniği için konsept kurumsal web sitesi (uurstudio portföyü). Hekim programına göre çalışan gerçek bir online randevu sistemi içerir.

## Teknolojiler
- **Next.js 14** (App Router, Server Actions, Middleware) · **TypeScript**
- **Drizzle ORM + SQLite** — hizmet, hekim, program, randevu, mesaj ve blog tabloları
- **Zod** — sunucu tarafı doğrulama (randevu ve iletişim formları, KVKK onayı)
- **Vitest** — randevu motoru birim testleri (slot üretimi, mola, çakışma, geçmiş saat, çalışma günleri)
- **Playwright** — uçtan uca test + gerçek ekran görüntüleri
- **Tailwind CSS**, react-markdown (hizmet ve blog içerikleri)

## Özellikler
- Hizmet sayfaları (öne çıkanlar, uygulama detayı, SSS + FAQPage şeması), hekim profilleri (eğitim, diller, haftalık program, Physician şeması)
- **Online randevu sihirbazı**: hizmet → hekim → tarih/saat → bilgiler. Slotlar hekimin haftalık programından üretilir; mola ve dolu saatler kapanır, bugünün geçmiş saatleri gizlenir, hizmet süresi (30/45/60 dk) çakışma hesabına girer. Rezervasyon anında sunucu tekrar kontrol eder (çift rezervasyon engeli).
- Randevu onay sayfası (kod, durum), kod + telefonla **iptal**
- İletişim formu, KVKK aydınlatma metni, blog (Markdown, BlogPosting şeması)
- **Yönetim paneli** (`/admin`, şifre `nova123`): güne göre randevular ve durum güncelleme (bekliyor/onaylandı/tamamlandı/iptal), mesajlar
- SEO: MedicalClinic JSON-LD, sitemap, robots, sayfa başına meta

## Kurulum
```bash
npm install
npm run db:setup   # şema + 6 hizmet, 4 hekim, program, 3 yazı
npm run dev        # http://localhost:3000
```

## Test
```bash
npm test                       # Vitest (randevu motoru)
npm run build && npm start     # ardından:
npm run test:e2e               # Playwright: 24 kontrol, screenshots/ klasörüne görseller
```
`ADMIN_PASSWORD`, `DATABASE_PATH`, `NEXT_PUBLIC_SITE_URL` ortam değişkenleriyle özelleştirilebilir.
