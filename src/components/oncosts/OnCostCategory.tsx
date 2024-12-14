import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit2 } from "lucide-react";
import { OnCost } from '@/data/types/onCosts';

interface OnCostCategoryProps {
  title: string;
  category: string;
  items: OnCost[];
  onItemToggle: (index: number) => void;
  onRateChange: (index: number, value: string) => void;
  onAddItem: (category: string) => void;
  onNameChange: (index: number, value: string) => void;
}

export const OnCostCategory: React.FC<OnCostCategoryProps> = ({
  title,
  category,
  items,
  onItemToggle,
  onRateChange,
  onAddItem,
  onNameChange,
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleNameSubmit = (index: number, currentName: string) => {
    if (currentName.trim()) {
      setEditingIndex(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">{title}</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onAddItem(category)}
          className="h-8 px-2"
        >
          <PlusCircle className="h-4 w-4 mr-1" />
          Add Item
        </Button>
      </div>
      {items.map((onCost, index) => (
        <div key={`${category}-${index}-${onCost.name}`} className="flex items-center justify-between space-x-4 p-2 bg-gray-50 rounded">
          <div className="flex-1 flex items-center space-x-2">
            {editingIndex === index ? (
              <Input
                value={onCost.name}
                onChange={(e) => onNameChange(index, e.target.value)}
                onBlur={() => handleNameSubmit(index, onCost.name)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleNameSubmit(index, onCost.name);
                  }
                }}
                className="w-full"
                autoFocus
              />
            ) : (
              <>
                <Label className="flex-1">{onCost.name}</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingIndex(index)}
                  className="h-8 w-8 p-0"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              </>
            )}
            {onCost.isMandatory && (
              <span className="text-xs text-red-500">(Mandatory)</span>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-24">
              <Input
                type="number"
                value={onCost.rate}
                onChange={(e) => onRateChange(index, e.target.value)}
                disabled={!onCost.isEnabled}
                className="w-full"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={onCost.isEnabled}
                onCheckedChange={() => onItemToggle(index)}
                disabled={onCost.isMandatory}
              />
              <span className="text-sm">%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};