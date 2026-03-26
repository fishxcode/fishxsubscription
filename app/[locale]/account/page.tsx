import { Activity, BadgeCheck, Gauge, Layers3, Sparkles } from "lucide-react";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  formatCycle,
  formatDateTime,
  formatMoney,
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
                {data.dictionary.account.overviewTitle}
              </h1>
              <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
                {data.dictionary.account.overviewDescription}
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

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="border-primary/10 bg-card/70">
          <CardHeader>
            <CardTitle>{data.dictionary.account.subscriptionsTitle}</CardTitle>
            <CardDescription>{data.dictionary.account.subscriptionsDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            {data.activeSubscription ? (
              <div className="space-y-5">
                <div className="rounded-[1.5rem] border border-primary/20 bg-primary/8 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold">{data.activeSubscription.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {data.activeSubscription.subtitle ?? data.dictionary.account.unavailable}
                      </p>
                    </div>
                    <Badge>{data.activeSubscription.status}</Badge>
                  </div>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {data.dictionary.account.planPrice}
                      </p>
                      <p className="mt-1 font-semibold">
                        {formatMoney(
                          locale as Locale,
                          data.activeSubscription.priceAmount,
                          data.activeSubscription.currency,
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {data.dictionary.account.billingCycle}
                      </p>
                      <p className="mt-1 font-semibold">
                        {formatCycle(
                          data.activeSubscription.durationUnit,
                          data.activeSubscription.durationValue,
                        )}
                      </p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-sm text-muted-foreground">
                        {data.dictionary.account.planPeriod}
                      </p>
                      <p className="mt-1 font-semibold">
                        {formatDateTime(locale as Locale, data.activeSubscription.startTime)}
                        {" -> "}
                        {formatDateTime(locale as Locale, data.activeSubscription.endTime)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-border/70 bg-background/55 p-4">
                    <p className="text-sm text-muted-foreground">
                      {data.dictionary.account.planQuota}
                    </p>
                    <p className="mt-2 font-semibold">
                      {formatNumber(locale as Locale, data.activeSubscription.amountUsed)} /{" "}
                      {formatNumber(locale as Locale, data.activeSubscription.amountTotal)}
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-border/70 bg-background/55 p-4">
                    <p className="text-sm text-muted-foreground">
                      {data.dictionary.account.source}
                    </p>
                    <p className="mt-2 font-semibold">
                      {data.activeSubscription.source ?? data.dictionary.account.unavailable}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-[1.5rem] border border-dashed border-border/70 bg-background/50 p-5 text-sm text-muted-foreground">
                {data.dictionary.account.emptySubscriptions}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/70">
          <CardHeader>
            <CardTitle>{data.dictionary.account.ordersTitle}</CardTitle>
            <CardDescription>{data.dictionary.account.ordersDescription}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.latestOrder ? (
              <div className="rounded-[1.5rem] border border-border/70 bg-background/55 p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold">{data.latestOrder.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">#{data.latestOrder.id}</p>
                      </div>
                      <Badge variant="outline">{data.latestOrder.status}</Badge>
                    </div>
                    <div className="mt-4 grid gap-3 text-sm">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-muted-foreground">
                          {data.dictionary.account.orderAmount}
                        </span>
                        <span className="font-medium">
                          {formatMoney(
                            locale as Locale,
                            data.latestOrder.money,
                            data.latestOrder.currency,
                          )}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-muted-foreground">
                          {data.dictionary.account.paymentMethod}
                        </span>
                        <span className="font-medium">
                          {data.latestOrder.paymentMethod ?? data.dictionary.account.unavailable}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-muted-foreground">
                          {data.dictionary.account.createdAt}
                        </span>
                        <span className="font-medium">
                          {formatDateTime(locale as Locale, data.latestOrder.createTime)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-[1.5rem] border border-dashed border-border/70 bg-background/50 p-5 text-sm text-muted-foreground">
                {data.dictionary.account.emptyOrders}
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
