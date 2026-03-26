import Link from "next/link";
import { type Locale } from "@/lib/i18n";

type AdminSidebarProps = {
  locale: Locale;
};

export function AdminSidebar({ locale }: AdminSidebarProps) {
  return (
    <nav className="space-y-2">
      <Link className="block rounded-xl px-3 py-2 hover:bg-background/70" href={`/${locale}/admin`}>
        概览
      </Link>
      <Link className="block rounded-xl px-3 py-2 hover:bg-background/70" href={`/${locale}/admin/users`}>
        用户
      </Link>
      <Link className="block rounded-xl px-3 py-2 hover:bg-background/70" href={`/${locale}/admin/orders`}>
        订单
      </Link>
    </nav>
  );
}
