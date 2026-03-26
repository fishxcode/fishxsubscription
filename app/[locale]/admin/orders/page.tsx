import { isSupportedLocale } from "@/lib/i18n";
import { getAdminOrders } from "@/lib/admin/mock-data";
import { AdminOrdersClient } from "@/components/admin/admin-orders-client";
import { redirect } from "next/navigation";

type AdminOrdersPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ status?: string }>;
};

export default async function AdminOrdersPage({ params, searchParams }: AdminOrdersPageProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    redirect("/zh");
  }

  const rows = getAdminOrders();
  const resolvedSearchParams = await searchParams;
  const initialStatus =
    resolvedSearchParams.status === "paid" ||
    resolvedSearchParams.status === "pending" ||
    resolvedSearchParams.status === "failed"
      ? resolvedSearchParams.status
      : "all";

  return <AdminOrdersClient rows={rows} initialStatus={initialStatus} />;
}
