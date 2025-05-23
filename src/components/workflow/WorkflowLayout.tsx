
import React from 'react';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { WorkflowSidebar } from './WorkflowSidebar';
import { ScopeOfWorkSidebar } from '../ScopeOfWorkSidebar';
import ErrorBoundary from '../common/ErrorBoundary';
import { Outlet } from 'react-router-dom';
import { Separator } from '../ui/separator';

interface WorkflowLayoutProps {
  children?: React.ReactNode;
}

export const WorkflowLayout: React.FC<WorkflowLayoutProps> = ({ children }) => {
  const { currentStep, workflowData } = useWorkflow();

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-muted/20">
      <WorkflowSidebar />
      
      <main className="flex-1 p-2 md:p-6 overflow-y-auto">
        <ErrorBoundary>
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {children || <Outlet />}
            </div>
          </div>
        </ErrorBoundary>
      </main>
      
      {currentStep !== 'projects' && (
        <>
          <Separator orientation="vertical" className="hidden md:block" />
          <ScopeOfWorkSidebar sites={workflowData.sites} />
        </>
      )}
    </div>
  );
};
