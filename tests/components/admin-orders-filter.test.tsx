import { describe, expect, it } from "vitest";
import { filterOrdersByStatus } from "../../components/admin/admin-orders-client";

describe("filterOrdersByStatus", () => {
  const rows = [
    { id: 1, title: "A", amount: "¥1", status: "paid", createdAt: "2026-03-24" },
    { id: 2, title: "B", amount: "¥2", status: "pending", createdAt: "2026-03-25" },
    { id: 3, title: "C", amount: "¥3", status: "failed", createdAt: "2026-03-26" },
  ] as const;

  it("returns all rows when status is all", () => {
    expect(filterOrdersByStatus([...rows], "all")).toHaveLength(3);
  });

  it("returns only pending rows", () => {
    const filtered = filterOrdersByStatus([...rows], "pending");
    expect(filtered).toHaveLength(1);
    expect(filtered[0].status).toBe("pending");
  });
});
