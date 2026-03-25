import {
  Pool,
  type PoolClient,
  type QueryResult,
  type QueryResultRow,
} from "pg";
import { getServerEnv } from "@/lib/env";

declare global {
  var __fishxcodePgPool__: Pool | undefined;
}

function createPool() {
  return new Pool({
    connectionString: getServerEnv().DATABASE_URL,
    max: 10,
  });
}

export const postgres =
  globalThis.__fishxcodePgPool__ ?? createPool();

if (process.env.NODE_ENV !== "production") {
  globalThis.__fishxcodePgPool__ = postgres;
}

export async function withPgClient<T>(
  handler: (client: PoolClient) => Promise<T>,
) {
  const client = await postgres.connect();

  try {
    return await handler(client);
  } finally {
    client.release();
  }
}

export async function sql<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[],
): Promise<QueryResult<T>> {
  return postgres.query<T>(text, params);
}
