import { BaseApi } from './base_api';

export class UserApi extends BaseApi {
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

  async post(
    endpoint: string,
    data: Record<string, any>
  ): Promise<{ status: number; body: any }> {
    try {
      return await this.logResponseTime(`POST ${endpoint}`, async () => {
        const response = await this.request.post(
          `${this.apiBaseUrl}${endpoint}`,
          { form: data }
        );

        const status = response.status();
        let body: any;

        if (status >= 200 && status < 300) {
          body = await response.json();
        } else {
          const responseText = await response.text();
          console.error(
            `Unsuccessful API call to ${endpoint}. Status: ${status}, Response text: ${responseText}`
          );

          try {
            body = JSON.parse(responseText);
          } catch (error) {
            console.log(error);
            body = { error: `Non-JSON response: ${responseText}` };
          }
        }

        return { status, body };
      });
    } catch (error) {
      console.error(` Error while calling POST ${endpoint}:`, error);
      throw error;
    }
  }

  async put(
    endpoint: string,
    data: Record<string, any>
  ): Promise<{ status: number; body: any }> {
    try {
      return await this.logResponseTime(`PUT ${endpoint}`, async () => {
        const response = await this.request.put(
          `${this.apiBaseUrl}${endpoint}`,
          { form: data }
        );
        const body = await response.json();
        return { status: response.status(), body };
      });
    } catch (error) {
      console.error(` Error while calling PUT ${endpoint}:`, error);
      throw error;
    }
  }

  async delete(
    endpoint: string,
    data?: Record<string, any>
  ): Promise<{ status: number; body: any }> {
    try {
      return await this.logResponseTime(`DELETE ${endpoint}`, async () => {
        const response = await this.request.delete(
          `${this.apiBaseUrl}${endpoint}`,
          { form: data }
        );
        const body = await response.json();
        return { status: response.status(), body };
      });
    } catch (error) {
      console.error(` Error while calling DELETE ${endpoint}:`, error);
      throw error;
    }
  }
}
