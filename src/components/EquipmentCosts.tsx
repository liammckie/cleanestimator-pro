import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EquipmentItem {
  id: string;
  name: string;
  cost: number;
  purchaseDate: string;
  lifespan: number; // in years
  depreciationType: 'straight-line' | 'declining-balance';
  salvageValue: number;
}

interface EquipmentCostsProps {
  onEquipmentCostChange: (costs: { monthly: number }) => void;
}

export const EquipmentCosts: React.FC<EquipmentCostsProps> = ({ onEquipmentCostChange }) => {
  const [items, setItems] = useState<EquipmentItem[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCost, setNewItemCost] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [lifespan, setLifespan] = useState('5');
  const [depreciationType, setDepreciationType] = useState<'straight-line' | 'declining-balance'>('straight-line');
  const [salvageValue, setSalvageValue] = useState('0');

  const calculateDepreciation = (item: EquipmentItem) => {
    const currentDate = new Date();
    const purchaseDate = new Date(item.purchaseDate);
    const ageInYears = (currentDate.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
    
    if (item.depreciationType === 'straight-line') {
      const yearlyDepreciation = (item.cost - item.salvageValue) / item.lifespan;
      const totalDepreciation = Math.min(yearlyDepreciation * ageInYears, item.cost - item.salvageValue);
      return item.cost - totalDepreciation;
    } else {
      const rate = 2 / item.lifespan; // Double declining balance rate
      const currentValue = item.cost * Math.pow((1 - rate), ageInYears);
      return Math.max(currentValue, item.salvageValue);
    }
  };

  const calculateMonthlyDepreciation = (item: EquipmentItem) => {
    const currentValue = calculateDepreciation(item);
    return (currentValue - item.salvageValue) / (item.lifespan * 12);
  };

  const addItem = () => {
    if (newItemName && newItemCost && purchaseDate) {
      const newItem: EquipmentItem = {
        id: Date.now().toString(),
        name: newItemName,
        cost: parseFloat(newItemCost),
        purchaseDate,
        lifespan: parseInt(lifespan),
        depreciationType,
        salvageValue: parseFloat(salvageValue)
      };
      
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      calculateTotal(updatedItems);
      
      // Reset inputs
      setNewItemName('');
      setNewItemCost('');
      setPurchaseDate('');
      setLifespan('5');
      setDepreciationType('straight-line');
      setSalvageValue('0');
    }
  };

  const removeItem = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    calculateTotal(updatedItems);
  };

  const calculateTotal = (currentItems: EquipmentItem[]) => {
    const monthlyDepreciationTotal = currentItems.reduce((sum, item) => 
      sum + calculateMonthlyDepreciation(item), 0);
    onEquipmentCostChange({ monthly: monthlyDepreciationTotal });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Equipment & Supplies</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-[1fr,1fr,1fr,1fr,auto] gap-2 items-end">
            <div>
              <Label htmlFor="itemName">Item Name</Label>
              <Input
                id="itemName"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="Enter item name"
              />
            </div>
            <div>
              <Label htmlFor="itemCost">Cost ($)</Label>
              <Input
                id="itemCost"
                type="number"
                value={newItemCost}
                onChange={(e) => setNewItemCost(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="purchaseDate">Purchase Date</Label>
              <Input
                id="purchaseDate"
                type="date"
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="lifespan">Lifespan (Years)</Label>
              <Input
                id="lifespan"
                type="number"
                value={lifespan}
                onChange={(e) => setLifespan(e.target.value)}
                min="1"
              />
            </div>
            <Button 
              onClick={addItem}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="depreciationType">Depreciation Method</Label>
              <Select
                value={depreciationType}
                onValueChange={(value: 'straight-line' | 'declining-balance') => 
                  setDepreciationType(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="straight-line">Straight Line</SelectItem>
                  <SelectItem value="declining-balance">Declining Balance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="salvageValue">Salvage Value ($)</Label>
              <Input
                id="salvageValue"
                type="number"
                value={salvageValue}
                onChange={(e) => setSalvageValue(e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>

          {items.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium">Equipment List</h3>
              {items.map(item => (
                <div key={item.id} className="flex items-center justify-between p-2 border rounded">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.name}</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Purchase Cost: ${item.cost}</p>
                            <p>Current Value: ${calculateDepreciation(item).toFixed(2)}</p>
                            <p>Monthly Depreciation: ${calculateMonthlyDepreciation(item).toFixed(2)}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Purchased: {new Date(item.purchaseDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span>${calculateDepreciation(item).toFixed(2)}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="h-8 w-8 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="flex justify-between pt-2 border-t font-medium">
                <span>Total Monthly Depreciation</span>
                <span>
                  ${items.reduce((sum, item) => sum + calculateMonthlyDepreciation(item), 0).toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};