"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { setLocalStorage } from "@/lib/utils";
import { useUser } from "@/hooks/use-user";
import { toast } from "@/hooks/use-toast";
import { useHandleError } from "@/components/handler-issues";
import { apiClient } from "@/lib/utils";

export default function RegisterPage() {
  const router = useRouter();
  const { setUser, setRoles } = useUser();
  const { handlerError } = useHandleError();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast({ title: "Erro", description: "Preencha todos os campos." });
      return;
    }

    if (password !== confirmPassword) {
      toast({ title: "Erro", description: "As senhas não coincidem." });
      return;
    }

    try {
      setLoading(true);
    
      const data = await apiClient.post("/users", {
        name,
        email,
        password,
      });
    
      console.log("Resposta da API:", data.data); // 👈 veja o que chega
    
      toast({
        title: "Cadastro realizado com sucesso",
        description: `Bem-vindo, ${name}!`,
      });
    
      router.push("/profile"); // 👈 redireciona direto por enquanto
    } catch (error) {
      console.error("Erro ao registrar:", error);
      handlerError(error);
    } finally {
      setLoading(false);
    }
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

        <h1 className="text-xl font-semibold text-gray-800 mb-6">Criar Conta</h1>
        <p className="text-sm text-gray-600 mb-6">
          Cadastre-se e tenha acesso a uma plataforma completa e eficiente.
        </p>

        <form className="flex flex-col space-y-4" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#04BF7B]"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#04BF7B]"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#04BF7B]"
          />
          <input
            type="password"
            placeholder="Confirmar senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#04BF7B]"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-[#04BF7B] text-white font-medium py-3 rounded-xl hover:bg-[#03a86b] transition disabled:opacity-50"
          >
            {loading ? "Criando..." : "Criar Conta"}
          </button>

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
            <img
              src="/images/google-icon.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Entrar com Google
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4">
          Já tem uma conta?{" "}
          <a href="/login" className="text-[#04BF7B] hover:underline">
            Entrar
          </a>
        </p>
      </div>
    </div>
  );
}
