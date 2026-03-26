export const locales = ["zh", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "zh";

export function isSupportedLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export type HomeDictionary = {
  localeLabel: string;
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  header: {
    brand: string;
    foundation: string;
    preview: string;
    signIn: string;
    account: string;
    localeSwitcherLabel: string;
  };
  controls: {
    theme: {
      light: string;
      dark: string;
      system: string;
      switchTo: string;
    };
    locale: {
      zh: string;
      en: string;
    };
  };
  hero: {
    badge: string;
    titlePrefix: string;
    titleHighlight: string;
    titleSuffix: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    tertiaryCta: string;
    salesTitle: string;
    salesDescription: string;
    brandTitle: string;
    brandDescription: string;
    consoleTitle: string;
    consoleDescription: string;
    featuredTitle: string;
    featuredDescription: string;
  };
  auth: {
    meta: {
      title: string;
      description: string;
    };
    badge: string;
    title: string;
    description: string;
    loginTab: string;
    registerTab: string;
    nameLabel: string;
    emailLabel: string;
    loginIdentifierLabel: string;
    passwordLabel: string;
    submitLogin: string;
    submitRegister: string;
    successLogin: string;
    successRegister: string;
    footerLogin: string;
    footerRegister: string;
    switchToLogin: string;
    switchToRegister: string;
    networkError: string;
    genericError: string;
    emailPlaceholder: string;
    loginIdentifierPlaceholder: string;
    passwordPlaceholder: string;
    validation: {
      nameRequired: string;
      emailInvalid: string;
      loginIdentifierInvalid: string;
      passwordShort: string;
    };
  };
  account: {
    meta: {
      title: string;
      description: string;
    };
    badge: string;
    title: string;
    description: string;
    sessionTitle: string;
    sessionDescription: string;
    logout: string;
    logoutPending: string;
    logoutError: string;
    signedInAs: string;
    displayName: string;
    memberSince: string;
    sessionStatus: string;
    sessionActive: string;
    backHome: string;
    profileTitle: string;
    profileDescription: string;
    userId: string;
    username: string;
    userGroup: string;
    accountRole: string;
    accountStatusLabel: string;
    usageTitle: string;
    usageDescription: string;
    totalQuota: string;
    usedQuota: string;
    remainingQuota: string;
    requestCount: string;
    subscriptionsTitle: string;
    subscriptionsDescription: string;
    ordersTitle: string;
    ordersDescription: string;
    planName: string;
    planPrice: string;
    billingCycle: string;
    planStatus: string;
    planPeriod: string;
    planQuota: string;
    source: string;
    emptySubscriptions: string;
    emptyOrders: string;
    orderAmount: string;
    paymentMethod: string;
    createdAt: string;
    completedAt: string;
    unavailable: string;
    statusActive: string;
    statusInactive: string;
    roleAdmin: string;
    roleUser: string;
    navOverview: string;
    navProfile: string;
    navSubscriptions: string;
    navOrders: string;
    navUsage: string;
    navSecurity: string;
    overviewTitle: string;
    overviewDescription: string;
    cockpitTitle: string;
    cockpitDescription: string;
    currentCycleTitle: string;
    currentCycleDescription: string;
    nextActionsTitle: string;
    nextActionsDescription: string;
    nextActionsEmpty: string;
    nextActionCta: string;
    nextPriorityHigh: string;
    nextPriorityMedium: string;
    nextPriorityLow: string;
    nextSubscribeTitle: string;
    nextSubscribeDescription: string;
    nextRenewTitle: string;
    nextRenewDescription: string;
    nextOrderTitle: string;
    nextOrderDescription: string;
    nextUpgradeTitle: string;
    nextUpgradeDescription: string;
    nextManageTitle: string;
    nextManageDescription: string;
    forecastTitle: string;
    forecastDescription: string;
    forecastRiskLow: string;
    forecastRiskMedium: string;
    forecastRiskHigh: string;
    forecastEmpty: string;
    recoveryTitle: string;
    recoveryDescription: string;
    recoveryPaymentTitle: string;
    recoveryPaymentDescription: string;
    recoverySubscriptionTitle: string;
    recoverySubscriptionDescription: string;
    recoverySecurityTitle: string;
    recoverySecurityDescription: string;
    recentActivityTitle: string;
    recentActivityDescription: string;
    recentActivityEmpty: string;
    recentSubscriptionTitle: string;
    recentOrderTitle: string;
    recentSessionTitle: string;
    recentSessionDescription: string;
    profilePageTitle: string;
    profilePageDescription: string;
    subscriptionsPageTitle: string;
    subscriptionsPageDescription: string;
    ordersPageTitle: string;
    ordersPageDescription: string;
  };
  pricing: {
    meta: {
      title: string;
      description: string;
    };
    eyebrow: string;
    title: string;
    description: string;
    badge: string;
    cycle: string;
    activeStatus: string;
    inactiveStatus: string;
    viewAll: string;
    featuredBadge: string;
    availableGroupTitle: string;
    availableGroupDescription: string;
    archivedGroupTitle: string;
    archivedGroupDescription: string;
    emptyTitle: string;
    filterAll: string;
    filterAvailable: string;
    filterArchived: string;
    filterGroupLabel: string;
    filterStatusLabel: string;
    detailCta: string;
    detailMetaTitle: string;
    detailMetaDescription: string;
    detailStatus: string;
    detailGroup: string;
    detailActionTitle: string;
    detailActionDescription: string;
    detailPrimaryCta: string;
    detailSecondaryCta: string;
  };
  plans: Array<{
    title: string;
    price: string;
    description: string;
  }>;
};

const dictionaries: Record<Locale, HomeDictionary> = {
  zh: {
    localeLabel: "简体中文",
    meta: {
      title: "FishXCode AI 官方订阅与账户中心",
      description:
        "查看 FishXCode AI 官方套餐、比较订阅方案，并在登录后统一管理订单、订阅状态与账户配额。",
      keywords: [
        "FishXCode AI",
        "FishXCode AI 套餐",
        "AI 套餐",
        "AI 订阅",
        "Codex 套餐",
        "Claude 套餐",
        "账户中心",
      ],
    },
    header: {
      brand: "FishXCode AI",
      foundation: "Subscription Platform Foundation",
      preview: "控制台预览",
      signIn: "登录",
      account: "账户",
      localeSwitcherLabel: "切换站点语言",
    },
    controls: {
      theme: {
        light: "浅色",
        dark: "深色",
        system: "跟随系统",
        switchTo: "切换到",
      },
      locale: {
        zh: "中文",
        en: "English",
      },
    },
    hero: {
      badge: "FishXCode AI 官方订阅入口",
      titlePrefix: "购买",
      titleHighlight: "FishXCode AI",
      titleSuffix: "并统一管理你的套餐、订单与账户配额。",
      description:
        "从日卡到月度套餐，按使用强度选择合适方案。登录后可进入账户中心查看已购套餐、订单记录、剩余额度与账号状态。",
      primaryCta: "登录进入控制台",
      secondaryCta: "查看推荐套餐",
      tertiaryCta: "查看全部套餐",
      salesTitle: "套餐选择更直接",
      salesDescription: "首页先展示推荐套餐，完整目录页再承接 20+ 套餐的筛选与比较。",
      brandTitle: "官方入口更清晰",
      brandDescription: "统一承接 FishXCode AI 的订阅展示、账号识别与后续下单链路。",
      consoleTitle: "登录后立即可管",
      consoleDescription: "进入账户中心后，继续查看订阅、订单记录、账户信息与配额状态。",
      featuredTitle: "推荐套餐",
      featuredDescription: "先从核心热销套餐开始，再进入完整套餐页比较所有方案。",
    },
    auth: {
      meta: {
        title: "登录或注册",
        description: "使用邮箱和密码创建 FishXCode AI 账户并进入订阅平台。",
      },
      badge: "认证中心",
      title: "登录你的 FishXCode AI 账户",
      description: "当前版本提供邮箱密码注册、登录、登出与 Redis 会话管理，后续会在此基础上扩展订单与订阅能力。",
      loginTab: "登录",
      registerTab: "注册",
      nameLabel: "昵称",
      emailLabel: "邮箱地址",
      loginIdentifierLabel: "邮箱地址 / 用户ID",
      passwordLabel: "密码",
      submitLogin: "登录并进入账户",
      submitRegister: "创建账户",
      successLogin: "登录成功，正在跳转到账户页。",
      successRegister: "注册成功，正在创建会话并跳转。",
      footerLogin: "还没有账户？",
      footerRegister: "已经有账户？",
      switchToLogin: "去登录",
      switchToRegister: "去注册",
      networkError: "服务暂时不可用，请稍后再试。",
      genericError: "认证失败，请稍后重试。",
      emailPlaceholder: "name@example.com",
      loginIdentifierPlaceholder: "邮箱 / 用户ID / 123@fishxcode.com",
      passwordPlaceholder: "请输入密码",
      validation: {
        nameRequired: "请输入昵称。",
        emailInvalid: "请输入有效邮箱地址。",
        loginIdentifierInvalid: "请输入有效邮箱、用户ID，或 ID@fishxcode.com。",
        passwordShort: "密码至少需要 8 位。",
      },
    },
    account: {
      meta: {
        title: "账户中心",
        description: "查看当前登录状态、FishXCode 账户资料和已订购套餐。",
      },
      badge: "账户中心",
      title: "你的 FishXCode 控制台概览",
      description: "这里展示当前登录资料、NewAPI 账户信息、套餐状态和最近订单，便于你快速确认账号是否已经接通。",
      sessionTitle: "当前会话",
      sessionDescription: "会话仍由本站 Redis 管理，账户资料和套餐信息来自 FishXCode 用户体系。",
      logout: "退出登录",
      logoutPending: "退出中...",
      logoutError: "退出失败，请稍后重试。",
      signedInAs: "当前登录邮箱",
      displayName: "显示名称",
      memberSince: "注册时间",
      sessionStatus: "会话状态",
      sessionActive: "有效",
      backHome: "返回首页",
      profileTitle: "FishXCode 账户资料",
      profileDescription: "当前登录用户在 FishXCode / NewAPI 中的基础身份信息。",
      userId: "用户 ID",
      username: "用户名",
      userGroup: "用户组",
      accountRole: "账户角色",
      accountStatusLabel: "账户状态",
      usageTitle: "配额与调用概览",
      usageDescription: "直接读取当前账号剩余额度和累计请求数据。",
      totalQuota: "总配额",
      usedQuota: "已用配额",
      remainingQuota: "剩余配额",
      requestCount: "请求次数",
      subscriptionsTitle: "当前订阅套餐",
      subscriptionsDescription: "展示你已经生效或历史存在的套餐记录。",
      ordersTitle: "最近订单",
      ordersDescription: "最近几笔订购记录会显示在这里，用于核对支付状态。",
      planName: "套餐",
      planPrice: "价格",
      billingCycle: "周期",
      planStatus: "状态",
      planPeriod: "有效期",
      planQuota: "套餐额度",
      source: "来源",
      emptySubscriptions: "当前没有可展示的订阅记录。",
      emptyOrders: "当前没有可展示的订单记录。",
      orderAmount: "订单金额",
      paymentMethod: "支付方式",
      createdAt: "创建时间",
      completedAt: "完成时间",
      unavailable: "暂无",
      statusActive: "有效",
      statusInactive: "未启用",
      roleAdmin: "管理员",
      roleUser: "普通用户",
      navOverview: "概览",
      navProfile: "账户资料",
      navSubscriptions: "我的套餐",
      navOrders: "订单记录",
      navUsage: "用量与账单",
      navSecurity: "安全与会话",
      overviewTitle: "账户总览",
      overviewDescription: "从一个更清晰的视角查看账号状态、有效套餐和最近订单，不再把所有信息堆在同一屏里。",
      cockpitTitle: "今日驾驶舱",
      cockpitDescription: "聚焦本周期状态、下一步建议与最近活动，优先处理高影响任务。",
      currentCycleTitle: "本周期状态",
      currentCycleDescription: "实时展示你的订阅状态、剩余额度和订单信号。",
      nextActionsTitle: "下一步建议",
      nextActionsDescription: "系统根据账户状态给出优先处理动作。",
      nextActionsEmpty: "当前没有待处理事项。",
      nextActionCta: "立即处理",
      nextPriorityHigh: "高优先级",
      nextPriorityMedium: "中优先级",
      nextPriorityLow: "低优先级",
      nextSubscribeTitle: "开通首个套餐",
      nextSubscribeDescription: "当前没有有效订阅，先选择一个适合你的套餐。",
      nextRenewTitle: "续费即将到期的套餐",
      nextRenewDescription: "当前套餐即将到期，建议提前续费避免服务中断。",
      nextOrderTitle: "处理未完成订单",
      nextOrderDescription: "存在未完成支付的订单，请尽快核对状态。",
      nextUpgradeTitle: "升级套餐以获取更多额度",
      nextUpgradeDescription: "剩余额度偏低，建议升级套餐保障连续使用。",
      nextManageTitle: "检查当前套餐与配额",
      nextManageDescription: "当前状态正常，可按需查看套餐和订单详情。",
      forecastTitle: "额度预测",
      forecastDescription: "基于本周期使用速度，预估剩余额度可持续天数。",
      forecastRiskLow: "风险低",
      forecastRiskMedium: "风险中",
      forecastRiskHigh: "风险高",
      forecastEmpty: "当前数据不足，暂无法预测。",
      recoveryTitle: "异常恢复",
      recoveryDescription: "当订单、订阅或会话状态异常时，从这里快速恢复。",
      recoveryPaymentTitle: "重试失败支付",
      recoveryPaymentDescription: "检测到失败订单，建议立即重试支付或切换支付方式。",
      recoverySubscriptionTitle: "恢复订阅状态",
      recoverySubscriptionDescription: "订阅状态异常，请前往订阅页检查并恢复。",
      recoverySecurityTitle: "检查账户安全",
      recoverySecurityDescription: "建议定期检查会话与账户信息，确保持续可用。",
      recentActivityTitle: "最近活动",
      recentActivityDescription: "按时间顺序回顾近期订阅、订单与会话变化。",
      recentActivityEmpty: "暂无活动记录。",
      recentSubscriptionTitle: "订阅已更新",
      recentOrderTitle: "订单状态变更",
      recentSessionTitle: "会话已建立",
      recentSessionDescription: "你已登录并可继续管理账户。",
      profilePageTitle: "账户资料",
      profilePageDescription: "这里聚合你的基础身份信息和当前会话信息，适合作为个人中心主页的一部分。",
      subscriptionsPageTitle: "我的套餐",
      subscriptionsPageDescription: "集中查看所有订阅记录、周期、额度和生效区间。",
      ordersPageTitle: "订单记录",
      ordersPageDescription: "集中查看你的最近订单、支付方式和完成状态。",
    },
    pricing: {
      meta: {
        title: "FishXCode AI 套餐列表",
        description: "查看 FishXCode AI 全部官方套餐，筛选在售与停售方案，并进入详情页继续比较。",
      },
      eyebrow: "Pricing Snapshot",
      title: "FishXCode AI 套餐目录",
      description:
        "这里集中展示全部官方套餐，你可以按产品线和销售状态筛选，并继续进入详情页比较差异。",
      badge: "套餐中心",
      cycle: "/ month",
      activeStatus: "在售",
      inactiveStatus: "停售",
      viewAll: "查看全部套餐",
      featuredBadge: "精选",
      availableGroupTitle: "在售套餐",
      availableGroupDescription: "这些套餐当前仍然可购买，应作为首页与转化链路的主展示对象。",
      archivedGroupTitle: "停售套餐",
      archivedGroupDescription: "这些套餐已停止销售，但历史用户仍可能继续使用或用于对照旧方案。",
      emptyTitle: "当前没有可展示的套餐。",
      filterAll: "全部",
      filterAvailable: "仅看在售",
      filterArchived: "仅看停售",
      filterGroupLabel: "产品线",
      filterStatusLabel: "状态",
      detailCta: "查看详情",
      detailMetaTitle: "套餐详情",
      detailMetaDescription: "查看套餐状态、周期和购买入口。",
      detailStatus: "套餐状态",
      detailGroup: "产品线",
      detailActionTitle: "下一步",
      detailActionDescription: "登录后可以继续进入账户中心查看订阅，后续可在这里接入真正的下单与支付。",
      detailPrimaryCta: "登录后继续",
      detailSecondaryCta: "返回套餐列表",
    },
    plans: [
      {
        title: "Starter",
        price: "¥49",
        description: "适合个人开发者快速接入 AI 能力，低门槛上线。",
      },
      {
        title: "Scale",
        price: "¥199",
        description: "适合小团队统一管理订阅、配额和调用明细。",
      },
      {
        title: "Enterprise",
        price: "定制",
        description: "支持独立结算、风控策略和更高 SLA 要求。",
      },
    ],
  },
  en: {
    localeLabel: "English",
    meta: {
      title: "FishXCode AI official plans and account center",
      description:
        "Browse official FishXCode AI plans, compare subscription options, and manage orders, subscriptions, and quota after sign-in.",
      keywords: [
        "FishXCode AI",
        "AI subscription",
        "FishXCode AI pricing",
        "AI plans",
        "Codex plans",
        "Claude plans",
        "account center",
      ],
    },
    header: {
      brand: "FishXCode AI",
      foundation: "Subscription Platform Foundation",
      preview: "Preview Console",
      signIn: "Sign In",
      account: "Account",
      localeSwitcherLabel: "Switch site language",
    },
    controls: {
      theme: {
        light: "Light",
        dark: "Dark",
        system: "System",
        switchTo: "Switch to ",
      },
      locale: {
        zh: "中文",
        en: "English",
      },
    },
    hero: {
      badge: "Official FishXCode AI subscription entry",
      titlePrefix: "Get",
      titleHighlight: "FishXCode AI",
      titleSuffix: "and manage your plans, orders, and quota in one place.",
      description:
        "Choose from day passes to monthly subscriptions based on how heavily you use the service. After sign-in, the account center gives you plan status, orders, remaining quota, and account details.",
      primaryCta: "Sign in to console",
      secondaryCta: "View recommended plans",
      tertiaryCta: "Browse all plans",
      salesTitle: "A cleaner buying path",
      salesDescription: "The home page focuses on recommended plans, while the full catalog handles deeper filtering across 20+ options.",
      brandTitle: "A clearer official entry",
      brandDescription: "This site acts as the official FishXCode AI subscription and account surface for plan discovery and sign-in.",
      consoleTitle: "A useful post-login destination",
      consoleDescription: "After authentication, users can immediately review subscriptions, orders, profile data, and quota status.",
      featuredTitle: "Recommended plans",
      featuredDescription: "Start with the core best-selling plans, then move into the full catalog when you need broader comparison.",
    },
    auth: {
      meta: {
        title: "Sign in or register",
        description: "Create your FishXCode AI account with email and password.",
      },
      badge: "Authentication",
      title: "Access your FishXCode AI account",
      description: "This first version includes email-password registration, login, logout, and Redis-backed sessions as the baseline for subscription workflows.",
      loginTab: "Sign In",
      registerTab: "Register",
      nameLabel: "Display name",
      emailLabel: "Email address",
      loginIdentifierLabel: "Email / User ID",
      passwordLabel: "Password",
      submitLogin: "Sign in to account",
      submitRegister: "Create account",
      successLogin: "Signed in successfully. Redirecting to your account.",
      successRegister: "Account created successfully. Redirecting now.",
      footerLogin: "Need an account?",
      footerRegister: "Already have an account?",
      switchToLogin: "Sign in",
      switchToRegister: "Register",
      networkError: "The service is temporarily unavailable. Please try again later.",
      genericError: "Authentication failed. Please try again.",
      emailPlaceholder: "name@example.com",
      loginIdentifierPlaceholder: "Email / User ID / 123@fishxcode.com",
      passwordPlaceholder: "Enter your password",
      validation: {
        nameRequired: "Please enter a display name.",
        emailInvalid: "Please enter a valid email address.",
        loginIdentifierInvalid: "Please enter a valid email, user ID, or ID@fishxcode.com.",
        passwordShort: "Password must be at least 8 characters.",
      },
    },
    account: {
      meta: {
        title: "Account",
        description: "View your authenticated session, FishXCode account profile, and subscribed plans.",
      },
      badge: "Account Center",
      title: "Your FishXCode console overview",
      description: "This page shows your signed-in profile, NewAPI account details, subscription status, and recent orders in one place.",
      sessionTitle: "Current session",
      sessionDescription: "The session is still managed by this site via Redis, while account and plan data come from FishXCode.",
      logout: "Sign out",
      logoutPending: "Signing out...",
      logoutError: "Sign-out failed. Please try again.",
      signedInAs: "Signed in as",
      displayName: "Display name",
      memberSince: "Member since",
      sessionStatus: "Session status",
      sessionActive: "Active",
      backHome: "Back home",
      profileTitle: "FishXCode account profile",
      profileDescription: "Base identity details from your FishXCode / NewAPI account.",
      userId: "User ID",
      username: "Username",
      userGroup: "User group",
      accountRole: "Role",
      accountStatusLabel: "Account status",
      usageTitle: "Quota and usage overview",
      usageDescription: "Live quota, remaining balance, and request counters for this account.",
      totalQuota: "Total quota",
      usedQuota: "Used quota",
      remainingQuota: "Remaining quota",
      requestCount: "Request count",
      subscriptionsTitle: "Current subscriptions",
      subscriptionsDescription: "Your active and historical plan records appear here.",
      ordersTitle: "Recent orders",
      ordersDescription: "Recent purchases are shown here so you can verify payment status.",
      planName: "Plan",
      planPrice: "Price",
      billingCycle: "Cycle",
      planStatus: "Status",
      planPeriod: "Period",
      planQuota: "Plan quota",
      source: "Source",
      emptySubscriptions: "No subscription records are available yet.",
      emptyOrders: "No order records are available yet.",
      orderAmount: "Order amount",
      paymentMethod: "Payment method",
      createdAt: "Created at",
      completedAt: "Completed at",
      unavailable: "Unavailable",
      statusActive: "Active",
      statusInactive: "Inactive",
      roleAdmin: "Admin",
      roleUser: "User",
      navOverview: "Overview",
      navProfile: "Profile",
      navSubscriptions: "Subscriptions",
      navOrders: "Orders",
      navUsage: "Usage & billing",
      navSecurity: "Security & sessions",
      overviewTitle: "Account overview",
      overviewDescription: "Review your account status, active plan, and latest order in a cleaner dashboard flow instead of one overloaded page.",
      cockpitTitle: "Today cockpit",
      cockpitDescription: "Focus on current-cycle status, next actions, and recent activity so high-impact tasks are handled first.",
      currentCycleTitle: "Current cycle status",
      currentCycleDescription: "Live signals for subscription health, remaining quota, and latest order updates.",
      nextActionsTitle: "Next actions",
      nextActionsDescription: "Action recommendations are generated from your account status.",
      nextActionsEmpty: "No pending actions right now.",
      nextActionCta: "Handle now",
      nextPriorityHigh: "High priority",
      nextPriorityMedium: "Medium priority",
      nextPriorityLow: "Low priority",
      nextSubscribeTitle: "Start your first subscription",
      nextSubscribeDescription: "There is no active plan yet. Choose one plan to unlock full usage.",
      nextRenewTitle: "Renew your expiring plan",
      nextRenewDescription: "Your current plan is close to expiration. Renew early to avoid interruption.",
      nextOrderTitle: "Resolve pending order",
      nextOrderDescription: "At least one order is not fully settled. Review payment status.",
      nextUpgradeTitle: "Upgrade for more quota",
      nextUpgradeDescription: "Remaining quota is low. Upgrade to keep your workflow stable.",
      nextManageTitle: "Review plan and quota",
      nextManageDescription: "Everything looks stable. Check details when needed.",
      forecastTitle: "Quota forecast",
      forecastDescription: "Estimate how many days your remaining quota can last based on current usage.",
      forecastRiskLow: "Low risk",
      forecastRiskMedium: "Medium risk",
      forecastRiskHigh: "High risk",
      forecastEmpty: "Not enough data to estimate quota exhaustion yet.",
      recoveryTitle: "Recovery actions",
      recoveryDescription: "Quickly recover from abnormal order, subscription, or session states.",
      recoveryPaymentTitle: "Retry failed payment",
      recoveryPaymentDescription: "A failed order was detected. Retry payment or switch payment method.",
      recoverySubscriptionTitle: "Restore subscription status",
      recoverySubscriptionDescription: "Your subscription state is abnormal. Open subscriptions and recover it.",
      recoverySecurityTitle: "Review account security",
      recoverySecurityDescription: "Review active sessions and profile settings to keep account healthy.",
      recentActivityTitle: "Recent activity",
      recentActivityDescription: "Track recent subscription, order, and session events in time order.",
      recentActivityEmpty: "No recent activity yet.",
      recentSubscriptionTitle: "Subscription updated",
      recentOrderTitle: "Order status changed",
      recentSessionTitle: "Session created",
      recentSessionDescription: "You are signed in and ready to manage your account.",
      profilePageTitle: "Profile",
      profilePageDescription: "Your base identity details and current authenticated session live here.",
      subscriptionsPageTitle: "Subscriptions",
      subscriptionsPageDescription: "Review all of your plans, cycles, quotas, and active periods in one place.",
      ordersPageTitle: "Orders",
      ordersPageDescription: "Check your recent purchases, payment methods, and completion states.",
    },
    pricing: {
      meta: {
        title: "FishXCode AI pricing plans",
        description: "Browse every official FishXCode AI plan, filter active and archived offers, and continue into plan details for comparison.",
      },
      eyebrow: "Pricing Snapshot",
      title: "FishXCode AI pricing catalog",
      description:
        "Browse the full official catalog, filter by product line and sales status, and compare plans before moving forward.",
      badge: "Pricing Center",
      cycle: "/ month",
      activeStatus: "Available",
      inactiveStatus: "Archived",
      viewAll: "Browse all plans",
      featuredBadge: "Featured",
      availableGroupTitle: "Available plans",
      availableGroupDescription: "These plans are currently on sale and should stay at the top of the conversion flow.",
      archivedGroupTitle: "Archived plans",
      archivedGroupDescription: "These plans are no longer sold, but they still matter for historical users and plan comparison.",
      emptyTitle: "No plans are available right now.",
      filterAll: "All",
      filterAvailable: "Available only",
      filterArchived: "Archived only",
      filterGroupLabel: "Product line",
      filterStatusLabel: "Status",
      detailCta: "View details",
      detailMetaTitle: "Plan details",
      detailMetaDescription: "Review plan status, billing cycle, and the next purchase step.",
      detailStatus: "Plan status",
      detailGroup: "Product line",
      detailActionTitle: "Next step",
      detailActionDescription: "After signing in, users can continue into the account center. Real checkout and payment can be connected here next.",
      detailPrimaryCta: "Continue with sign-in",
      detailSecondaryCta: "Back to pricing",
    },
    plans: [
      {
        title: "Starter",
        price: "$7",
        description: "For solo builders who need a fast AI product entry point.",
      },
      {
        title: "Scale",
        price: "$28",
        description: "For teams that need shared billing, quota, and usage visibility.",
      },
      {
        title: "Enterprise",
        price: "Custom",
        description: "For advanced billing controls, risk policy, and higher SLA targets.",
      },
    ],
  },
};

export function getDictionary(locale: Locale): HomeDictionary {
  return dictionaries[locale];
}
