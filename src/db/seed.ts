import { db, schema } from "./index";

const SERVICES: Omit<typeof schema.services.$inferInsert, "id">[] = [
  { slug: "lazer-epilasyon", name: "Lazer Epilasyon", category: "Lazer", duration: 30, icon: "Zap", sortOrder: 1,
    summary: "Alexandrite ve Nd:YAG kombinasyonuyla tüm cilt tiplerinde kalıcı, konforlu tüy azaltma.",
    description: "## Nasıl uygulanır?\n\nCilt tipinize ve tüy yapınıza göre **Alexandrite** veya **Nd:YAG** dalga boyu seçilir. Soğutmalı başlık sayesinde işlem sırasında yanma hissi en aza iner. Seans süresi bölgeye göre 15–60 dakikadır.\n\n## Seans planı\n\nTüyler üç farklı büyüme evresinde olduğu için kalıcı sonuç için genellikle 6–8 seans, 4–6 hafta aralıkla planlanır. İlk seanstan sonra tüylerin %20–30'unda azalma gözlenir.\n\n## Öncesi ve sonrası\n\n- Seanstan 2 hafta önce ağda/cımbız kullanılmaz; yalnızca tıraş edilir.\n- İşlem günü parfüm, deodorant ve krem sürülmez.\n- Sonrasında 48 saat sıcak duş, sauna ve güneşten kaçınılır; yüksek faktörlü güneş koruyucu kullanılır.",
    highlights: ["Tüm cilt tiplerine uygun", "Soğutmalı başlık, minimum ağrı", "6–8 seansta kalıcı sonuç", "Uzman dermatolog kontrolünde"],
    faqs: [{ q: "Kaç seans gerekir?", a: "Bölgeye ve tüy yapısına göre genellikle 6–8 seans. Hormonal bölgelerde ek seans gerekebilir." }, { q: "Yaz aylarında yapılır mı?", a: "Evet; Nd:YAG bronz ciltte de güvenle uygulanır. Seans sonrası güneş koruyucu şarttır." }, { q: "Ağrılı mı?", a: "Soğutma sistemi sayesinde çoğu danışan hafif bir ısınma hissi tarifler." }] },
  { slug: "cilt-bakimi", name: "Medikal Cilt Bakımı", category: "Dermatoloji", duration: 45, icon: "Sparkles", sortOrder: 2,
    summary: "Hydrafacial, kimyasal peeling ve dermapen ile cilt tipine özel yenileme programları.",
    description: "## Kişiye özel protokol\n\nCilt analizi cihazıyla nem, yağ, gözenek ve leke haritanız çıkarılır; ardından **Hydrafacial**, **kimyasal peeling** veya **dermapen** seçeneklerinden size uygun protokol planlanır.\n\n## Kimler için?\n\nAkne izleri, gözenek genişliği, mat ve cansız görünüm, ince çizgiler ve lekeler için etkilidir. Aylık bakım programlarıyla sonuç korunur.",
    highlights: ["Cihazlı cilt analizi", "Aynı gün sosyal hayata dönüş", "Her cilt tipi için protokol", "Aylık bakım programları"],
    faqs: [{ q: "İşlem sonrası kızarıklık olur mu?", a: "Hydrafacial sonrası hayır; peeling sonrası 1–3 gün hafif pullanma görülebilir." }, { q: "Ne sıklıkla yapılmalı?", a: "Bakım amaçlı ayda bir, sorun odaklı programlarda 2–3 haftada bir önerilir." }] },
  { slug: "dolgu-ve-botoks", name: "Dolgu & Botulinum", category: "Estetik", duration: 30, icon: "Droplets", sortOrder: 3,
    summary: "Doğal görünümü koruyan, yüz oranlarına saygılı dudak ve yüz dolgusu; mimik kırışıklıklarında botulinum uygulaması.",
    description: "## Yaklaşımımız\n\n\"Yapılmış\" görünümden kaçınan, yüzün kendi oranlarını destekleyen bir planlama yaparız. Uygulama öncesi 3D yüz analizi ile beklentiler netleştirilir.\n\n## Uygulamalar\n\n- **Dudak dolgusu**: hacim ve kontur, 12–18 ay kalıcılık\n- **Yanak & çene hattı**: yüz oval kontürü\n- **Botulinum**: alın, kaz ayağı, çatık kaşlar; 4–6 ay etki\n- **Masseter**: diş sıkma ve kare yüz görünümü\n\nTüm ürünler CE ve Sağlık Bakanlığı onaylıdır; uygulama sonrası kontrol randevusu ücretsizdir.",
    highlights: ["3D yüz analizi", "Onaylı hyaluronik asit ürünleri", "15 dakikalık uygulama", "Ücretsiz kontrol randevusu"],
    faqs: [{ q: "Sonuç ne zaman görünür?", a: "Dolguda hemen; botulinumda 3–7 gün içinde." }, { q: "Kalıcılık ne kadar?", a: "Dolgu 12–18 ay, botulinum 4–6 ay." }] },
  { slug: "sac-ekimi", name: "Saç Ekimi", category: "Saç", duration: 60, icon: "Scissors", sortOrder: 4,
    summary: "FUE ve DHI tekniğiyle doğal saç çizgisi tasarımı; lokal anestezi altında tek seansta uygulama.",
    description: "## Teknik seçimi\n\nDonör bölge yoğunluğu ve hedef alan büyüklüğüne göre **FUE** (safir uçlu) veya **DHI** (kalem tekniği) seçilir. Saç çizgisi yüz oranlarına göre tasarlanır; işlem 6–8 saat sürer.\n\n## Süreç\n\n1. Ücretsiz saç analizi ve greft sayısı planı\n2. Uygulama günü (lokal anestezi, ağrısız)\n3. 1., 3. ve 12. ay kontrolleri, PRP destek\n\nİlk sonuçlar 3. aydan itibaren görülür, tam sonuç 12. ayda oluşur.",
    highlights: ["Safir FUE / DHI", "Ücretsiz saç analizi", "Tek seans, aynı gün taburcu", "12 ay takip ve PRP desteği"],
    faqs: [{ q: "Ekilen saçlar dökülür mü?", a: "Ense donör bölgesi genetik olarak dökülmeye dirençlidir; ekilen saçlar kalıcıdır." }, { q: "İşe ne zaman dönebilirim?", a: "Masa başı işe 2–3 gün sonra." }] },
  { slug: "leke-tedavisi", name: "Leke & Akne Tedavisi", category: "Dermatoloji", duration: 30, icon: "Sun", sortOrder: 5,
    summary: "Güneş lekeleri, melazma ve akne izlerinde lazer, peeling ve medikal tedavi kombinasyonu.",
    description: "## Doğru tanı, doğru yöntem\n\nLekenin tipi (güneş, melazma, akne sonrası) tedaviyi belirler. Dermatoloji muayenesi sonrasında **Q-switched lazer**, **fraksiyonel lazer**, **peeling** ve **medikal krem** protokollerinden uygun kombinasyon planlanır.\n\nAkne tedavisinde aktif lezyonlar öncelikle kontrol altına alınır; izler için dermapen ve fraksiyonel lazer kullanılır.",
    highlights: ["Dermatolog muayenesi", "Lazer + medikal kombinasyon", "Cilt tipine göre güvenli protokol", "Fotoğraflı ilerleme takibi"],
    faqs: [{ q: "Kaç seans sürer?", a: "Leke tipine göre 3–6 seans; melazmada bakım tedavisi devam eder." }] },
  { slug: "somon-dna-ve-mezoterapi", name: "Somon DNA & Mezoterapi", category: "Estetik", duration: 30, icon: "Leaf", sortOrder: 6,
    summary: "Cildi içeriden yenileyen, nem ve elastikiyet kazandıran enjeksiyon tedavileri.",
    description: "## Ne işe yarar?\n\nPolinükleotid (somon DNA) ve vitamin-hyaluronik asit kokteylleri cildin kendini onarma mekanizmasını uyarır. Mat, kuru ve ince çizgili ciltlerde 3 seans sonunda belirgin parlaklık ve sıkılık sağlar.\n\nGöz altı morlukları ve boyun bölgesi için de uygundur.",
    highlights: ["Doğal parlaklık", "Göz altı ve boyun için uygun", "3 seanslık kür", "Aynı gün sosyal hayat"],
    faqs: [{ q: "Ne kadar sürede etki eder?", a: "İlk seanstan 1 hafta sonra nemlenme, 3. seans sonunda sıkılaşma fark edilir." }] },
];

