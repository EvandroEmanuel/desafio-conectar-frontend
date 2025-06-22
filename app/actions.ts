"use server";
import { SUB_KEY, TOKEN_KEY, USERNAME_KEY } from "@/config";
import { type TokenData, type UserProfile } from "@/types/global";
import { jwtDecode } from "jwt-decode";
import { CustomError } from "@/lib/utils";
import { cookies } from "next/headers";
import { api } from "@/services/api-server";
import { userService } from "@/services/userService";
import { fetchApi } from "@/lib/fetch-config";

type BaseResponse = {
  success: boolean;
  message?: string;
  data?: {
    name: string;
    sub: string;
    token: string;
    expiresIn: number;
  };
};

type ProfileResponse = {
  success: boolean;
  message?: string;
  data?: UserProfile;
};

export async function login(
  email: string,
  password: string
): Promise<BaseResponse> {
  const cookieStore = await cookies();

  const payload = {
    email,
    password,
  };

  try {
    if (!email || !password) {
      throw new CustomError("Credenciais inválidas", 400);
    }

    const data = await fetchApi("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (!data?.token) {
      throw new CustomError("Token inválido", 401);
    }

    const { sub, name: decodedUsername } = jwtDecode<TokenData>(data.token);
    const expiresIn = data.expiresIn * 1000;
    const expiresAt = new Date(Date.now() + expiresIn);

    cookieStore.set(TOKEN_KEY, data.token, { expires: expiresAt });
    cookieStore.set(USERNAME_KEY, decodedUsername, {
      expires: expiresAt,
      httpOnly: true,
      path: "/",
    });
    cookieStore.set(SUB_KEY, sub, {
      expires: expiresAt,
      httpOnly: true,
      path: "/",
    });

    return {
      success: true,
      message: "Login realizado com sucesso!",
      data: {
        name: decodedUsername,
        sub,
        token: data.token,
        expiresIn,
      },
    };
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new CustomError(error.message || "Erro de autenticação", 500, true);
    }
    throw new CustomError("Erro desconhecido durante o login.", 500);
  }
}

export async function logout(): Promise<BaseResponse> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(TOKEN_KEY);
    cookieStore.delete(USERNAME_KEY);
    cookieStore.delete(SUB_KEY);
    return {
      success: true,
      message: "Logoff realizado com sucesso!",
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new CustomError(error.message || "Erro ao fazer logout", 500);
    }
    throw new CustomError("Erro desconhecido durante o logout", 500);
  }
}

export async function getUserProfile(userId: string): Promise<ProfileResponse> {
  try {
    const data = await userService.getUserById(userId);
    console.log(data);

    if (!data) {
      throw new CustomError("Perfil não encontrado", 404);
    }

    return {
      success: true,
      message: "Perfil carregado com sucesso",
      data,
    };
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new CustomError(
        error.message || "Erro ao carregar perfil",
        500,
        true
      );
    }
    throw new CustomError("Erro desconhecido ao carregar perfil", 500);
  }
}
