"use client";

import { SiteHeader } from "@/components/site/site-header";
import { type HomeDictionary, type Locale } from "@/lib/i18n";

type PageToolbarProps = {
  locale: Locale;
  dictionary: HomeDictionary;
  accountHref?: string;
  backHref: string;
  backLabel: string;
};

export function PageToolbar({
  locale,
  dictionary,
  accountHref,
  backHref,
  backLabel,
}: PageToolbarProps) {
  return (
    <SiteHeader
      locale={locale}
      dictionary={dictionary}
      primaryAction={
        accountHref
          ? {
              href: accountHref,
              label: dictionary.header.account,
            }
          : undefined
      }
      secondaryAction={{
        href: backHref,
        label: backLabel,
      }}
    />
  );
}
