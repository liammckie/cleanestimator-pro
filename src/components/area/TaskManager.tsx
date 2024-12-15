import React from 'react';
import { TaskSelector } from '../task/TaskSelector';
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

  const selectedTaskIds = selectedTasks.map(task => task.taskId);

  return (
    <div className="space-y-4">
      <TaskSelector
        onTaskSelect={(taskId) => handleTaskSelection(taskId, !selectedTaskIds.includes(taskId))}
        selectedTasks={selectedTaskIds}
      />
      
      {selectedTasks.length > 0 && (
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
      )}
    </div>
  );
};