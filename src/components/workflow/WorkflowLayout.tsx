
import React from 'react';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { WorkflowSidebar } from './WorkflowSidebar';
import { ScopeOfWorkSidebar } from '../ScopeOfWorkSidebar';
import { Card } from '../ui/card';
import ErrorBoundary from '../common/ErrorBoundary';

interface WorkflowLayoutProps {
  children: React.ReactNode;
}

export const WorkflowLayout: React.FC<WorkflowLayoutProps> = ({ children }) => {
  const { currentStep, workflowData } = useWorkflow();

  // Remove the data-lov-id attribute from the fragment
  return (
    <div className="flex min-h-screen">
      <WorkflowSidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <ErrorBoundary>
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </ErrorBoundary>
      </main>
      {currentStep !== 'projects' && (
        <ScopeOfWorkSidebar sites={workflowData.sites} />
      )}
    </div>
  );
};
