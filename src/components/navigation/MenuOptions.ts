import { MenuOption } from "../ui/dynamic-menu";

export const getMenuOptions = (setTab: (tab: string) => void): MenuOption[] => [
  {
    name: "Scope of Work",
    icon: "list",
    onClick: () => setTab("scope")
  },
  {
    name: "Labor",
    icon: "user",
    onClick: () => setTab("labor")
  },
  {
    name: "Equipment",
    icon: "wrench",
    onClick: () => setTab("equipment")
  },
  {
    name: "Contract",
    icon: "file-text",
    onClick: () => setTab("contract")
  },
  {
    name: "Roster",
    icon: "calendar",
    onClick: () => setTab("roster")
  },
  {
    name: "Summary",
    icon: "layout",
    onClick: () => setTab("summary")
  },
  {
    name: "Tasks",
    icon: "check-square",
    onClick: () => setTab("tasks")
  },
  {
    name: "Settings",
    icon: "settings",
    onClick: () => setTab("settings")
  },
  {
    name: "Overview",
    icon: "globe",
    onClick: () => setTab("overview")
  }
];