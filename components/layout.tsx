"use client"

import type React from "react"
import { useState } from "react"
import { Navbar } from "./navbar"
import { Sidebar } from "./sidebar"
import { cn } from "@/lib/utils"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const mainMargin = sidebarCollapsed ? "md:ml-16" : "md:ml-64"

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        onMenuClick={() => setSidebarOpen(true)}
        onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        isSidebarCollapsed={sidebarCollapsed}
      />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} isCollapsed={sidebarCollapsed} />

      <main className={cn("transition-all duration-300 ease-in-out pt-4", mainMargin)}>
        <div className="container mx-auto px-4 pb-8">{children}</div>
      </main>
    </div>
  )
}
