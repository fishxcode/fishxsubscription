import { isSupportedLocale } from "@/lib/i18n";
import { getAdminUsers } from "@/lib/admin/mock-data";
import { AdminUsersClient } from "@/components/admin/admin-users-client";
import { redirect } from "next/navigation";

type AdminUsersPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminUsersPage({ params }: AdminUsersPageProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    redirect("/zh");
  }

  const rows = getAdminUsers();

  return <AdminUsersClient rows={rows} />;
}
