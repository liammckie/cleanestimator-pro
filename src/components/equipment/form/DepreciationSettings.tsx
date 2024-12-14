import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DepreciationSettingsProps {
  lifespan: string;
  depreciationType: 'diminishing-value' | 'prime-cost';
  salvageValue: string;
  onLifespanChange: (value: string) => void;
  onDepreciationTypeChange: (value: 'diminishing-value' | 'prime-cost') => void;
  onSalvageValueChange: (value: string) => void;
}

export const DepreciationSettings: React.FC<DepreciationSettingsProps> = ({
  lifespan,
  depreciationType,
  salvageValue,
  onLifespanChange,
  onDepreciationTypeChange,
  onSalvageValueChange,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="depreciationType">Depreciation Method</Label>
        <Select
          value={depreciationType}
          onValueChange={onDepreciationTypeChange}
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
        <Label htmlFor="lifespan">Lifespan (Years)</Label>
        <Input
          id="lifespan"
          type="number"
          value={lifespan}
          onChange={(e) => onLifespanChange(e.target.value)}
          min="1"
        />
      </div>
      <div>
        <Label htmlFor="salvageValue">Salvage Value ($)</Label>
        <Input
          id="salvageValue"
          type="number"
          value={salvageValue}
          onChange={(e) => onSalvageValueChange(e.target.value)}
          placeholder="0.00"
        />
      </div>
    </div>
  );
};