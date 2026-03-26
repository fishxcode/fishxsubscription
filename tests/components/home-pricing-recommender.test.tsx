import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HomePricingRecommender } from "../../components/site/home-pricing-recommender";

const plans = [
  { id: 1, title: "Starter", description: "", price: "¥49", cycle: "month", enabled: true, sortOrder: 1, group: "starter" },
  { id: 2, title: "Pro", description: "", price: "¥199", cycle: "month", enabled: true, sortOrder: 2, group: "pro" },
  { id: 3, title: "Enterprise", description: "", price: "¥999", cycle: "month", enabled: true, sortOrder: 3, group: "enterprise" },
];

describe("HomePricingRecommender", () => {
  it("recommends pro plan for mid budget", async () => {
    const user = userEvent.setup();
    render(<HomePricingRecommender plans={plans} />);

    await user.selectOptions(screen.getByLabelText("预算"), "mid");
    await user.click(screen.getByRole("button", { name: "推荐方案" }));

    expect(screen.getByText("Pro")).toBeInTheDocument();
  });
});
