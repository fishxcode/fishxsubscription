import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminOverviewPage() {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      <Card className="border-border/70 bg-card/70">
        <CardHeader>
          <CardTitle>用户管理</CardTitle>
        </CardHeader>
        <CardContent>
          <Link className="text-primary" href="./admin/users">
            进入用户列表
          </Link>
        </CardContent>
      </Card>
      <Card className="border-border/70 bg-card/70">
        <CardHeader>
          <CardTitle>订单管理</CardTitle>
        </CardHeader>
        <CardContent>
          <Link className="text-primary" href="./admin/orders">
            进入订单列表
          </Link>
        </CardContent>
      </Card>
    </section>
  );
}
