"use client";

import { Monitor, Moon, SunMedium } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Theme = "dark" | "light" | "system";

const themes: Array<{
  value: Theme;
  icon: typeof SunMedium;
}> = [
  { value: "light", icon: SunMedium },
  { value: "dark", icon: Moon },
  { value: "system", icon: Monitor },
];

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const resolvedTheme = theme === "system" ? (prefersDark ? "dark" : "light") : theme;

  root.classList.remove("light", "dark");
  root.classList.add(resolvedTheme);
  root.dataset.theme = theme;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const savedTheme = (window.localStorage.getItem("theme") as Theme | null) ?? "system";
    setTheme(savedTheme);
    applyTheme(savedTheme);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const currentTheme = (window.localStorage.getItem("theme") as Theme | null) ?? "system";

      if (currentTheme === "system") {
        applyTheme("system");
      }
    };

    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, []);

  function handleThemeChange(nextTheme: Theme) {
    window.localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);
    applyTheme(nextTheme);
  }

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-card/70 p-1 backdrop-blur">
      {themes.map(({ value, icon: Icon }) => (
        <Button
          key={value}
          variant={theme === value ? "default" : "ghost"}
          size="icon"
          type="button"
          className="h-9 w-9"
          onClick={() => handleThemeChange(value)}
          aria-label={`切换到${value}主题`}
        >
          <Icon className="h-4 w-4" />
        </Button>
      ))}
    </div>
  );
}
