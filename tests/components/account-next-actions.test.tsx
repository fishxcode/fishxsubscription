import * as React from "react";
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { AccountNextActions, type AccountNextActionItem } from "../../components/site/account-next-actions";
import { getDictionary } from "../../lib/i18n";

describe("AccountNextActions", () => {
  const dictionary = getDictionary("zh");

  it("shows renew action when subscription near expiration", () => {
    const actions: AccountNextActionItem[] = [
      {
        id: "renew",
        title: dictionary.account.nextRenewTitle,
        description: dictionary.account.nextRenewDescription,
        href: "/zh/account/subscriptions",
        priority: "high",
      },
    ];

    const html = renderToStaticMarkup(
      <AccountNextActions dictionary={dictionary} actions={actions} />,
    );

    expect(html).toContain(dictionary.account.nextActionsTitle);
    expect(html).toContain(dictionary.account.nextRenewTitle);
    expect(html).toContain(dictionary.account.nextPriorityHigh);
    expect(html).toContain("/zh/account/subscriptions");
  });

  it("shows empty message when there are no actions", () => {
    const html = renderToStaticMarkup(
      <AccountNextActions dictionary={dictionary} actions={[]} />,
    );

    expect(html).toContain(dictionary.account.nextActionsEmpty);
  });
});
