import type { MetadataRoute } from "next";
import { allDoctors, allPosts, allServices } from "@/lib/queries";
import { abs } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: abs("/"), lastModified: now, priority: 1 }, { url: abs("/hizmetler"), lastModified: now, priority: 0.9 }, { url: abs("/hekimler"), lastModified: now, priority: 0.8 },
    { url: abs("/randevu"), lastModified: now, priority: 0.9 }, { url: abs("/blog"), lastModified: now, priority: 0.7 }, { url: abs("/hakkimizda"), lastModified: now, priority: 0.6 }, { url: abs("/iletisim"), lastModified: now, priority: 0.6 },
    ...allServices().map((s) => ({ url: abs(`/hizmetler/${s.slug}`), lastModified: now, priority: 0.8 })),
    ...allDoctors().map((d) => ({ url: abs(`/hekimler/${d.slug}`), lastModified: now, priority: 0.7 })),
    ...allPosts().map((p) => ({ url: abs(`/blog/${p.slug}`), lastModified: new Date(p.publishedAt), priority: 0.6 })),
  ];
}
