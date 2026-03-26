# Subscription M1 三端重构 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 `subscription` 项目完成 M1 级别的三端重构：首页转化漏斗、用户后台任务驾驶舱、管理后台 SaaS 骨架（含列表/卡片切换）。

**Architecture:** 采用“统一底座 + 三端分工”策略：先建立共享布局与设计 token，再分别落地首页（业务转化）、用户后台（任务效率）、管理后台（运营效率）。所有页面沿用 App Router，业务数据读取继续收敛在 `lib/*`。测试采用先补最小可运行测试底座，再按任务 TDD 推进。

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, lucide-react, framer-motion, pnpm, Vitest + Testing Library（本计划新增）

---

## Scope Check

该 spec 涵盖三个子系统（首页 / 用户后台 / 管理后台），但 M1 已定义统一底座与并行交付节奏，且三端共享组件与规范，适合放在一个计划中执行。若执行中发现管理后台需求进一步膨胀（审批流、复杂权限、多角色矩阵），应拆出单独二级计划。

### M1 范围口径（In / Out）

**In Scope（本计划必须交付）**
- 首页：七段漏斗结构、推荐器基础交互、信任背书与 FAQ 区块。
- 用户后台：驾驶舱布局、下一步建议模块、最近活动模块。
- 管理后台：SaaS 骨架、用户/订单页面、列表/卡片视图切换。
- 统一底座：共享控制台布局、KPI 卡片、空状态卡片、基础测试底座。

**Out of Scope（M1 明确不做）**
- 后台审批流、多角色权限矩阵、细粒度 RBAC。
- 真实生产数据联通（M1 管理端允许 mock 数据）。
- A/B 平台、增长实验平台化能力。
- 高级报表、复杂审计回放、自动化运维编排。

### 任务粒度策略（评审后修订）

- 每个任务按「测试先红 → 最小实现 → 静态检查/回归」三段执行。
- 页面改造任务必须拆为「组件层」与「页面接入层」两个可独立验收单元。
- 单任务变更尽量限制在单一业务目标，不跨任务混提，避免回滚耦合。

---

## File Structure（先定边界）

### Shared（统一底座）
- Create: `components/site/console-layout.tsx`（通用控制台布局骨架：侧边栏、顶部栏、内容区）
- Create: `components/site/status-kpi-card.tsx`（统一 KPI 卡片）
- Create: `components/site/empty-state-card.tsx`（统一空状态展示）
- Modify: `app/globals.css`（新增密度与层级 token，避免散落 class）
- Modify: `tailwind.config.ts`（补充控制台相关语义 token）

### Homepage（转化漏斗）
- Modify: `components/site/hero.tsx`（重排七段漏斗结构，收敛 CTA）
- Create: `components/site/home-pricing-recommender.tsx`（套餐推荐器）
- Create: `components/site/home-trust-section.tsx`（信任背书区）
- Create: `components/site/home-faq-section.tsx`（异议消解区）
- Modify: `app/[locale]/page.tsx`（聚合首页所需数据并下发）

### User Console（任务效率）
- Modify: `app/[locale]/account/page.tsx`（改为驾驶舱结构）
- Modify: `components/site/account-shell.tsx`（切换为常见 SaaS 控制台导航布局）
- Create: `components/site/account-next-actions.tsx`（下一步建议模块）
- Create: `components/site/account-recent-activity.tsx`（最近活动模块）
- Modify: `lib/account-console.ts`（补充驾驶舱所需聚合字段）

### Admin Console（管理后台）
- Create: `app/[locale]/admin/layout.tsx`（管理后台布局与鉴权入口）
- Create: `app/[locale]/admin/page.tsx`（管理后台首页）
- Create: `app/[locale]/admin/users/page.tsx`（用户管理页）
- Create: `app/[locale]/admin/orders/page.tsx`（订单管理页）
- Create: `components/admin/admin-sidebar.tsx`（管理侧边导航）
- Create: `components/admin/admin-topbar.tsx`（顶部栏）
- Create: `components/admin/admin-view-switcher.tsx`（列表/卡片切换）
- Create: `components/admin/admin-entity-list.tsx`（实体列表容器）
- Create: `components/admin/admin-entity-cards.tsx`（实体卡片容器）
- Create: `lib/admin/mock-data.ts`（M1 用 mock 队列数据）

