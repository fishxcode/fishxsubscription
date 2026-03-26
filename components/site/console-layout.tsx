import * as React from "react";
import { cn } from "@/lib/utils";

type ConsoleLayoutProps = {
  sidebar: React.ReactNode;
  topbar: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

export function ConsoleLayout({
  sidebar,
  topbar,
  children,
  className,
  contentClassName,
}: ConsoleLayoutProps) {
  return (
    <div className={cn("console-shell", className)}>
      <aside className="console-sidebar" aria-label="Console sidebar">
        {sidebar}
      </aside>
      <div className="console-main">
        <header className="console-topbar" aria-label="Console topbar">
          {topbar}
        </header>
        <main className={cn("console-content", contentClassName)}>{children}</main>
      </div>
    </div>
  );
}
