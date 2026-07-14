import { test, expect } from "@playwright/test";
import { describe } from "node:test";

test.describe("Desktop tests", async () => {
  test("first test", async ({ page }) => {
    //Arrange
    const userLogin = "tester12";
    const userPassword = "haslo333";
    const receiverID = "1";
    const transferAmount = "120";
    const tranferTitle = "pizza";
    const successfulTransferMessage = `Przelew wykonany! Jan Demobankowy - ${transferAmount},00PLN - ${tranferTitle}`;

    //Act
    await page.goto("/");
    await page.getByTestId("login-input").fill(userLogin);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();

    await page.waitForLoadState("domcontentloaded");

    await page.locator("#widget_1_transfer_receiver").selectOption(receiverID);
    await page.locator("#widget_1_transfer_amount").fill(transferAmount);
    await page.locator("#widget_1_transfer_title").fill(tranferTitle);
    await page.getByRole("button", { name: "wykonaj" }).click();
    await page.getByTestId("close-button").click();
    //Assert

    await expect(page.getByTestId("message-text")).toHaveText(
      successfulTransferMessage,
    );
  });

  test("Success mobile top-up", async ({ page }) => {
    //Arange
    const userPassword = "haslo333";
    const userLogin = "tester12";
    const topUpAmount = "20";
    const topUpPhoneNumber = "502 xxx xxx";
    //Act
    await page.goto("/");
    await page.getByTestId("login-input").fill(userLogin);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();

    await page.waitForLoadState("domcontentloaded");

    await page
      .locator("#widget_1_topup_receiver")
      .selectOption(topUpPhoneNumber);
    await page.locator("#widget_1_topup_amount").fill(topUpAmount);
    await page.locator("#widget_1_topup_agreement").check();
    await page.locator("#execute_phone_btn").click();
    await page.getByTestId("close-button").click();

    //Assert
    await expect(
      page.getByRole("link", { name: "Doładowanie wykonane! 20," }),
    ).toHaveText(
      ` Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpPhoneNumber}`,
    );
  });
});