### i18n / 文案
- Modify: `lib/i18n.ts`（补充首页新分段、后台新导航与状态文案）

### Testing Infra（新增最小测试底座）
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `tests/smoke/smoke.test.ts`
- Create: `tests/components/home-pricing-recommender.test.tsx`
- Create: `tests/components/account-next-actions.test.tsx`
- Create: `tests/components/admin-view-switcher.test.tsx`
- Create: `tests/pages/home-funnel.test.tsx`（首页7段与主CTA最小验收）
- Create: `tests/pages/account-cockpit.test.tsx`（驾驶舱关键区块验收）
- Create: `tests/pages/admin-shell.test.tsx`（后台壳层与路由级可达）
- Modify: `package.json`（新增 `test` / `test:watch` 脚本）

## 页面级验收测试映射（评审后补充）

| 页面/路由 | 核心验收点 | 自动化测试映射 | 手工验收动作 |
|---|---|---|---|
| `/{locale}` | 七段漏斗结构完整、主 CTA 可见、推荐器可返回结果 | `tests/components/home-pricing-recommender.test.tsx` + `tests/pages/home-funnel.test.tsx` | 打开首页并核对七段区块与 CTA 文案 |
| `/{locale}/account` | 驾驶舱核心状态可见、next actions 与 recent activity 可渲染 | `tests/components/account-next-actions.test.tsx` + `tests/pages/account-cockpit.test.tsx` | 进入用户后台核对状态卡与建议列表 |
| `/{locale}/admin/users` | 列表/卡片视图切换正常、壳层导航可用 | `tests/components/admin-view-switcher.test.tsx` + `tests/pages/admin-shell.test.tsx` | 在 users 页面执行视图切换并验证 UI 状态 |
| `/{locale}/admin/orders` | 订单页沿用管理壳层与视图切换行为一致 | 复用 `admin-view-switcher` 与 `admin-shell` 测试基线 | 在 orders 页面执行相同切换与筛选动作 |

---

## Task 1: 建立最小测试底座（先做，后续全任务TDD）

**Files:**
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `tests/smoke/smoke.test.ts`
- Modify: `package.json`
- Test: `pnpm test`

- [ ] **Step 1: 写失败测试样板（验证测试环境可运行）**

```ts
// tests/smoke/smoke.test.ts
import { describe, it, expect } from "vitest";

describe("smoke", () => {
  it("runs", () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 2: 运行测试确认失败（尚未配置 Vitest）**

Run: `pnpm test`
Expected: FAIL with script/config missing

- [ ] **Step 3: 写最小实现（配置 Vitest + jsdom）**

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
  },
});
```

- [ ] **Step 4: 再次运行测试确认通过**

Run: `pnpm test`
Expected: PASS with smoke test passed

- [ ] **Step 5: Commit**

```bash
git add package.json vitest.config.ts vitest.setup.ts tests/smoke/smoke.test.ts
git commit -m "test: add minimal vitest setup for m1 redesign"
```

---

## Task 2: 统一控制台布局与视觉底座

**Files:**
- Create: `components/site/console-layout.tsx`
- Create: `components/site/status-kpi-card.tsx`
- Create: `components/site/empty-state-card.tsx`
- Modify: `app/globals.css`
- Modify: `tailwind.config.ts`
- Test: `tests/components/console-layout.test.tsx`

- [ ] **Step 1: 写失败测试（布局渲染与关键区块存在）**

```tsx
// tests/components/console-layout.test.tsx
it("renders sidebar, topbar, content slots", () => {
  render(<ConsoleLayout sidebar={<div>a</div>} topbar={<div>b</div>}>c</ConsoleLayout>);
  expect(screen.getByText("a")).toBeInTheDocument();
  expect(screen.getByText("b")).toBeInTheDocument();
  expect(screen.getByText("c")).toBeInTheDocument();
});
```

- [ ] **Step 2: 运行单测确认失败（组件未实现）**

