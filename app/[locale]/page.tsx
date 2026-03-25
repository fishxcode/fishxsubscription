import { Hero } from "@/components/site/hero";
import { getSession } from "@/lib/auth/session";
import { getDictionary, isSupportedLocale } from "@/lib/i18n";
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

  return <Hero locale={locale} dictionary={dictionary} session={session} />;
}
