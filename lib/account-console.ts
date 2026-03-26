import { cache } from "react";
import { type SessionPayload } from "@/lib/auth/types";
import { getSession } from "@/lib/auth/session";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getNewApiAccountSnapshot } from "@/lib/newapi-account";

export type AccountRecoveryItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  severity: "warning" | "critical";
};

export type AccountForecast = {
  estimatedExhaustDays: number | null;
  riskLevel: "low" | "medium" | "high";
};

export type AccountNextAction = {
  id: string;
  title: string;
  description: string;
  href: string;
  priority: "high" | "medium" | "low";
};

export type AccountRecentActivity = {
  id: string;
  title: string;
  timestamp: string;
  detail: string;
};

export const getAccountConsoleData = cache(async (locale: Locale) => {
  const session = await getSession();

  if (!session) {
    return null;
  }

  const dictionary = getDictionary(locale);
  const snapshot = await getNewApiAccountSnapshot(session.userId);
  const profile = snapshot?.profile ?? null;
  const activeSubscription =
    snapshot?.subscriptions.find((item) => item.status === "active") ??
    snapshot?.subscriptions[0] ??
    null;
  const latestOrder = snapshot?.orders[0] ?? null;

  const now = Math.floor(Date.now() / 1000);
  const nearExpiryThreshold = now + 7 * 24 * 60 * 60;
  const isNearExpiry =
    activeSubscription?.endTime !== null &&
    activeSubscription?.endTime !== undefined &&
    activeSubscription.endTime <= nearExpiryThreshold;

  const nextActions: AccountNextAction[] = [];

  if (!activeSubscription) {
    nextActions.push({
      id: "subscribe",
      title: dictionary.account.nextSubscribeTitle,
      description: dictionary.account.nextSubscribeDescription,
      href: `/${locale}/pricing`,
      priority: "high",
    });
  }

  if (isNearExpiry) {
    nextActions.push({
      id: "renew",
      title: dictionary.account.nextRenewTitle,
      description: dictionary.account.nextRenewDescription,
      href: `/${locale}/account/subscriptions`,
      priority: "high",
    });
  }

  if (latestOrder && latestOrder.status !== "paid") {
    nextActions.push({
      id: "order",
      title: dictionary.account.nextOrderTitle,
      description: dictionary.account.nextOrderDescription,
      href: `/${locale}/account/orders`,
      priority: "medium",
    });
  }

  if (profile && profile.quota > 0 && profile.remainingQuota / profile.quota <= 0.2) {
    nextActions.push({
      id: "upgrade",
      title: dictionary.account.nextUpgradeTitle,
      description: dictionary.account.nextUpgradeDescription,
      href: `/${locale}/pricing`,
      priority: "medium",
    });
  }

  if (nextActions.length === 0) {
    nextActions.push({
      id: "manage",
      title: dictionary.account.nextManageTitle,
      description: dictionary.account.nextManageDescription,
      href: `/${locale}/account/subscriptions`,
      priority: "low",
    });
  }

  const forecast: AccountForecast = {
    estimatedExhaustDays: null,
    riskLevel: "low",
  };

  if (profile && profile.usedQuota > 0) {
    const estimatedDays = Math.floor(profile.remainingQuota / profile.usedQuota);
    const normalizedDays = Number.isFinite(estimatedDays) && estimatedDays >= 0 ? estimatedDays : 0;

    let riskLevel: AccountForecast["riskLevel"] = "low";
    if (normalizedDays <= 3) {
      riskLevel = "high";
    } else if (normalizedDays <= 7) {
      riskLevel = "medium";
    }

    forecast.estimatedExhaustDays = normalizedDays;
    forecast.riskLevel = riskLevel;
  }

  const recoveryItems: AccountRecoveryItem[] = [];

  if (latestOrder && latestOrder.status === "failed") {
    recoveryItems.push({
      id: "retry-payment",
      title: dictionary.account.recoveryPaymentTitle,
      description: dictionary.account.recoveryPaymentDescription,
      href: `/${locale}/account/orders`,
      severity: "critical",
    });
  }

  if (activeSubscription && activeSubscription.status !== "active") {
    recoveryItems.push({
      id: "restore-subscription",
      title: dictionary.account.recoverySubscriptionTitle,
      description: dictionary.account.recoverySubscriptionDescription,
      href: `/${locale}/account/subscriptions`,
      severity: "warning",
    });
  }

  if (recoveryItems.length === 0) {
    recoveryItems.push({
      id: "review-security",
      title: dictionary.account.recoverySecurityTitle,
      description: dictionary.account.recoverySecurityDescription,
      href: `/${locale}/account/profile`,
      severity: "warning",
    });
  }

  const recentActivity: AccountRecentActivity[] = [];

  if (activeSubscription) {
    recentActivity.push({
      id: `subscription-${activeSubscription.id}`,
      title: dictionary.account.recentSubscriptionTitle,
      timestamp: formatDateTime(locale, activeSubscription.startTime),
      detail: activeSubscription.title,
    });
  }

  if (latestOrder) {
    recentActivity.push({
      id: `order-${latestOrder.id}`,
      title: dictionary.account.recentOrderTitle,
      timestamp: formatDateTime(locale, latestOrder.createTime),
      detail: `${latestOrder.title} · ${latestOrder.status}`,
    });
  }

  recentActivity.push({
    id: "session",
    title: dictionary.account.recentSessionTitle,
    timestamp: formatSessionDate(locale, session.createdAt),
    detail: dictionary.account.recentSessionDescription,
  });

  return {
    dictionary,
    session,
    snapshot,
    profile,
    activeSubscription,
    latestOrder,
    nextActions,
    recoveryItems,
    forecast,
    recentActivity,
  };
});

