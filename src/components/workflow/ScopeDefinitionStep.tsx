
import React, { useEffect } from 'react';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { ScopeOfWork } from '@/components/scope/ScopeOfWork';
import { useTaskContext } from '@/components/area/task/TaskContext';
import { Site } from '@/data/types/site';

export const ScopeDefinitionStep: React.FC = () => {
  const { workflowData, updateWorkflowData } = useWorkflow();
  const taskContext = useTaskContext();
  
  // Function to handle site updates
  const handleUpdateSite = (updatedSite: Site) => {
    const updatedSites = workflowData.sites.map(site => 
      site.id === updatedSite.id ? updatedSite : site
    );
    
    updateWorkflowData({ 
      sites: updatedSites,
      selectedTasks: taskContext.selectedTasks
    });
  };
  
  // Update the workflow data when tasks change
  useEffect(() => {
    updateWorkflowData({ selectedTasks: taskContext.selectedTasks });
  }, [taskContext.selectedTasks]);

  return (
    <div>
      <ScopeOfWork
        sites={workflowData.sites} 
        onUpdateSite={handleUpdateSite}
      />
    </div>
  );
};
