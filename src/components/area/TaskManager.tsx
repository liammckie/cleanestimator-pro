import React from 'react';
import { TaskList } from '../TaskList';

interface TaskManagerProps {
  category: string;
  selectedTasks: Array<{
    taskId: string;
    quantity: number;
    timeRequired: number;
    frequency: {
      timesPerWeek: number;
      timesPerMonth: number;
    };
    productivityOverride?: number;
    selectedTool?: string;
  }>;
  onTaskSelection: (taskId: string, isSelected: boolean) => void;
  onQuantityChange: (taskId: string, quantity: number) => void;
  onFrequencyChange: (taskId: string, timesPerWeek: number) => void;
  onProductivityOverride: (taskId: string, override: number) => void;
  onRemoveTask: (taskId: string) => void;
  onToolChange: (taskId: string, tool: string) => void;
}

export const TaskManager: React.FC<TaskManagerProps> = ({
  category,
  selectedTasks,
  onTaskSelection,
  onQuantityChange,
  onFrequencyChange,
  onProductivityOverride,
  onRemoveTask,
  onToolChange,
}) => {
  return (
    <div className="space-y-2">
      <TaskList
        category={category}
        selectedTasks={selectedTasks}
        onTaskSelection={onTaskSelection}
        onQuantityChange={onQuantityChange}
        onFrequencyChange={onFrequencyChange}
        onProductivityOverride={onProductivityOverride}
        onRemoveTask={onRemoveTask}
        onToolChange={onToolChange}
      />
    </div>
  );
};