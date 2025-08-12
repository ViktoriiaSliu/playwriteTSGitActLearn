import { test, expect } from '@playwright/test';
import { ProductListingPage } from '../pages/product_listing_page';

test.describe.serial('Check products', () => {
  let productListingPage: ProductListingPage;
  let page;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    productListingPage = new ProductListingPage(page);
    await productListingPage.open();
  });

  test('should scroll to product', async () => {
    await productListingPage.pinkDress.scrollIntoViewIfNeeded();
    await expect(productListingPage.pinkDress).toBeVisible();
  });

  test('should hover over the product', async () => {
    await productListingPage.pinkDress.hover();
    await expect(productListingPage.pinkDressHoverElement).toBeVisible();
  });

  test('go to product details', async () => {
    await productListingPage.pinkDressViewBtn.click();
    await expect(productListingPage.pinkDressImage).toBeVisible();
  });

  test('check product condition', async () => {
    const conditionText =
      await productListingPage.pinkDressViewCondition.textContent();
    await expect(conditionText).toContain('Condition: New');
  });

  test('should get attributes from product', async () => {
    const link = productListingPage.pinkDressViewQuantity;
    const idAttribute = await link.getAttribute('id');
    console.log('ID attribute:', idAttribute);
    await expect(idAttribute).toBe('quantity');
  });
});
