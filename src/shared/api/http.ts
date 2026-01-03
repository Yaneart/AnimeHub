const BASE_URL = "https://api.jikan.moe/v4";

export class ApiError extends Error {
  public status: number;
  public payload?: unknown;

  constructor(status: number, message: string, payload?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

export async function http<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    let message = "API request failed";
    let payload: unknown = undefined;

    try {
      const data = await response.json();
      payload = data;

      if (typeof data?.message === "string") {
        message = data.message;
      }
    } catch {}

    throw new ApiError(response.status, message, payload);
  }

  return response.json();
}
