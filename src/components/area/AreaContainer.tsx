import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AreaHeader } from './AreaHeader';
import { CategoryPanel } from './CategoryPanel';
import { IndustryPanel } from './IndustryPanel';
import { AreaMetrics } from './AreaMetrics';
import { TimeDisplay } from './TimeDisplay';
import { TaskManager } from './TaskManager';
import { TaskProvider } from './task/TaskContext';

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
  const [category, setCategory] = useState<string>("Carpet Maintenance - Spraying and Spotting");
  const [industryType, setIndustryType] = useState<string>("");
  const [squareMeters, setSquareMeters] = useState<number>(0);

  const handleTasksChange = (tasks: any[]) => {
    const totalTime = tasks.reduce((sum, task) => sum + (task.timeRequired || 0), 0);
    
    onAreaChange({
      squareMeters: squareMeters || 0,
      spaceType: 'carpet',
      industryType,
      selectedTasks: tasks,
      totalTime
    });
  };

  return (
    <Card className="w-full">
      <AreaHeader />
      <CardContent>
        <div className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <IndustryPanel 
              value={industryType}
              onValueChange={setIndustryType}
            />
            <CategoryPanel 
              value={category}
              onValueChange={setCategory}
            />
          </div>

          <TaskProvider onTasksChange={handleTasksChange}>
            <TaskManager
              category={category}
            />
          </TaskProvider>

          <AreaMetrics 
            squareMeters={squareMeters}
            onSquareMetersChange={setSquareMeters}
          />

          <TimeDisplay selectedTasks={[]} />
        </div>
      </CardContent>
    </Card>
  );
};