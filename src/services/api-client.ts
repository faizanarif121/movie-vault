import { config } from './config';

type QueryParams = Record<string, string | number | boolean>;

class ApiClient {
  private buildUrl(path: string, params: QueryParams = {}): string {
    const url = new URL(`${config.baseUrl}${path}`);
    url.searchParams.set('api_key', config.apiKey);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, String(value));
      }
    });
    
    return url.toString();
  }

  async fetch<T>(path: string, params?: QueryParams): Promise<T> {
    const url = this.buildUrl(path, params);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(
        `API error: ${response.status} ${response.statusText}`
      );
    }
    
    return response.json() as Promise<T>;
  }
}

export const apiClient = new ApiClient();