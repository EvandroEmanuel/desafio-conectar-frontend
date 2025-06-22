"use client"

import { Truck, Menu, PanelLeftClose, PanelLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"

interface NavbarProps {
  onMenuClick: () => void
  onSidebarToggle: () => void
  isSidebarCollapsed: boolean
}

export function Navbar({ onMenuClick, onSidebarToggle, isSidebarCollapsed }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>

          {/* Sidebar toggle button for desktop */}
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
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
