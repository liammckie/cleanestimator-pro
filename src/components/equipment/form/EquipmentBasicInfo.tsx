import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EquipmentBasicInfoProps {
  name: string;
  cost: string;
  purchaseDate: string;
  onNameChange: (value: string) => void;
  onCostChange: (value: string) => void;
  onPurchaseDateChange: (value: string) => void;
}

export const EquipmentBasicInfo: React.FC<EquipmentBasicInfoProps> = ({
  name,
  cost,
  purchaseDate,
  onNameChange,
  onCostChange,
  onPurchaseDateChange,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-[1fr,1fr,1fr] gap-2 items-end">
      <div>
        <Label htmlFor="itemName">Item Name</Label>
        <Input
          id="itemName"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Enter item name"
        />
      </div>
      <div>
        <Label htmlFor="itemCost">Cost ($)</Label>
        <Input
          id="itemCost"
          type="number"
          value={cost}
          onChange={(e) => onCostChange(e.target.value)}
          placeholder="0.00"
        />
      </div>
      <div>
        <Label htmlFor="purchaseDate">Purchase Date</Label>
        <Input
          id="purchaseDate"
          type="date"
          value={purchaseDate}
          onChange={(e) => onPurchaseDateChange(e.target.value)}
        />
      </div>
    </div>
  );
};