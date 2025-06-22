// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { TOKEN_KEY } from "./config";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  role: "admin" | "user";
  // outras infos como sub, name, etc, se precisar
}

const protectedRoutes = ["/dashboard", "/profile"];
const publicRoutes = ["/login", "/signup", "/", "/recover"];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get(TOKEN_KEY)?.value;
  const path = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );
  const isPublicRoute = publicRoutes.includes(path);

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (token) {
    try {
      const decoded = jwtDecode<TokenPayload>(token);

      // 🔒 Bloqueia acesso de user ao dashboard
      if (path.startsWith("/dashboard") && decoded.role !== "admin") {
        return NextResponse.redirect(new URL("/profile", req.url));
      }

      // Impede usuário autenticado de acessar login/signup
      if (isPublicRoute) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    } catch (err) {
      console.error("Erro ao decodificar token:", err);
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/login",
    "/signup",
    "/",
    "/recover",
  ],
};
