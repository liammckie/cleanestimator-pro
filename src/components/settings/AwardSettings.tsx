
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface AwardYear {
  year: number;
  increase: number;
  superRate: number;
}

interface AwardSettingsProps {
  currentIncrease: number;
  onAwardIncreaseChange: (increase: number) => void;
}

export const AwardSettings: React.FC<AwardSettingsProps> = ({
  currentIncrease,
  onAwardIncreaseChange
}) => {
  const { toast } = useToast();
  const currentYear = new Date().getFullYear();
  const [futureYears, setFutureYears] = React.useState<AwardYear[]>([
    { year: currentYear + 1, increase: 0, superRate: 11.5 },
    { year: currentYear + 2, increase: 0, superRate: 12.0 },
    { year: currentYear + 3, increase: 0, superRate: 12.5 }
  ]);
  const [currentSuperRate, setCurrentSuperRate] = React.useState(11.0);

  const handleIncreaseChange = (value: number) => {
    onAwardIncreaseChange(value);
    toast({
      title: "Award Rate Updated",
      description: `Current year award rate increase set to ${value}%`,
    });
  };

  const handleSuperRateChange = (value: number) => {
    setCurrentSuperRate(value);
    toast({
      title: "Superannuation Rate Updated",
      description: `Current year superannuation rate set to ${value}%`,
    });
  };

  const handleFutureYearChange = (yearIndex: number, field: 'increase' | 'superRate', value: number) => {
    setFutureYears(prev => {
      const updated = [...prev];
      updated[yearIndex] = { ...updated[yearIndex], [field]: value };
      return updated;
    });
    
    const yearData = futureYears[yearIndex];
    const fieldName = field === 'increase' ? 'award rate increase' : 'superannuation rate';
    
    toast({
      title: "Future Rate Updated",
      description: `${yearData.year} ${fieldName} set to ${value}%`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Award Rate Configuration
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Set award rate and superannuation increases for current and future years</p>
            </TooltipContent>
          </Tooltip>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentYearIncrease" className="flex items-center gap-2">
              Current Year ({currentYear}) Award Rate Increase (%)
            </Label>
            <Input
              id="currentYearIncrease"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={currentIncrease}
              onChange={(e) => handleIncreaseChange(parseFloat(e.target.value) || 0)}
              className="max-w-xs"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentSuperRate" className="flex items-center gap-2">
              Current Year ({currentYear}) Superannuation Rate (%)
            </Label>
            <Input
              id="currentSuperRate"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={currentSuperRate}
              onChange={(e) => handleSuperRateChange(parseFloat(e.target.value) || 0)}
              className="max-w-xs"
            />
          </div>
        </div>

        <Separator className="my-4" />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Future Year Increases</h3>
          {futureYears.map((year, index) => (
            <div key={year.year} className="space-y-4 p-4 border rounded-lg">
              <h4 className="font-medium">{year.year}</h4>
              <div className="space-y-2">
                <Label htmlFor={`year${year.year}Award`}>
                  Award Rate Increase (%)
                </Label>
                <Input
                  id={`year${year.year}Award`}
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={year.increase}
                  onChange={(e) => handleFutureYearChange(index, 'increase', parseFloat(e.target.value) || 0)}
                  className="max-w-xs"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`year${year.year}Super`}>
                  Superannuation Rate (%)
                </Label>
                <Input
                  id={`year${year.year}Super`}
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={year.superRate}
                  onChange={(e) => handleFutureYearChange(index, 'superRate', parseFloat(e.target.value) || 0)}
                  className="max-w-xs"
                />
              </div>
            </div>
          ))}
          <p className="text-sm text-muted-foreground">
            Set anticipated award rate and superannuation increases for future years to assist with long-term planning
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
