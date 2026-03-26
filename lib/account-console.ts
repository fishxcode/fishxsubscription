import { cache } from "react";
import { type SessionPayload } from "@/lib/auth/types";
import { getSession } from "@/lib/auth/session";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getNewApiAccountSnapshot } from "@/lib/newapi-account";

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

  return {
    dictionary,
    session,
    snapshot,
    profile,
    activeSubscription,
    latestOrder,
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
