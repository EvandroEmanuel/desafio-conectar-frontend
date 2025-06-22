import { ROLES_OBJECT } from "@/config/index";
import { useUser } from "@/hooks/use-user";

const { ADMIN } = ROLES_OBJECT;

type PermissionProps = {
  children: React.ReactNode
}

export function Permission({ children }: PermissionProps) {
  const { roles } = useUser()

  if (roles.includes(ADMIN)) {
    return children;
  }

  return null;
}