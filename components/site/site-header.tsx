"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { LocaleSwitcher } from "@/components/site/locale-switcher";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { Button } from "@/components/ui/button";
import { type HomeDictionary, type Locale } from "@/lib/i18n";

type SiteHeaderAction = {
  href: string;
  label: string;
};

type SiteHeaderProps = {
  locale: Locale;
  dictionary: HomeDictionary;
  primaryAction?: SiteHeaderAction;
  secondaryAction?: SiteHeaderAction;
};

export function SiteHeader({
  locale,
  dictionary,
  primaryAction,
  secondaryAction,
}: SiteHeaderProps) {
  return (
    <header className="w-full rounded-[1.75rem] border border-border/70 bg-card/65 px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.08)] backdrop-blur sm:px-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/14 text-primary">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-[0.2em] text-primary uppercase">
              {dictionary.header.brand}
            </p>
            <p className="truncate text-sm text-muted-foreground">
              {dictionary.header.foundation}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:justify-end">
          <div className="flex flex-wrap items-center gap-2">
            <LocaleSwitcher locale={locale} dictionary={dictionary} />
            <ThemeToggle dictionary={dictionary} />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {secondaryAction ? (
              <Button asChild variant="outline" size="sm" className="min-w-[96px]">
                <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
              </Button>
            ) : null}
            {primaryAction ? (
              <Button asChild size="sm" className="min-w-[96px]">
                <Link href={primaryAction.href}>{primaryAction.label}</Link>
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
