import React from 'react';

interface TimeDisplayProps {
  selectedTasks: Array<{
    timeRequired: number;
  }>;
}

export const TimeDisplay: React.FC<TimeDisplayProps> = ({ selectedTasks }) => {
  if (selectedTasks.length === 0) return null;

  const totalMinutes = selectedTasks.reduce((sum, task) => sum + (task.timeRequired || 0), 0) * 60;

  return (
    <div className="p-4 bg-gray-50 rounded">
      <h3 className="font-medium mb-2">Total Monthly Time Required</h3>
      <p>{totalMinutes.toFixed(1)} minutes</p>
    </div>
  );
};