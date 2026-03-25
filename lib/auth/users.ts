import { sql } from "@/lib/postgres";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { type AuthUser } from "@/lib/auth/types";

type UserRow = {
  id: number;
  email: string;
  name: string;
  password_hash: string;
  created_at: Date;
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
  email: string;
  password: string;
}) {
  const user = await findUserByEmail(input.email);

  if (!user) {
    return null;
  }

  const isValid = verifyPassword(input.password, user.password_hash);

  if (!isValid) {
    return null;
  }

  return mapUser(user);
}
