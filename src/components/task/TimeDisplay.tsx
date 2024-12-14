import React from 'react';

interface TimeDisplayProps {
  timeRequired: number;
  frequency: {
    timesPerWeek: number;
  };
}

export const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeRequired, frequency }) => {
  return (
    <div className="text-sm text-gray-600 mt-1">
      <p>Time per service: {((timeRequired / (frequency?.timesPerWeek || 1)) / 4 * 60).toFixed(1)} minutes</p>
      <p>Monthly time: {(timeRequired * 60).toFixed(1)} minutes</p>
    </div>
  );
};