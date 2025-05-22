
import { 
  LayoutDashboard, Database, FileText, LayoutList, Calendar,
  Settings, DatabaseBackup
} from "lucide-react";

export const menuOptions = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Scope of Work",
    href: "/scope",
    icon: FileText,
  },
  {
    title: "Task Database",
    href: "/task-management",
    icon: Database,
  },
  {
    title: "Rates Management",
    href: "/rates",
    icon: DatabaseBackup,
  },
  {
    title: "Templates",
    href: "/templates",
    icon: LayoutList,
  },
  {
    title: "Roster",
    href: "/roster",
    icon: Calendar,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];
