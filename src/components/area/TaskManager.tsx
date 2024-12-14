import React from 'react';
import { TaskList } from '../TaskList';
import { useTaskContext } from './task/TaskContext';

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

  return (
    <div className="space-y-2">
      <TaskList
        category={category}
        selectedTasks={selectedTasks}
        onTaskSelection={handleTaskSelection}
        onQuantityChange={handleQuantityChange}
        onFrequencyChange={handleFrequencyChange}
        onProductivityOverride={handleProductivityOverride}
        onRemoveTask={(taskId) => handleTaskSelection(taskId, false)}
        onToolChange={handleToolChange}
      />
    </div>
  );
};