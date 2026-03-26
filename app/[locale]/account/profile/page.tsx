import { CircleUserRound, Mail, ShieldCheck, UserSquare2 } from "lucide-react";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  formatRoleLabel,
  formatSessionDate,
  formatStatusLabel,
  getAccountConsoleData,
} from "@/lib/account-console";
import { isSupportedLocale, type Locale } from "@/lib/i18n";

type AccountProfilePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function AccountProfilePage({
  params,
}: AccountProfilePageProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    redirect("/zh");
  }

  const data = await getAccountConsoleData(locale);

  if (!data) {
    redirect(`/${locale}/auth`);
  }

  const items = [
    {
      label: data.dictionary.account.displayName,
      value: data.profile?.displayName ?? data.session.name,
      icon: CircleUserRound,
    },
    {
      label: data.dictionary.account.signedInAs,
      value: data.profile?.email ?? data.session.email,
      icon: Mail,
    },
    {
      label: data.dictionary.account.username,
      value: data.profile?.username ?? data.dictionary.account.unavailable,
      icon: UserSquare2,
    },
    {
      label: data.dictionary.account.accountRole,
      value: formatRoleLabel(data.profile?.role, data.dictionary),
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-border/70 bg-card/72">
        <CardHeader>
          <CardTitle>{data.dictionary.account.profilePageTitle}</CardTitle>
          <CardDescription>{data.dictionary.account.profilePageDescription}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="flex items-start gap-4 rounded-[1.5rem] border border-border/70 bg-background/55 p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="mt-2 break-all font-semibold">{item.value}</p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card className="border-border/70 bg-card/72">
        <CardHeader>
          <CardTitle>{data.dictionary.account.sessionTitle}</CardTitle>
          <CardDescription>{data.dictionary.account.sessionDescription}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[1.5rem] border border-border/70 bg-background/55 p-4">
            <p className="text-sm text-muted-foreground">{data.dictionary.account.userId}</p>
            <p className="mt-2 font-semibold">{data.profile?.id ?? data.session.userId}</p>
          </div>
          <div className="rounded-[1.5rem] border border-border/70 bg-background/55 p-4">
            <p className="text-sm text-muted-foreground">{data.dictionary.account.userGroup}</p>
            <p className="mt-2 break-words font-semibold">
              {data.profile?.group ?? data.dictionary.account.unavailable}
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-border/70 bg-background/55 p-4">
            <p className="text-sm text-muted-foreground">{data.dictionary.account.accountStatusLabel}</p>
            <p className="mt-2 font-semibold text-primary">
              {formatStatusLabel(data.profile?.status, data.dictionary)}
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-border/70 bg-background/55 p-4">
            <p className="text-sm text-muted-foreground">{data.dictionary.account.memberSince}</p>
            <p className="mt-2 font-semibold">
              {formatSessionDate(locale as Locale, data.session.createdAt)}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
