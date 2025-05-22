
import React from 'react';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { ScopeOfWorkSidebar } from '@/components/ScopeOfWorkSidebar';
import { SiteManager } from '@/components/SiteManager';
import { Site } from '@/data/types/site';

export const ScopeDefinitionStep: React.FC = () => {
  const { workflowData, updateWorkflowData } = useWorkflow();
  
  const handleSitesChange = (updatedSites: Site[]) => {
    updateWorkflowData({ sites: updatedSites });
  };
  
  return (
    <div className="flex h-full gap-6 relative">
      <div className="flex-1">
        <SiteManager onSitesChange={handleSitesChange} />
      </div>
      <ScopeOfWorkSidebar sites={workflowData.sites} />
    </div>
  );
};
