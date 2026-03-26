type RequiredServerEnv = {
  DATABASE_URL: string;
  REDIS_URL: string;
  SESSION_SECRET: string;
};

type PublicEnv = {
  NEXT_PUBLIC_APP_NAME: string;
  NEXT_PUBLIC_APP_URL: string;
};

function readEnv(name: string) {
  return process.env[name]?.trim() ?? "";
}

export const publicEnv: PublicEnv = {
  NEXT_PUBLIC_APP_NAME: readEnv("NEXT_PUBLIC_APP_NAME") || "FishXCode AI",
  NEXT_PUBLIC_APP_URL: readEnv("NEXT_PUBLIC_APP_URL") || "http://localhost:3000",
};

export function getServerEnv(): RequiredServerEnv {
  const DATABASE_URL = readEnv("DATABASE_URL");
  const REDIS_URL = readEnv("REDIS_URL");
  const SESSION_SECRET = readEnv("SESSION_SECRET");
  if (!DATABASE_URL || !REDIS_URL || !SESSION_SECRET) {
    throw new Error("缺少服务端环境变量，请先配置 DATABASE_URL、REDIS_URL 与 SESSION_SECRET。");
  }

  return {
    DATABASE_URL,
    REDIS_URL,
    SESSION_SECRET,
  };
}
