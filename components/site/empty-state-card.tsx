import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type EmptyStateCardProps = {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
};

export function EmptyStateCard({
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateCardProps) {
  return (
    <Card className="console-card-density border-dashed">
      <CardHeader className="space-y-2 text-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="mx-auto max-w-lg">{description}</CardDescription>
      </CardHeader>
      {actionLabel && actionHref ? (
        <CardContent className="mt-2 flex justify-center">
          <Button asChild>
            <Link href={actionHref}>{actionLabel}</Link>
          </Button>
        </CardContent>
      ) : null}
    </Card>
  );
}
