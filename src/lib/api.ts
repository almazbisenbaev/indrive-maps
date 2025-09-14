import { ApiResponse, ApiError } from '@/types/api';

const BACKEND_URL = 'http://192.168.0.102:8081';

export class ApiService {
  private static async fetchWithErrorHandling<T>(
    url: string,
    options?: RequestInit
  ): Promise<T> {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        const errorData: ApiError = await response.json().catch(() => ({
          error: 'Network Error',
          message: `HTTP ${response.status}: ${response.statusText}`,
        }));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  }

  static async getMaps(): Promise<ApiResponse> {
    return this.fetchWithErrorHandling<ApiResponse>(`${BACKEND_URL}/`);
  }

  static getMapUrl(mapUrl: string): string {
    return `${BACKEND_URL}${mapUrl}`;
  }

  static async testConnection(): Promise<boolean> {
    try {
      await this.getMaps();
      return true;
    } catch {
      return false;
    }
  }
}
