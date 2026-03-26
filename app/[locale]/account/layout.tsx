import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AccountShell } from "@/components/site/account-shell";
import { PageToolbar } from "@/components/site/page-toolbar";
import { getAccountConsoleData } from "@/lib/account-console";
import { isSupportedLocale, type Locale } from "@/lib/i18n";

type AccountLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export default async function AccountLayout({
  children,
  params,
}: AccountLayoutProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    redirect("/zh");
  }

  await cookies();
  const data = await getAccountConsoleData(locale);

  if (!data) {
    redirect(`/${locale}/auth`);
  }

  const identity = {
    id: data.profile?.id ?? data.session.userId,
    displayName: data.profile?.displayName ?? data.session.name,
    email: data.profile?.email ?? data.session.email,
    username: data.profile?.username ?? null,
    group: data.profile?.group ?? null,
    role: data.profile?.role,
    status: data.profile?.status,
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 md:px-8 md:py-12 lg:px-12">
      <PageToolbar
        locale={locale as Locale}
        dictionary={data.dictionary}
        backHref={`/${locale}`}
        backLabel={data.dictionary.account.backHome}
      />

      <AccountShell
        locale={locale as Locale}
        dictionary={data.dictionary}
        session={data.session}
        profile={identity}
      >
        {children}
      </AccountShell>
    </main>
  );
}
