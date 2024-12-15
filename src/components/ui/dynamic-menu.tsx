import React from 'react';
import { List, User, Wrench, FileText, Layout, CheckSquare, Settings, Globe, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MenuOption {
  name: string;
  icon: "list" | "user" | "wrench" | "file-text" | "layout" | "check-square" | "settings" | "globe" | "calendar";
  onClick: () => void;
}

interface DynamicMenuProps {
  options: MenuOption[];
  className?: string;
}

const iconMap = {
  list: List,
  user: User,
  wrench: Wrench,
  "file-text": FileText,
  layout: Layout,
  "check-square": CheckSquare,
  settings: Settings,
  globe: Globe,
  calendar: Calendar
};

export const DynamicMenu: React.FC<DynamicMenuProps> = ({ options, className }) => {
  return (
    <nav className={cn("flex flex-col space-y-1", className)}>
      {options.map((option) => {
        const Icon = iconMap[option.icon];
        return (
          <button
            key={option.name}
            onClick={option.onClick}
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg hover:bg-accent hover:text-accent-foreground"
          >
            <Icon className="w-4 h-4" />
            {option.name}
          </button>
        );
      })}
    </nav>
  );
};