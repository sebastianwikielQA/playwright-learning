import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PaymentPage } from "../pages/payment.page";

test.describe("Payment tests", async () => {
  let paymentPage: PaymentPage;
  test.beforeEach(async ({ page }) => {
    const userPassword = loginData.userPassword;
    const userLogin = loginData.userLogin;
    const loginPage = new LoginPage(page);
    paymentPage = new PaymentPage (page)

    await page.goto("/");
    await loginPage.loginInputLocator.fill(userLogin);
    await loginPage.passwordInputLocator.fill(userPassword);
    await loginPage.loginButtonLocator.click();
    await page.getByRole("link", { name: "płatności" }).click();
  });

  test("Successful simple payment", async ({ page }) => {
    const bankAccount = "12 3456 7890 1234 4567 8901";
    const transferAmount = "100";
    const transferTitle = "przelew";
    const transferReceiver = "Roman Demobank";
    const successfulTransferMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;

    await paymentPage.transferReceiverField.fill(transferReceiver);
    await paymentPage.bankAccountField.fill(bankAccount);
    await paymentPage.transferAmountField.fill(transferAmount);
    await paymentPage.transferTitleField.fill(transferTitle);
    await paymentPage.proceedTransferButton.click();

    await expect(paymentPage.transferMessage).toHaveText(
      successfulTransferMessage,
    );
  });
});
