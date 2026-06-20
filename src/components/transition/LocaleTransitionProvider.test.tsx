/** @vitest-environment jsdom */

import "@/test/setup";

import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { LocaleTransitionProvider } from "@/components/transition/LocaleTransitionProvider";
import {
  LOCALE_TRANSITION_STORAGE_KEY,
  savePendingLocaleTransition,
} from "@/lib/i18n/locale-transition";

describe("LocaleTransitionProvider", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    document.documentElement.lang = "en";
  });

  it("skips the replayed transition on navigation remount when no previous layer is available", async () => {
    savePendingLocaleTransition("en", "zh");

    render(
      <LocaleTransitionProvider locale="zh">
        <div data-locale-region="main">中文内容</div>
      </LocaleTransitionProvider>,
    );

    const content = screen.getByText("中文内容");
    const transitionRoot = content.closest("[data-locale-root]");

    await new Promise((resolve) => window.setTimeout(resolve, 20));

    expect(transitionRoot).not.toHaveAttribute("data-locale-switching");
    expect(transitionRoot?.querySelector('[data-locale-layer="previous"]')).toBeNull();

    await waitFor(() =>
      expect(window.sessionStorage.getItem(LOCALE_TRANSITION_STORAGE_KEY)).toBeNull(),
      { timeout: 200 },
    );
  });

  it("keeps the document lang attribute aligned with the active locale", async () => {
    render(
      <LocaleTransitionProvider locale="zh">
        <div data-locale-region="main">中文内容</div>
      </LocaleTransitionProvider>,
    );

    await waitFor(() => expect(document.documentElement.lang).toBe("zh"));
  });
});
