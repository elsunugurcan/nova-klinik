import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE, clinicJsonLd } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

const poppins = localFont({ src: [{ path: "./fonts/Poppins-Regular.ttf", weight: "400" }, { path: "./fonts/Poppins-Bold.ttf", weight: "700" }], variable: "--font-poppins", display: "swap" });
const lora = localFont({ src: "./fonts/Lora-Variable.ttf", variable: "--font-lora", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — Estetik, Dermatoloji ve Lazer Kliniği · Adana`, template: `%s · ${SITE.name}` },
  description: SITE.description,
  openGraph: { type: "website", locale: "tr_TR", siteName: SITE.name },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${poppins.variable} ${lora.variable}`}>
      <body className="font-sans antialiased">
        <JsonLd data={clinicJsonLd()} />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
