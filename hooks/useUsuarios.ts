import { useEffect, useState } from "react";
import { apiClient } from "@/lib/utils";

export function useUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const response = await apiClient.get("/users");
        setUsuarios(response.data);
      } catch (err: any) {
        console.error("Erro ao buscar usuários:", err);
        setErro("Erro ao carregar usuários");
      } finally {
        setLoading(false);
      }
    }

    fetchUsuarios();
  }, []);

  return { usuarios, loading, erro };
}