Run: `pnpm test tests/components/console-layout.test.tsx`
Expected: FAIL with module not found

- [ ] **Step 3: 写最小实现（仅完成骨架，不加额外抽象）**

```tsx
export function ConsoleLayout({ sidebar, topbar, children }: Props) {
  return <div className="console-grid">...</div>;
}
```

- [ ] **Step 4: 测试通过后补充 token（密度/层级）**

Run: `pnpm test tests/components/console-layout.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/site/console-layout.tsx components/site/status-kpi-card.tsx components/site/empty-state-card.tsx app/globals.css tailwind.config.ts tests/components/console-layout.test.tsx
git commit -m "feat: add shared console layout and visual tokens"
```

---

## Task 3: 首页 M1 重构（七段漏斗 + 推荐器）

**Files:**
- Modify: `components/site/hero.tsx`
- Create: `components/site/home-pricing-recommender.tsx`
- Create: `components/site/home-trust-section.tsx`
- Create: `components/site/home-faq-section.tsx`
- Modify: `app/[locale]/page.tsx`
- Modify: `lib/i18n.ts`
- Test: `tests/components/home-pricing-recommender.test.tsx`

- [ ] **Step 1: 写失败测试（推荐器输入→推荐输出）**

```tsx
it("recommends plan by budget and usage", () => {
  render(<HomePricingRecommender plans={plans} dictionary={dict} />);
  userEvent.selectOptions(screen.getByLabelText(/预算/i), "mid");
  userEvent.click(screen.getByRole("button", { name: /推荐/i }));
  expect(screen.getByText(/Pro/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: 运行单测确认失败**

Run: `pnpm test tests/components/home-pricing-recommender.test.tsx`
Expected: FAIL with component missing

- [ ] **Step 3: 最小实现推荐器与首页七段结构接入**

```tsx
// hero.tsx
<HomePricingRecommender ... />
<HomeTrustSection ... />
<HomeFaqSection ... />
```

- [ ] **Step 4: 运行测试与 lint**

Run: `pnpm test tests/components/home-pricing-recommender.test.tsx && pnpm lint`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/site/hero.tsx components/site/home-pricing-recommender.tsx components/site/home-trust-section.tsx components/site/home-faq-section.tsx app/[locale]/page.tsx lib/i18n.ts tests/components/home-pricing-recommender.test.tsx
git commit -m "feat: rebuild homepage funnel with plan recommender"
```

---

## Task 4: 用户后台 M1 重构（驾驶舱 + 下一步建议）

**Files:**
- Modify: `app/[locale]/account/page.tsx`
- Modify: `components/site/account-shell.tsx`
- Create: `components/site/account-next-actions.tsx`
- Create: `components/site/account-recent-activity.tsx`
- Modify: `lib/account-console.ts`
- Modify: `lib/i18n.ts`
- Test: `tests/components/account-next-actions.test.tsx`

- [ ] **Step 1: 写失败测试（根据状态渲染 next actions）**

```tsx
it("shows renew action when subscription near expiration", () => {
  render(<AccountNextActions model={nearExpiryModel} dictionary={dict} />);
  expect(screen.getByText(/续费/i)).toBeInTheDocument();
});
```

- [ ] **Step 2: 运行单测确认失败**

Run: `pnpm test tests/components/account-next-actions.test.tsx`
Expected: FAIL with module not found

- [ ] **Step 3: 最小实现组件与数据聚合字段**

```ts
// lib/account-console.ts
nextActions: [{ type: "renew", priority: "high", href: ... }]
```

- [ ] **Step 4: 运行测试 + 页面冒烟校验**

