import React from 'react';
import { CategoryPanel } from './CategoryPanel';
import { TaskManager } from './TaskManager';
import { TaskProvider } from './task/TaskContext';
import { TimeDisplay } from './TimeDisplay';
import { AreaData } from './task/types';

interface AreaContainerProps {
  onAreaChange: (area: AreaData) => void;
}

export const AreaContainer: React.FC<AreaContainerProps> = ({ onAreaChange }) => {
  const [category, setCategory] = React.useState('');

  return (
    <div className="space-y-4">
      <CategoryPanel value={category} onValueChange={setCategory} />
      <TaskProvider onTasksChange={onAreaChange}>
        <TaskManager category={category} />
        <TimeDisplay selectedTasks={[]} />
      </TaskProvider>
    </div>
  );
};