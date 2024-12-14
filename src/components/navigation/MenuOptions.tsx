import { Calendar, Home, Inbox, Search, Settings, Globe } from "lucide-react";
import { MenuOption } from "@/components/ui/dynamic-menu";

export const getMenuOptions = (setActiveTab: (tab: string) => void): MenuOption[] => [
  {
    id: 'scope',
    label: 'Scope & Tasks',
    icon: "list",
    onClick: () => setActiveTab('scope')
  },
  {
    id: 'labor',
    label: 'Labor Costs',
    icon: "menu",
    onClick: () => setActiveTab('labor')
  },
  {
    id: 'equipment',
    label: 'Equipment',
    icon: "grid",
    onClick: () => setActiveTab('equipment')
  },
  {
    id: 'roster',
    label: 'Roster',
    icon: "menu",
    onClick: () => setActiveTab('roster')
  },
  {
    id: 'contract',
    label: 'Contract',
    icon: "menu",
    onClick: () => setActiveTab('contract')
  },
  {
    id: 'summary',
    label: 'Summary',
    icon: "settings",
    onClick: () => setActiveTab('summary')
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: "settings",
    onClick: () => setActiveTab('settings')
  },
  {
    id: 'overview',
    label: 'Site Overview',
    icon: "globe",
    onClick: () => setActiveTab('overview')
  }
];