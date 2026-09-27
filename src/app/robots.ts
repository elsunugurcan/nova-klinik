import type { MetadataRoute } from "next";
import { abs } from "@/lib/site";
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/randevu/NK-"] }, sitemap: abs("/sitemap.xml") }; }
