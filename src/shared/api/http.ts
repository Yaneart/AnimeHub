const BASE_URL = "https://api.jikan.moe/v4";

export async function http<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    throw new Error("API error");
  }

  return response.json();
}
