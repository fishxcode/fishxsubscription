import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PageToolbar } from "@/components/site/page-toolbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSession } from "@/lib/auth/session";
import { getDictionary, isSupportedLocale, type Locale } from "@/lib/i18n";
import { getHomePricingPlans, splitHomePricingPlans } from "@/lib/newapi-home";
import { buildPageMetadata } from "@/lib/seo";

type PricingPageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    group?: string;
    status?: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PricingPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    return {};
  }

  const dictionary = getDictionary(locale);

  return buildPageMetadata(locale, {
    title: dictionary.pricing.meta.title,
    description: dictionary.pricing.meta.description,
    path: `/${locale}/pricing`,
  });
}

function getPlanGroup(title: string) {
  return title.split(" ")[0].toLowerCase();
}

function buildFilterHref(
  locale: Locale,
  next: {
    group?: string;
    status?: string;
  },
) {
  const searchParams = new URLSearchParams();

  if (next.group && next.group !== "all") {
    searchParams.set("group", next.group);
  }

  if (next.status && next.status !== "all") {
    searchParams.set("status", next.status);
  }

  const query = searchParams.toString();
  return `/${locale}/pricing${query ? `?${query}` : ""}`;
}

export default async function PricingPage({ params, searchParams }: PricingPageProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    redirect("/zh");
  }

  await cookies();
  const dictionary = getDictionary(locale);
  const session = await getSession();
  const dynamicPlans = await getHomePricingPlans(locale);
  const plans =
    dynamicPlans.length > 0
      ? dynamicPlans
      : dictionary.plans.map((plan, index) => ({
          id: index + 1,
          title: plan.title,
          description: plan.description,
          price: plan.price,
          cycle: dictionary.pricing.cycle,
          enabled: true,
          sortOrder: index,
          group: plan.title.split(" ")[0].toLowerCase(),
        }));
  const { available, archived } = splitHomePricingPlans(plans);
  const resolvedSearchParams = await searchParams;
  const selectedGroup = resolvedSearchParams.group?.trim().toLowerCase() || "all";
  const selectedStatus = resolvedSearchParams.status === "available" || resolvedSearchParams.status === "archived"
    ? resolvedSearchParams.status
    : "all";
  const groups = Array.from(new Set(plans.map((plan) => getPlanGroup(plan.title))));
  const matchesGroup = (title: string) =>
    selectedGroup === "all" ? true : getPlanGroup(title) === selectedGroup;
  const filteredAvailable = available.filter((plan) => matchesGroup(plan.title));
  const filteredArchived = archived.filter((plan) => matchesGroup(plan.title));
  const displayAvailable = selectedStatus === "archived" ? [] : filteredAvailable;
  const displayArchived = selectedStatus === "available" ? [] : filteredArchived;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 md:px-8 md:py-12 lg:px-12">
      <PageToolbar
        locale={locale as Locale}
        dictionary={dictionary}
        accountHref={session ? `/${locale}/account` : undefined}
        backHref={`/${locale}`}
        backLabel={dictionary.account.backHome}
      />

      <section className="max-w-4xl">
        <Badge>{dictionary.pricing.badge}</Badge>
        <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          {dictionary.pricing.title}
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          {dictionary.pricing.description}
        </p>
      </section>

      <section className="grid gap-4 rounded-[1.75rem] border border-border/70 bg-card/70 p-5 sm:p-6 xl:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {dictionary.pricing.filterGroupLabel}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button
              asChild
              size="sm"
              variant={selectedGroup === "all" ? "default" : "outline"}
            >
              <Link href={buildFilterHref(locale as Locale, { group: "all", status: selectedStatus })}>
                {dictionary.pricing.filterAll}
              </Link>
            </Button>
            {groups.map((group) => (
              <Button
                key={group}
                asChild
                size="sm"
                variant={selectedGroup === group ? "default" : "outline"}
              >
                <Link href={buildFilterHref(locale as Locale, { group, status: selectedStatus })}>
                  {group}
                </Link>
              </Button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {dictionary.pricing.filterStatusLabel}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button
              asChild
              size="sm"
              variant={selectedStatus === "all" ? "default" : "outline"}
            >
              <Link href={buildFilterHref(locale as Locale, { group: selectedGroup, status: "all" })}>
                {dictionary.pricing.filterAll}
              </Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant={selectedStatus === "available" ? "default" : "outline"}
            >
              <Link href={buildFilterHref(locale as Locale, { group: selectedGroup, status: "available" })}>
                {dictionary.pricing.filterAvailable}
              </Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant={selectedStatus === "archived" ? "default" : "outline"}
            >
              <Link href={buildFilterHref(locale as Locale, { group: selectedGroup, status: "archived" })}>
                {dictionary.pricing.filterArchived}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {dictionary.pricing.availableGroupTitle}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {dictionary.pricing.availableGroupDescription}
          </p>
        </div>

        {displayAvailable.length ? (
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {displayAvailable.map((plan, index) => (
              <Card key={plan.id} className="border-primary/15 bg-card/72">
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2">
                    <CardTitle className="text-2xl">{plan.title}</CardTitle>
                    {index === 0 ? <Badge>{dictionary.pricing.featuredBadge}</Badge> : null}
                    <Badge variant="secondary">{dictionary.pricing.activeStatus}</Badge>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <p className="text-3xl font-semibold text-primary">{plan.price}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{plan.cycle}</p>
                  </div>
                  <Button asChild className="w-full">
                    <Link href={`/${locale}/pricing/${plan.id}`}>
                      {dictionary.pricing.detailCta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-border/70 bg-card/70">
            <CardContent className="p-6 text-muted-foreground">
              {dictionary.pricing.emptyTitle}
            </CardContent>
          </Card>
        )}
      </section>

      {displayArchived.length ? (
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              {dictionary.pricing.archivedGroupTitle}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {dictionary.pricing.archivedGroupDescription}
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {displayArchived.map((plan) => (
              <Card key={plan.id} className="border-border/60 bg-card/60 opacity-85">
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2">
                    <CardTitle className="text-xl">{plan.title}</CardTitle>
                    <Badge variant="outline">{dictionary.pricing.inactiveStatus}</Badge>
                  </div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold text-foreground">{plan.price}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{plan.cycle}</p>
                  <Button asChild variant="outline" className="mt-5 w-full">
                    <Link href={`/${locale}/pricing/${plan.id}`}>
                      {dictionary.pricing.detailCta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
