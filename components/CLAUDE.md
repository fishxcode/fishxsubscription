[根目录](../CLAUDE.md) > **components**

# components 模块说明

## 变更记录 (Changelog)
- 2026-03-26 09:45:22 CST：初始化模块文档，补充 site/ui 组件分层与关键交互。

## 模块职责
`components/` 负责视图组件实现，分为：
- `components/site/`：业务场景组件（首页 Hero、账号壳层、认证表单、站点工具条）
- `components/ui/`：可复用基础 UI（button/card/input/badge）

## 入口与启动
该模块无独立启动入口，由 `app/*` 页面按需导入。
高频入口组件：
- `components/site/hero.tsx`
- `components/site/auth-form.tsx`
- `components/site/account-shell.tsx`

## 对外接口
组件接口以 props 形式暴露，关键组件：
- `Hero({ locale, dictionary, session, plans })`
- `AuthForm({ locale, dictionary, initialMode })`
- `AccountShell({ locale, dictionary, session, profile, children })`
- `PageToolbar(...)`, `SiteHeader(...)`, `LogoutButton(...)`

## 关键依赖与配置
- UI 动效：`framer-motion`
- 图标：`lucide-react`
- 样式：Tailwind + 主题变量（与 `app/globals.css`、`tailwind.config.ts` 协同）

## 数据模型
组件层无数据库模型，主要消费：
- i18n 字典对象 `HomeDictionary`
- 会话 `SessionPayload`
- 套餐视图模型 `HomePricingPlan`

## 测试与质量
- 未发现组件测试文件
- 依赖类型系统与 ESLint 保证 props 与 JSX 结构稳定

## 常见问题 (FAQ)
1. **为何 site 与 ui 分层？**
   - `ui` 保持纯展示基础件，`site` 聚合业务语义与路由行为。
2. **认证表单校验放哪层？**
   - 前端初筛在 `auth-form.tsx`，服务端最终校验在 API Route。
3. **主题切换如何落地？**
   - `theme-script.tsx` + `theme-toggle.tsx` 协同，依赖 CSS 变量。

## 相关文件清单
- `components/site/hero.tsx`
- `components/site/auth-form.tsx`
- `components/site/account-shell.tsx`
- `components/site/site-header.tsx`
- `components/site/page-toolbar.tsx`
- `components/site/logout-button.tsx`
- `components/site/theme-toggle.tsx`
- `components/site/theme-script.tsx`
- `components/site/locale-switcher.tsx`
- `components/ui/button.tsx`
- `components/ui/card.tsx`
- `components/ui/input.tsx`
- `components/ui/badge.tsx`

## 变更记录 (Changelog)
- 2026-03-26 09:45:22 CST：完成模块初始化文档。
