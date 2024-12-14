import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { EquipmentItem } from '@/types/equipment';
import { EquipmentBasicInfo } from './form/EquipmentBasicInfo';
import { DepreciationSettings } from './form/DepreciationSettings';
import { toast } from "sonner";

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
    // Validate required fields
    if (!newItemName.trim()) {
      toast.error("Please enter an item name");
      return;
    }

    const cost = parseFloat(newItemCost);
    if (isNaN(cost) || cost <= 0) {
      toast.error("Please enter a valid cost");
      return;
    }

    if (!purchaseDate) {
      toast.error("Please select a purchase date");
      return;
    }

    const parsedLifespan = parseInt(lifespan);
    if (isNaN(parsedLifespan) || parsedLifespan <= 0) {
      toast.error("Please enter a valid lifespan");
      return;
    }

    const parsedSalvageValue = parseFloat(salvageValue);
    if (isNaN(parsedSalvageValue) || parsedSalvageValue < 0) {
      toast.error("Please enter a valid salvage value");
      return;
    }

    onAddItem({
      name: newItemName.trim(),
      cost: cost,
      purchaseDate,
      lifespan: parsedLifespan,
      depreciationType,
      salvageValue: parsedSalvageValue
    });
    
    // Reset form
    setNewItemName('');
    setNewItemCost('');
    setPurchaseDate('');
    setLifespan('5');
    setDepreciationType('diminishing-value');
    setSalvageValue('0');

    toast.success("Equipment item added successfully");
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