const DOCTORS: Omit<typeof schema.doctors.$inferInsert, "id">[] = [
  { slug: "elif-kaya", name: "Elif Kaya", title: "Uzm. Dr.", specialty: "Dermatoloji", experienceYears: 14, color: "#0f766e", sortOrder: 1, languages: "Türkçe, İngilizce",
    bio: "Dermatoloji uzmanlığını Çukurova Üniversitesi'nde tamamladı. Lazer uygulamaları, leke tedavisi ve medikal cilt bakımı alanında 14 yıllık deneyime sahiptir; Avrupa Dermatoloji Akademisi üyesidir.",
    education: ["Hacettepe Üniversitesi Tıp Fakültesi", "Çukurova Üniversitesi Dermatoloji Uzmanlığı", "EADV Lazer Sertifikası"] },
  { slug: "mert-aydin", name: "Mert Aydın", title: "Op. Dr.", specialty: "Plastik, Rekonstrüktif ve Estetik Cerrahi", experienceYears: 11, color: "#2563eb", sortOrder: 2, languages: "Türkçe, İngilizce, Almanca",
    bio: "Yüz estetiği ve enjeksiyon uygulamalarında doğal sonuçlara odaklanır. Saç ekimi ve dolgu alanında uluslararası eğitimler vermektedir.",
    education: ["İstanbul Üniversitesi Cerrahpaşa Tıp Fakültesi", "Ankara Üniversitesi Plastik Cerrahi Uzmanlığı", "ISHRS Saç Cerrahisi Eğitimi"] },
  { slug: "selin-arslan", name: "Selin Arslan", title: "Dr.", specialty: "Medikal Estetik", experienceYears: 8, color: "#db2777", sortOrder: 3, languages: "Türkçe, İngilizce",
    bio: "Medikal estetik ve cilt yenileme protokollerinde uzmanlaşmıştır. Hydrafacial, mezoterapi ve peeling uygulamalarında kişiye özel planlama yapar.",
    education: ["Ege Üniversitesi Tıp Fakültesi", "Sağlık Bakanlığı Medikal Estetik Sertifikası"] },
  { slug: "kerem-demir", name: "Kerem Demir", title: "Uzm. Dr.", specialty: "Dermatoloji", experienceYears: 9, color: "#d97706", sortOrder: 4, languages: "Türkçe, İngilizce",
    bio: "Akne, rozasea ve saç dökülmesi tedavilerinde deneyimlidir. Lazer epilasyon ve leke tedavilerinde güvenli protokolleriyle tanınır.",
    education: ["Ankara Üniversitesi Tıp Fakültesi", "Dokuz Eylül Üniversitesi Dermatoloji Uzmanlığı"] },
];

