import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { getAllProductivityRates, getProductivityRate } from "@/data/productivityRates";

interface AreaInputProps {
  onAreaChange: (area: { 
    squareFeet: number; 
    spaceType: string;
    selectedTasks: Array<{
      taskId: string;
      quantity: number;
      timeRequired: number;
    }>;
    totalTime: number;
  }) => void;
}

export const AreaInput: React.FC<AreaInputProps> = ({ onAreaChange }) => {
  const [selectedTasks, setSelectedTasks] = useState<Array<{
    taskId: string;
    quantity: number;
    timeRequired: number;
  }>>([]);
  const [squareFeet, setSquareFeet] = useState(0);
  const [category, setCategory] = useState("Carpet Maintenance - Spraying and Spotting");

  const productivityRates = getAllProductivityRates();
  const categories = Array.from(new Set(productivityRates.map(rate => rate.category)));

  useEffect(() => {
    handleInputChange();
  }, [selectedTasks, squareFeet]);

  const calculateTimeRequired = (taskId: string, quantity: number) => {
    const rate = getProductivityRate(taskId);
    if (!rate) return 0;
    return quantity / rate.ratePerHour; // Returns time in hours
  };

  const handleTaskSelection = (taskId: string, isSelected: boolean) => {
    if (isSelected) {
      const newTask = {
        taskId,
        quantity: 0,
        timeRequired: 0
      };
      setSelectedTasks([...selectedTasks, newTask]);
    } else {
      setSelectedTasks(selectedTasks.filter(task => task.taskId !== taskId));
    }
  };

  const handleQuantityChange = (taskId: string, quantity: number) => {
    setSelectedTasks(selectedTasks.map(task => {
      if (task.taskId === taskId) {
        const timeRequired = calculateTimeRequired(taskId, quantity);
        return { ...task, quantity, timeRequired };
      }
      return task;
    }));
  };

  const handleInputChange = () => {
    const totalTime = selectedTasks.reduce((sum, task) => sum + task.timeRequired, 0);
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
              onValueChange={(value) => {
                setCategory(value);
                setSelectedTasks([]);
              }}
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
                .map((rate) => {
                  const selectedTask = selectedTasks.find(task => task.taskId === rate.id);
                  return (
                    <div key={rate.id} className="flex flex-col gap-2 p-2 border rounded">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={!!selectedTask}
                          onCheckedChange={(checked) => 
                            handleTaskSelection(rate.id, checked as boolean)
                          }
                        />
                        <span>{rate.task} ({rate.tool})</span>
                      </div>
                      {selectedTask && (
                        <div className="ml-6">
                          <Label htmlFor={`quantity-${rate.id}`}>
                            {rate.unit === 'spot' ? 'Number of Spots' : `Quantity (${rate.unit})`}
                          </Label>
                          <Input
                            id={`quantity-${rate.id}`}
                            type="number"
                            value={selectedTask.quantity || ''}
                            onChange={(e) => {
                              const value = parseFloat(e.target.value) || 0;
                              handleQuantityChange(rate.id, value);
                            }}
                            className="mt-1"
                          />
                          {selectedTask.timeRequired > 0 && (
                            <div className="text-sm text-gray-600 mt-1">
                              Time required: {(selectedTask.timeRequired * 60).toFixed(1)} minutes
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="squareFeet">Total Area Square Feet</Label>
            <Input
              id="squareFeet"
              type="number"
              placeholder="Enter total square footage"
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                setSquareFeet(value);
                handleInputChange();
              }}
            />
          </div>

          {selectedTasks.length > 0 && (
            <div className="p-4 bg-gray-50 rounded">
              <h3 className="font-medium mb-2">Total Time Required</h3>
              <p>{(selectedTasks.reduce((sum, task) => sum + task.timeRequired, 0) * 60).toFixed(1)} minutes</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};