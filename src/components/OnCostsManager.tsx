import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OnCost, OnCostsState } from '@/data/types/onCosts';

interface OnCostsManagerProps {
  onCosts: OnCostsState;
  onOnCostsChange: (newOnCosts: OnCostsState) => void;
}

export const OnCostsManager: React.FC<OnCostsManagerProps> = ({
  onCosts,
  onOnCostsChange,
}) => {
  const handleOnCostToggle = (category: keyof OnCostsState, index: number) => {
    const newOnCosts = { ...onCosts };
    newOnCosts[category][index].isEnabled = !newOnCosts[category][index].isEnabled;
    onOnCostsChange(newOnCosts);
  };

  const handleRateChange = (category: keyof OnCostsState, index: number, value: string) => {
    const newOnCosts = { ...onCosts };
    newOnCosts[category][index].rate = parseFloat(value) || 0;
    onOnCostsChange(newOnCosts);
  };

  const renderOnCostCategory = (category: keyof OnCostsState, title: string) => (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">{title}</h3>
      {onCosts[category].map((onCost, index) => (
        <div key={onCost.name} className="flex items-center justify-between space-x-4 p-2 bg-gray-50 rounded">
          <div className="flex-1">
            <Label>{onCost.name}</Label>
            {onCost.isMandatory && (
              <span className="text-xs text-red-500 ml-2">(Mandatory)</span>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-24">
              <Input
                type="number"
                value={onCost.rate}
                onChange={(e) => handleRateChange(category, index, e.target.value)}
                disabled={!onCost.isEnabled}
                className="w-full"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                checked={onCost.isEnabled}
                onCheckedChange={() => handleOnCostToggle(category, index)}
                disabled={onCost.isMandatory}
              />
              <span className="text-sm">%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Company On-Costs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {renderOnCostCategory('statutoryOnCosts', 'Statutory On-Costs')}
        {renderOnCostCategory('employmentOnCosts', 'Employment-Specific On-Costs')}
        {renderOnCostCategory('recruitmentOnCosts', 'Recruitment & Onboarding Costs')}
        {renderOnCostCategory('overheadOnCosts', 'Business Overheads')}
        {renderOnCostCategory('miscellaneousOnCosts', 'Miscellaneous On-Costs')}
      </CardContent>
    </Card>
  );
};