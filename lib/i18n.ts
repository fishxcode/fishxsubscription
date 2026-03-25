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
