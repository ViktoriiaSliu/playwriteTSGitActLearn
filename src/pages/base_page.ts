import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string) {
    await this.page.goto(`https://automationexercise.com/${path}`, {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });
  }

  async waitForVisible(locator: Locator, timeout = 5000) {
    await expect(locator).toBeVisible({ timeout });
  }

  async waitForClickable(locator: Locator, timeout = 5000) {
    await expect(locator).toBeVisible({ timeout });
    //await expect(locator).toBeEnabled({ timeout });
  }

  async getText(locator: Locator) {
    await expect(locator).toBeVisible();
    return await locator.textContent();
  }
}
