import Link from "next/link";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/site/logout-button";
import { PageToolbar } from "@/components/site/page-toolbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSession } from "@/lib/auth/session";
import { getDictionary, isSupportedLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

type AccountPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: AccountPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    return {};
  }

  const dictionary = getDictionary(locale);

  return buildPageMetadata(locale, {
    title: dictionary.account.meta.title,
    description: dictionary.account.meta.description,
    path: `/${locale}/account`,
    index: false,
  });
}

export default async function AccountPage({ params }: AccountPageProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    redirect("/zh");
  }

  await cookies();
  const session = await getSession();

  if (!session) {
    redirect(`/${locale}/auth`);
  }

  const dictionary = getDictionary(locale);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center gap-8 px-4 py-10 sm:px-6 md:px-8 md:py-16 lg:px-12">
      <PageToolbar
        locale={locale as Locale}
        dictionary={dictionary}
        backHref={`/${locale}`}
        backLabel={dictionary.account.backHome}
      />

      <section className="max-w-3xl">
        <Badge>{dictionary.account.badge}</Badge>
        <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          {dictionary.account.title}
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          {dictionary.account.description}
        </p>
      </section>

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>{dictionary.account.sessionTitle}</CardTitle>
          <CardDescription>{dictionary.account.sessionDescription}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-3xl border border-border/70 bg-background/60 p-5">
              <p className="text-sm text-muted-foreground">{dictionary.account.displayName}</p>
              <p className="mt-2 break-words font-medium">{session.name}</p>
            </div>
            <div className="rounded-3xl border border-border/70 bg-background/60 p-5">
              <p className="text-sm text-muted-foreground">{dictionary.account.signedInAs}</p>
              <p className="mt-2 break-all font-medium">{session.email}</p>
            </div>
            <div className="rounded-3xl border border-border/70 bg-background/60 p-5">
              <p className="text-sm text-muted-foreground">{dictionary.account.memberSince}</p>
              <p className="mt-2 font-medium">
                {new Date(session.createdAt).toLocaleDateString(locale === "zh" ? "zh-CN" : "en-US")}
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-border/70 bg-background/60 p-5">
            <p className="text-sm text-muted-foreground">{dictionary.account.sessionStatus}</p>
            <p className="mt-2 font-medium text-primary">{dictionary.account.sessionActive}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
            <LogoutButton
              locale={locale}
              label={dictionary.account.logout}
              pendingLabel={dictionary.account.logoutPending}
              errorLabel={dictionary.account.logoutError}
            />
            <Button asChild variant="outline">
              <Link href={`/${locale}`}>{dictionary.account.backHome}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
