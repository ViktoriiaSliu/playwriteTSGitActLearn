//import { ProductsApi } from '../api_pages/products_api';
//import { UserApi } from '../api_pages/user_api';
import { test, expect } from '../fixtures/api_fixtures';

const user = {
  name: 'John Doe',
  email: `autotest_${Date.now()}@example.com`,
  password: 'StrongPassword123!',
  title: 'Mr',
  birth_date: '1',
  birth_month: '3',
  birth_year: '1997',
  firstname: 'John',
  lastname: 'Doe',
  company: 'Test Company',
  address1: '123 Main St',
  address2: '122 Main St',
  country: 'Canada',
  zipcode: 'M4B1B3',
  state: 'Ontario',
  city: 'Toronto',
  mobile_number: '1234567890',
};

test.describe.serial('Full API User Flow', () => {
  test.describe('GET All Products List', () => {
    //let responseStatus: number;
    let body;

    test.beforeAll(async ({ productsApi }) => {
      const result = await productsApi.get('/productsList');
      //responseStatus = result.status;
      body = result.body;
    });

    test('Response status should be 200', async ({ productsApi }) => {
      const result = await productsApi.get('/productsList');
      expect(result.status).toBe(200);
      //expect(responseStatus).toBe(200);
    });

    test('Response body should be a list', async () => {
      expect(Array.isArray(body.products)).toBeTruthy();
    });

    test('Response body should contain a list of products', async () => {
      expect(body.products.length).toBeGreaterThan(0);
    });

    test('First product should have name', async () => {
      const product = body.products[0];
      expect(product).toHaveProperty('name');
    });

    test('First product should have price', async () => {
      const product = body.products[0];
      expect(product).toHaveProperty('price');
    });

    test('First product should have ctegory properties', async () => {
      const product = body.products[0];
      expect(product).toHaveProperty('category');
    });
  });

  test.describe('1. Create new user', () => {
    let responseBody;
    let responseStatus: number;

    test.beforeAll(async ({ userApi }) => {
      const result = await userApi.post('/createAccount', user);
      responseBody = result.body;
      responseStatus = result.status;
    });

    test('Response status should be 200', async () => {
      expect(responseStatus).toBe(200);
    });

    test('Response body should contain a success message', async () => {
      expect(responseBody.message).toContain('User created!');
    });
  });

  test.describe('2. Login with correct credentials', () => {
    let responseBody;
    let responseStatus: number;

    test.beforeAll(async ({ userApi }) => {
      const result = await userApi.post('/verifyLogin', {
        email: user.email,
        password: user.password,
      });
      responseBody = result.body;
      responseStatus = result.status;
    });

    test('Response status code should be 200', async () => {
      expect(responseStatus).toBe(200);
    });

    test('Response body should contain a success message', async () => {
      expect(responseBody.message).toContain('User exists!');
    });
  });

  test.describe('3. Login with wrong credentials', () => {
    let responseBody;
    let responseStatus: number;

    test.beforeAll(async ({ userApi }) => {
      const result = await userApi.post('/verifyLogin', {
        email: user.email,
        password: 'wrongPass',
      });
      responseBody = result.body;
      responseStatus = result.status;
    });

    test('Response status code should be 200', async () => {
      expect(responseStatus).toBe(200);
    });

    test('Response body should contain an incorrect message', async () => {
      expect(responseBody.message).toContain('User not found!');
    });
  });

  test.describe('4. Update user data', () => {
    let responseBody;
    let responseStatus: number;

    test.beforeAll(async ({ userApi }) => {
      user.firstname = 'UpdatedName';
      const result = await userApi.put('/updateAccount', user);
      responseBody = result.body;
      responseStatus = result.status;
    });

    test('Response status code should be 200', async () => {
      expect(responseStatus).toBe(200);
    });

    test('Response body should contain an updated message', async () => {
      expect(responseBody.message).toContain('User updated!');
    });
  });

  test.describe('5. Delete user', () => {
    let responseBody;
    let responseStatus: number;

    test.beforeAll(async ({ userApi }) => {
      const result = await userApi.delete('/deleteAccount', {
        email: user.email,
        password: user.password,
      });
      responseBody = result.body;
      responseStatus = result.status;
    });

    test('Response status code should be 200', async () => {
      expect(responseStatus).toBe(200);
    });

    test('Response body should contain a deleted message', async () => {
      expect(responseBody.message).toContain('Account deleted!');
    });
  });

  test.describe('6. Login after deletion should fail', () => {
    let responseBody;
    let responseStatus: number;

    test.beforeAll(async ({ userApi }) => {
      const result = await userApi.post('/verifyLogin', {
        email: user.email,
        password: user.password,
      });
      responseBody = result.body;
      responseStatus = result.status;
    });

    test('Response status code should be 200', async () => {
      expect(responseStatus).toBe(200);
    });

    test('Response body should contain an error message', async () => {
      expect(responseBody.message).toContain('User not found!');
    });
  });
});
