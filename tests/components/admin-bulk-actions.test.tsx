import { describe, it, expect } from "vitest";
import { applyBulkOrderStatus, filterOrdersByStatus } from "../../components/admin/admin-orders-client";
import { type AdminOrderRow } from "../../lib/admin/mock-data";

describe("admin bulk order actions", () => {
  const rows: AdminOrderRow[] = [
    { id: 101, title: "Pro Monthly", amount: "¥199", status: "paid", createdAt: "2026-03-24" },
    { id: 102, title: "Starter Monthly", amount: "¥49", status: "pending", createdAt: "2026-03-25" },
    { id: 103, title: "Enterprise Annual", amount: "¥999", status: "failed", createdAt: "2026-03-26" },
  ];

  it("updates selected orders to target status", () => {
    const updated = applyBulkOrderStatus(rows, [102, 103], "paid");

    expect(updated.find((row) => row.id === 101)?.status).toBe("paid");
    expect(updated.find((row) => row.id === 102)?.status).toBe("paid");
    expect(updated.find((row) => row.id === 103)?.status).toBe("paid");
  });

  it("keeps rows unchanged when no selection", () => {
    const updated = applyBulkOrderStatus(rows, [], "failed");
    expect(updated).toEqual(rows);
  });

  it("still supports status filtering after bulk update", () => {
    const updated = applyBulkOrderStatus(rows, [102], "paid");
    const paidRows = filterOrdersByStatus(updated, "paid");

    expect(paidRows.map((row) => row.id)).toEqual([101, 102]);
  });
});
