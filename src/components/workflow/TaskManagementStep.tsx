
import React, { useEffect } from 'react';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { TaskManagementPage } from '@/components/task-management/TaskManagementPage';
import { useTaskContext } from '@/components/area/task/TaskContext';

export const TaskManagementStep: React.FC = () => {
  const { updateWorkflowData } = useWorkflow();
  const taskContext = useTaskContext();
  
  // Update workflow data when tasks change
  useEffect(() => {
    updateWorkflowData({ selectedTasks: taskContext.selectedTasks });
  }, [taskContext.selectedTasks]);
  
  return (
    <div>
      <TaskManagementPage />
    </div>
  );
};
