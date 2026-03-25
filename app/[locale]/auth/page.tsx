import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/site/auth-form";
import { Badge } from "@/components/ui/badge";
import { PageToolbar } from "@/components/site/page-toolbar";
import { getSession } from "@/lib/auth/session";
import { getDictionary, isSupportedLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

type AuthPageProps = {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    mode?: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: AuthPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    return {};
  }

  const dictionary = getDictionary(locale);

  return buildPageMetadata(locale, {
    title: dictionary.auth.meta.title,
    description: dictionary.auth.meta.description,
    path: `/${locale}/auth`,
    index: false,
  });
}

export default async function AuthPage({ params, searchParams }: AuthPageProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    redirect("/zh");
  }

  await cookies();
  const session = await getSession();

  if (session) {
    redirect(`/${locale}/account`);
  }

  const dictionary = getDictionary(locale);
  const resolvedSearchParams = await searchParams;
  const mode = resolvedSearchParams.mode === "register" ? "register" : "login";

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center gap-8 px-4 py-10 sm:px-6 md:px-8 md:py-16 lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12 lg:px-12">
      <div className="lg:col-span-2">
        <PageToolbar
          locale={locale as Locale}
          dictionary={dictionary}
          backHref={`/${locale}`}
          backLabel={dictionary.account.backHome}
        />
      </div>
      <section className="max-w-xl">
        <Badge>{dictionary.auth.badge}</Badge>
        <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          {dictionary.auth.title}
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          {dictionary.auth.description}
        </p>
      </section>

      <section className="flex justify-center lg:justify-end">
        <AuthForm
          locale={locale as Locale}
          dictionary={dictionary}
          initialMode={mode}
        />
      </section>
    </main>
  );
}
