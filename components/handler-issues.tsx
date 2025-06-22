import { useToast } from "@/hooks/use-toast";
import { CustomError } from "@/lib/utils";
import { AxiosError } from "axios";

export function useHandleError() {
  const { toast } = useToast();

  const handlerError = (error: unknown) => {
    if (error instanceof AxiosError) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: error?.response?.data?.message || "Ocorreu um erro inesperado.",
      });
    } else if (error instanceof CustomError) {
      const title = error.message.includes("login") 
        ? "Erro de login"
        : "Erro na aplicação";

      toast({
        variant: "destructive",
        title,
        description: error.message,
      });
    } else if (error instanceof Error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: error.message || "Ocorreu um erro inesperado.",
      });
    } else {
      console.error("Erro inesperado:", error);
      toast({
        variant: "destructive",
        title: "Erro inesperado",
        description: "Ocorreu um erro inesperado.",
      });
    }
  };

  return {
    handlerError,
  };
}