import { BasePage } from '../pages/base_page.ts';
import { Page } from '@playwright/test';

export class ProductListingPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get pinkDress() {
    return this.page.locator('div:nth-child(18)');
  }
  get pinkDressHoverElement() {
    return this.page.locator(
      'div:nth-child(18) > .product-image-wrapper > .single-products > .product-overlay'
    );
  }
  get pinkDressHoverElementText() {
    return this.page.getByText('Sleeveless Unicorn Patch Gown').nth(1);
  }
  get pinkDressViewBtn() {
    return this.page.locator(
      'div:nth-child(18) > .product-image-wrapper > .choose > .nav > li > a'
    );
  }
  get pinkDressImage() {
    return this.page
      .getByRole('img', { name: 'ecommerce website products' })
      .first();
  }
  get pinkDressViewCondition() {
    return this.page.getByText('Condition: New');
  }
  get pinkDressViewQuantity() {
    return this.page.locator('#quantity');
  }

  async open() {
    await this.navigate('');
  }
}
