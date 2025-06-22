import { UserContext, type UserContextProps } from "@/contexts/user";
import { useContext } from "react";

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};