// hekim → hizmet slug'ları
const DOCTOR_SERVICES: Record<string, string[]> = {
  "elif-kaya": ["lazer-epilasyon", "cilt-bakimi", "leke-tedavisi", "somon-dna-ve-mezoterapi"],
  "mert-aydin": ["dolgu-ve-botoks", "sac-ekimi"],
  "selin-arslan": ["cilt-bakimi", "somon-dna-ve-mezoterapi", "dolgu-ve-botoks"],
  "kerem-demir": ["lazer-epilasyon", "leke-tedavisi", "cilt-bakimi"],
};

// hekim → haftalık program (weekday: 1 Pzt … 6 Cmt)
const SCHEDULES: Record<string, { weekday: number; start: string; end: string; breakStart?: string; breakEnd?: string }[]> = {
  "elif-kaya": [1, 2, 3, 4, 5].map((w) => ({ weekday: w, start: "09:00", end: "17:00", breakStart: "12:30", breakEnd: "13:30" })),
  "mert-aydin": [[2, "10:00", "18:00"], [4, "10:00", "18:00"], [6, "09:00", "14:00"]].map(([w, s, e]) => ({ weekday: w as number, start: s as string, end: e as string, breakStart: "13:00", breakEnd: "14:00" })),
  "selin-arslan": [1, 3, 5, 6].map((w) => ({ weekday: w, start: w === 6 ? "09:00" : "10:00", end: w === 6 ? "15:00" : "19:00", breakStart: "13:00", breakEnd: "14:00" })),
  "kerem-demir": [1, 2, 3, 4, 5].map((w) => ({ weekday: w, start: "11:00", end: "19:00", breakStart: "14:00", breakEnd: "15:00" })),
};

