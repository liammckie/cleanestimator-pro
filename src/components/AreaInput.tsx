import React from 'react';
import { AreaContainer } from './area/AreaContainer';

interface AreaInputProps {
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

export const AreaInput: React.FC<AreaInputProps> = ({ onAreaChange }) => {
  return <AreaContainer onAreaChange={onAreaChange} />;
};