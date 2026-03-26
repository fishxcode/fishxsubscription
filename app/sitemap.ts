import type { MetadataRoute } from "next";
import { publicEnv } from "@/lib/env";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [
    "",
    "/auth",
    "/pricing",
    "/account",
    "/account/profile",
    "/account/subscriptions",
    "/account/orders",
  ] as const;

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${publicEnv.NEXT_PUBLIC_APP_URL}/${locale}${path}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: path === "" ? (locale === "zh" ? 1 : 0.8) : 0.5,
    })),
  );
}
