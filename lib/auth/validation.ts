export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(email));
}

export function parseLoginIdentifier(identifier: string) {
  const value = identifier.trim().toLowerCase();

  if (!value) {
    return null;
  }

  if (/^\d+$/.test(value)) {
    return {
      type: "id" as const,
      userId: Number(value),
    };
  }

  const pseudoEmailMatch = value.match(/^(\d+)@fishxcode\.com$/);

  if (pseudoEmailMatch) {
    return {
      type: "id" as const,
      userId: Number(pseudoEmailMatch[1]),
    };
  }

  if (isValidEmail(value)) {
    return {
      type: "email" as const,
      email: value,
    };
  }

  return null;
}
