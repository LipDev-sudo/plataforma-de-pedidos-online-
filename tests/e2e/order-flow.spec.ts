import { expect, test } from "@playwright/test";

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

for (const viewport of viewports) {
  test(`${viewport.name}: completes and tracks a simulated order`, async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });

    await page.setViewportSize(viewport);
    await page.goto("/");
    await page.evaluate(() => window.localStorage.clear());
    await page.reload();

    await expect(page).toHaveTitle("Mesaora | Do cardápio ao pedido, direto.");
    await expect(page.locator('link[rel="icon"]')).toHaveAttribute("href", "/favicon.svg");
    await expect(page.getByRole("heading", { name: "Forno da Vila" })).toBeVisible();

    const dimensions = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
    }));
    expect(dimensions.documentWidth).toBeLessThanOrEqual(dimensions.viewportWidth);
    await expect(page.locator('a[href="#"]')).toHaveCount(0);
    await page.keyboard.press("Tab");
    expect(await page.evaluate(() => document.activeElement?.matches(":focus-visible"))).toBe(true);

    await page.getByRole("link", { name: "Margherita da Vila" }).first().click();
    await page.getByRole("button", { name: /Adicionar ao carrinho/ }).click();
    await expect(page.getByRole("heading", { name: "Seu carrinho" })).toBeVisible();
    await page.getByRole("button", { name: "Continuar para o checkout" }).click();

    await page.getByRole("button", { name: /Confirmar pedido/ }).click();
    await expect(page.getByRole("alert")).toContainText("Informe rua e número");
    await page.getByPlaceholder("Rua e número").fill("Rua da Vila, 100");
    await page.getByRole("button", { name: /Dinheiro/ }).click();
    await page.getByRole("button", { name: /Confirmar pedido/ }).click();
    await expect(page.getByRole("heading", { name: "Pedido confirmado" })).toBeVisible();

    await page.getByRole("button", { name: "Acompanhar pedido" }).click();
    await expect(page.getByText("Preparando")).toBeVisible();
    await page.getByRole("button", { name: "Simular saída" }).click();
    await expect(page.getByText("A caminho")).toBeVisible();
    await page.getByRole("button", { name: "Simular entrega" }).click();
    await expect(page.getByText("Entregue")).toBeVisible();

    await page.reload();
    await expect(page.getByText("Entregue")).toBeVisible();
    await page.getByRole("button", { name: "Pedir novamente" }).click();
    await expect(page.getByRole("heading", { name: "Seu carrinho" })).toBeVisible();
    await expect(page.getByText("Margherita da Vila")).toBeVisible();
    expect(consoleErrors).toEqual([]);
  });
}
