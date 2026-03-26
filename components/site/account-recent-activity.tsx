import * as React from "react";
import { Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type HomeDictionary } from "@/lib/i18n";

export type AccountRecentActivityItem = {
  id: string;
  title: string;
  timestamp: string;
  detail: string;
};

type AccountRecentActivityProps = {
  dictionary: HomeDictionary;
  items: AccountRecentActivityItem[];
};

export function AccountRecentActivity({ dictionary, items }: AccountRecentActivityProps) {
  return (
    <Card className="border-border/70 bg-card/70">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-primary" />
          {dictionary.account.recentActivityTitle}
        </CardTitle>
        <CardDescription>{dictionary.account.recentActivityDescription}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.length > 0 ? (
          items.map((item) => (
            <div
              key={item.id}
              className="rounded-[1.25rem] border border-border/70 bg-background/55 p-4"
            >
              <p className="font-medium">{item.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{item.timestamp}</p>
              <p className="mt-2 text-sm text-muted-foreground">{item.detail}</p>
            </div>
          ))
        ) : (
          <div className="rounded-[1.25rem] border border-dashed border-border/70 bg-background/50 p-4 text-sm text-muted-foreground">
            {dictionary.account.recentActivityEmpty}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
