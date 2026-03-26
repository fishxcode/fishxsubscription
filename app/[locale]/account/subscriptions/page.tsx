import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  formatCycle,
  formatDateTime,
  formatMoney,
  formatNumber,
  getAccountConsoleData,
} from "@/lib/account-console";
import { isSupportedLocale, type Locale } from "@/lib/i18n";

type AccountSubscriptionsPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function AccountSubscriptionsPage({
  params,
}: AccountSubscriptionsPageProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    redirect("/zh");
  }

  const data = await getAccountConsoleData(locale);

  if (!data) {
    redirect(`/${locale}/auth`);
  }

  return (
    <Card className="border-border/70 bg-card/72">
      <CardHeader>
        <CardTitle>{data.dictionary.account.subscriptionsPageTitle}</CardTitle>
        <CardDescription>{data.dictionary.account.subscriptionsPageDescription}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.snapshot?.subscriptions.length ? (
          data.snapshot.subscriptions.map((subscription) => (
            <div
              key={subscription.id}
              className="rounded-[1.5rem] border border-border/70 bg-background/55 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold">{subscription.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {subscription.subtitle ?? data.dictionary.account.unavailable}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge>{subscription.status}</Badge>
                  <Badge variant="outline">#{subscription.planId}</Badge>
                </div>
              </div>

              <div className="mt-5 grid gap-4 text-sm sm:grid-cols-2 xl:grid-cols-3">
                <div>
                  <p className="text-muted-foreground">{data.dictionary.account.planPrice}</p>
                  <p className="mt-1 font-medium">
                    {formatMoney(locale as Locale, subscription.priceAmount, subscription.currency)}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">{data.dictionary.account.billingCycle}</p>
                  <p className="mt-1 font-medium">
                    {formatCycle(subscription.durationUnit, subscription.durationValue)}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">{data.dictionary.account.source}</p>
                  <p className="mt-1 font-medium">
                    {subscription.source ?? data.dictionary.account.unavailable}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">{data.dictionary.account.planPeriod}</p>
                  <p className="mt-1 font-medium">
                    {formatDateTime(locale as Locale, subscription.startTime)}
                    {" -> "}
                    {formatDateTime(locale as Locale, subscription.endTime)}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">{data.dictionary.account.planQuota}</p>
                  <p className="mt-1 font-medium">
                    {formatNumber(locale as Locale, subscription.amountUsed)} /{" "}
                    {formatNumber(locale as Locale, subscription.amountTotal)}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">{data.dictionary.account.planStatus}</p>
                  <p className="mt-1 font-medium">{subscription.status}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-[1.5rem] border border-dashed border-border/70 bg-background/50 p-5 text-sm text-muted-foreground">
            {data.dictionary.account.emptySubscriptions}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
