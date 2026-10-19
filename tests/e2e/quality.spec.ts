import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = ["/", "/menu", "/item/margherita-da-vila", "/cart", "/orders"];
const viewports = [
  { name: "mobile", width: 375, height: 812 },
  { name: "desktop", width: 1440, height: 900 },
];

for (const viewport of viewports) {
  for (const route of routes) {
    test(`${viewport.name} ${route}: acessibilidade (axe) e layout`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(route);
      await page.waitForLoadState("networkidle");

      const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      expect(
        axe.violations.map((v) => `${v.id}: ${v.nodes.length} elemento(s)`),
        "violações de acessibilidade",
      ).toEqual([]);

      const layout = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        h1: document.querySelectorAll("h1").length,
      }));
      expect(layout.overflow, "overflow horizontal").toBeLessThanOrEqual(0);
      expect(layout.h1, "no máximo um h1").toBeLessThanOrEqual(1);
    });
  }
}
