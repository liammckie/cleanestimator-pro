
import React from 'react';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { WorkflowSidebar } from './WorkflowSidebar';
import { ScopeOfWorkSidebar } from '../ScopeOfWorkSidebar';
import { Card } from '../ui/card';
import ErrorBoundary from '../common/ErrorBoundary';
import { Outlet } from 'react-router-dom';

interface WorkflowLayoutProps {
  children?: React.ReactNode;
}

export const WorkflowLayout: React.FC<WorkflowLayoutProps> = ({ children }) => {
  const { currentStep, workflowData } = useWorkflow();

  return (
    <div className="flex min-h-screen">
      <WorkflowSidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <ErrorBoundary>
          <div className="max-w-5xl mx-auto">
            {children || <Outlet />}
          </div>
        </ErrorBoundary>
      </main>
      {currentStep !== 'projects' && (
        <ScopeOfWorkSidebar sites={workflowData.sites} />
      )}
    </div>
  );
};
