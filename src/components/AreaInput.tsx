import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { getRateById } from '@/data/rates/ratesManager';
import { AreaHeader } from './area/AreaHeader';
import { CategoryPanel } from './area/CategoryPanel';
import { IndustryPanel } from './area/IndustryPanel';
import { AreaMetrics } from './area/AreaMetrics';
import { TimeDisplay } from './area/TimeDisplay';
import { TaskManager } from './area/TaskManager';

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
  const [selectedTasks, setSelectedTasks] = useState<Array<{
    taskId: string;
    quantity: number;
    timeRequired: number;
    frequency: {
      timesPerWeek: number;
      timesPerMonth: number;
    };
    productivityOverride?: number;
    selectedTool?: string;
  }>>([]);
  const [squareMeters, setSquareMeters] = useState<number>(0);
  const [category, setCategory] = useState<string>("Carpet Maintenance - Spraying and Spotting");
  const [industryType, setIndustryType] = useState<string>("");

  const calculateTimeRequired = (
    taskId: string, 
    quantity: number, 
    frequency: { timesPerWeek: number; timesPerMonth: number }, 
    productivityOverride?: number
  ): number => {
    const rate = getRateById(taskId);
    if (!rate) return 0;
    
    const ratePerHour = productivityOverride || rate.ratePerHour;
    if (!ratePerHour || ratePerHour <= 0) return 0;
    
    const baseTime = quantity / ratePerHour;
    return baseTime * (frequency?.timesPerWeek || 1) * 4;
  };

  useEffect(() => {
    const validTasks = selectedTasks.filter(task => 
      task && task.taskId && task.quantity >= 0 && 
      task.frequency && task.frequency.timesPerWeek > 0
    );

    const totalTime = validTasks.reduce((sum, task) => {
      const timeRequired = calculateTimeRequired(
        task.taskId,
        task.quantity,
        task.frequency,
        task.productivityOverride
      );
      return sum + timeRequired;
    }, 0);

    onAreaChange({
      squareMeters: squareMeters || 0,
      spaceType: 'carpet',
      industryType,
      selectedTasks: validTasks,
      totalTime
    });
  }, [selectedTasks, squareMeters, industryType]);

  const handleTaskSelection = (taskId: string, isSelected: boolean) => {
    if (isSelected) {
      const rate = getRateById(taskId);
      if (!rate) return;
      
      const newTask = {
        taskId,
        quantity: 0,
        timeRequired: 0,
        frequency: {
          timesPerWeek: 1,
          timesPerMonth: 4
        }
      };
      setSelectedTasks(prev => [...prev, newTask]);
    } else {
      setSelectedTasks(prev => prev.filter(task => task.taskId !== taskId));
    }
  };

  const handleQuantityChange = (taskId: string, quantity: number) => {
    setSelectedTasks(prev => prev.map(task => {
      if (task.taskId === taskId) {
        const timeRequired = calculateTimeRequired(
          taskId, 
          quantity, 
          task.frequency, 
          task.productivityOverride
        );
        return { ...task, quantity, timeRequired };
      }
      return task;
    }));
  };

  const handleFrequencyChange = (taskId: string, timesPerWeek: number) => {
    setSelectedTasks(prev => prev.map(task => {
      if (task.taskId === taskId) {
        const frequency = {
          timesPerWeek,
          timesPerMonth: timesPerWeek * 4
        };
        const timeRequired = calculateTimeRequired(
          taskId, 
          task.quantity, 
          frequency, 
          task.productivityOverride
        );
        return { ...task, frequency, timeRequired };
      }
      return task;
    }));
  };

  const handleProductivityOverride = (taskId: string, override: number) => {
    setSelectedTasks(prev => prev.map(task => {
      if (task.taskId === taskId) {
        const timeRequired = calculateTimeRequired(
          taskId, 
          task.quantity, 
          task.frequency, 
          override
        );
        return { ...task, productivityOverride: override, timeRequired };
      }
      return task;
    }));
  };

  const handleToolChange = (taskId: string, tool: string) => {
    setSelectedTasks(prev => prev.map(task => {
      if (task.taskId === taskId) {
        return { ...task, selectedTool: tool };
      }
      return task;
    }));
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

          <TaskManager
            category={category}
            selectedTasks={selectedTasks}
            onTaskSelection={handleTaskSelection}
            onQuantityChange={handleQuantityChange}
            onFrequencyChange={handleFrequencyChange}
            onProductivityOverride={handleProductivityOverride}
            onRemoveTask={(taskId) => handleTaskSelection(taskId, false)}
            onToolChange={handleToolChange}
          />

          <AreaMetrics 
            squareMeters={squareMeters}
            onSquareMetersChange={setSquareMeters}
          />

          <TimeDisplay selectedTasks={selectedTasks} />
        </div>
      </CardContent>
    </Card>
  );
};