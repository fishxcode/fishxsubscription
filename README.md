# FishXCode AI Subscription

FishXCode AI 订阅网站基础工程。

## 技术栈

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui 风格基础组件
- framer-motion
- lucide-react
- PostgreSQL
- Redis

## 已完成的基础搭建

- App Router 基础结构
- 深暖棕 + 提亮金品牌配色
- 首页 Hero 与套餐展示骨架
- 深色 / 浅色主题切换
- 中英文国际化路由结构
- 基础 SEO（metadata / robots / sitemap）
- 可复用基础 UI 组件
- 环境变量读取与校验
- PostgreSQL / Redis 接入层占位

## 启动方式

1. 安装依赖

```bash
pnpm install
```

2. 配置环境变量

参考 [`.env.example`](/Users/admin/Developer/fishxcode/new-api/subscription/.env.example) 创建 `.env.local`

3. 启动开发环境

```bash
pnpm dev
```

4. 生产构建校验

```bash
pnpm build
```

## 下一步建议

- 接入认证
- 设计订阅套餐数据模型
- 接入支付与订单
- 增加用户中心与管理后台
