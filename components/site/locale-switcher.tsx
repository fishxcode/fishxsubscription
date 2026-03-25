"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Globe } from "lucide-react";
import { locales, type HomeDictionary, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type LocaleSwitcherProps = {
  locale: Locale;
  dictionary: HomeDictionary;
};

function replaceLocaleInPathname(pathname: string, nextLocale: Locale) {
  const segments = pathname.split("/");

  if (segments.length > 1 && locales.includes(segments[1] as Locale)) {
    segments[1] = nextLocale;
    return segments.join("/");
  }

  return `/${nextLocale}`;
}

export function LocaleSwitcher({ locale, dictionary }: LocaleSwitcherProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();

  return (
    <div
      className="inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-border/60 bg-card/85 p-1.5 backdrop-blur scrollbar-none"
      aria-label={dictionary.header.localeSwitcherLabel}
    >
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center text-muted-foreground"
        aria-hidden="true"
      >
        <Globe className="h-4 w-4" />
      </span>
      {locales.map((item) => (
        <Link
          key={item}
          href={`${replaceLocaleInPathname(pathname, item)}${queryString ? `?${queryString}` : ""}`}
          className={cn(
            "shrink-0 rounded-full px-3 py-2 text-xs font-semibold tracking-[0.08em] text-muted-foreground transition-colors",
            item === locale && "bg-primary text-primary-foreground",
          )}
        >
          {dictionary.controls.locale[item]}
        </Link>
      ))}
    </div>
  );
}
