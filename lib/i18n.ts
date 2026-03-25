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
    passwordPlaceholder: string;
    validation: {
      nameRequired: string;
      emailInvalid: string;
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
  };
  pricing: {
    eyebrow: string;
    title: string;
    description: string;
    badge: string;
    cycle: string;
  };
  capabilities: Array<{
    title: string;
    description: string;
  }>;
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
      title: "FishXCode AI 订阅平台",
      description:
        "面向 AI 产品订阅、计费、套餐和控制台扩展的专业站点基础工程，内置深浅主题、国际化与 SEO 基础设施。",
      keywords: [
        "FishXCode AI",
        "AI 订阅",
        "SaaS 订阅平台",
        "Next.js 订阅网站",
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
      badge: "专业订阅站点基础骨架",
      titlePrefix: "为",
      titleHighlight: "FishXCode AI",
      titleSuffix: "搭建一套可持续扩展的订阅网站基础层。",
      description:
        "当前版本已经具备深浅色主题、国际化文案结构、SEO 元数据能力，以及 PostgreSQL / Redis 接入基础设施。后续可以直接进入认证、套餐、订单与后台开发。",
      primaryCta: "开始构建",
      secondaryCta: "查看套餐区块",
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
      passwordPlaceholder: "请输入密码",
      validation: {
        nameRequired: "请输入昵称。",
        emailInvalid: "请输入有效邮箱地址。",
        passwordShort: "密码至少需要 8 位。",
      },
    },
    account: {
      meta: {
        title: "账户中心",
        description: "查看当前登录状态和基础账户信息。",
      },
      badge: "账户中心",
      title: "认证已经接入完成",
      description: "你现在已经拥有最小可用认证基础：用户表、密码散列、Redis 会话、受保护账户页。",
      sessionTitle: "当前会话",
      sessionDescription: "后续这里会继续扩展订阅、订单、账单和 API 配额视图。",
      logout: "退出登录",
      logoutPending: "退出中...",
      logoutError: "退出失败，请稍后重试。",
      signedInAs: "当前登录邮箱",
      displayName: "显示名称",
      memberSince: "注册时间",
      sessionStatus: "会话状态",
      sessionActive: "有效",
      backHome: "返回首页",
    },
    pricing: {
      eyebrow: "Pricing Snapshot",
      title: "深暖棕基底 + 提亮金品牌色",
      description:
        "配色强调可信赖、稳定与高级感，在深色和浅色模式下都保持清晰对比和品牌一致性。",
      badge: "主题 / i18n / SEO",
      cycle: "/ month",
    },
    capabilities: [
      {
        title: "AI 订阅管理",
        description: "统一承载套餐、升级路径与账单展示。",
      },
      {
        title: "付费转化页",
        description: "面向购买决策做信息分层，减少认知负担。",
      },
      {
        title: "国际化与 SEO",
        description: "中英文文案、规范化 metadata、robots 与 sitemap 已准备就绪。",
      },
      {
        title: "PostgreSQL + Redis",
        description: "数据库与缓存接入已预留，便于后续快速进入业务开发。",
      },
    ],
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
      title: "FishXCode AI Subscription Platform",
      description:
        "A professional foundation for AI subscription, billing, pricing plans, and dashboard workflows with dark/light theme, i18n, and SEO support.",
      keywords: [
        "FishXCode AI",
        "AI subscription",
        "SaaS billing",
        "Next.js subscription website",
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
      badge: "Professional subscription foundation",
      titlePrefix: "Build",
      titleHighlight: "FishXCode AI",
      titleSuffix: "on a durable subscription website foundation.",
      description:
        "This baseline already includes dark/light themes, a bilingual content structure, SEO metadata, and PostgreSQL / Redis access layers so the next step can focus on auth, pricing, orders, and admin flows.",
      primaryCta: "Start Building",
      secondaryCta: "View Pricing",
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
      passwordPlaceholder: "Enter your password",
      validation: {
        nameRequired: "Please enter a display name.",
        emailInvalid: "Please enter a valid email address.",
        passwordShort: "Password must be at least 8 characters.",
      },
    },
    account: {
      meta: {
        title: "Account",
        description: "View your current authenticated session and basic account details.",
      },
      badge: "Account Center",
      title: "Authentication is now connected",
      description: "You now have a minimal auth baseline: user table, password hashing, Redis sessions, and a protected account page.",
      sessionTitle: "Current session",
      sessionDescription: "This area will later expand into plans, orders, billing, and API quota management.",
      logout: "Sign out",
      logoutPending: "Signing out...",
      logoutError: "Sign-out failed. Please try again.",
      signedInAs: "Signed in as",
      displayName: "Display name",
      memberSince: "Member since",
      sessionStatus: "Session status",
      sessionActive: "Active",
      backHome: "Back home",
    },
    pricing: {
      eyebrow: "Pricing Snapshot",
      title: "Warm dark base with luminous gold accents",
      description:
        "The palette is tuned for trust, clarity, and premium contrast across both dark and light modes.",
      badge: "Theme / i18n / SEO",
      cycle: "/ month",
    },
    capabilities: [
      {
        title: "AI subscription management",
        description: "A clean base for plans, upgrades, and billing visibility.",
      },
      {
        title: "Conversion-focused landing",
        description: "Structured for product clarity and lower purchase friction.",
      },
      {
        title: "i18n and SEO baseline",
        description: "Localized copy, metadata, robots, and sitemap are ready.",
      },
      {
        title: "PostgreSQL + Redis",
        description: "Database and cache access layers are prepared for business features.",
      },
    ],
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
