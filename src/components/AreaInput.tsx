import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAllProductivityRates, getProductivityRate } from "@/data/productivityRates";

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
  const [category, setCategory] = useState("Carpet Maintenance - Spraying and Spotting");

  const productivityRates = getAllProductivityRates();
  const categories = Array.from(new Set(productivityRates.map(rate => rate.category)));

  const selectedRate = getProductivityRate(selectedTask);
  const isSpotTask = selectedRate?.unit.toLowerCase() === 'spot';

  useEffect(() => {
    handleInputChange();
  }, [selectedTask, quantity, squareFeet]);

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
            <Label htmlFor="category">Category</Label>
            <Select
              value={category}
              onValueChange={(value) => {
                setCategory(value);
                setSelectedTask("");
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
                {productivityRates
                  .filter(rate => rate.category === category)
                  .map((rate) => (
                    <SelectItem key={rate.id} value={rate.id}>
                      {rate.task} ({rate.tool})
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">
              {isSpotTask ? 'Number of Spots' : 'Area (m²)'}
            </Label>
            <Input
              id="quantity"
              type="number"
              placeholder={`Enter ${isSpotTask ? 'number of spots' : 'area in square meters'}`}
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