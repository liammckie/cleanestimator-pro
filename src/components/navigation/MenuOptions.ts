import { MenuOption } from "../ui/dynamic-menu";

export const getMenuOptions = (setTab: (tab: string) => void): MenuOption[] => [
  {
    name: "Sites",
    icon: "building",
    onClick: () => setTab("sites")
  },
  {
    name: "Tasks",
    icon: "list",
    onClick: () => setTab("tasks")
  },
  {
    name: "Labor Costs",
    icon: "user",
    onClick: () => setTab("labor")
  },
  {
    name: "Equipment",
    icon: "wrench",
    onClick: () => setTab("equipment")
  },
  {
    name: "Roster",
    icon: "calendar",
    onClick: () => setTab("roster")
  },
  {
    name: "Contract",
    icon: "file-text",
    onClick: () => setTab("contract")
  },
  {
    name: "Summary",
    icon: "layout",
    onClick: () => setTab("summary")
  },
  {
    name: "Settings",
    icon: "settings",
    onClick: () => setTab("settings")
  }
];