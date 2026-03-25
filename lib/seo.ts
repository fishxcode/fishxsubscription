import type { Metadata } from "next";
import { publicEnv } from "@/lib/env";
import { defaultLocale, getDictionary, locales, type Locale } from "@/lib/i18n";

export function buildMetadata(locale: Locale): Metadata {
  const dictionary = getDictionary(locale);
  const currentUrl = new URL(`/${locale}`, publicEnv.NEXT_PUBLIC_APP_URL);

  return {
    metadataBase: new URL(publicEnv.NEXT_PUBLIC_APP_URL),
    title: dictionary.meta.title,
    description: dictionary.meta.description,
    keywords: dictionary.meta.keywords,
    alternates: {
      canonical: currentUrl.pathname,
      languages: Object.fromEntries(
        locales.map((item) => [item, `/${item}`]),
      ),
    },
    openGraph: {
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      url: currentUrl,
      siteName: publicEnv.NEXT_PUBLIC_APP_NAME,
      locale: locale === defaultLocale ? "zh_CN" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.meta.title,
      description: dictionary.meta.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function buildPageMetadata(
  locale: Locale,
  options: {
    title: string;
    description: string;
    path: string;
    index?: boolean;
  },
): Metadata {
  const currentUrl = new URL(options.path, publicEnv.NEXT_PUBLIC_APP_URL);

  return {
    metadataBase: new URL(publicEnv.NEXT_PUBLIC_APP_URL),
    title: options.title,
    description: options.description,
    alternates: {
      canonical: currentUrl.pathname,
      languages: Object.fromEntries(
        locales.map((item) => [item, options.path.replace(`/${locale}`, `/${item}`)]),
      ),
    },
    openGraph: {
      title: options.title,
      description: options.description,
      url: currentUrl,
      siteName: publicEnv.NEXT_PUBLIC_APP_NAME,
      locale: locale === defaultLocale ? "zh_CN" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: options.title,
      description: options.description,
    },
    robots: {
      index: options.index ?? true,
      follow: options.index ?? true,
    },
  };
}
