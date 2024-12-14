import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CategorySelect } from './CategorySelect';
import { TaskList } from './TaskList';
import { getProductivityRate } from '@/data/productivityRates';

interface AreaInputProps {
  onAreaChange: (area: { 
    squareMeters: number; 
    spaceType: string;
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

  const calculateTimeRequired = (
    taskId: string, 
    quantity: number, 
    frequency: { timesPerWeek: number; timesPerMonth: number }, 
    productivityOverride?: number
  ): number => {
    const rate = getProductivityRate(taskId);
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
      selectedTasks: validTasks,
      totalTime
    });
  }, [selectedTasks, squareMeters]);

  const handleTaskSelection = (taskId: string, isSelected: boolean) => {
    if (isSelected) {
      const rate = getProductivityRate(taskId);
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
      <CardHeader>
        <CardTitle>Area & Task Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <CategorySelect value={category} onValueChange={setCategory} />
          </div>

          <div className="space-y-2">
            <Label>Tasks</Label>
            <TaskList
              category={category}
              selectedTasks={selectedTasks}
              onTaskSelection={handleTaskSelection}
              onQuantityChange={handleQuantityChange}
              onFrequencyChange={handleFrequencyChange}
              onProductivityOverride={handleProductivityOverride}
              onRemoveTask={(taskId) => handleTaskSelection(taskId, false)}
              onToolChange={handleToolChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="squareMeters">Total Area (Square Meters)</Label>
            <Input
              id="squareMeters"
              type="number"
              placeholder="Enter total area in square meters"
              value={squareMeters || ''}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                setSquareMeters(value);
              }}
            />
          </div>

          {selectedTasks.length > 0 && (
            <div className="p-4 bg-gray-50 rounded">
              <h3 className="font-medium mb-2">Total Monthly Time Required</h3>
              <p>{(selectedTasks.reduce((sum, task) => sum + (task.timeRequired || 0), 0) * 60).toFixed(1)} minutes</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};