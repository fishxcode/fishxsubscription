import { redirect } from "next/navigation";
import { ConsoleLayout } from "@/components/site/console-layout";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopbar } from "@/components/admin/admin-topbar";
import { getDictionary, isSupportedLocale, type Locale } from "@/lib/i18n";

type AdminLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function AdminLayout({ children, params }: AdminLayoutProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    redirect("/zh");
  }

  const dictionary = getDictionary(locale);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 md:px-8">
      <ConsoleLayout
        sidebar={<AdminSidebar locale={locale as Locale} />}
        topbar={<AdminTopbar title={dictionary.header.foundation} description="管理控制台" />}
      >
        {children}
      </ConsoleLayout>
    </main>
  );
}
