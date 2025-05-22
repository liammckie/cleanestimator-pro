
import React, { useEffect } from 'react';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { ScopeOfWorkSidebar } from '@/components/ScopeOfWorkSidebar';
import { SiteManager } from '@/components/SiteManager';
import { Site } from '@/data/types/site';
import { useTaskContext } from '@/components/area/task/TaskContext';
import ErrorBoundary from '@/components/common/ErrorBoundary';

export const ScopeDefinitionStep: React.FC = () => {
  const { workflowData, updateWorkflowData } = useWorkflow();
  const { selectedTasks } = useTaskContext();
  
  const handleSitesChange = (updatedSites: Site[]) => {
    updateWorkflowData({ sites: updatedSites });
  };

  // Sync task data between contexts
  useEffect(() => {
    if (selectedTasks.length > 0) {
      updateWorkflowData({ selectedTasks });
    }
  }, [selectedTasks, updateWorkflowData]);
  
  return (
    <div className="flex h-full gap-6 relative">
      <ErrorBoundary>
        <div className="flex-1">
          <SiteManager onSitesChange={handleSitesChange} sites={workflowData.sites} />
        </div>
      </ErrorBoundary>
      <ErrorBoundary>
        <ScopeOfWorkSidebar sites={workflowData.sites} />
      </ErrorBoundary>
    </div>
  );
};
