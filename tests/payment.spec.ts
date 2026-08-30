import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PaymentPage } from "../pages/payment.page";
import { SideMenuComponent } from "../components/side-menu.components";

test.describe("Payment tests", async () => {
  let paymentPage: PaymentPage;
  let sideMenuComponent: SideMenuComponent;
  test.beforeEach(async ({ page }) => {
    const userPassword = loginData.userPassword;
    const userLogin = loginData.userLogin;
    const loginPage = new LoginPage(page);
    paymentPage = new PaymentPage(page);
    sideMenuComponent = new SideMenuComponent(page);

    await page.goto("/");
    await loginPage.logIn(userLogin, userPassword);
    await sideMenuComponent.paymentButton.click();
  });

  test("Successful simple payment", { tag: "@payment" }, async ({}) => {
    const bankAccount = "12 3456 7890 1234 4567 8901";
    const transferAmount = "100";
    const transferTitle = "przelew";
    const transferReceiver = "Roman Demobank";
    const successfulTransferMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;

    await paymentPage.makeTransfer(
      transferReceiver,
      bankAccount,
      transferAmount,
      transferTitle,
    );

    await expect(paymentPage.transferMessage).toHaveText(
      successfulTransferMessage,
    );
  });
});
