"use client";

import { useMemo, useState } from "react";
import { AdminViewSwitcher } from "@/components/admin/admin-view-switcher";
import { AdminEntityList } from "@/components/admin/admin-entity-list";
import { AdminEntityCards } from "@/components/admin/admin-entity-cards";
import { type AdminUserRow } from "@/lib/admin/mock-data";

type AdminUsersClientProps = {
  rows: AdminUserRow[];
};

export function AdminUsersClient({ rows }: AdminUsersClientProps) {
  const [view, setView] = useState<"list" | "card">("list");

  const columns = useMemo(() => [
    { key: "id", label: "ID" },
    { key: "name", label: "姓名" },
    { key: "email", label: "邮箱" },
    { key: "status", label: "状态" },
    { key: "group", label: "分组" },
  ] as const, []);

  return (
    <section className="space-y-4">
      <AdminViewSwitcher value={view} onChangeAction={setView} />
      {view === "list" ? (
        <AdminEntityList rows={rows} columns={columns} />
      ) : (
        <AdminEntityCards rows={rows} fields={columns} />
      )}
    </section>
  );
}
