import { createSession } from "@/lib/auth/session";
import { authenticateUser } from "@/lib/auth/users";
import { badRequest, unauthorized } from "@/lib/auth/http";
import { parseLoginIdentifier } from "@/lib/auth/validation";
import { type Locale } from "@/lib/i18n";
import { NextResponse } from "next/server";

function loginMessage(locale: Locale, key: string) {
  const messages = {
    identifierInvalid: {
      zh: "请输入有效邮箱、用户ID，或 ID@fishxcode.com。",
      en: "Please enter a valid email, user ID, or ID@fishxcode.com.",
    },
    passwordRequired: {
      zh: "请输入密码。",
      en: "Please enter your password.",
    },
    invalidCredentials: {
      zh: "邮箱或密码错误。",
      en: "Invalid email or password.",
    },
  } as const;

  return messages[key as keyof typeof messages][locale];
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    email?: string;
    password?: string;
    locale?: Locale;
  };
  const locale = body.locale === "en" ? "en" : "zh";

  const identifier = parseLoginIdentifier(body.email ?? "");
  const password = body.password?.trim() ?? "";

  if (!identifier) {
    return badRequest(loginMessage(locale, "identifierInvalid"));
  }

  if (!password) {
    return badRequest(loginMessage(locale, "passwordRequired"));
  }

  const user = await authenticateUser({ identifier, password });

  if (!user) {
    return unauthorized(loginMessage(locale, "invalidCredentials"));
  }

  await createSession({
    userId: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
  });

  return NextResponse.json({
    ok: true,
    user,
  });
}
