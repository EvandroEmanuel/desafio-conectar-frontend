import { TOKEN_KEY } from "@/config";
import axios from "axios";
import { cookies } from "next/headers";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(
  async (config) => {
    const cookieStore = cookies();
    const token = (await cookieStore).get(TOKEN_KEY)?.value;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("Request Interceptor Error:", error);
    return Promise.reject(new Error(error.message || "Erro desconhecido"));
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(new Error(error.response?.data || error.message));
  }
);

export { api };
