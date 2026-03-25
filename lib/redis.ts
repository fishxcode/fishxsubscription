import { createClient } from "redis";
import { getServerEnv } from "@/lib/env";

type FishXCodeRedisClient = ReturnType<typeof createRedisClient>;

declare global {
  var __fishxcodeRedis__: FishXCodeRedisClient | undefined;
}

function createRedisClient() {
  return createClient({
    url: getServerEnv().REDIS_URL,
  });
}

export const redis = globalThis.__fishxcodeRedis__ ?? createRedisClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.__fishxcodeRedis__ = redis;
}

if (!redis.isOpen) {
  redis.on("error", (error) => {
    console.error("Redis connection error:", error);
  });
}

export async function ensureRedisConnection() {
  if (!redis.isOpen) {
    await redis.connect();
  }

  return redis;
}
