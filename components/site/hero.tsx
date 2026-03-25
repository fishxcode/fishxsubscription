"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Database,
  Languages,
  SearchCheck,
} from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type HomeDictionary, type Locale } from "@/lib/i18n";
import { type SessionPayload } from "@/lib/auth/types";

const capabilityIcons = [Bot, Languages, SearchCheck, Database];

type HeroProps = {
  locale: Locale;
  dictionary: HomeDictionary;
  session: SessionPayload | null;
};

export function Hero({ locale, dictionary, session }: HeroProps) {
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
              <Button variant="outline" size="lg">
                {dictionary.hero.secondaryCta}
              </Button>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {dictionary.capabilities.map(({ title, description }, index) => {
                const Icon = capabilityIcons[index];

                return (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.15 + index * 0.08 }}
                  >
                    <Card className="h-full">
                      <CardHeader>
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <CardTitle className="mt-3">{title}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="relative lg:pl-6"
          >
            <div className="absolute -left-8 top-8 h-28 w-28 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-6 right-0 h-32 w-32 rounded-full bg-orange-900/40 blur-3xl" />
            <Card className="relative overflow-hidden border-primary/15 bg-[linear-gradient(180deg,rgba(245,201,104,0.08),rgba(255,255,255,0.02))]">
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
                {dictionary.plans.map((plan) => (
                  <div
                    key={plan.title}
                    className="rounded-3xl border border-border/70 bg-background/55 p-5"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-lg font-semibold">{plan.title}</p>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {plan.description}
                        </p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-2xl font-semibold text-primary">{plan.price}</p>
                        <p className="text-xs text-muted-foreground">{dictionary.pricing.cycle}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