Run: `pnpm test tests/components/account-next-actions.test.tsx && pnpm lint`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/[locale]/account/page.tsx components/site/account-shell.tsx components/site/account-next-actions.tsx components/site/account-recent-activity.tsx lib/account-console.ts lib/i18n.ts tests/components/account-next-actions.test.tsx
git commit -m "feat: redesign account console as task-driven cockpit"
```

---

## Task 5: 管理后台 M1 首次落地（SaaS 骨架 + 列表/卡片切换）

> 范围口径：M1 核心对象页仅包含 `users` 与 `orders`；`subscriptions/risk/tickets` 延后到 M2。

**Files:**
- Create: `app/[locale]/admin/layout.tsx`
- Create: `app/[locale]/admin/page.tsx`
- Create: `app/[locale]/admin/users/page.tsx`
- Create: `app/[locale]/admin/orders/page.tsx`
- Create: `components/admin/admin-sidebar.tsx`
- Create: `components/admin/admin-topbar.tsx`
- Create: `components/admin/admin-view-switcher.tsx`
- Create: `components/admin/admin-entity-list.tsx`
- Create: `components/admin/admin-entity-cards.tsx`
- Create: `lib/admin/mock-data.ts`
- Modify: `lib/i18n.ts`
- Test: `tests/components/admin-view-switcher.test.tsx`

- [ ] **Step 1: 写失败测试（视图切换状态）**

```tsx
it("toggles between list and card view", async () => {
  render(<AdminViewSwitcher defaultView="list" />);
  await userEvent.click(screen.getByRole("button", { name: /卡片/i }));
  expect(screen.getByTestId("view-mode")).toHaveTextContent("card");
});
```

- [ ] **Step 2: 运行单测确认失败**

Run: `pnpm test tests/components/admin-view-switcher.test.tsx`
Expected: FAIL

- [ ] **Step 3: 最小实现后台页面与 mock 数据驱动**

```tsx
// app/[locale]/admin/users/page.tsx
<AdminEntityList ... />
<AdminEntityCards ... />
```

- [ ] **Step 4: 运行测试与静态检查**

Run: `pnpm test tests/components/admin-view-switcher.test.tsx && pnpm lint`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/[locale]/admin components/admin lib/admin/mock-data.ts lib/i18n.ts tests/components/admin-view-switcher.test.tsx
git commit -m "feat: add admin console skeleton with list-card view switching"
```

---

## 任务粒度修订（评审后）

为满足 2–5 分钟粒度与可回滚性，Task 3/4/5 在执行时拆分为以下子任务序列：

- Task 3A: 推荐器测试与最小实现
- Task 3B: 首页接入推荐器与主 CTA 收敛
- Task 3C: 首页文案/i18n补齐与回归
- Task 4A: next-actions 组件与测试
- Task 4B: recent-activity 组件与测试
- Task 4C: account 页面接入与聚合层字段
- Task 5A: admin shell 与路由骨架
- Task 5B: users/orders 双视图切换
- Task 5C: 数据层mock与页面回归

每个子任务 DoD（前移门槛）：
1. 目标测试 PASS
2. 相关页面可渲染
3. 无新增 lint error

---

## Task 6: M1 验收与回归

**Files:**
- Modify: `README.md`（补充 M1 页面导航与本地验证说明）
- Create: `docs/superpowers/specs/2026-03-26-subscription-three-surfaces-m1-acceptance.md`
- Test: 全量 lint + 关键测试

- [ ] **Step 1: 写验收清单文档（先写再验收）**

```md
- Homepage funnel renders all 7 sections
- Account cockpit shows next actions
- Admin supports list/card switch
```

- [ ] **Step 2: 运行完整验证命令**

Run: `pnpm lint && pnpm test`
Expected: PASS

- [ ] **Step 3: 手工冒烟（3条路由）**

Run: `pnpm dev`
Check:
- `/{locale}`
- `/{locale}/account`
- `/{locale}/admin/users`

- [ ] **Step 4: Commit**

```bash
git add README.md docs/superpowers/specs/2026-03-26-subscription-three-surfaces-m1-acceptance.md
git commit -m "docs: add m1 acceptance checklist and verification notes"
```

---

## Execution Rules

- 强制遵循 @superpowers:test-driven-development：每个任务先红后绿。
- 每个任务结束前执行 @superpowers:verification-before-completion。
- 避免一次性大改；按任务拆分，小步提交。
- 不做超出 M1 的功能（YAGNI）。

---

## Rollback Strategy

- 任一任务引入高风险回归时，仅回滚该任务提交。
- 不跨任务混提，确保回滚粒度可控。
- 后台新模块（`app/[locale]/admin/*`）可通过路由移除快速熔断。
