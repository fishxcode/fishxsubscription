[根目录](../CLAUDE.md) > **lib**

# lib 模块说明

## 变更记录 (Changelog)
- 2026-03-26 09:45:22 CST：初始化模块文档，补充认证、会话、数据库与账户聚合链路。

## 模块职责
`lib/` 是业务核心层，负责：
- 认证与会话（密码、登录标识解析、Redis session）
- 数据访问（本地 PostgreSQL + external new-api PostgreSQL）
- 账户控制台数据聚合（profile/subscriptions/orders）
- i18n 字典与 SEO 元数据生成

## 入口与启动
高优先入口：
- 认证：`lib/auth/users.ts`, `lib/auth/session.ts`, `lib/auth/validation.ts`
- 账户聚合：`lib/account-console.ts`, `lib/newapi-account.ts`, `lib/newapi-home.ts`
- 运行配置：`lib/env.ts`, `lib/postgres.ts`, `lib/redis.ts`, `lib/newapi-postgres.ts`

## 对外接口
- 认证：`authenticateUser`, `createUser`, `createSession`, `destroySession`, `getSession`
- 数据聚合：`getAccountConsoleData`, `getNewApiAccountSnapshot`, `getHomePricingPlans`
- i18n/SEO：`getDictionary`, `buildMetadata`, `buildPageMetadata`

## 关键依赖与配置
- PostgreSQL 驱动：`pg`
- Redis 客户端：`redis`
- 密码：`bcryptjs`
- 环境变量：
  - 必需：`DATABASE_URL`, `REDIS_URL`, `SESSION_SECRET`
  - 可选：`NEWAPI_DATABASE_URL`

## 数据模型
主要结构：
- `AuthUser` / `SessionPayload`（`lib/auth/types.ts`）
- External rows：`ExternalAccountRow`, `ExternalSubscriptionRow`, `ExternalOrderRow`
- 首页套餐模型：`HomePricingPlan`

## 测试与质量
- 未发现 lib 层自动化测试
- 代码质量依赖：
  - TypeScript 严格模式
  - 集中错误映射（`lib/auth/http.ts`）
  - 会话 token HMAC 与 Redis TTL 控制

## 常见问题 (FAQ)
1. **本地用户与 external 用户如何共存？**
   - 登录优先尝试 external（若配置 NEWAPI_DATABASE_URL），否则回退本地 users。
2. **会话为何使用 Redis 而非 JWT？**
   - 当前实现采用服务端可撤销会话，便于统一失效与控制 TTL。
3. **套餐数据来源在哪里？**
   - 来自 `subscription_plans`，若无数据则回退字典内默认套餐。

## 相关文件清单
- `lib/env.ts`
- `lib/postgres.ts`
- `lib/newapi-postgres.ts`
- `lib/redis.ts`
- `lib/auth/types.ts`
- `lib/auth/password.ts`
- `lib/auth/validation.ts`
- `lib/auth/http.ts`
- `lib/auth/session.ts`
- `lib/auth/users.ts`
- `lib/newapi-account.ts`
- `lib/newapi-home.ts`
- `lib/account-console.ts`
- `lib/i18n.ts`
- `lib/seo.ts`
- `lib/utils.ts`

## 变更记录 (Changelog)
- 2026-03-26 09:45:22 CST：完成模块初始化文档。
