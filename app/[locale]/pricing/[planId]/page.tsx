import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { PageToolbar } from "@/components/site/page-toolbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSession } from "@/lib/auth/session";
import { getDictionary, isSupportedLocale, type Locale } from "@/lib/i18n";
import { getPricingPlanById } from "@/lib/newapi-home";
import { buildPageMetadata } from "@/lib/seo";

type PricingDetailPageProps = {
  params: Promise<{
    locale: string;
    planId: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PricingDetailPageProps): Promise<Metadata> {
  const { locale, planId } = await params;

  if (!isSupportedLocale(locale)) {
    return {};
  }

  const dictionary = getDictionary(locale);
  const numericId = Number(planId);

  if (!Number.isInteger(numericId)) {
    return buildPageMetadata(locale, {
      title: dictionary.pricing.detailMetaTitle,
      description: dictionary.pricing.detailMetaDescription,
      path: `/${locale}/pricing`,
    });
  }

  const plan = await getPricingPlanById(locale, numericId);

  if (!plan) {
    return buildPageMetadata(locale, {
      title: dictionary.pricing.detailMetaTitle,
      description: dictionary.pricing.detailMetaDescription,
      path: `/${locale}/pricing`,
    });
  }

  return buildPageMetadata(locale, {
    title: `${plan.title} | ${dictionary.pricing.detailMetaTitle}`,
    description: plan.description,
    path: `/${locale}/pricing/${plan.id}`,
  });
}

export default async function PricingDetailPage({
  params,
}: PricingDetailPageProps) {
  const { locale, planId } = await params;

  if (!isSupportedLocale(locale)) {
    redirect("/zh");
  }

  const numericId = Number(planId);

  if (!Number.isInteger(numericId)) {
    notFound();
  }

  await cookies();
  const dictionary = getDictionary(locale);
  const session = await getSession();
  const plan = await getPricingPlanById(locale, numericId);

  if (!plan) {
    notFound();
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 md:px-8 md:py-12 lg:px-12">
      <PageToolbar
        locale={locale as Locale}
        dictionary={dictionary}
        accountHref={session ? `/${locale}/account` : undefined}
        backHref={`/${locale}/pricing`}
        backLabel={dictionary.pricing.viewAll}
      />

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-primary/15 bg-card/76">
          <CardHeader>
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{plan.enabled ? dictionary.pricing.activeStatus : dictionary.pricing.inactiveStatus}</Badge>
              <Badge variant="outline">#{plan.id}</Badge>
            </div>
            <CardTitle className="text-4xl">{plan.title}</CardTitle>
            <CardDescription className="max-w-2xl text-base">
              {plan.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-border/70 bg-background/55 p-5">
              <p className="text-sm text-muted-foreground">{dictionary.account.planPrice}</p>
              <p className="mt-2 text-3xl font-semibold text-primary">{plan.price}</p>
            </div>
            <div className="rounded-[1.5rem] border border-border/70 bg-background/55 p-5">
              <p className="text-sm text-muted-foreground">{dictionary.account.billingCycle}</p>
              <p className="mt-2 text-2xl font-semibold">{plan.cycle}</p>
            </div>
            <div className="rounded-[1.5rem] border border-border/70 bg-background/55 p-5">
              <p className="text-sm text-muted-foreground">{dictionary.pricing.detailStatus}</p>
              <p className="mt-2 text-xl font-semibold">
                {plan.enabled ? dictionary.pricing.activeStatus : dictionary.pricing.inactiveStatus}
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-border/70 bg-background/55 p-5">
              <p className="text-sm text-muted-foreground">{dictionary.pricing.detailGroup}</p>
              <p className="mt-2 text-xl font-semibold">{plan.group}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/72">
          <CardHeader>
            <CardTitle>{dictionary.pricing.detailActionTitle}</CardTitle>
            <CardDescription>{dictionary.pricing.detailActionDescription}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-[1.5rem] border border-border/70 bg-background/55 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{plan.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
                </div>
              </div>
            </div>
            <Button asChild className="w-full">
              <Link href={session ? `/${locale}/account/subscriptions` : `/${locale}/auth`}>
                {session ? dictionary.account.navSubscriptions : dictionary.pricing.detailPrimaryCta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href={`/${locale}/pricing`}>
                {dictionary.pricing.detailSecondaryCta}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
