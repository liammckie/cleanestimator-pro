import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { carpetMaintenanceRates } from "@/data/productivityRates";

interface AreaInputProps {
  onAreaChange: (area: { 
    squareFeet: number; 
    spaceType: string;
    selectedTask: string;
    quantity: number;
  }) => void;
}

export const AreaInput: React.FC<AreaInputProps> = ({ onAreaChange }) => {
  const [selectedTask, setSelectedTask] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [squareFeet, setSquareFeet] = useState(0);

  const handleInputChange = () => {
    onAreaChange({
      squareFeet,
      spaceType: 'carpet',
      selectedTask,
      quantity
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
            <Label htmlFor="taskType">Task Type</Label>
            <Select
              value={selectedTask}
              onValueChange={(value) => {
                setSelectedTask(value);
                handleInputChange();
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a task" />
              </SelectTrigger>
              <SelectContent>
                {carpetMaintenanceRates.map((rate) => (
                  <SelectItem key={rate.id} value={rate.id}>
                    {rate.task}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">
              {selectedTask.includes('Spot') ? 'Number of Spots' : 'Area (m²)'}
            </Label>
            <Input
              id="quantity"
              type="number"
              placeholder="Enter quantity"
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                setQuantity(value);
                handleInputChange();
              }}
            />
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
        </div>
      </CardContent>
    </Card>
  );
};