import { Hero } from "@/components/site/hero";
import { getDictionary, isSupportedLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

type LocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function LocaleHomePage({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);

  return <Hero locale={locale} dictionary={dictionary} />;
}
