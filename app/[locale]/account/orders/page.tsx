import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  formatDateTime,
  formatMoney,
  getAccountConsoleData,
} from "@/lib/account-console";
import { isSupportedLocale, type Locale } from "@/lib/i18n";

type AccountOrdersPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function AccountOrdersPage({
  params,
}: AccountOrdersPageProps) {
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
        <CardTitle>{data.dictionary.account.ordersPageTitle}</CardTitle>
        <CardDescription>{data.dictionary.account.ordersPageDescription}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.snapshot?.orders.length ? (
          data.snapshot.orders.map((order) => (
            <div
              key={order.id}
              className="rounded-[1.5rem] border border-border/70 bg-background/55 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold">{order.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">#{order.id}</p>
                </div>
                <Badge variant="outline">{order.status}</Badge>
              </div>

              <div className="mt-5 grid gap-4 text-sm sm:grid-cols-2 xl:grid-cols-4">
                <div>
                  <p className="text-muted-foreground">{data.dictionary.account.orderAmount}</p>
                  <p className="mt-1 font-medium">
                    {formatMoney(locale as Locale, order.money, order.currency)}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">{data.dictionary.account.paymentMethod}</p>
                  <p className="mt-1 font-medium">
                    {order.paymentMethod ?? data.dictionary.account.unavailable}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">{data.dictionary.account.createdAt}</p>
                  <p className="mt-1 font-medium">
                    {formatDateTime(locale as Locale, order.createTime)}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">{data.dictionary.account.completedAt}</p>
                  <p className="mt-1 font-medium">
                    {formatDateTime(locale as Locale, order.completeTime)}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-[1.5rem] border border-dashed border-border/70 bg-background/50 p-5 text-sm text-muted-foreground">
            {data.dictionary.account.emptyOrders}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
