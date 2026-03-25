import { createSession } from "@/lib/auth/session";
import { createUser, findUserByEmail } from "@/lib/auth/users";
import { badRequest } from "@/lib/auth/http";
import { isValidEmail, normalizeEmail } from "@/lib/auth/validation";
import { type Locale } from "@/lib/i18n";
import { NextResponse } from "next/server";
import { DatabaseError } from "pg";

function registerMessage(locale: Locale, key: string) {
  const messages = {
    nameRequired: {
      zh: "请输入昵称。",
      en: "Please enter a display name.",
    },
    emailInvalid: {
      zh: "请输入有效邮箱地址。",
      en: "Please enter a valid email address.",
    },
    passwordShort: {
      zh: "密码至少需要 8 位。",
      en: "Password must be at least 8 characters.",
    },
    emailExists: {
      zh: "该邮箱已注册，请直接登录。",
      en: "This email is already registered. Please sign in instead.",
    },
    registerFailed: {
      zh: "注册失败，请稍后再试。",
      en: "Registration failed. Please try again later.",
    },
  } as const;

  return messages[key as keyof typeof messages][locale];
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    email?: string;
    name?: string;
    password?: string;
    locale?: Locale;
  };
  const locale = body.locale === "en" ? "en" : "zh";

  const email = normalizeEmail(body.email ?? "");
  const name = body.name?.trim() ?? "";
  const password = body.password?.trim() ?? "";

  if (!name) {
    return badRequest(registerMessage(locale, "nameRequired"));
  }

  if (!isValidEmail(email)) {
    return badRequest(registerMessage(locale, "emailInvalid"));
  }

  if (password.length < 8) {
    return badRequest(registerMessage(locale, "passwordShort"));
  }

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    return badRequest(registerMessage(locale, "emailExists"));
  }

  try {
    const user = await createUser({ email, name, password });

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
  } catch (error) {
    if (error instanceof DatabaseError && error.code === "23505") {
      return badRequest(registerMessage(locale, "emailExists"));
    }

    return badRequest(registerMessage(locale, "registerFailed"));
  }
}
