"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type LogoutButtonProps = {
  locale: string;
  label: string;
  pendingLabel: string;
  errorLabel: string;
};

export function LogoutButton({
  locale,
  label,
  pendingLabel,
  errorLabel,
}: LogoutButtonProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleLogout() {
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ locale }),
      });

      const payload = (await response.json()) as {
        ok?: boolean;
        message?: string;
      };

      if (!response.ok || !payload.ok) {
        setError(payload.message ?? errorLabel);
        return;
      }

      router.push(`/${locale}`);
      router.refresh();
    } catch {
      setError(errorLabel);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-3">
      <Button onClick={handleLogout} disabled={isSubmitting}>
        {isSubmitting ? pendingLabel : label}
      </Button>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
