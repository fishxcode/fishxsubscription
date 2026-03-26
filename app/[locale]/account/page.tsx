import { Activity, BadgeCheck, Gauge, Layers3 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AccountNextActions } from "@/components/site/account-next-actions";
import { AccountRecentActivity } from "@/components/site/account-recent-activity";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  formatDateTime,
  formatNumber,
  formatSessionDate,
  getAccountConsoleData,
} from "@/lib/account-console";
import { isSupportedLocale, type Locale } from "@/lib/i18n";

type AccountOverviewPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function AccountOverviewPage({
  params,
}: AccountOverviewPageProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    redirect("/zh");
  }

  const data = await getAccountConsoleData(locale);

  if (!data) {
    redirect(`/${locale}/auth`);
  }

  const metrics = [
    {
      label: data.dictionary.account.totalQuota,
      value: formatNumber(locale as Locale, data.profile?.quota ?? null),
      icon: Layers3,
    },
    {
      label: data.dictionary.account.usedQuota,
      value: formatNumber(locale as Locale, data.profile?.usedQuota ?? null),
      icon: Gauge,
    },
    {
      label: data.dictionary.account.remainingQuota,
      value: formatNumber(locale as Locale, data.profile?.remainingQuota ?? null),
      icon: BadgeCheck,
    },
    {
      label: data.dictionary.account.requestCount,
      value: formatNumber(locale as Locale, data.profile?.requestCount ?? null),
      icon: Activity,
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="relative overflow-hidden border-primary/15 bg-card/75">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,201,104,0.16),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_52%)]" />
        <CardContent className="relative p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <Badge>{data.dictionary.account.badge}</Badge>
              <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                {data.dictionary.account.cockpitTitle}
              </h1>
              <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
                {data.dictionary.account.cockpitDescription}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-border/70 bg-background/55 p-4">
                <p className="text-sm text-muted-foreground">
                  {data.dictionary.account.displayName}
                </p>
                <p className="mt-2 font-semibold">
                  {data.profile?.displayName ?? data.session.name}
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-border/70 bg-background/55 p-4">
                <p className="text-sm text-muted-foreground">
                  {data.dictionary.account.memberSince}
                </p>
                <p className="mt-2 font-semibold">
                  {formatSessionDate(locale as Locale, data.session.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((item) => {
          const Icon = item.icon;

          return (
            <Card key={item.label} className="border-border/70 bg-card/70">
              <CardContent className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="mt-3 text-2xl font-semibold tracking-tight">{item.value}</p>
                  </div>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-primary/10 bg-card/70">
          <CardHeader>
            <CardTitle>{data.dictionary.account.currentCycleTitle}</CardTitle>
            <CardDescription>{data.dictionary.account.currentCycleDescription}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-[1.25rem] border border-border/70 bg-background/55 p-4">
              <p className="text-sm text-muted-foreground">{data.dictionary.account.forecastTitle}</p>
              <p className="mt-2 font-semibold">
                {data.forecast.estimatedExhaustDays !== null
                  ? `${data.forecast.estimatedExhaustDays} 天`
                  : data.dictionary.account.forecastEmpty}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">{data.dictionary.account.forecastDescription}</p>
              <Badge className="mt-3" variant={data.forecast.riskLevel === "high" ? "default" : "outline"}>
                {data.forecast.riskLevel === "high"
                  ? data.dictionary.account.forecastRiskHigh
                  : data.forecast.riskLevel === "medium"
                    ? data.dictionary.account.forecastRiskMedium
                    : data.dictionary.account.forecastRiskLow}
              </Badge>
            </div>
            <div className="rounded-[1.25rem] border border-border/70 bg-background/55 p-4">
              <p className="text-sm text-muted-foreground">{data.dictionary.account.recoveryTitle}</p>
              <p className="mt-2 text-sm text-muted-foreground">{data.dictionary.account.recoveryDescription}</p>
              <div className="mt-3 space-y-2">
                {data.recoveryItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="block rounded-lg border border-border/60 bg-background/70 px-3 py-2 text-sm hover:border-primary/30"
                  >
                    <span className="font-medium">{item.title}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">{item.description}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="rounded-[1.25rem] border border-border/70 bg-background/55 p-4">
              <p className="text-sm text-muted-foreground">
                {data.dictionary.account.subscriptionsTitle}
              </p>
              <p className="mt-2 font-semibold">
                {data.activeSubscription
                  ? `${data.activeSubscription.title} · ${data.activeSubscription.status}`
                  : data.dictionary.account.emptySubscriptions}
              </p>
            </div>
            <div className="rounded-[1.25rem] border border-border/70 bg-background/55 p-4">
              <p className="text-sm text-muted-foreground">{data.dictionary.account.ordersTitle}</p>
              <p className="mt-2 font-semibold">
                {data.latestOrder
                  ? `${data.latestOrder.title} · ${formatDateTime(
                      locale as Locale,
                      data.latestOrder.createTime,
                    )}`
                  : data.dictionary.account.emptyOrders}
              </p>
            </div>
          </CardContent>
        </Card>

        <AccountNextActions dictionary={data.dictionary} actions={data.nextActions} />
      </section>

      <AccountRecentActivity dictionary={data.dictionary} items={data.recentActivity} />
    </div>
  );
}
