import { getAuthToken } from "./auth";
import { CustomError } from "./utils";

type FetchConfig = RequestInit & {
  baseURL?: string;
  params?: Record<string, string>;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function buildUrl(
  endpoint: string,
  baseURL: string | undefined,
  params?: Record<string, string>
) {
  if (!baseURL) {
    throw new Error("URL base não configurada");
  }

  const normalizedBaseURL = baseURL?.endsWith("/") ? baseURL : `${baseURL}/`;
  const normalizedEndpoint = endpoint.startsWith("/")
    ? endpoint.slice(1)
    : endpoint;
  const url = new URL(normalizedEndpoint, normalizedBaseURL);

  if (params) {
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.append(key, value)
    );
  }

  return url;
}

async function getAuthHeaders(init?: RequestInit): Promise<Headers> {
  const headers = new Headers(init?.headers);

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  headers.set("Accept", "application/json");

  let token: string | null = null;

  if (typeof window !== "undefined") {
    token = localStorage.getItem("client_token") ?? null;
  } else {
    token = await getAuthToken();
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return headers;
}

export async function fetchApi(endpoint: string, config?: FetchConfig) {
  try {
    const { baseURL = BASE_URL, params, ...init } = config ?? {};
    const url = await buildUrl(endpoint, baseURL, params);
    const headers = await getAuthHeaders(init);

    const response = await fetch(url.toString(), {
      ...init,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      if (error.status === 401) {
        if (typeof window !== "undefined") {
          window.location.href = "/dashboard";
        }
      }
      throw new CustomError(
        error.message || `Erro na requisição: ${response.status}`,
        response.status
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof CustomError) throw error;

    console.error("Fetch error:", error);
    throw new CustomError(
      error instanceof Error ? error.message : "Erro na requisição",
      500
    );
  }
}
