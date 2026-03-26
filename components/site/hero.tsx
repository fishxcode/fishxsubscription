"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { HomePricingRecommender } from "@/components/site/home-pricing-recommender";
import { SiteHeader } from "@/components/site/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type HomeDictionary, type Locale } from "@/lib/i18n";
import { type SessionPayload } from "@/lib/auth/types";
import { type HomePricingPlan } from "@/lib/newapi-home";

type HeroProps = {
  locale: Locale;
  dictionary: HomeDictionary;
  session: SessionPayload | null;
  plans: HomePricingPlan[];
};

export function Hero({ locale, dictionary, session, plans }: HeroProps) {
  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-grid bg-[size:40px_40px] opacity-[0.08]" />
      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-24 pt-6 sm:px-6 md:px-8 lg:px-12">
        <SiteHeader
          locale={locale}
          dictionary={dictionary}
          primaryAction={{
            href: session ? `/${locale}/account` : `/${locale}/auth`,
            label: session ? dictionary.header.account : dictionary.header.signIn,
          }}
        />

        <div className="grid flex-1 items-center gap-14 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <Badge>{dictionary.hero.badge}</Badge>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              {dictionary.hero.titlePrefix}{" "}
              <span className="text-primary">{dictionary.hero.titleHighlight}</span>{" "}
              {dictionary.hero.titleSuffix}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              {dictionary.hero.description}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg">
                <Link href={session ? `/${locale}/account` : `/${locale}/auth`}>
                  {session ? dictionary.header.account : dictionary.hero.primaryCta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="#featured-plans">{dictionary.hero.secondaryCta}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={`/${locale}/pricing`}>{dictionary.hero.tertiaryCta}</Link>
              </Button>
            </div>
            <HomePricingRecommender plans={plans} />
            <section
              aria-label="FishXCode AI homepage value summary"
              className="mt-8 grid gap-3 sm:grid-cols-3"
            >
              <div className="rounded-[1.5rem] border border-border/70 bg-card/55 p-4">
                <p className="text-sm font-semibold text-foreground">
                  {dictionary.hero.salesTitle}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {dictionary.hero.salesDescription}
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-border/70 bg-card/55 p-4">
                <p className="text-sm font-semibold text-foreground">
                  {dictionary.hero.brandTitle}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {dictionary.hero.brandDescription}
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-border/70 bg-card/55 p-4">
                <p className="text-sm font-semibold text-foreground">
                  {dictionary.hero.consoleTitle}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {dictionary.hero.consoleDescription}
                </p>
              </div>
            </section>
            <Card className="mt-10 border-primary/15 bg-card/72">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle>{dictionary.hero.featuredTitle}</CardTitle>
                    <CardDescription>{dictionary.hero.featuredDescription}</CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="relative lg:pl-6"
          >
            <div className="absolute -left-8 top-8 h-28 w-28 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-6 right-0 h-32 w-32 rounded-full bg-orange-900/40 blur-3xl" />
            <Card
              id="featured-plans"
              className="relative overflow-hidden border-primary/15 bg-[linear-gradient(180deg,rgba(245,201,104,0.08),rgba(255,255,255,0.02))]"
            >
              <CardHeader>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-primary">
                      {dictionary.pricing.eyebrow}
                    </p>
                    <CardTitle className="mt-3 text-3xl">
                      {dictionary.pricing.title}
                    </CardTitle>
                  </div>
                  <Badge variant="secondary">{dictionary.pricing.badge}</Badge>
                </div>
                <CardDescription>
                  {dictionary.pricing.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {plans.map((plan, index) => (
                  <div
                    key={plan.id}
                    className={`rounded-3xl border p-5 transition ${
                      plan.enabled
                        ? "border-border/70 bg-background/55"
                        : "border-border/50 bg-background/35 opacity-80"
                    }`}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-lg font-semibold">{plan.title}</p>
                          {index === 0 ? <Badge>{dictionary.pricing.featuredBadge}</Badge> : null}
                          <Badge variant={plan.enabled ? "secondary" : "outline"}>
                            {plan.enabled
                              ? dictionary.pricing.activeStatus
                              : dictionary.pricing.inactiveStatus}
                          </Badge>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {plan.description}
                        </p>
                        <Link
                          href={`/${locale}/pricing/${plan.id}`}
                          className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary"
                        >
                          {dictionary.pricing.detailCta}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-2xl font-semibold text-primary">{plan.price}</p>
                        <p className="text-xs text-muted-foreground">{plan.cycle}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/${locale}/pricing`}>{dictionary.pricing.viewAll}</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
