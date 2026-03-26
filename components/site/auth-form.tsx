"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { type HomeDictionary, type Locale } from "@/lib/i18n";
import { parseLoginIdentifier } from "@/lib/auth/validation";

type AuthMode = "login" | "register";

type AuthFormProps = {
  locale: Locale;
  dictionary: HomeDictionary;
  initialMode: AuthMode;
};

export function AuthForm({ locale, dictionary, initialMode }: AuthFormProps) {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (mode === "register" && !name.trim()) {
      setError(dictionary.auth.validation.nameRequired);
      return;
    }

    if (isLogin) {
      if (!parseLoginIdentifier(email)) {
        setError(dictionary.auth.validation.loginIdentifierInvalid);
        return;
      }
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim().toLowerCase())) {
      setError(dictionary.auth.validation.emailInvalid);
      return;
    }

    if (password.trim().length < 8) {
      setError(dictionary.auth.validation.passwordShort);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          locale,
        }),
      });

      const payload = (await response.json()) as {
        ok: boolean;
        message?: string;
      };

      if (!response.ok || !payload.ok) {
        setError(payload.message ?? dictionary.auth.genericError);
        return;
      }

      setMessage(
        mode === "login"
          ? dictionary.auth.successLogin
          : dictionary.auth.successRegister,
      );

      router.push(`/${locale}/account`);
      router.refresh();
    } catch {
      setError(dictionary.auth.networkError);
    } finally {
      setIsSubmitting(false);
    }
  }

  const isLogin = mode === "login";

  return (
    <Card className="w-full max-w-xl border-primary/15 bg-card/75">
      <CardHeader>
        <p className="text-sm uppercase tracking-[0.24em] text-primary">
          {dictionary.auth.badge}
        </p>
        <CardTitle className="text-3xl">{dictionary.auth.title}</CardTitle>
        <CardDescription>{dictionary.auth.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 grid grid-cols-2 rounded-full border border-border/70 bg-background/70 p-1">
          <button
            type="button"
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              isLogin ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
            onClick={() => setMode("login")}
          >
            {dictionary.auth.loginTab}
          </button>
          <button
            type="button"
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              !isLogin ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
            onClick={() => setMode("register")}
          >
            {dictionary.auth.registerTab}
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin ? (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                {dictionary.auth.nameLabel}
              </label>
              <Input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={dictionary.auth.nameLabel}
              />
            </div>
          ) : null}

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              {isLogin ? dictionary.auth.loginIdentifierLabel : dictionary.auth.emailLabel}
            </label>
            <Input
              type={isLogin ? "text" : "email"}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={
                isLogin
                  ? dictionary.auth.loginIdentifierPlaceholder
                  : dictionary.auth.emailPlaceholder
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              {dictionary.auth.passwordLabel}
            </label>
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={dictionary.auth.passwordPlaceholder}
            />
          </div>

          {error ? (
            <p className="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </p>
          ) : null}

          {message ? (
            <p className="rounded-2xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary">
              {message}
            </p>
          ) : null}

          <Button className="w-full" size="lg" type="submit" disabled={isSubmitting}>
            {isLogin ? dictionary.auth.submitLogin : dictionary.auth.submitRegister}
          </Button>
        </form>

        <p className="mt-6 text-sm leading-6 text-muted-foreground">
          {isLogin ? dictionary.auth.footerLogin : dictionary.auth.footerRegister}{" "}
          <Link
            href={`/${locale}/auth?mode=${isLogin ? "register" : "login"}`}
            className="font-medium text-primary"
            onClick={() => setMode(isLogin ? "register" : "login")}
          >
            {isLogin ? dictionary.auth.switchToRegister : dictionary.auth.switchToLogin}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
