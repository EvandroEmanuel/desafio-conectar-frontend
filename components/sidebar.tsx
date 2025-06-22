"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  LayoutDashboard,
  Building2,
  Users,
  Truck,
  Car,
  UserCheck,
  Fuel,
  Users2,
  FileText,
  ClipboardList,
  Settings,
  CreditCard,
  Receipt,
  DollarSign,
  Store,
  X,
  User,
} from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  isCollapsed: boolean
}

const menuItems = [
  {
    category: "Geral",
    items: [
      { icon: Users, label: "Usuários", href: "/", active: true },
      { icon: User, label: "Perfil", href: "/profile" },
    ],
  },
]

export function Sidebar({ isOpen, onClose, isCollapsed }: SidebarProps) {
  const sidebarWidth = isCollapsed ? "w-16" : "w-64"

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] transform border-r bg-background transition-all duration-300 ease-in-out md:translate-x-0",
          sidebarWidth,
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Mobile close button */}
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
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <Button
                        key={item.label}
                        variant={item.active ? "secondary" : "ghost"}
                        className={cn("w-full justify-start h-10", isCollapsed ? "px-2" : "px-3 gap-3")}
                        asChild
                      >
                        <a href={item.href} onClick={onClose} title={isCollapsed ? item.label : undefined}>
                          <item.icon className="h-4 w-4 flex-shrink-0 text-[#04BF7B]" />
                          {!isCollapsed && <span className="text-[#04BF7B]">{item.label}</span>}
                        </a>
                      </Button>
                    ))}
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
