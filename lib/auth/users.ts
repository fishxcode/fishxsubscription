import { sql } from "@/lib/postgres";
import { compareSync } from "bcryptjs";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { type AuthUser } from "@/lib/auth/types";
import { hasNewApiDatabase, newApiSql } from "@/lib/newapi-postgres";

type UserRow = {
  id: number;
  email: string;
  name: string;
  password_hash: string;
  created_at: Date;
};

type ExternalUserRow = {
  id: number;
  email: string | null;
  username: string | null;
  display_name: string | null;
  password: string;
};

let usersTableReady = false;

function mapUser(row: UserRow): AuthUser {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    createdAt: row.created_at.toISOString(),
  };
}

function mapExternalUser(row: ExternalUserRow): AuthUser {
  const email = row.email?.trim().toLowerCase() || `${row.id}@fishxcode.com`;
  const name = row.display_name?.trim() || row.username?.trim() || `User #${row.id}`;

  return {
    id: row.id,
    email,
    name,
    createdAt: null,
  };
}

export async function ensureUsersTable() {
  if (usersTableReady) {
    return;
  }

  await sql(`
    CREATE TABLE IF NOT EXISTS users (
      id BIGSERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  usersTableReady = true;
}

export async function findUserByEmail(email: string) {
  await ensureUsersTable();

  const normalizedEmail = email.trim().toLowerCase();
  const result = await sql<UserRow>(
    `
      SELECT id, email, name, password_hash, created_at
      FROM users
      WHERE email = $1
      LIMIT 1
    `,
    [normalizedEmail],
  );

  return result.rows[0] ?? null;
}

async function findExternalUserByEmail(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const result = await newApiSql<ExternalUserRow>(
    `
      SELECT
        id::integer AS id,
        email,
        username,
        display_name,
        password
      FROM users
      WHERE deleted_at IS NULL
        AND status = 1
        AND email = $1
      LIMIT 1
    `,
    [normalizedEmail],
  );

  return result?.rows[0] ?? null;
}

export async function hasExternalUserByEmail(email: string) {
  if (!hasNewApiDatabase()) {
    return false;
  }

  const user = await findExternalUserByEmail(email);
  return Boolean(user);
}

export async function findUserById(userId: number) {
  await ensureUsersTable();

  const result = await sql<UserRow>(
    `
      SELECT id, email, name, password_hash, created_at
      FROM users
      WHERE id = $1
      LIMIT 1
    `,
    [userId],
  );

  return result.rows[0] ?? null;
}

async function findExternalUserById(userId: number) {
  const result = await newApiSql<ExternalUserRow>(
    `
      SELECT
        id::integer AS id,
        email,
        username,
        display_name,
        password
      FROM users
      WHERE deleted_at IS NULL
        AND status = 1
        AND id = $1
      LIMIT 1
    `,
    [userId],
  );

  return result?.rows[0] ?? null;
}

export async function createUser(input: {
  email: string;
  name: string;
  password: string;
}) {
  await ensureUsersTable();

  const normalizedEmail = input.email.trim().toLowerCase();
  const passwordHash = hashPassword(input.password);

  const result = await sql<UserRow>(
    `
      INSERT INTO users (email, name, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, email, name, password_hash, created_at
    `,
    [normalizedEmail, input.name.trim(), passwordHash],
  );

  return mapUser(result.rows[0]);
}

export async function authenticateUser(input: {
  identifier:
    | {
        type: "email";
        email: string;
      }
    | {
        type: "id";
        userId: number;
      };
  password: string;
}) {
  if (hasNewApiDatabase()) {
    const externalUser =
      input.identifier.type === "email"
        ? await findExternalUserByEmail(input.identifier.email)
        : await findExternalUserById(input.identifier.userId);

    if (externalUser) {
      if (!compareSync(input.password, externalUser.password)) {
        return null;
      }

      return mapExternalUser(externalUser);
    }
  }

  const localUser =
    input.identifier.type === "email"
      ? await findUserByEmail(input.identifier.email)
      : await findUserById(input.identifier.userId);

  if (!localUser) {
    return null;
  }

  const isValid = verifyPassword(input.password, localUser.password_hash);

  if (!isValid) {
    return null;
  }

  return mapUser(localUser);
}
