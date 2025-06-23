"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setLocalStorage } from "@/lib/utils";
import { useUser } from "@/hooks/use-user";
import { login } from "../actions";
import { jwtDecode } from "jwt-decode";
import { ROLES_OBJECT } from "@/config";
import { toast } from "@/hooks/use-toast";
import { useHandleError } from "@/components/handler-issues";
 
export default function LoginPage() {  
  const {handlerError} = useHandleError();
  const {setUser, setRoles} = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const loginData = await login(email, password);

      if (loginData?.success && loginData.data?.token && loginData.data.name && loginData.data.sub) {
        const decodeToken = jwtDecode<{role: typeof ROLES_OBJECT.ADMIN | typeof ROLES_OBJECT.USER}>(loginData.data.token)
        const user = {
          sub: loginData.data.sub,
          name: loginData.data.name,
          role: decodeToken.role
        };
        setRoles([decodeToken.role])

        setUser(user);

        setLocalStorage(
          loginData.data.token,
          loginData.data.name,
          loginData.data.sub,
          user,
          decodeToken.role
        );
        toast({
          title: `${loginData?.message}`,
          description: `Bem-vindo, ${loginData?.data?.name}`,
        });
        router.push("/dashboard");

      }
    } catch (error) {
      handlerError(error);
    } 
    setLoading(false); 

  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{
        backgroundImage: "url('/images/fundo-login3.png')",
      }}
    >
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm text-center">
        <Image
          src="/images/conectar-logo2.svg"
          alt="Logo Conectar"
          width={250}
          height={150}
          className="mx-auto mb-10"
        />

        <h1 className="text-xl font-semibold text-gray-800 mb-6">Bem-Vindo</h1>
        <p className="text-sm text-gray-600 mb-6">
          Acesse sua conta para continuar sua jornada com a plataforma Conectar.
        </p>

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#04BF7B]"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#04BF7B]"
            required
          />
          <div className="text-right text-sm text-[#04BF7B] hover:underline cursor-pointer">
            Forgot password?
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-[#04BF7B] text-white font-medium py-3 rounded-xl hover:bg-[#03a86b] transition disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Login"}
          </button>

          {error && (
            <p className="text-red-600 text-sm mt-2">{error}</p>
          )}

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">ou</span>
            </div>
          </div>

          <button 
            type="button"
            className="flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 transition"
          >
            <img src="/images/google-icon.svg" alt="Google" className="w-5 h-5" />
            Entrar com Google
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-[#04BF7B] hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
