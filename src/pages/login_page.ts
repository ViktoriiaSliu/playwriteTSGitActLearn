import { BasePage } from '../pages/base_page.ts';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get emailInputLogin() {
    return this.page
      .locator('form')
      .filter({ hasText: 'Login' })
      .getByPlaceholder('Email Address');
  }
  get passwordInputLogin() {
    return this.page.getByRole('textbox', { name: 'Password' });
  }
  get loginBtn() {
    return this.page.getByRole('button', { name: 'Login' });
  }
  get loginHeader() {
    return this.page.getByRole('heading', { name: 'Login to your account' });
  }

  get emailInputSignUp() {
    return this.page
      .locator('form')
      .filter({ hasText: 'Signup' })
      .getByPlaceholder('Email Address');
  }
  get nameInputSignUp() {
    return this.page.getByRole('textbox', { name: 'Name' });
  }
  get signUpBtn() {
    return this.page.getByRole('button', { name: 'Signup' });
  }
  get signUpHeader() {
    return this.page.getByRole('heading', { name: 'New User Signup!' });
  }

  async open() {
    await this.navigate('login');
    await this.waitForVisible(this.emailInputLogin);
  }

  async login(email: string, password: string) {
    await this.waitForClickable(this.emailInputLogin);
    await this.emailInputLogin.fill(email);
    await this.waitForClickable(this.passwordInputLogin);
    await this.passwordInputLogin.fill(password);
    await this.waitForClickable(this.loginBtn);
    await this.loginBtn.click();
  }

  async signUp(email: string, name: string) {
    await this.waitForClickable(this.nameInputSignUp);
    await this.nameInputSignUp.fill(name);
    await this.waitForClickable(this.emailInputSignUp);
    await this.emailInputSignUp.fill(email);
    await this.waitForClickable(this.signUpBtn);
    await this.signUpBtn.click();
  }
}
