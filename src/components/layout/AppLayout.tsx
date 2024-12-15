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
    <div className="flex min-h-screen w-full">
      {/* Left Menu */}
      <div className="w-[250px] shrink-0">
        <DynamicMenu 
          options={menuOptions} 
          className="h-full bg-card rounded-lg border border-border"
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <MainNavigation />
        <div className="p-6">
          {children}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-[300px] shrink-0 border-l border-border">
        <ScopeOfWorkSidebar selectedTasks={selectedTasks} sites={sites} />
      </div>
    </div>
  );
};