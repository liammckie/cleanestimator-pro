import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Menu, 
  Grid, 
  Settings, 
  List, 
  Globe,
  User,
  Wrench,
  DollarSign,
  FileText,
  Layout,
  CheckSquare 
} from "lucide-react"

export interface MenuOption {
  id: string
  label: string
  icon?: "menu" | "grid" | "settings" | "list" | "globe" | "user" | "wrench" | 
        "dollar-sign" | "file-text" | "layout" | "check-square"
  onClick?: () => void
}

const iconMap = {
  menu: Menu,
  grid: Grid,
  settings: Settings,
  list: List,
  globe: Globe,
  user: User,
  wrench: Wrench,
  "dollar-sign": DollarSign,
  "file-text": FileText,
  layout: Layout,
  "check-square": CheckSquare
}

interface DynamicMenuProps {
  options: MenuOption[]
  className?: string
}

export function DynamicMenu({ options, className }: DynamicMenuProps) {
  return (
    <ScrollArea className={cn("h-full w-full", className)}>
      <div className="space-y-2 p-2">
        {options.map((option) => {
          const Icon = option.icon ? iconMap[option.icon] : undefined
          return (
            <Button
              key={option.id}
              variant="ghost"
              className="w-full justify-start gap-2 bg-accent/50 hover:bg-accent/70"
              onClick={option.onClick}
            >
              {Icon && <Icon className="h-4 w-4" />}
              <span>{option.label}</span>
            </Button>
          )
        })}
      </div>
    </ScrollArea>
  )
}