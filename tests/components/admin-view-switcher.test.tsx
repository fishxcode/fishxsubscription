import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AdminViewSwitcher } from "../../components/admin/admin-view-switcher";

describe("AdminViewSwitcher", () => {
  it("toggles view mode from list to card", async () => {
    const user = userEvent.setup();

    function Harness() {
      const [view, setView] = React.useState<"list" | "card">("list");
      return (
        <div>
          <AdminViewSwitcher value={view} onChangeAction={setView} />
          <p data-testid="view-mode-value">{view}</p>
        </div>
      );
    }

    render(<Harness />);
    await user.click(screen.getByRole("button", { name: "卡片" }));
    expect(screen.getByTestId("view-mode-value")).toHaveTextContent("card");
  });
});
