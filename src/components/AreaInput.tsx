import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAllProductivityRates, getProductivityRate } from '@/data/productivityRates';
import { TaskItem } from './TaskItem';

interface AreaInputProps {
  onAreaChange: (area: { 
    squareFeet: number; 
    spaceType: string;
    selectedTasks: Array<{
      taskId: string;
      quantity: number;
      timeRequired: number;
      frequency: {
        timesPerWeek: number;
        timesPerMonth: number;
      };
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
  }>>([]);
  const [squareFeet, setSquareFeet] = useState(0);
  const [category, setCategory] = useState("Carpet Maintenance - Spraying and Spotting");

  const productivityRates = getAllProductivityRates();
  const categories = Array.from(new Set(productivityRates.map(rate => rate.category)));

  useEffect(() => {
    handleInputChange();
  }, [selectedTasks, squareFeet]);

  const calculateTimeRequired = (taskId: string, quantity: number, frequency: { timesPerWeek: number; timesPerMonth: number }) => {
    const rate = getProductivityRate(taskId);
    if (!rate) return 0;
    const baseTime = quantity / rate.ratePerHour;
    return baseTime * (frequency?.timesPerWeek || 1) * 4;
  };

  const handleTaskSelection = (taskId: string, isSelected: boolean) => {
    if (isSelected) {
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
        const timeRequired = calculateTimeRequired(taskId, quantity, task.frequency);
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
        const timeRequired = calculateTimeRequired(taskId, task.quantity, frequency);
        return { ...task, frequency, timeRequired };
      }
      return task;
    }));
  };

  const handleInputChange = () => {
    const totalTime = selectedTasks.reduce((sum, task) => sum + (task.timeRequired || 0), 0);
    onAreaChange({
      squareFeet,
      spaceType: 'carpet',
      selectedTasks,
      totalTime
    });
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
            <Select
              value={category}
              onValueChange={(value) => setCategory(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Tasks</Label>
            <div className="grid gap-2">
              {productivityRates
                .filter(rate => rate.category === category)
                .map((rate) => (
                  <TaskItem
                    key={rate.id}
                    rate={rate}
                    selectedTask={selectedTasks.find(task => task.taskId === rate.id)}
                    onTaskSelection={handleTaskSelection}
                    onQuantityChange={handleQuantityChange}
                    onFrequencyChange={handleFrequencyChange}
                  />
                ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="squareFeet">Total Area Square Feet</Label>
            <Input
              id="squareFeet"
              type="number"
              placeholder="Enter total square footage"
              value={squareFeet || ''}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                setSquareFeet(value);
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