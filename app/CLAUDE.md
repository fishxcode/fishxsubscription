[根目录](../CLAUDE.md) > **app**

# app 模块说明

## 变更记录 (Changelog)
- 2026-03-26 09:45:22 CST：初始化模块文档，补充路由、接口、SEO 与账户子路由结构。

## 模块职责
`app/` 承载 Next.js App Router 路由层，负责：
- 页面入口与 locale 路由分发
- 登录/注册/退出 API Route
- 账户中心多页面编排
- sitemap / robots 元数据导出

## 入口与启动
- 全局布局：`app/layout.tsx`
- 首页重定向：`app/page.tsx`（重定向到默认 locale）
- 语言布局：`app/[locale]/layout.tsx`
- 主页面入口：`app/[locale]/page.tsx`

## 对外接口
- `POST /api/auth/login` -> `app/api/auth/login/route.ts`
- `POST /api/auth/register` -> `app/api/auth/register/route.ts`
- `POST /api/auth/logout` -> `app/api/auth/logout/route.ts`
- SEO 接口：`app/sitemap.ts`, `app/robots.ts`

## 关键依赖与配置
- Next.js Metadata API（各页面 `generateMetadata`）
- `cookies()` 触发动态渲染（认证/账户/套餐页）
- i18n 路由约束：仅支持 `zh` 与 `en`

## 数据模型
本模块不定义持久化模型，主要消费 `lib/account-console.ts` 聚合结果：
- `session`
- `profile`
- `subscriptions`
- `orders`

## 测试与质量
- 未发现 app 层测试文件
- 当前质量防线依赖：TypeScript + ESLint + 页面内重定向/notFound 守卫

## 常见问题 (FAQ)
1. **为什么大量页面标记 `force-dynamic`？**
   - 因依赖 cookies 与实时账户数据，避免静态缓存导致登录态错位。
2. **无效 locale 怎么处理？**
   - 布局与页面层会 `redirect` 或 `notFound`，统一收口。
3. **认证失败返回结构是否统一？**
   - 统一为 `{ ok: false, message }`，由 `lib/auth/http.ts` 生成。

## 相关文件清单
- `app/layout.tsx`
- `app/page.tsx`
- `app/[locale]/layout.tsx`
- `app/[locale]/page.tsx`
- `app/[locale]/auth/page.tsx`
- `app/[locale]/pricing/page.tsx`
- `app/[locale]/pricing/[planId]/page.tsx`
- `app/[locale]/account/layout.tsx`
- `app/[locale]/account/page.tsx`
- `app/[locale]/account/profile/page.tsx`
- `app/[locale]/account/subscriptions/page.tsx`
- `app/[locale]/account/orders/page.tsx`
- `app/api/auth/login/route.ts`
- `app/api/auth/register/route.ts`
- `app/api/auth/logout/route.ts`
- `app/sitemap.ts`
- `app/robots.ts`

## 变更记录 (Changelog)
- 2026-03-26 09:45:22 CST：完成模块初始化文档。
