"use client";

import { Monitor, Moon, SunMedium } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { type HomeDictionary } from "@/lib/i18n";

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

type ThemeToggleProps = {
  dictionary: HomeDictionary;
};

export function ThemeToggle({ dictionary }: ThemeToggleProps) {
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
    <div className="inline-flex shrink-0 items-center gap-1 rounded-full border border-border/60 bg-card/85 p-1.5 backdrop-blur">
      {themes.map(({ value, icon: Icon }) => (
        <Button
          key={value}
          variant={theme === value ? "default" : "ghost"}
          size="icon"
          type="button"
          className="h-8 w-8 shrink-0"
          onClick={() => handleThemeChange(value)}
          aria-label={`${dictionary.controls.theme.switchTo}${dictionary.controls.theme[value]}`}
        >
          <Icon className="h-4 w-4" />
        </Button>
      ))}
    </div>
  );
}
