import React from 'react';
import { CategoryPanel } from './CategoryPanel';
import { TaskManager } from './TaskManager';
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
      <TaskManager category={category} />
      <TimeDisplay selectedTasks={[]} />
    </div>
  );
};