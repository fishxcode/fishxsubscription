import { NextResponse } from "next/server";
import { type Locale } from "@/lib/i18n";

export function badRequest(message: string) {
  return NextResponse.json({ ok: false, message }, { status: 400 });
}

export function unauthorized(message: string) {
  return NextResponse.json({ ok: false, message }, { status: 401 });
}

type AuthAction = "login" | "register";

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "";
}

function isServiceUnavailableError(error: unknown) {
  const message = getErrorMessage(error).toLowerCase();

  return [
    "缺少服务端环境变量",
    "session_secret",
    "database_url",
    "redis_url",
    "connect",
    "connection",
    "timeout",
    "econnrefused",
    "enotfound",
    "etimedout",
    "socket",
    "redis",
    "pg_hba",
    "password authentication failed",
  ].some((keyword) => message.includes(keyword));
}

function authErrorMessage(locale: Locale, action: AuthAction, unavailable: boolean) {
  const messages = {
    login: {
      unavailable: {
        zh: "登录服务暂时不可用，请检查数据库、Redis 和环境变量配置。",
        en: "Sign-in is temporarily unavailable. Please verify database, Redis, and environment variables.",
      },
      failed: {
        zh: "登录失败，请稍后再试。",
        en: "Sign-in failed. Please try again later.",
      },
    },
    register: {
      unavailable: {
        zh: "注册服务暂时不可用，请检查数据库、Redis 和环境变量配置。",
        en: "Registration is temporarily unavailable. Please verify database, Redis, and environment variables.",
      },
      failed: {
        zh: "注册失败，请稍后再试。",
        en: "Registration failed. Please try again later.",
      },
    },
  } as const;

  return unavailable
    ? messages[action].unavailable[locale]
    : messages[action].failed[locale];
}

export function authErrorResponse(locale: Locale, action: AuthAction, error: unknown) {
  const unavailable = isServiceUnavailableError(error);
  console.error(`[auth:${action}]`, error);

  return NextResponse.json(
    {
      ok: false,
      message: authErrorMessage(locale, action, unavailable),
    },
    {
      status: unavailable ? 503 : 500,
    },
  );
}
