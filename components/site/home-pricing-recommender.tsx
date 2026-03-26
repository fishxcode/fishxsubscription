import React, { useMemo, useState } from "react";
import { type HomePricingPlan } from "@/lib/newapi-home";

type HomePricingRecommenderProps = {
  plans: HomePricingPlan[];
};

export function HomePricingRecommender({ plans }: HomePricingRecommenderProps) {
  const [budget, setBudget] = useState<"low" | "mid" | "high">("low");
  const [revealed, setRevealed] = useState(false);

  const recommended = useMemo(() => {
    if (plans.length === 0) return null;
    if (budget === "low") return plans[0] ?? null;
    if (budget === "mid") return plans[1] ?? plans[0] ?? null;
    return plans[plans.length - 1] ?? null;
  }, [budget, plans]);

  return (
    <section className="rounded-[1.25rem] border border-border/70 bg-background/55 p-4">
      <label htmlFor="budget" className="text-sm text-muted-foreground">预算</label>
      <select
        id="budget"
        value={budget}
        onChange={(e) => setBudget(e.target.value as "low" | "mid" | "high")}
        className="mt-2 w-full rounded-xl border border-border/70 bg-background px-3 py-2"
      >
        <option value="low">入门预算</option>
        <option value="mid">中等预算</option>
        <option value="high">高预算</option>
      </select>
      <button
        type="button"
        onClick={() => setRevealed(true)}
        className="mt-3 rounded-xl bg-primary px-4 py-2 text-primary-foreground"
      >
        推荐方案
      </button>
      {revealed && recommended ? (
        <p className="mt-3 text-sm">
          推荐：<strong>{recommended.title}</strong>
        </p>
      ) : null}
    </section>
  );
}