const POSTS = (drs: { slug: string; id: number }[]): Omit<typeof schema.posts.$inferInsert, "id">[] => [
  { slug: "lazer-epilasyon-oncesi-bilmeniz-gerekenler", title: "Lazer Epilasyon Öncesi Bilmeniz Gereken 7 Şey", publishedAt: "2026-09-02", tags: ["lazer", "epilasyon"], authorId: drs.find((d) => d.slug === "elif-kaya")?.id,
    excerpt: "Seans öncesi tıraş, güneş ve ilaç kullanımı: kalıcı sonuç için hazırlığın püf noktaları.",
    content: "## 1. Ağda ve cımbızı bırakın\n\nLazer, tüy kökünü hedefler; kök yoksa enerji boşa gider. Seanstan en az 2 hafta önce yalnızca tıraş edin.\n\n## 2. Güneşten uzak durun\n\nBronz cilt, enerjinin cilt yüzeyinde emilmesine ve lekeye yol açabilir. Seans öncesi ve sonrası 2 hafta güneş koruyucu kullanın.\n\n## 3. Kullandığınız ilaçları söyleyin\n\nIşığa duyarlılık yapan bazı antibiyotikler ve akne ilaçları seans planını değiştirebilir.\n\n## 4. Doğru cihaz, doğru cilt tipi\n\nAçık ciltte Alexandrite, koyu ve bronz ciltte Nd:YAG güvenli seçenektir. Kliniğimizde ikisi de bulunur.\n\n## 5. Seans aralıklarına uyun\n\nTüy döngüsüne göre 4–6 hafta aralık idealdir; sık seans daha hızlı sonuç vermez.\n\n## 6. İşlem günü\n\nKrem, deodorant ve parfüm sürmeyin; rahat kıyafet giyin.\n\n## 7. Sonrası\n\n48 saat sıcak duş, sauna ve spordan kaçının. Hafif kızarıklık normaldir, aynı gün geçer." },
  { slug: "dolgu-mu-botulinum-mu", title: "Dolgu mu, Botulinum mu? Hangisi Size Uygun?", publishedAt: "2026-08-19", tags: ["estetik", "dolgu", "botulinum"], authorId: drs.find((d) => d.slug === "mert-aydin")?.id,
    excerpt: "İkisi sık karıştırılır ama farklı sorunları çözer. Mimik çizgileri, hacim kaybı ve doğal sonuç için rehber.",
    content: "## Farklı mekanizmalar\n\n**Botulinum** kası geçici olarak gevşetir; alın, kaz ayağı ve çatık kaş gibi *mimik* çizgilerinde etkilidir. **Dolgu** ise hacim ekler: dudak, yanak, çene hattı ve derin nazolabial çizgiler.\n\n## Doğal sonuç nasıl olur?\n\nYüz oranlarına saygılı, az ve aşamalı uygulama. Kliniğimizde ilk seansta konservatif kalıp 2 hafta sonra kontrolde gerekirse tamamlarız.\n\n## Kalıcılık ve bakım\n\nBotulinum 4–6 ay, dolgu 12–18 ay. Düzenli bakım aralıklarında daha az ürünle daha uzun süreli sonuç alınır." },
  { slug: "kis-aylarinda-cilt-bakimi", title: "Kış Aylarında Cilt Bakımı: Kuruluk ve Matlığa Karşı 5 Adım", publishedAt: "2026-07-28", tags: ["cilt bakımı"], authorId: drs.find((d) => d.slug === "selin-arslan")?.id,
    excerpt: "Soğuk hava ve kalorifer cildi kurutur. Evde ve klinikte uygulanabilecek pratik bir rutin.",
    content: "## 1. Temizleyiciyi değiştirin\n\nKöpüren temizleyiciler yerine süt/krem kıvamlı temizleyiciler.\n\n## 2. Nem bariyerini onarın\n\nSeramid ve hyaluronik asit içeren nemlendiriciler, gece daha yoğun formüller.\n\n## 3. Güneş koruyucuyu bırakmayın\n\nKışın UVA devam eder; SPF 30+ günlük kullanım.\n\n## 4. Ayda bir medikal bakım\n\nHydrafacial kış aylarında cildin nem dengesini korumak için idealdir.\n\n## 5. İçeriden destek\n\nSu tüketimi ve omega-3; gerekirse somon DNA kürü." },
];

async function main() {
  if (db.select().from(schema.services).all().length) { console.log("· veriler zaten var"); return; }
  db.insert(schema.services).values(SERVICES).run();
  db.insert(schema.doctors).values(DOCTORS).run();
  const svc = db.select().from(schema.services).all(), drs = db.select().from(schema.doctors).all();
  for (const d of drs) {
    for (const s of DOCTOR_SERVICES[d.slug] ?? []) { const sv = svc.find((x) => x.slug === s); if (sv) db.insert(schema.doctorServices).values({ doctorId: d.id, serviceId: sv.id }).run(); }
    for (const sc of SCHEDULES[d.slug] ?? []) db.insert(schema.schedules).values({ doctorId: d.id, ...sc }).run();
  }
  db.insert(schema.posts).values(POSTS(drs)).run();
  console.log(`✓ ${SERVICES.length} hizmet, ${DOCTORS.length} hekim, program ve ${POSTS(drs).length} yazı eklendi`);
}
main();
