import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login_page';
import { RegisterPage } from '../pages/register_page';
import { testData } from '../data/test_data.js';

const registerName = testData.userDynamic.firstName;
const registerEmail = testData.userDynamic.email;

test.describe.serial('Register Page Tests', () => {
  let loginPage: LoginPage;
  let registerPage: RegisterPage;
  let page;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    registerPage = new RegisterPage(page);
    await loginPage.open();
  });

  test('should display saignUp form', async () => {
    await expect(loginPage.signUpHeader).toContainText('New User Signup!');
  });

  test('should signUp with provided credentials', async () => {
    await loginPage.signUp(registerEmail, registerName);
    await registerPage.waitForVisible(registerPage.registerHeader);
  });

  test('should redirect to the form for registration', async () => {
    await expect(registerPage.registerHeader).toContainText(
      'Enter Account Information'
    );
  });

  test('should have register user with valid', async () => {
    await registerPage.registration(testData.userDynamic);
  });

  test('should check that newsletter checkbox is unchecked', async () => {
    await expect(registerPage.newsletterCheckbox).not.toBeChecked();
  });

  test('should check that offers checkbox is checked', async () => {
    await registerPage.specialOffersCheckbox.check();
    await expect(registerPage.specialOffersCheckbox).toBeChecked();
  });

  test('should redirect to confirmation page', async () => {
    await registerPage.createAcountBtn.click();
    await expect(registerPage.confirmationHeader).toContainText(
      'Account Created!'
    );
  });

  test('should redirect to home page after click on continue butn', async () => {
    await registerPage.confirmationBtnContinue.click();
    await expect(registerPage.logoutIcon).toContainText('Logout');
  });
});
