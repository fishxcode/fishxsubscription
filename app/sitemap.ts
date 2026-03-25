import type { MetadataRoute } from "next";
import { publicEnv } from "@/lib/env";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return locales.map((locale) => ({
    url: `${publicEnv.NEXT_PUBLIC_APP_URL}/${locale}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: locale === "zh" ? 1 : 0.8,
  }));
}
