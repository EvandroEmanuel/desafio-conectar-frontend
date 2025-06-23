"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Users,
  X,
  User,
} from "lucide-react"
import { Permission } from "./permission"
import Link from "next/link"
import { ActiveLink } from "./activelink"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  isCollapsed: boolean
}

const menuItems = [
  {
    category: "Geral",
    items: [
      { icon: Users, label: "Usuários", href: "/dashboard",},
      { icon: User, label: "Perfil", href: "/profile" },
    ],
  },
]

export function Sidebar({ isOpen, onClose, isCollapsed }: SidebarProps) {
  const sidebarWidth = isCollapsed ? "w-16" : "w-64"

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden" onClick={onClose} />}
      <aside
        className={cn(
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] transform border-r bg-background transition-all duration-300 ease-in-out md:translate-x-0",
          sidebarWidth,
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-4 md:hidden">
            <span className="text-lg font-semibold">Menu</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <ScrollArea className="flex-1 px-3">
            <div className="space-y-6 py-4">
              {menuItems.map((section) => (
                <div key={section.category}>
                  {!isCollapsed && (
                    <h3 className="mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {section.category}
                    </h3>
                  )}
                  <div className="space-y-2">
                    {section.items.map((sec) => {
                      if(sec.href === "/dashboard") {
                        return (
                          <Permission key={ sec.href }>
                            <ActiveLink href={sec.href}>
                                <a className="flex px-4 gap-2 items-center" href={sec.href} onClick={onClose} title={isCollapsed ? sec.label : undefined}>
                                  <sec.icon className="h-4 w-4 flex-shrink-0" />
                                  {!isCollapsed && <span>{sec.label}</span>}
                                </a>
                            </ActiveLink>
                          </Permission>
                        )
                      }
                      return (
                        <ActiveLink href={sec.href} key={sec.href}>
                          <a className="flex px-4 gap-2 items-center" href={sec.href} onClick={onClose} title={isCollapsed ? sec.label : undefined}>
                            <sec.icon className="h-4 w-4 flex-shrink-0" />
                            {!isCollapsed && <span>{sec.label}</span>}
                          </a>
                        </ActiveLink>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </aside>
    </>
  )
}
