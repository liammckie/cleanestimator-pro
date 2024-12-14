import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OnCost, OnCostsState } from '@/data/types/onCosts';
import { OnCostCategory } from './oncosts/OnCostCategory';
import { useToast } from "@/components/ui/use-toast";

interface OnCostsManagerProps {
  onCosts: OnCostsState;
  onOnCostsChange: (newOnCosts: OnCostsState) => void;
}

export const OnCostsManager: React.FC<OnCostsManagerProps> = ({
  onCosts,
  onOnCostsChange,
}) => {
  const { toast } = useToast();

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

  const handleNameChange = (category: keyof OnCostsState, index: number, value: string) => {
    const newOnCosts = { ...onCosts };
    newOnCosts[category][index].name = value;
    onOnCostsChange(newOnCosts);
  };

  const handleAddItem = (category: keyof OnCostsState) => {
    const newOnCosts = { ...onCosts };
    const newItem: OnCost = {
      name: `New ${category.replace(/([A-Z])/g, ' $1').trim().slice(0, -8)} Item`,
      rate: 0,
      isEnabled: true,
      category: category.replace('OnCosts', '') as OnCost['category']
    };
    
    newOnCosts[category] = [...newOnCosts[category], newItem];
    onOnCostsChange(newOnCosts);
    
    toast({
      title: "New item added",
      description: `Added new item to ${category.replace(/([A-Z])/g, ' $1').trim().slice(0, -8)}`,
    });
  };

  const categories: Array<{key: keyof OnCostsState; title: string}> = [
    { key: 'statutoryOnCosts', title: 'Statutory On-Costs' },
    { key: 'employmentOnCosts', title: 'Employment-Specific On-Costs' },
    { key: 'recruitmentOnCosts', title: 'Recruitment & Onboarding Costs' },
    { key: 'overheadOnCosts', title: 'Business Overheads' },
    { key: 'miscellaneousOnCosts', title: 'Miscellaneous On-Costs' },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Company On-Costs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {categories.map(({ key, title }) => (
          <OnCostCategory
            key={key}
            title={title}
            category={key}
            items={onCosts[key]}
            onItemToggle={(index) => handleOnCostToggle(key, index)}
            onRateChange={(index, value) => handleRateChange(key, index, value)}
            onNameChange={(index, value) => handleNameChange(key, index, value)}
            onAddItem={() => handleAddItem(key)}
          />
        ))}
      </CardContent>
    </Card>
  );
};