import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EquipmentItem } from '@/types/equipment';

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
          onClick={handleSubmit}
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
            onValueChange={(value: 'diminishing-value' | 'prime-cost') => 
              setDepreciationType(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="diminishing-value">Diminishing Value (DV)</SelectItem>
              <SelectItem value="prime-cost">Prime Cost (PC)</SelectItem>
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
    </div>
  );
};