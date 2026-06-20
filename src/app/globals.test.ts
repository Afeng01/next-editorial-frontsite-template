import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

const globalsCssPath = path.join(process.cwd(), "src/app/globals.css");

function readZIndexForSelector(selector: string) {
  const css = readFileSync(globalsCssPath, "utf8");
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const blockPattern = new RegExp(`${escapedSelector}\\s*\\{([\\s\\S]*?)\\}`, "m");
  const blockMatch = css.match(blockPattern);

  if (!blockMatch) {
    throw new Error(`Missing CSS block for selector: ${selector}`);
  }

  const zIndexMatch = blockMatch[1].match(/z-index:\s*(\d+);/);

  if (!zIndexMatch) {
    throw new Error(`Missing z-index declaration for selector: ${selector}`);
  }

  return Number(zIndexMatch[1]);
}

describe("locale transition layer stacking", () => {
  it("keeps the incoming layer above the outgoing layer", () => {
    const previousLayerZIndex = readZIndexForSelector(
      '[data-locale-root][data-locale-switching="true"] .locale-transition-layer[data-locale-layer="previous"]',
    );
    const currentLayerZIndex = readZIndexForSelector(
      '[data-locale-root][data-locale-switching="true"] .locale-transition-layer[data-locale-layer="current"]',
    );

    expect(currentLayerZIndex).toBeGreaterThan(previousLayerZIndex);
  });
});