type AccountConsoleResult = NonNullable<
  Awaited<ReturnType<typeof getAccountConsoleData>>
>;

export function formatDateTime(locale: Locale, unixSeconds: number | null) {
  if (!unixSeconds) {
    return "-";
  }

  return new Date(unixSeconds * 1000).toLocaleString(
    locale === "zh" ? "zh-CN" : "en-US",
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    },
  );
}

export function formatSessionDate(locale: Locale, value: string | null) {
  if (!value) {
    return "-";
  }

  return new Date(value).toLocaleDateString(locale === "zh" ? "zh-CN" : "en-US");
}

export function formatNumber(locale: Locale, value: number | null) {
  if (value === null) {
    return "-";
  }

  return new Intl.NumberFormat(locale === "zh" ? "zh-CN" : "en-US").format(value);
}

export function formatMoney(locale: Locale, amount: number | null, currency: string | null) {
  if (amount === null) {
    return "-";
  }

  if (!currency) {
    return formatNumber(locale, amount);
  }

  return new Intl.NumberFormat(locale === "zh" ? "zh-CN" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatCycle(durationUnit: string | null, durationValue: number | null) {
  if (!durationUnit || !durationValue) {
    return "-";
  }

  return `${durationValue} ${durationUnit}`;
}

export function formatRoleLabel(
  role: number | undefined,
  dictionary: AccountConsoleResult["dictionary"],
) {
  if (role === undefined) {
    return dictionary.account.unavailable;
  }

  return role >= 100
    ? dictionary.account.roleAdmin
    : dictionary.account.roleUser;
}

export function formatStatusLabel(
  status: number | undefined,
  dictionary: AccountConsoleResult["dictionary"],
) {
  if (status === undefined) {
    return dictionary.account.unavailable;
  }

  return status === 1
    ? dictionary.account.statusActive
    : dictionary.account.statusInactive;
}

export function getAccountIdentity(
  session: SessionPayload,
  profile: AccountConsoleResult["profile"],
) {
  return {
    id: profile?.id ?? session.userId,
    displayName: profile?.displayName ?? session.name,
    email: profile?.email ?? session.email,
    username: profile?.username ?? null,
    group: profile?.group ?? null,
  };
}
