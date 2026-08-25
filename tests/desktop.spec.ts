import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";

test.describe("Desktop tests", async () => {
  test.beforeEach(async ({ page }) => {
    const userLogin = loginData.userLogin
    const userPassword = loginData.userPassword

    await page.goto("/");
    await page.getByTestId("login-input").fill(userLogin);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();
  });

  test("Success transaction", async ({ page }) => {
    //Arrange
    const receiverID = "1";
    const transferAmount = "120";
    const tranferTitle = "pizza";
    const successfulTransferMessage = `Przelew wykonany! Jan Demobankowy - ${transferAmount},00PLN - ${tranferTitle}`;

    //Act
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
    const topUpAmount = "20";
    const topUpPhoneNumber = "502 xxx xxx";
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpPhoneNumber}`;

    //Act
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
    ).toHaveText(expectedMessage);
  });
  test("Success change ballance after topUp", async ({ page }) => {
    //Arange
    const topUpAmount = "20";
    const topUpPhoneNumber = "502 xxx xxx";
    const initialBalance = await page.locator("#money_value").innerText();
    const expectedBalance = Number(initialBalance) - Number(topUpAmount);

    //Act
    await page.waitForLoadState("domcontentloaded");

    await page
      .locator("#widget_1_topup_receiver")
      .selectOption(topUpPhoneNumber);
    await page.locator("#widget_1_topup_amount").fill(topUpAmount);
    await page.locator("#widget_1_topup_agreement").check();
    await page.locator("#execute_phone_btn").click();
    await page.getByTestId("close-button").click();

    //Assert
    await expect(page.locator("#money_value")).toHaveText(`${expectedBalance}`);
  });
});
