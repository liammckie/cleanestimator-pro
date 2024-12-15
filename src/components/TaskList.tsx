import React, { useState } from 'react';
import { TaskItem } from './TaskItem';
import { getRatesByCategory } from '@/data/rates/ratesManager';
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

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

  if (!category) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Please select a category to view available tasks.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4"
      />
      <div className="grid gap-2">
        {filteredRates.length > 0 ? (
          filteredRates.map((rate) => (
            <TaskItem
              key={rate.id}
              rate={rate}
              selectedTask={selectedTasks?.find(task => task.taskId === rate.id)}
              onTaskSelection={onTaskSelection}
              onQuantityChange={onQuantityChange}
              onFrequencyChange={onFrequencyChange}
              onProductivityOverride={onProductivityOverride}
              onRemoveTask={onRemoveTask}
              onToolChange={onToolChange}
            />
          ))
        ) : (
          <Alert>
            <AlertDescription>
              No tasks found for the selected category.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};