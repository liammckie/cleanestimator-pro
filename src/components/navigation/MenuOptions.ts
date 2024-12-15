import { MenuOption } from "@/components/ui/dynamic-menu";

export const getMenuOptions = (setActiveTab: (value: string) => void): MenuOption[] => {
  return [
    {
      label: "Scope of Work",
      value: "scope",
      onClick: () => setActiveTab("scope"),
    },
    {
      label: "Labor",
      value: "labor",
      onClick: () => setActiveTab("labor"),
    },
    {
      label: "Equipment",
      value: "equipment",
      onClick: () => setActiveTab("equipment"),
    },
    {
      label: "On-Costs",
      value: "oncosts",
      onClick: () => setActiveTab("oncosts"),
    },
    {
      label: "Contract",
      value: "contract",
      onClick: () => setActiveTab("contract"),
    },
    {
      label: "Overview",
      value: "overview",
      onClick: () => setActiveTab("overview"),
    },
    {
      label: "Task Management",
      value: "tasks",
      onClick: () => setActiveTab("tasks"),
    },
  ];
};