import React from 'react';
import { TaskItem } from './TaskItem';
import { getAllProductivityRates } from '@/data/productivityRates';

interface TaskListProps {
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

export const TaskList: React.FC<TaskListProps> = ({
  category,
  selectedTasks,
  onTaskSelection,
  onQuantityChange,
  onFrequencyChange,
  onProductivityOverride,
  onRemoveTask,
  onToolChange,
}) => {
  const productivityRates = getAllProductivityRates();

  return (
    <div className="grid gap-2">
      {productivityRates
        .filter(rate => rate.category === category)
        .map((rate) => (
          <TaskItem
            key={rate.id}
            rate={rate}
            selectedTask={selectedTasks.find(task => task.taskId === rate.id)}
            onTaskSelection={onTaskSelection}
            onQuantityChange={onQuantityChange}
            onFrequencyChange={onFrequencyChange}
            onProductivityOverride={onProductivityOverride}
            onRemoveTask={onRemoveTask}
            onToolChange={onToolChange}
          />
        ))}
    </div>
  );
};