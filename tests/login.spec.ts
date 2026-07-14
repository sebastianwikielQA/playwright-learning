import { test, expect } from "@playwright/test";

test.describe("Login test to demobank", () => {
  test("sucessful login with correct credentials", async ({ page }) => {
    //Arrange
    const userNameLocator = await page.getByTestId("user-name");
    const userLogin = "tester12";
    const userPassword = "haslo333";
    const expectedUserName = "Jan Demobankowy";

    //Act
    await page.goto("/");
    await page.getByTestId("login-input").fill(userLogin);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();

    //Assert
    await expect(userNameLocator).toBeVisible();
    await expect(userNameLocator).toHaveText(expectedUserName);
  });

  test("unsucessful login with incorrect credentials using too short password and too short login", async ({
    page,
  }) => {
    const userNameLocator = await page.getByTestId("user-name");

    await page.goto("/");
    await page.locator("#login_id").fill("test");
    await page.getByTestId("login-input").blur();
    await page.getByTestId("password-input").fill("test");
    await page.getByTestId("password-input").blur();

    await expect(page.getByTestId("error-login-id")).toHaveText(
      "identyfikator ma min. 8 znaków",
    );
    await expect(page.getByTestId("error-login-password")).toHaveText(
      "hasło ma min. 8 znaków",
    );
  });

  test("login test incorrect credentials with empty login", async ({
    page,
  }) => {
    await page.goto("/");
    await page.locator("#login_id").click;
    await page.locator("#login_id").press("Tab");
    await page.getByTestId("password-input").click;
    await page.getByTestId("password-input").press("Tab");

    await expect(page.getByTestId("error-login-id")).toHaveText(
      "pole wymagane",
    );
    await expect(page.getByTestId("error-login-password")).toHaveText(
      "pole wymagane",
    );
  });
});
