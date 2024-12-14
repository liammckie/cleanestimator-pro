import React, { useState } from 'react';
import { TaskItem } from './TaskItem';
import { getAllProductivityRates } from '@/data/productivityRates';
import { Input } from "@/components/ui/input";

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
  const [searchQuery, setSearchQuery] = useState('');
  const productivityRates = getAllProductivityRates();

  const filteredRates = productivityRates
    .filter(rate => rate.category === category)
    .filter(rate => 
      rate.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rate.tool.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
        {filteredRates.map((rate) => (
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
    </div>
  );
};