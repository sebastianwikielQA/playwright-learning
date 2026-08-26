import { Locator, Page } from "@playwright/test";

export class LoginPage {
  loginInputLocator: Locator;
  loginButtonLocator: Locator;
  passwordInputLocator: Locator;
  loginError: Locator;
  passwordError: Locator;

  constructor(private page: Page) {
    this.loginInputLocator = this.page.getByTestId("login-input");
    this.passwordInputLocator = this.page.getByTestId("password-input");
    this.loginButtonLocator = this.page.getByTestId("login-button");
    this.loginError = this.page.getByTestId("error-login-id");
    this.passwordError = this.page.getByTestId("error-login-password");
  }

  async skipLoginField(page: Page) {
    await page.locator("#login_id").click();
    await page.locator("#login_id").press("Tab");
  }

  async skipPasswordField(page: Page) {
    await page.getByTestId("password-input").click();
    await page.getByTestId("password-input").press("Tab");
  }
}
