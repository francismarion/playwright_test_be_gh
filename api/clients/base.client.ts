import { APIRequestContext, APIResponse } from "@playwright/test";

type RequestOptions = {
  headers?: Record<string, string>;
  params?: Record<string, string>;
  timeout?: number;
  data?: any
};

export class BaseClient {
  private token?: string;

  constructor(protected request: APIRequestContext) {}

  setToken(token: string) {
    this.token = token;
  }

  clearToken() {
    this.token = undefined;
  }

  private withAuth(options: RequestOptions = {}): RequestOptions {
    if (!this.token) return options;

    return {
      ...options,
      headers: {
        ...(options.headers ?? {}),
        Authorization: `Bearer ${this.token}`,
      },
    };
  }

  async get(url: string, options: RequestOptions = {}): Promise<APIResponse> {
    return this.request.get(url, this.withAuth(options));
  }

  async post(url: string, payload?: any, options: RequestOptions = {}): Promise<APIResponse> {
    return this.request.post(url, this.withAuth({
      ...options,
      data: payload,
    
    }));
  }

  async put(url: string, payload?: any, options: RequestOptions = {}): Promise<APIResponse> {
    return this.request.put(url, this.withAuth({
      ...options,
      data: payload,
    }));
  }

  async patch(url: string, payload?: any, options: RequestOptions = {}): Promise<APIResponse> {
    return this.request.patch(url, this.withAuth({
      ...options,
      data: payload,
    }));
  }

  async delete(url: string, options: RequestOptions = {}): Promise<APIResponse> {
    return this.request.delete(url, this.withAuth(options));
  }

}