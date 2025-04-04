
import React from 'react';
import { useTaskContext } from './task/TaskContext';

interface TimeDisplayProps {
  selectedTasks: Array<{
    timeRequired: number;
  }>;
}

export const TimeDisplay: React.FC<TimeDisplayProps> = ({ selectedTasks }) => {
  const { totalMonthlyHours } = useTaskContext();
  
  if (selectedTasks.length === 0 && totalMonthlyHours === 0) return null;

  // Calculate hours and minutes from total monthly hours
  const hours = Math.floor(totalMonthlyHours);
  const minutes = Math.round((totalMonthlyHours - hours) * 60);

  return (
    <div className="p-4 bg-gray-50 rounded">
      <h3 className="font-medium mb-2">Total Monthly Time Required</h3>
      <p>{hours} hours{minutes > 0 ? ` ${minutes} minutes` : ''}</p>
    </div>
  );
};
