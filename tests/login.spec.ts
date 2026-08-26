import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { DesktopPage } from "../pages/desktop.page";

test.describe("Login test to demobank", () => {
  let loginPage: LoginPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto("/");
  });
  test("sucessful login with correct credentials", async ({ page }) => {
    //Arrange
    const userLogin = loginData.userLogin;
    const userPassword = loginData.userPassword;
    const expectedUserName = "Jan Demobankowy";
    const desktopPage = new DesktopPage(page);

    //Act
    loginPage.logIn(userLogin, userPassword);

    //Assert
    await expect(desktopPage.userNameLocator).toHaveText(expectedUserName);
  });

  test("unsucessful login with incorrect credentials using too short password and too short login", async ({
    page,
  }) => {
    const incorrectUserLogin = "test";
    const incorrectUserPassword = "haslo";
    const errorMessageForLoginId = "identyfikator ma min. 8 znaków";
    const errorMessageForPassword = "hasło ma min. 8 znaków";

    await loginPage.loginInputLocator.fill(incorrectUserLogin);
    await loginPage.loginInputLocator.blur();
    await loginPage.passwordInputLocator.fill(incorrectUserPassword);
    await loginPage.passwordInputLocator.blur();

    await expect(loginPage.loginError).toHaveText(errorMessageForLoginId);
    await expect(loginPage.passwordError).toHaveText(errorMessageForPassword);
  });

  test("login test incorrect credentials with empty login", async ({
    page,
  }) => {
    const errorMessageRequiredInput = "pole wymagane";

    loginPage.skipLoginField(page);
    loginPage.skipPasswordField(page);

    await expect(loginPage.loginError).toHaveText(errorMessageRequiredInput);
    await expect(loginPage.passwordError).toHaveText(errorMessageRequiredInput);
  });
});
