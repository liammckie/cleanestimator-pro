import React from 'react';
import { DynamicMenu } from "@/components/ui/dynamic-menu";
import { MainNavigation } from '@/components/navigation/MainNavigation';
import { ScopeOfWorkSidebar } from '@/components/ScopeOfWorkSidebar';
import { Site } from '@/data/types/site';

interface AppLayoutProps {
  menuOptions: Array<{
    name: string;
    icon: "layout" | "file-text" | "list" | "user" | "wrench" | "calendar" | "check-square" | "globe" | "settings";
    onClick: () => void;
  }>;
  selectedTasks: Array<{
    taskId: string;
    quantity: number;
    timeRequired: number;
    frequency: {
      timesPerWeek: number;
      timesPerMonth: number;
    };
    siteName?: string;
  }>;
  sites: Site[];
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  menuOptions,
  selectedTasks,
  sites,
  children
}) => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Menu */}
      <div className="fixed left-0 top-0 h-full w-[250px] bg-card border-r border-border z-50">
        <DynamicMenu options={menuOptions} />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[250px] mr-[384px] overflow-y-auto">
        <MainNavigation />
        <div className="p-6">
          {children}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="fixed right-0 top-0 h-full w-[384px] border-l border-border bg-background z-40">
        <ScopeOfWorkSidebar selectedTasks={selectedTasks} sites={sites} />
      </div>
    </div>
  );
};