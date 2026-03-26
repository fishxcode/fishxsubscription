import { cache } from "react";
import { newApiSql } from "@/lib/newapi-postgres";
import { type Locale } from "@/lib/i18n";

type SubscriptionPlanRow = {
  id: number;
  title: string;
  subtitle: string | null;
  price_amount: string | number;
  currency: string | null;
  duration_unit: string | null;
  duration_value: number | null;
  enabled: boolean;
  sort_order: number | null;
};

export type HomePricingPlan = {
  id: number;
  title: string;
  description: string;
  price: string;
  cycle: string;
  enabled: boolean;
  sortOrder: number | null;
  group: string;
};

function toNumber(value: string | number | null | undefined) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
}

function formatMoney(locale: Locale, amount: number, currency: string | null) {
  if (!currency) {
    return new Intl.NumberFormat(locale === "zh" ? "zh-CN" : "en-US", {
      maximumFractionDigits: 2,
    }).format(amount);
  }

  return new Intl.NumberFormat(locale === "zh" ? "zh-CN" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatCycle(locale: Locale, durationUnit: string | null, durationValue: number | null) {
  if (!durationUnit || !durationValue) {
    return locale === "zh" ? "按周期" : "per billing cycle";
  }

  if (locale === "zh") {
    if (durationUnit === "day") {
      return `${durationValue} 天`;
    }

    if (durationUnit === "month") {
      return `${durationValue} 个月`;
    }

    if (durationUnit === "year") {
      return `${durationValue} 年`;
    }
  } else {
    if (durationUnit === "day") {
      return `${durationValue} day${durationValue > 1 ? "s" : ""}`;
    }

    if (durationUnit === "month") {
      return `${durationValue} month${durationValue > 1 ? "s" : ""}`;
    }

    if (durationUnit === "year") {
      return `${durationValue} year${durationValue > 1 ? "s" : ""}`;
    }
  }

  return `${durationValue} ${durationUnit}`;
}

export const getHomePricingPlans = cache(async (locale: Locale) => {
  const result = await newApiSql<SubscriptionPlanRow>(
    `
      SELECT
        id::integer AS id,
        title,
        subtitle,
        price_amount,
        currency,
        duration_unit,
        duration_value::integer AS duration_value,
        enabled,
        sort_order::integer AS sort_order
      FROM subscription_plans
      ORDER BY enabled DESC, sort_order ASC NULLS LAST, id ASC
    `,
  );

  if (!result?.rows.length) {
    return [];
  }

  return result.rows.map((plan) => ({
    id: plan.id,
    title: plan.title,
    description: plan.subtitle?.trim() || (locale === "zh" ? "套餐信息由 FishXCode 统一维护。" : "Plan details are maintained by FishXCode."),
    price: formatMoney(locale, toNumber(plan.price_amount), plan.currency),
    cycle: formatCycle(locale, plan.duration_unit, plan.duration_value),
    enabled: plan.enabled,
    sortOrder: plan.sort_order,
    group: plan.title.split(" ")[0].toLowerCase(),
  })) satisfies HomePricingPlan[];
});

export async function getPricingPlanById(locale: Locale, planId: number) {
  const plans = await getHomePricingPlans(locale);
  return plans.find((plan) => plan.id === planId) ?? null;
}

export function splitHomePricingPlans(plans: HomePricingPlan[]) {
  const available = plans.filter((plan) => plan.enabled);
  const archived = plans.filter((plan) => !plan.enabled);

  return {
    featured: [
      ...available.slice(0, 4),
      ...archived.slice(0, Math.max(0, 6 - available.slice(0, 4).length)),
    ].slice(0, 6),
    available,
    archived,
  };
}
