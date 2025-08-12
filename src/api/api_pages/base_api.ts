import { APIRequestContext } from '@playwright/test';

export abstract class BaseApi {
  protected request: APIRequestContext;
  protected apiBaseUrl = 'https://automationexercise.com/api';

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  protected async logResponseTime<T>(
    action: string,
    fn: () => Promise<T>
  ): Promise<T> {
    const startTime = Date.now();
    const result = await fn();
    const duration = Date.now() - startTime;
    console.log(`Time ${action} took ${duration}ms`);
    return result;
  }
}
