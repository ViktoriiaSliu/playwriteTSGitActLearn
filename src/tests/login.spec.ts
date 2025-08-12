import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login_page';
import { RegisterPage } from '../pages/register_page';
import { testData } from '../data/test_data.js';

const loginUserEmail = testData.userStatic.email;
const loginUserPassword = testData.userStatic.password;
const loginUserName = testData.userStatic.firstName;

test.describe.serial('Login Page Tests', () => {
  let loginPage: LoginPage;
  let registerPage: RegisterPage;
  let page;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();

    loginPage = new LoginPage(page);
    registerPage = new RegisterPage(page);

    await loginPage.open();

    try {
      await loginPage.login(loginUserEmail, loginUserPassword);
      console.log(`Користувач ${loginUserEmail} успішно залогінився.`);
    } catch (error) {
      console.log(error);
      console.log(
        `Користувач ${loginUserEmail} не знайдений. Виконуємо реєстрацію...`
      );

      await loginPage.signUp(loginUserEmail, loginUserName);
      await registerPage.waitForVisible(registerPage.registerHeader);

      await registerPage.registration(testData.userStatic);
      await registerPage.createAcountBtn.click();

      await expect(registerPage.confirmationHeader).toContainText(
        'Account Created!'
      );

      await registerPage.confirmationBtnContinue.click();
      console.log(`Користувач ${loginUserEmail} успішно зареєстрований.`);
    }
    await registerPage.logoutIcon.click();
  });

  test('should display login form', async () => {
    await loginPage.open();
    await expect(loginPage.loginHeader).toContainText('Login to your account');
  });

  test('should login with valid credentials', async () => {
    await loginPage.login(loginUserEmail, loginUserPassword);
    console.log(`Користувач ${loginUserEmail} успішно залогінився.`);
    await expect(registerPage.logoutIcon).toContainText('Logout');
  });
});
