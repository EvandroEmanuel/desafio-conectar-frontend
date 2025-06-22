import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "jwt-decode";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { Filters, StorageData } from "@/types/global";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export class CustomError extends Error {
  statusCode?: number;
  isFetchError?: boolean;

  constructor(message: string, statusCode?: number, isFetchError?: boolean) {
    super(message);
    this.statusCode = statusCode;
    this.isFetchError = isFetchError;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export const getCookie = (name: string): string | null => {
  if (typeof window === "undefined") return null;

  try {
    return (
      document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith(`${name}=`))
        ?.split("=")[1] ?? null
    );
  } catch (error) {
    console.error("Erro ao ler cookie:", error);
    return null;
  }
};

export const setLocalStorage = (
  token: string,
  name: string,
  sub: string,
  user: { sub: string; name: string }
): string | null => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp)
      throw new Error("Token inválido ou sem data de expiração");

    const hash = btoa(`${name}:${sub}:${decoded.exp}`);
    const data: StorageData = {
      name,
      sub,
      hash,
      expiresAt: decoded.exp * 1000,
      user,
    };

    localStorage.setItem("auth_data", JSON.stringify(data));
    localStorage.setItem("client_token", token);

    return hash;
  } catch (error) {
    console.error("Erro ao salvar dados no localStorage:", error);
    return null;
  }
};

export const getStorageData = (tokenKey: string): StorageData | null => {
  try {
    const data = localStorage.getItem("auth_data");
    if (!data) return null;

    const parsed: StorageData = JSON.parse(data);
    if (Date.now() > parsed.expiresAt) {
      localStorage.removeItem("auth_data");
      localStorage.removeItem(tokenKey);
      localStorage.removeItem("roles");
      return null;
    }

    return parsed;
  } catch (error) {
    console.error("Erro ao recuperar dados do localStorage:", error);
    localStorage.removeItem("auth_data");
    localStorage.removeItem("client_token");
    localStorage.removeItem("profile");
    localStorage.removeItem("user");
    localStorage.removeItem(tokenKey);
    localStorage.removeItem("roles");
    return null;
  }
};

export const removeLocalStorage = () => {
  localStorage.removeItem("auth_data");
  localStorage.removeItem("client_token");
  localStorage.removeItem("profile");
  localStorage.removeItem("user");
};

export const queryParamsChangePage = (filters: Filters) => {
  const newPage = filters?.page ? filters.page + 1 : 1;

  const validFilters = Object.entries(filters || {}).reduce(
    (acc, [key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        acc[key as keyof Filters] = value;
      }
      return acc;
    },
    {} as Filters
  );

  return {
    ...validFilters,
    page: newPage,
  };
};

export const formatDateInputOrPayload = (date: string) => {
  const dateFormatted = date?.substring(0, 10);
  const getDay = Number(dateFormatted?.split("/")[0]);
  const getMonth = Number(dateFormatted?.split("/")[1]);
  const getYear = Number(dateFormatted?.split("/")[2]);

  const BackFormatError = `${getYear}-${getMonth}-${getDay}`;

  try {
    const dateFormatted = format(
      new Date(getYear, getMonth - 1, getDay),
      "yyyy-MM-dd",
      { locale: ptBR }
    );
    return dateFormatted;
  } catch (error) {
    console.log(error);
    return BackFormatError;
  }
};

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("client_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para lidar com erros (opcional)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      removeLocalStorage();
      window.location.href = "/login"; // redireciona se token inválido
    }
    return Promise.reject(error);
  }
);

export { apiClient };
