import { createHmac, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { ensureRedisConnection } from "@/lib/redis";
import { getServerEnv } from "@/lib/env";
import { type SessionPayload } from "@/lib/auth/types";

const SESSION_COOKIE_NAME = "fxa_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

function hashToken(token: string) {
  return createHmac("sha256", getServerEnv().SESSION_SECRET).update(token).digest("hex");
}

function sessionKey(token: string) {
  return `auth:session:${hashToken(token)}`;
}

export async function createSession(payload: SessionPayload) {
  const token = randomBytes(32).toString("hex");
  const redis = await ensureRedisConnection();

  await redis.set(
    sessionKey(token),
    JSON.stringify(payload),
    {
      expiration: {
        type: "EX",
        value: SESSION_TTL_SECONDS,
      },
    },
  );

  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  try {
    if (token) {
      const redis = await ensureRedisConnection();
      await redis.del(sessionKey(token));
    }
  } finally {
    cookieStore.set(SESSION_COOKIE_NAME, "", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0,
    });
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const redis = await ensureRedisConnection();
  const rawSession = await redis.get(sessionKey(token));

  if (!rawSession) {
    return null;
  }

  return JSON.parse(rawSession) as SessionPayload;
}
