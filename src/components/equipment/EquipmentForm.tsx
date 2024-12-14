import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { EquipmentItem } from '@/types/equipment';
import { EquipmentBasicInfo } from './form/EquipmentBasicInfo';
import { DepreciationSettings } from './form/DepreciationSettings';

interface EquipmentFormProps {
  onAddItem: (item: Omit<EquipmentItem, 'id'>) => void;
}

export const EquipmentForm: React.FC<EquipmentFormProps> = ({ onAddItem }) => {
  const [newItemName, setNewItemName] = React.useState('');
  const [newItemCost, setNewItemCost] = React.useState('');
  const [purchaseDate, setPurchaseDate] = React.useState('');
  const [lifespan, setLifespan] = React.useState('5');
  const [depreciationType, setDepreciationType] = React.useState<'diminishing-value' | 'prime-cost'>('diminishing-value');
  const [salvageValue, setSalvageValue] = React.useState('0');

  const handleSubmit = () => {
    if (newItemName && newItemCost && purchaseDate) {
      onAddItem({
        name: newItemName,
        cost: parseFloat(newItemCost),
        purchaseDate,
        lifespan: parseInt(lifespan),
        depreciationType,
        salvageValue: parseFloat(salvageValue)
      });
      
      // Reset form
      setNewItemName('');
      setNewItemCost('');
      setPurchaseDate('');
      setLifespan('5');
      setDepreciationType('diminishing-value');
      setSalvageValue('0');
    }
  };

  return (
    <div className="space-y-4">
      <EquipmentBasicInfo
        name={newItemName}
        cost={newItemCost}
        purchaseDate={purchaseDate}
        onNameChange={setNewItemName}
        onCostChange={setNewItemCost}
        onPurchaseDateChange={setPurchaseDate}
      />

      <DepreciationSettings
        lifespan={lifespan}
        depreciationType={depreciationType}
        salvageValue={salvageValue}
        onLifespanChange={setLifespan}
        onDepreciationTypeChange={setDepreciationType}
        onSalvageValueChange={setSalvageValue}
      />

      <Button 
        onClick={handleSubmit}
        className="flex items-center gap-2"
      >
        <Plus className="h-4 w-4" />
        Add
      </Button>
    </div>
  );
};