import { test, expect } from "@playwright/test";
import { describe } from "node:test";

test.describe("Desktop tests", async () => {
  test("first test", async ({ page }) => {
    //logowanie
    await page.goto("/");
    await page.getByTestId("login-input").fill("tester12");
    await page.getByTestId("password-input").fill("haslo333");
    await page.getByTestId("login-button").click();

    await page.waitForLoadState("domcontentloaded");

    //test właściwy
    await page.locator("#widget_1_transfer_receiver").selectOption("1");
    await page.locator("#widget_1_transfer_amount").fill("120");
    await page.locator("#widget_1_transfer_title").fill("pizza");
    await page.getByRole("button", { name: "wykonaj" }).click();
    await page.getByTestId("close-button").click();

    await expect(page.getByTestId("message-text")).toHaveText(
      "Przelew wykonany! Jan Demobankowy - 120,00PLN - pizza",
    );
  });

  test.only("Success mobile top-up", async ({ page }) => {
    //logowanie
    await page.goto("/");
    await page.getByTestId("login-input").fill("tester12");
    await page.getByTestId("password-input").fill("haslo333");
    await page.getByTestId("login-button").click();

    await page.waitForLoadState("domcontentloaded");

    //test właściwy
    await page.locator("#widget_1_topup_receiver").selectOption("502 xxx xxx");
    await page.locator("#widget_1_topup_amount").fill("20");
    await page.locator("#widget_1_topup_agreement").check();
    await page.locator("#execute_phone_btn").click();
    await page.getByTestId("close-button").click();

  await expect(page.getByRole('link', { name: 'Doładowanie wykonane! 20,' })).toHaveText(
      " Doładowanie wykonane! 20,00PLN na numer 502 xxx xxx",
    );

  });
});