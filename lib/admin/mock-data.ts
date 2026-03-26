export type AdminUserRow = {
  id: number;
  name: string;
  email: string;
  status: "active" | "pending" | "suspended";
  group: string;
};

export type AdminOrderRow = {
  id: number;
  title: string;
  amount: string;
  status: "paid" | "pending" | "failed";
  createdAt: string;
};

export function getAdminUsers(): AdminUserRow[] {
  return [
    { id: 1, name: "Alice", email: "alice@fishxcode.com", status: "active", group: "pro" },
    { id: 2, name: "Bob", email: "bob@fishxcode.com", status: "pending", group: "starter" },
    { id: 3, name: "Carol", email: "carol@fishxcode.com", status: "suspended", group: "enterprise" },
  ];
}

export function getAdminOrders(): AdminOrderRow[] {
  return [
    { id: 101, title: "Pro Monthly", amount: "¥199", status: "paid", createdAt: "2026-03-24" },
    { id: 102, title: "Starter Monthly", amount: "¥49", status: "pending", createdAt: "2026-03-25" },
    { id: 103, title: "Enterprise Annual", amount: "¥999", status: "failed", createdAt: "2026-03-26" },
  ];
}
