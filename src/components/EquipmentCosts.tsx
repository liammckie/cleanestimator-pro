import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface EquipmentItem {
  id: string;
  name: string;
  cost: number;
}

interface EquipmentCostsProps {
  onEquipmentCostChange: (costs: { monthly: number }) => void;
}

export const EquipmentCosts: React.FC<EquipmentCostsProps> = ({ onEquipmentCostChange }) => {
  const [items, setItems] = useState<EquipmentItem[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCost, setNewItemCost] = useState('');

  const addItem = () => {
    if (newItemName && newItemCost) {
      const newItem: EquipmentItem = {
        id: Date.now().toString(),
        name: newItemName,
        cost: parseFloat(newItemCost) || 0
      };
      
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      calculateTotal(updatedItems);
      
      // Reset inputs
      setNewItemName('');
      setNewItemCost('');
    }
  };

  const removeItem = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    calculateTotal(updatedItems);
  };

  const calculateTotal = (currentItems: EquipmentItem[]) => {
    const total = currentItems.reduce((sum, item) => sum + item.cost, 0);
    onEquipmentCostChange({ monthly: total });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Equipment & Supplies</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-[1fr,120px,auto] gap-2 items-end">
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
            <Button 
              onClick={addItem}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>

          {items.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium">Items List</h3>
              {items.map(item => (
                <div key={item.id} className="flex items-center justify-between p-2 border rounded">
                  <span>{item.name}</span>
                  <div className="flex items-center gap-4">
                    <span>${item.cost.toFixed(2)}</span>
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
                <span>Total Monthly Cost</span>
                <span>${items.reduce((sum, item) => sum + item.cost, 0).toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};