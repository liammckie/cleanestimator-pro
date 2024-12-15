import { MenuOption } from "@/components/ui/dynamic-menu";

export const getMenuOptions = (setActiveTab: (value: string) => void): MenuOption[] => {
  return [
    {
      label: "Scope of Work",
      id: "scope",
      icon: "list",
      onClick: () => setActiveTab("scope"),
    },
    {
      label: "Labor",
      id: "labor",
      icon: "user",
      onClick: () => setActiveTab("labor"),
    },
    {
      label: "Equipment",
      id: "equipment",
      icon: "tool",
      onClick: () => setActiveTab("equipment"),
    },
    {
      label: "On-Costs",
      id: "oncosts",
      icon: "dollar-sign",
      onClick: () => setActiveTab("oncosts"),
    },
    {
      label: "Contract",
      id: "contract",
      icon: "file-text",
      onClick: () => setActiveTab("contract"),
    },
    {
      label: "Overview",
      id: "overview",
      icon: "layout",
      onClick: () => setActiveTab("overview"),
    },
    {
      label: "Task Management",
      id: "tasks",
      icon: "check-square",
      onClick: () => setActiveTab("tasks"),
    },
  ];
};