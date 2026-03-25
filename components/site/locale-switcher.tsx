import Link from "next/link";
import { Globe } from "lucide-react";
import { locales, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type LocaleSwitcherProps = {
  locale: Locale;
};

export function LocaleSwitcher({ locale }: LocaleSwitcherProps) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-card/70 p-1 backdrop-blur">
      <span className="flex h-9 w-9 items-center justify-center text-muted-foreground">
        <Globe className="h-4 w-4" />
      </span>
      {locales.map((item) => (
        <Link
          key={item}
          href={`/${item}`}
          className={cn(
            "rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors",
            item === locale && "bg-primary text-primary-foreground",
          )}
        >
          {item}
        </Link>
      ))}
    </div>
  );
}
