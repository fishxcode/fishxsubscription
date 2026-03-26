"use client";

import React from "react";

type AdminViewSwitcherProps = {
  value: "list" | "card";
  onChangeAction: (value: "list" | "card") => void;
};

export function AdminViewSwitcher({ value, onChangeAction }: AdminViewSwitcherProps) {
  return (
    <div className="inline-flex rounded-xl border border-border/70 bg-background/70 p-1" data-testid="view-mode">
      <button
        type="button"
        className={`rounded-lg px-3 py-1.5 text-sm ${value === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
        onClick={() => onChangeAction("list")}
      >
        列表
      </button>
      <button
        type="button"
        className={`rounded-lg px-3 py-1.5 text-sm ${value === "card" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
        onClick={() => onChangeAction("card")}
      >
        卡片
      </button>
    </div>
  );
}
