import { Hero } from "@/components/site/hero";
import { getSession } from "@/lib/auth/session";
import { getDictionary, isSupportedLocale } from "@/lib/i18n";
import { getHomePricingPlans, splitHomePricingPlans } from "@/lib/newapi-home";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

type LocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function LocaleHomePage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
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
  const { featured } = splitHomePricingPlans(plans);

  return <Hero locale={locale} dictionary={dictionary} session={session} plans={featured} />;
}
