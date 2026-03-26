"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AdminViewSwitcher } from "@/components/admin/admin-view-switcher";
import { AdminEntityCards } from "@/components/admin/admin-entity-cards";
import { type AdminOrderRow } from "@/lib/admin/mock-data";

export function filterOrdersByStatus(
  rows: AdminOrderRow[],
  status: "all" | AdminOrderRow["status"],
) {
  if (status === "all") {
    return rows;
  }

  return rows.filter((row) => row.status === status);
}

export function applyBulkOrderStatus(
  rows: AdminOrderRow[],
  selectedIds: number[],
  nextStatus: AdminOrderRow["status"],
) {
  if (selectedIds.length === 0) {
    return rows;
  }

  const selectedSet = new Set(selectedIds);
  return rows.map((row) =>
    selectedSet.has(row.id)
      ? {
          ...row,
          status: nextStatus,
        }
      : row,
  );
}

type AdminOrdersClientProps = {
  rows: AdminOrderRow[];
  initialStatus?: "all" | AdminOrderRow["status"];
};

function getSavedStatusFilter() {
  if (typeof window === "undefined") {
    return null;
  }

  const saved = window.localStorage.getItem("admin-orders-status-filter");
  if (saved === "paid" || saved === "pending" || saved === "failed") {
    return saved;
  }

  return null;
}

function saveStatusFilter(status: "all" | AdminOrderRow["status"]) {
  if (typeof window === "undefined") {
    return;
  }

  if (status === "all") {
    window.localStorage.removeItem("admin-orders-status-filter");
    return;
  }

  window.localStorage.setItem("admin-orders-status-filter", status);
}

export function AdminOrdersClient({ rows, initialStatus = "all" }: AdminOrdersClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [view, setView] = useState<"list" | "card">("list");
  const [statusFilter, setStatusFilter] = useState<"all" | AdminOrderRow["status"]>(() => {
    const saved = getSavedStatusFilter();
    return saved ?? initialStatus;
  });
  const [orderRows, setOrderRows] = useState(rows);
  const [selectedOrderIds, setSelectedOrderIds] = useState<number[]>([]);
  const [nextStatus, setNextStatus] = useState<AdminOrderRow["status"]>("paid");

  useEffect(() => {
    saveStatusFilter(statusFilter);
  }, [statusFilter]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (statusFilter === "all") {
      params.delete("status");
    } else {
      params.set("status", statusFilter);
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [pathname, router, searchParams, statusFilter]);

  const columns = useMemo(
    () => [
      { key: "id", label: "ID" },
      { key: "title", label: "标题" },
      { key: "amount", label: "金额" },
      { key: "status", label: "状态" },
      { key: "createdAt", label: "创建时间" },
    ] as const,
    [],
  );

  const filteredRows = useMemo(
    () => filterOrdersByStatus(orderRows, statusFilter),
    [orderRows, statusFilter],
  );

  const allFilteredSelected =
    filteredRows.length > 0 && filteredRows.every((row) => selectedOrderIds.includes(row.id));

  function toggleRowSelection(orderId: number, checked: boolean) {
    if (checked) {
      setSelectedOrderIds((prev) => (prev.includes(orderId) ? prev : [...prev, orderId]));
      return;
    }

    setSelectedOrderIds((prev) => prev.filter((id) => id !== orderId));
  }

  function toggleSelectAll(checked: boolean) {
    if (!checked) {
      setSelectedOrderIds((prev) => prev.filter((id) => !filteredRows.some((row) => row.id === id)));
      return;
    }

    setSelectedOrderIds((prev) => {
      const set = new Set(prev);
      filteredRows.forEach((row) => set.add(row.id));
      return Array.from(set);
    });
  }

  function handleApplyBulkStatus() {
    setOrderRows((prev) => applyBulkOrderStatus(prev, selectedOrderIds, nextStatus));
    setSelectedOrderIds([]);
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <AdminViewSwitcher value={view} onChangeAction={setView} />
        <label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          状态筛选
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as "all" | AdminOrderRow["status"])
            }
            className="rounded-lg border border-border/70 bg-background px-3 py-1.5 text-sm text-foreground"
          >
            <option value="all">全部</option>
            <option value="paid">已支付</option>
            <option value="pending">待支付</option>
            <option value="failed">失败</option>
          </select>
        </label>

        <label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          批量改状态
          <select
            value={nextStatus}
            onChange={(event) => setNextStatus(event.target.value as AdminOrderRow["status"])}
            className="rounded-lg border border-border/70 bg-background px-3 py-1.5 text-sm text-foreground"
          >
            <option value="paid">已支付</option>
            <option value="pending">待支付</option>
            <option value="failed">失败</option>
          </select>
        </label>

        <button
          type="button"
          onClick={handleApplyBulkStatus}
          disabled={selectedOrderIds.length === 0}
          className="rounded-lg border border-primary/40 bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          应用到已选（{selectedOrderIds.length}）
        </button>
      </div>

      {view === "list" ? (
        <div className="overflow-x-auto rounded-xl border border-border/70 bg-card/70">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-border/70 text-left text-muted-foreground">
                <th className="px-4 py-3 font-medium">
                  <input
                    type="checkbox"
                    aria-label="全选当前筛选"
                    checked={allFilteredSelected}
                    onChange={(event) => toggleSelectAll(event.target.checked)}
                  />
                </th>
                {columns.map((column) => (
                  <th key={String(column.key)} className="px-4 py-3 font-medium">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr key={row.id} className="border-b border-border/40 last:border-0">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      aria-label={`选择订单 ${row.id}`}
                      checked={selectedOrderIds.includes(row.id)}
                      onChange={(event) => toggleRowSelection(row.id, event.target.checked)}
                    />
                  </td>
                  {columns.map((column) => (
                    <td key={String(column.key)} className="px-4 py-3">
                      {String(row[column.key] ?? "-")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <AdminEntityCards rows={filteredRows} fields={columns} />
      )}
    </section>
  );
}
