
import React from 'react';
import { useTaskContext } from './task/TaskContext';

interface TimeDisplayProps {
  selectedTasks: Array<{
    timeRequired: number;
  }>;
}

export const TimeDisplay: React.FC<TimeDisplayProps> = ({ selectedTasks }) => {
  const { totalMonthlyHours } = useTaskContext();
  
  // Add null check
  const safeMonthlyHours = totalMonthlyHours || 0;
  
  if (selectedTasks.length === 0 && safeMonthlyHours === 0) return null;

  // Calculate hours and minutes from total monthly hours
  const hours = Math.floor(safeMonthlyHours);
  const minutes = Math.round((safeMonthlyHours - hours) * 60);

  return (
    <div className="p-4 bg-gray-50 rounded">
      <h3 className="font-medium mb-2">Total Monthly Time Required</h3>
      <p>{hours} hours{minutes > 0 ? ` ${minutes} minutes` : ''}</p>
    </div>
  );
};
