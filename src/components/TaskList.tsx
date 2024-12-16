import React, { useState } from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ProductivityRate } from '@/data/types/productivity';
import { TaskSearchInput } from './task/TaskSearchInput';
import { TaskCard } from './task/TaskCard';
import { getRatesByCategory } from '@/data/rates/ratesManager';

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
  selectedTasks = [],
  onTaskSelection,
  onQuantityChange,
  onFrequencyChange,
  onProductivityOverride,
  onRemoveTask,
  onToolChange,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const productivityRates = getRatesByCategory(category) || [];

  const filteredRates = productivityRates
    .filter(rate => rate && rate.category === category)
    .filter(rate => {
      if (!rate) return false;
      const query = searchQuery.toLowerCase();
      return (
        rate.task.toLowerCase().includes(query) ||
        rate.tool.toLowerCase().includes(query)
      );
    });

  if (selectedTasks.length === 0) {
    return (
      <Alert>
        <AlertDescription>
          No tasks found for the selected category.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <TaskSearchInput 
        value={searchQuery}
        onChange={setSearchQuery}
      />

      <div className="grid gap-4">
        {filteredRates.map((rate: ProductivityRate) => {
          const selectedTask = selectedTasks.find(task => task.taskId === rate.id);
          if (!selectedTask) return null;

          return (
            <TaskCard
              key={rate.id}
              rate={rate}
              selectedTask={selectedTask}
              onQuantityChange={onQuantityChange}
              onFrequencyChange={onFrequencyChange}
              onRemoveTask={onRemoveTask}
            />
          );
        })}
      </div>
    </div>
  );
};