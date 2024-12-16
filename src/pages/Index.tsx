import React from 'react';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { CostProvider } from '@/contexts/CostContext';
import { TaskProvider } from '@/components/area/task/TaskContext';
import { ScopeOfWorkSidebar } from '@/components/ScopeOfWorkSidebar';
import { MainContent } from '@/components/layout/MainContent';

const Index = () => {
  return (
    <SettingsProvider>
      <CostProvider>
        <TaskProvider defaultLaborRate={38}>
          <div className="flex min-h-screen">
            <MainContent />
            <ScopeOfWorkSidebar />
          </div>
        </TaskProvider>
      </CostProvider>
    </SettingsProvider>
  );
};

export default Index;