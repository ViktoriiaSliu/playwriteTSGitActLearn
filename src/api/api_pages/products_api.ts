import { BaseApi } from './base_api';

export class ProductsApi extends BaseApi {
  async get(endpoint: string): Promise<{ status: number; body: any }> {
    try {
      return await this.logResponseTime(`GET ${endpoint}`, async () => {
        const response = await this.request.get(
          `${this.apiBaseUrl}${endpoint}`
        );
        const body = await response.json();
        return { status: response.status(), body };
      });
    } catch (error) {
      console.error(` Error while calling GET ${endpoint}:`, error);
      throw error;
    }
  }
}
