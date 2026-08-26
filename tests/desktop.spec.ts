import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { DesktopPage } from "../pages/desktop.page";

test.describe("Desktop tests", async () => {
  let desktopPage: DesktopPage;
  test.beforeEach(async ({ page }) => {
    const userLogin = loginData.userLogin;
    const userPassword = loginData.userPassword;
    const loginPage = new LoginPage(page);
    desktopPage = new DesktopPage(page);

    await page.goto("/");
    loginPage.logIn(userLogin, userPassword);
  });

  test("Success transaction", async ({ page }) => {
    //Arrange
    const receiverID = "1";
    const transferAmount = "120";
    const tranferTitle = "pizza";
    const successfulTransferMessage = `Przelew wykonany! Jan Demobankowy - ${transferAmount},00PLN - ${tranferTitle}`;

    //Act
    await page.waitForLoadState("domcontentloaded");
    desktopPage.successTransaction(receiverID, transferAmount, tranferTitle);

    //Assert
    await expect(desktopPage.messageField).toHaveText(
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
    desktopPage.successTopUp(topUpPhoneNumber, topUpAmount);

    //Assert
    await expect(desktopPage.confirmationMessageField).toHaveText(
      expectedMessage,
    );
  });
  test("Success change ballance after topUp", async ({ page }) => {
    //Arange
    const topUpAmount = "20";
    const topUpPhoneNumber = "502 xxx xxx";
    const initialBalance = await page.locator("#money_value").innerText();
    const expectedBalance = Number(initialBalance) - Number(topUpAmount);

    //Act
    await page.waitForLoadState("domcontentloaded");

    desktopPage.successTopUp(topUpPhoneNumber, topUpAmount);

    //Assert
    await expect(desktopPage.totalMoneyValue).toHaveText(`${expectedBalance}`);
  });
});
