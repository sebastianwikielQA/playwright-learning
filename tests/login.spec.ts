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
  test(
    "sucessful login with correct credentials",
    { tag: ["@login", "@smoke"], annotation: { type: " ", description: " " } },
    async ({ page }) => {
      //Arrange
      const userLogin = loginData.userLogin;
      const userPassword = loginData.userPassword;
      const expectedUserName = "Jan Demobankowy";
      const desktopPage = new DesktopPage(page);

      //Act
      await loginPage.logIn(userLogin, userPassword);

      //Assert
      await expect(desktopPage.userNameLocator).toHaveText(expectedUserName);
    },
  );

  test(
    "unsucessful login with incorrect credentials using too short password and too short login @login",
    {
      tag: ["@login", "@unhappy_path"],
      annotation: {
        type: "Documentation",
        description: "https://playwright.com/tags",
      },
    },
    async ({ page }) => {
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
    },
  );

  test(
    "login test incorrect credentials with empty login @login",
    {
      tag: ["@unhappy_path", "@login"],
      annotation: {
        type: "Negative test",
        description: "Incorrect credentials",
      },
    },
    async ({ page }) => {
      const errorMessageRequiredInput = "pole wymagane";

      await loginPage.skipLoginField(page);
      await loginPage.skipPasswordField(page);

      await expect(loginPage.loginError).toHaveText(errorMessageRequiredInput);
      await expect(loginPage.passwordError).toHaveText(
        errorMessageRequiredInput,
      );
    },
  );
});
