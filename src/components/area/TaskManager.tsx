
import React from 'react';
import { TaskSelector } from '../task/TaskSelector';
import { TaskList } from '../TaskList';
import { useTaskContext } from './task/TaskContext';
import { SelectedTask } from './task/types';

interface TaskManagerProps {
  category: string;
}

export const TaskManager: React.FC<TaskManagerProps> = ({
  category,
}) => {
  const {
    selectedTasks,
    handleTaskSelection,
    handleQuantityChange,
    handleFrequencyChange,
    handleProductivityOverride,
    handleToolChange
  } = useTaskContext();

  // Extract just the taskId from each selected task
  const selectedTaskIds = selectedTasks.map(task => task.taskId);

  // Convert selectedTasks to the appropriate format for TaskList
  const formattedTasks = selectedTasks.map(task => ({
    taskId: task.taskId,
    quantity: task.quantity,
    timeRequired: task.timeRequired,
    frequency: task.frequency,
    productivityOverride: task.productivityOverride,
    selectedTool: task.selectedTool
  }));

  return (
    <div className="space-y-4">
      <TaskSelector
        onTaskSelect={(taskId) => handleTaskSelection(taskId, !selectedTaskIds.includes(taskId))}
        selectedTasks={selectedTaskIds}
      />
      
      {selectedTasks.length > 0 && (
        <TaskList
          category={category}
          selectedTasks={formattedTasks}
          onTaskSelection={handleTaskSelection}
          onQuantityChange={handleQuantityChange}
          onFrequencyChange={handleFrequencyChange}
          onProductivityOverride={handleProductivityOverride}
          onRemoveTask={(taskId) => handleTaskSelection(taskId, false)}
          onToolChange={handleToolChange}
        />
      )}
    </div>
  );
};
