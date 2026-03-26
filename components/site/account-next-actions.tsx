import * as React from "react";
import Link from "next/link";
import { AlertTriangle, ArrowRight, Clock3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { type HomeDictionary } from "@/lib/i18n";

export type AccountNextActionItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  priority: "high" | "medium" | "low";
};

type AccountNextActionsProps = {
  dictionary: HomeDictionary;
  actions: AccountNextActionItem[];
};

function getPriorityLabel(
  priority: AccountNextActionItem["priority"],
  dictionary: HomeDictionary,
) {
  if (priority === "high") {
    return dictionary.account.nextPriorityHigh;
  }

  if (priority === "medium") {
    return dictionary.account.nextPriorityMedium;
  }

  return dictionary.account.nextPriorityLow;
}

export function AccountNextActions({ dictionary, actions }: AccountNextActionsProps) {
  return (
    <Card className="border-border/70 bg-card/70">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock3 className="h-4 w-4 text-primary" />
          {dictionary.account.nextActionsTitle}
        </CardTitle>
        <CardDescription>{dictionary.account.nextActionsDescription}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.length > 0 ? (
          actions.map((action) => (
            <div
              key={action.id}
              className="rounded-[1.25rem] border border-border/70 bg-background/55 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium">{action.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{action.description}</p>
                </div>
                <Badge variant={action.priority === "high" ? "default" : "outline"}>
                  {getPriorityLabel(action.priority, dictionary)}
                </Badge>
              </div>
              <Link
                href={action.href}
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary"
              >
                {dictionary.account.nextActionCta}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))
        ) : (
          <div className="rounded-[1.25rem] border border-dashed border-border/70 bg-background/50 p-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span>{dictionary.account.nextActionsEmpty}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
