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
        <Label htmlFor="equipment-name">Item Name</Label>
        <Input
          id="equipment-name"
          name="equipment-name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Enter item name"
        />
      </div>
      <div>
        <Label htmlFor="equipment-cost">Cost ($)</Label>
        <Input
          id="equipment-cost"
          name="equipment-cost"
          type="number"
          value={cost}
          onChange={(e) => onCostChange(e.target.value)}
          placeholder="0.00"
        />
      </div>
      <div>
        <Label htmlFor="equipment-purchase-date">Purchase Date</Label>
        <Input
          id="equipment-purchase-date"
          name="equipment-purchase-date"
          type="date"
          value={purchaseDate}
          onChange={(e) => onPurchaseDateChange(e.target.value)}
        />
      </div>
    </div>
  );
};