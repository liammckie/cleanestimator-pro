import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EquipmentForm } from './equipment/EquipmentForm';
import { EquipmentList } from './equipment/EquipmentList';
import { EquipmentItem } from '@/types/equipment';
import { calculateDepreciation } from '@/utils/depreciationCalculator';

interface EquipmentCostsProps {
  onEquipmentCostChange: (costs: { monthly: number }) => void;
}

export const EquipmentCosts: React.FC<EquipmentCostsProps> = ({ onEquipmentCostChange }) => {
  const [items, setItems] = useState<EquipmentItem[]>([]);

  const addItem = (newItem: Omit<EquipmentItem, 'id'>) => {
    const itemWithId: EquipmentItem = {
      ...newItem,
      id: Date.now().toString()
    };
    
    const updatedItems = [...items, itemWithId];
    setItems(updatedItems);
    calculateTotal(updatedItems);
  };

  const removeItem = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    calculateTotal(updatedItems);
  };

  const calculateTotal = (currentItems: EquipmentItem[]) => {
    const monthlyDepreciationTotal = currentItems.reduce((sum, item) => {
      const { monthlyDepreciation } = calculateDepreciation(item);
      return sum + monthlyDepreciation;
    }, 0);
    onEquipmentCostChange({ monthly: monthlyDepreciationTotal });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Equipment & Supplies</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <EquipmentForm onAddItem={addItem} />
          {items.length > 0 && (
            <EquipmentList
              items={items}
              onRemoveItem={removeItem}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};