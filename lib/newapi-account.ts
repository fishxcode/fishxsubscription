import { hasNewApiDatabase, newApiSql } from "@/lib/newapi-postgres";

type ExternalAccountRow = {
  id: number;
  username: string | null;
  display_name: string | null;
  email: string | null;
  role: number;
  status: number;
  group: string | null;
  quota: string | number | null;
  used_quota: string | number | null;
  request_count: string | number | null;
};

type ExternalSubscriptionRow = {
  id: number;
  plan_id: number;
  status: string;
  start_time: number | null;
  end_time: number | null;
  amount_total: string | number | null;
  amount_used: string | number | null;
  source: string | null;
  title: string | null;
  subtitle: string | null;
  price_amount: string | number | null;
  currency: string | null;
  duration_unit: string | null;
  duration_value: number | null;
};

type ExternalOrderRow = {
  id: number;
  plan_id: number;
  money: string | number | null;
  payment_method: string | null;
  status: string;
  create_time: number | null;
  complete_time: number | null;
  title: string | null;
  price_amount: string | number | null;
  currency: string | null;
};

export type NewApiAccountSnapshot = {
  profile: {
    id: number;
    username: string | null;
    displayName: string;
    email: string;
    role: number;
    status: number;
    group: string | null;
    quota: number;
    usedQuota: number;
    remainingQuota: number;
    requestCount: number;
  };
  subscriptions: Array<{
    id: number;
    planId: number;
    title: string;
    subtitle: string | null;
    status: string;
    source: string | null;
    startTime: number | null;
    endTime: number | null;
    amountTotal: number;
    amountUsed: number;
    priceAmount: number | null;
    currency: string | null;
    durationUnit: string | null;
    durationValue: number | null;
  }>;
  orders: Array<{
    id: number;
    planId: number;
    title: string;
    money: number | null;
    paymentMethod: string | null;
    status: string;
    createTime: number | null;
    completeTime: number | null;
    priceAmount: number | null;
    currency: string | null;
  }>;
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

export async function getNewApiAccountSnapshot(userId: number) {
  if (!hasNewApiDatabase()) {
    return null;
  }

  const [profileResult, subscriptionsResult, ordersResult] = await Promise.all([
    newApiSql<ExternalAccountRow>(
      `
        SELECT
          id::integer AS id,
          username,
          display_name,
          email,
          role::integer AS role,
          status::integer AS status,
          "group",
          quota,
          used_quota,
          request_count
        FROM users
        WHERE id = $1
          AND deleted_at IS NULL
        LIMIT 1
      `,
      [userId],
    ),
    newApiSql<ExternalSubscriptionRow>(
      `
        SELECT
          us.id::integer AS id,
          us.plan_id::integer AS plan_id,
          us.status,
          us.start_time::integer AS start_time,
          us.end_time::integer AS end_time,
          us.amount_total,
          us.amount_used,
          us.source,
          sp.title,
          sp.subtitle,
          sp.price_amount,
          sp.currency,
          sp.duration_unit,
          sp.duration_value::integer AS duration_value
        FROM user_subscriptions us
        LEFT JOIN subscription_plans sp ON sp.id = us.plan_id
        WHERE us.user_id = $1
        ORDER BY us.created_at DESC
        LIMIT 6
      `,
      [userId],
    ),
    newApiSql<ExternalOrderRow>(
      `
        SELECT
          so.id::integer AS id,
          so.plan_id::integer AS plan_id,
          so.money,
          so.payment_method,
          so.status,
          so.create_time::integer AS create_time,
          so.complete_time::integer AS complete_time,
          sp.title,
          sp.price_amount,
          sp.currency
        FROM subscription_orders so
        LEFT JOIN subscription_plans sp ON sp.id = so.plan_id
        WHERE so.user_id = $1
        ORDER BY so.create_time DESC
        LIMIT 6
      `,
      [userId],
    ),
  ]);

  const profile = profileResult?.rows[0];

  if (!profile) {
    return null;
  }

  const quota = toNumber(profile.quota);
  const usedQuota = toNumber(profile.used_quota);

  return {
    profile: {
      id: profile.id,
      username: profile.username?.trim() || null,
      displayName:
        profile.display_name?.trim() ||
        profile.username?.trim() ||
        `User #${profile.id}`,
      email: profile.email?.trim().toLowerCase() || `${profile.id}@fishxcode.com`,
      role: profile.role,
      status: profile.status,
      group: profile.group?.trim() || null,
      quota,
      usedQuota,
      remainingQuota: Math.max(quota - usedQuota, 0),
      requestCount: toNumber(profile.request_count),
    },
    subscriptions: (subscriptionsResult?.rows ?? []).map((row) => ({
      id: row.id,
      planId: row.plan_id,
      title: row.title?.trim() || `Plan #${row.plan_id}`,
      subtitle: row.subtitle?.trim() || null,
      status: row.status,
      source: row.source?.trim() || null,
      startTime: row.start_time,
      endTime: row.end_time,
      amountTotal: toNumber(row.amount_total),
      amountUsed: toNumber(row.amount_used),
      priceAmount:
        row.price_amount === null || row.price_amount === undefined
          ? null
          : toNumber(row.price_amount),
      currency: row.currency?.trim() || null,
      durationUnit: row.duration_unit?.trim() || null,
      durationValue: row.duration_value,
    })),
    orders: (ordersResult?.rows ?? []).map((row) => ({
      id: row.id,
      planId: row.plan_id,
      title: row.title?.trim() || `Plan #${row.plan_id}`,
      money:
        row.money === null || row.money === undefined ? null : toNumber(row.money),
      paymentMethod: row.payment_method?.trim() || null,
      status: row.status,
      createTime: row.create_time,
      completeTime: row.complete_time,
      priceAmount:
        row.price_amount === null || row.price_amount === undefined
          ? null
          : toNumber(row.price_amount),
      currency: row.currency?.trim() || null,
    })),
  } satisfies NewApiAccountSnapshot;
}
