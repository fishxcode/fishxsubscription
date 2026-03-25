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

function getPool() {
  if (!globalThis.__fishxcodePgPool__) {
    globalThis.__fishxcodePgPool__ = createPool();
  }

  return globalThis.__fishxcodePgPool__;
}

export async function withPgClient<T>(
  handler: (client: PoolClient) => Promise<T>,
) {
  const client = await getPool().connect();

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
  return getPool().query<T>(text, params);
}
