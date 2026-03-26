export type AuthUser = {
  id: number;
  email: string;
  name: string;
  createdAt: string | null;
};

export type SessionPayload = {
  userId: number;
  email: string;
  name: string;
  createdAt: string | null;
};
