"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CircleUserRound,
  CreditCard,
  LayoutDashboard,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";
import { LogoutButton } from "@/components/site/logout-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type HomeDictionary, type Locale } from "@/lib/i18n";

type AccountShellProps = {
  locale: Locale;
  dictionary: HomeDictionary;
  session: {
    name: string;
    email: string;
  };
  profile: {
    id: number;
    displayName: string;
    email: string;
    username: string | null;
    group: string | null;
    role?: number;
    status?: number;
  } | null;
  children: React.ReactNode;
};

export function AccountShell({
  locale,
  dictionary,
  session,
  profile,
  children,
}: AccountShellProps) {
  const pathname = usePathname();
  const items = [
    {
      href: `/${locale}/account`,
      label: dictionary.account.navOverview,
      icon: LayoutDashboard,
    },
    {
      href: `/${locale}/account/profile`,
      label: dictionary.account.navProfile,
      icon: CircleUserRound,
    },
    {
      href: `/${locale}/account/subscriptions`,
      label: dictionary.account.navSubscriptions,
      icon: PackageCheck,
    },
    {
      href: `/${locale}/account/orders`,
      label: dictionary.account.navOrders,
      icon: CreditCard,
    },
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="xl:sticky xl:top-8 xl:self-start">
        <Card className="border-border/70 bg-card/70">
          <CardContent className="space-y-6 p-4 sm:p-5">
            <div className="rounded-[1.5rem] border border-primary/15 bg-background/60 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-base font-semibold">
                    {profile?.displayName ?? session.name}
                  </p>
                  <p className="mt-1 truncate text-sm text-muted-foreground">
                    {profile?.email ?? session.email}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="outline">#{profile?.id ?? "-"}</Badge>
                {profile?.group ? <Badge variant="outline">{profile.group}</Badge> : null}
              </div>
            </div>

            <nav className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
              {items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === `/${locale}/account`
                    ? pathname === item.href
                    : pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-[1.25rem] border px-4 py-3 text-sm transition",
                      isActive
                        ? "border-primary/20 bg-primary/10 text-foreground"
                        : "border-border/70 bg-background/45 text-muted-foreground hover:border-primary/20 hover:bg-background/70 hover:text-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                        isActive ? "bg-primary/15 text-primary" : "bg-background/80 text-muted-foreground",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="space-y-3 rounded-[1.5rem] border border-border/70 bg-background/45 p-4">
              <Button asChild variant="outline" className="w-full">
                <Link href={`/${locale}`}>{dictionary.account.backHome}</Link>
              </Button>
              <LogoutButton
                locale={locale}
                label={dictionary.account.logout}
                pendingLabel={dictionary.account.logoutPending}
                errorLabel={dictionary.account.logoutError}
              />
            </div>
          </CardContent>
        </Card>
      </aside>

      <div className="min-w-0">{children}</div>
    </div>
  );
}
