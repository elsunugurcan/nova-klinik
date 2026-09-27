export const SITE = {
  name: "Nova Klinik",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://novaklinik.example",
  description: "Adana'da estetik, dermatoloji, lazer epilasyon ve saç ekimi. Sağlık Bakanlığı ruhsatlı, uzman hekim kadrosu, online randevu.",
  phone: "0 322 000 00 00",
  phoneHref: "+903220000000",
  whatsapp: "905000000000",
  email: "randevu@novaklinik.example",
  address: "Çınarlı Mah. Atatürk Cad. No:12, Seyhan / Adana",
  hours: "Hafta içi 09:00 – 19:00 · Cumartesi 09:00 – 15:00",
};
export const abs = (p: string) => new URL(p, SITE.url).toString();
export const clinicJsonLd = () => ({
  "@context": "https://schema.org", "@type": "MedicalClinic", "@id": abs("/#clinic"), name: SITE.name, url: SITE.url, telephone: SITE.phoneHref, email: SITE.email,
  address: { "@type": "PostalAddress", streetAddress: "Çınarlı Mah. Atatürk Cad. No:12", addressLocality: "Seyhan", addressRegion: "Adana", addressCountry: "TR" },
  openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "19:00" }, { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "15:00" }],
  medicalSpecialty: ["Dermatology", "PlasticSurgery"],
});
