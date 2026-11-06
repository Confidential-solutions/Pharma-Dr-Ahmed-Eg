import type { ApiResponse } from "@/types/api";

export class ApiError extends Error {
  public status: number;
  public errors: string[];

  constructor(message: string, status: number = 500, errors: string[] = []) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || "http://localhost:5076/api";

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL.replace(/\/+$/, "")}/${endpoint.replace(/^\/+/, "")}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data: ApiResponse<T> = await response.json().catch(() => ({
      success: response.ok,
      message: response.statusText,
      data: null,
      errors: [response.statusText],
      timestamp: new Date().toISOString(),
    }));

    if (!response.ok || !data.success) {
      throw new ApiError(
        data.message || `Request failed with status ${response.status}`,
        response.status,
        data.errors || [],
      );
    }

    return data;
  } catch (err: unknown) {
    if (err instanceof ApiError) {
      throw err;
    }
    const message = err instanceof Error ? err.message : "Network error occurred";
    throw new ApiError(message, 0, [message]);
  }
}
