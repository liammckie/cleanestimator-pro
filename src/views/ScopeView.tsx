import React from 'react';
import { ScopeOfWorkSidebar } from '@/components/ScopeOfWorkSidebar';

interface ScopeViewProps {
  selectedTasks: Array<{
    taskId: string;
    quantity: number;
    timeRequired: number;
    frequency: {
      timesPerWeek: number;
      timesPerMonth: number;
    };
    productivityOverride?: number;
    selectedTool?: string;
    siteName?: string;
  }>;
}

export const ScopeView: React.FC<ScopeViewProps> = ({ selectedTasks }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Scope of Work</h1>
      </div>
      <ScopeOfWorkSidebar selectedTasks={selectedTasks} />
    </div>
  );
};