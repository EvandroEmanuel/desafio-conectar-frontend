"use client"

import { Truck, Menu, PanelLeftClose, PanelLeft, LogOutIcon} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import { logout } from "@/app/actions"
import { removeLocalStorage } from "@/lib/utils"
import { useHandleError } from "./handler-issues"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"


interface NavbarProps {
  onMenuClick: () => void
  onSidebarToggle: () => void
  isSidebarCollapsed: boolean
}

export function Navbar({ onMenuClick, onSidebarToggle, isSidebarCollapsed }: Readonly<NavbarProps>) {

  const {handlerError} = useHandleError() 
  const router = useRouter();

  async function logoutAll() {
    try {

      removeLocalStorage()
      await logout()


      toast({ title: 'Logout realizado com sucesso.' })
      router.push("/");
      
    } catch (error: unknown) {
      handlerError(error);
    }
    
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          
          <Button variant="ghost" size="icon" className="hidden md:flex" onClick={onSidebarToggle}>
            {isSidebarCollapsed ? <PanelLeft className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
            <span className="sr-only">Toggle sidebar</span>
          </Button>

          <div className="flex items-center gap-3">
            <img 
            src="/images/conectar-logo2.svg" 
            alt=""
            className="w-40 h-40" 
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-4">
            <Button onClick={logoutAll}>
              <LogOutIcon/>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
