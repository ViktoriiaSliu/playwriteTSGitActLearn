import { test as base } from '@playwright/test';
import { ProductsApi } from '../api_pages/products_api';
import { UserApi } from '../api_pages/user_api';

type MyFixtures = {
  productsApi: ProductsApi;
  userApi: UserApi;
};

export const test = base.extend<MyFixtures>({
  productsApi: async ({ request }, use) => {
    const api = new ProductsApi(request);
    await use(api);
  },
  userApi: async ({ request }, use) => {
    const api = new UserApi(request);
    await use(api);
  },
});
export { expect } from '@playwright/test';
