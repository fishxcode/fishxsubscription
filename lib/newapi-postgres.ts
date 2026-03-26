import { Pool, type QueryResult, type QueryResultRow } from "pg";

declare global {
  var __fishxcodeNewApiPgPool__: Pool | undefined;
}

function getNewApiDatabaseUrl() {
  return process.env.NEWAPI_DATABASE_URL?.trim() ?? "";
}

function createPool() {
  const connectionString = getNewApiDatabaseUrl();

  if (!connectionString) {
    return null;
  }

  return new Pool({
    connectionString,
    max: 5,
  });
}

function getPool() {
  if (globalThis.__fishxcodeNewApiPgPool__ === undefined) {
    globalThis.__fishxcodeNewApiPgPool__ = createPool() ?? undefined;
  }

  return globalThis.__fishxcodeNewApiPgPool__;
}

export function hasNewApiDatabase() {
  return Boolean(getNewApiDatabaseUrl());
}

export async function newApiSql<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[],
): Promise<QueryResult<T> | null> {
  const pool = getPool();

  if (!pool) {
    return null;
  }

  return pool.query<T>(text, params);
}
