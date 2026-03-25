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

function getRedisClient() {
  if (!globalThis.__fishxcodeRedis__) {
    const client = createRedisClient();
    client.on("error", (error) => {
      console.error("Redis connection error:", error);
    });
    globalThis.__fishxcodeRedis__ = client;
  }

  return globalThis.__fishxcodeRedis__;
}

export async function ensureRedisConnection() {
  const redis = getRedisClient();

  if (!redis.isOpen) {
    await redis.connect();
  }

  return redis;
}
