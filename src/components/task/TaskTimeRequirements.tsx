import React from 'react';

interface TaskTimeRequirementsProps {
  timeRequired: number;
  weeklyHours: number;  // Changed from string to number
  ratePerHour: number;
  unit: string;
}

export const TaskTimeRequirements: React.FC<TaskTimeRequirementsProps> = ({
  timeRequired,
  weeklyHours,
  ratePerHour,
  unit
}) => {
  return (
    <div className="bg-accent/50 p-4 rounded-lg space-y-2">
      <h4 className="font-medium">Time Requirements</h4>
      <div className="text-sm space-y-1">
        <p>Weekly hours: {weeklyHours.toFixed(1)} hours</p>
        <p>Monthly hours: {timeRequired.toFixed(1)} hours</p>
        <p>Productivity rate: {ratePerHour.toFixed(2)} {unit}/hour</p>
      </div>
    </div>
  );
};