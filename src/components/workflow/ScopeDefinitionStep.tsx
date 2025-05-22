
import React, { useEffect } from 'react';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { ScopeOfWorkSidebar } from '@/components/ScopeOfWorkSidebar';
import { SiteManager } from '@/components/SiteManager';
import { Site } from '@/data/types/site';
import { useTaskContext } from '@/components/area/task/TaskContext';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const ScopeDefinitionStep: React.FC = () => {
  const { workflowData, updateWorkflowData, previousStep, nextStep } = useWorkflow();
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
    <div className="space-y-6">
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
      
      <div className="mt-8 flex justify-between">
        <Button
          onClick={previousStep}
          variant="outline"
          size="lg"
          className="flex items-center"
          id="previous-step-button"
          name="previous-step-button"
          aria-label="Go to previous step"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous Step
        </Button>
        
        <Button
          onClick={nextStep}
          variant="default"
          size="lg" 
          className="flex items-center"
          id="next-step-button"
          name="next-step-button"
          aria-label="Go to next step"
        >
          Next Step
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
