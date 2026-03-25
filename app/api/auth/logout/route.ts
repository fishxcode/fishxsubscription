import { destroySession } from "@/lib/auth/session";
import { type Locale } from "@/lib/i18n";
import { NextResponse } from "next/server";

function logoutMessage(locale: Locale) {
  return locale === "en"
    ? "Sign-out failed. Please try again."
    : "退出失败，请稍后重试。";
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    locale?: Locale;
  };
  const locale = body.locale === "en" ? "en" : "zh";

  try {
    await destroySession();

    return NextResponse.json({
      ok: true,
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: logoutMessage(locale),
      },
      { status: 500 },
    );
  }
}
