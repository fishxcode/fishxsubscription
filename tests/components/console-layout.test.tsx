import * as React from "react";
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { ConsoleLayout } from "../../components/site/console-layout";
import { StatusKpiCard } from "../../components/site/status-kpi-card";
import { EmptyStateCard } from "../../components/site/empty-state-card";

describe("ConsoleLayout", () => {
  it("renders sidebar, topbar and content slots", () => {
    const html = renderToStaticMarkup(
      <ConsoleLayout sidebar={<div>sidebar slot</div>} topbar={<div>topbar slot</div>}>
        <div>content slot</div>
      </ConsoleLayout>,
    );

    expect(html).toContain("sidebar slot");
    expect(html).toContain("topbar slot");
    expect(html).toContain("content slot");
    expect(html).toContain("console-sidebar");
    expect(html).toContain("console-topbar");
    expect(html).toContain("console-content");
  });

  it("renders status kpi card core fields", () => {
    const html = renderToStaticMarkup(
      <StatusKpiCard
        label="剩余额度"
        value="42,000"
        description="本周期可用"
        trend="+12%"
        trendTone="positive"
      />,
    );

    expect(html).toContain("剩余额度");
    expect(html).toContain("42,000");
    expect(html).toContain("本周期可用");
    expect(html).toContain("+12%");
  });

  it("renders empty state with optional action", () => {
    const html = renderToStaticMarkup(
      <EmptyStateCard
        title="暂无数据"
        description="当前筛选条件下暂无结果"
        actionLabel="去创建"
        actionHref="/zh/account"
      />,
    );

    expect(html).toContain("暂无数据");
    expect(html).toContain("当前筛选条件下暂无结果");
    expect(html).toContain("去创建");
    expect(html).toContain("/zh/account");
  });
});
