# Subscription M1 验收清单

- [x] Homepage 支持推荐器交互并显示推荐方案
- [x] Account 驾驶舱展示下一步建议与最近活动
- [x] Admin 支持列表/卡片视图切换
- [x] 共享控制台布局与卡片密度样式可复用

## 验证命令

```bash
pnpm test
pnpm lint
```

## 手工冒烟路由

- `/{locale}`
- `/{locale}/account`
- `/{locale}/admin/users`
- `/{locale}/admin/orders`
