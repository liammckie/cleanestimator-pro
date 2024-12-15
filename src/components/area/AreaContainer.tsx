import React from 'react';
import { CategoryPanel } from './CategoryPanel';
import { TaskManager } from './TaskManager';
import { TaskProvider } from './task/TaskContext';
import { TimeDisplay } from './TimeDisplay';

interface AreaContainerProps {
  onAreaChange: (area: {
    squareMeters: number;
    spaceType: string;
    industryType: string;
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
    totalTime: number;
  }) => void;
}

export const AreaContainer: React.FC<AreaContainerProps> = ({ onAreaChange }) => {
  const [category, setCategory] = React.useState('');

  const handleTasksChange = (tasks: any[]) => {
    onAreaChange({
      squareMeters: 0,
      spaceType: '',
      industryType: '',
      selectedTasks: tasks,
      totalTime: tasks.reduce((sum, task) => sum + (task.timeRequired || 0), 0)
    });
  };

  return (
    <div className="space-y-4">
      <CategoryPanel value={category} onValueChange={setCategory} />
      <TaskProvider onTasksChange={handleTasksChange}>
        <TaskManager category={category} />
        <TimeDisplay selectedTasks={[]} />
      </TaskProvider>
    </div>
  );
};