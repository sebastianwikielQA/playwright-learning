import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";

test.describe("Login test to demobank", () => {
  test("sucessful login with correct credentials", async ({ page }) => {
    //Arrange
    const userNameLocator = await page.getByTestId("user-name");
    const userLogin = loginData.userLogin;
    const userPassword = loginData.userPassword;
    const expectedUserName = "Jan Demobankowy";
    const loginInputLocator = page.getByTestId("login-input");
    const passwordInputLocator = page.getByTestId("password-input");
    const loginButtonLocator = page.getByTestId("login-button");

    //Act
    await page.goto("/");
    await loginInputLocator.fill(userLogin);
    await passwordInputLocator.fill(userPassword);
    await loginButtonLocator.click();

    //Assert
    await expect(userNameLocator).toBeVisible();
    await expect(userNameLocator).toHaveText(expectedUserName);
  });

  test("unsucessful login with incorrect credentials using too short password and too short login", async ({
    page,
  }) => {
    const incorrectUserLogin = "test";
    const incorrectUserPassword = "haslo";
    const errorMessageForLoginId = "identyfikator ma min. 8 znaków";
    const errorMessageForPassword = "hasło ma min. 8 znaków";
    const loginInputLocator = page.getByTestId("login-input");
    const passwordInputLocator = page.getByTestId("password-input");

    await page.goto("/");
    await loginInputLocator.fill(incorrectUserLogin);
    await loginInputLocator.blur();
    await passwordInputLocator.fill(incorrectUserPassword);
    await passwordInputLocator.blur();

    await expect(page.getByTestId("error-login-id")).toHaveText(
      errorMessageForLoginId,
    );
    await expect(page.getByTestId("error-login-password")).toHaveText(
      errorMessageForPassword,
    );
  });

  test("login test incorrect credentials with empty login", async ({
    page,
  }) => {
    const errorMessageRequiredInput = "pole wymagane";

    await page.goto("/");
    await page.locator("#login_id").click();
    await page.locator("#login_id").press("Tab");
    await page.getByTestId("password-input").click();
    await page.getByTestId("password-input").press("Tab");

    await expect(page.getByTestId("error-login-id")).toHaveText(
      errorMessageRequiredInput,
    );
    await expect(page.getByTestId("error-login-password")).toHaveText(
      errorMessageRequiredInput,
    );
  });
});
