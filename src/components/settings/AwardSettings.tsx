import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AwardYear {
  year: number;
  increase: number;
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
    { year: currentYear + 1, increase: 0 },
    { year: currentYear + 2, increase: 0 },
    { year: currentYear + 3, increase: 0 }
  ]);

  const handleIncreaseChange = (value: number) => {
    onAwardIncreaseChange(value);
    toast({
      title: "Award Rate Updated",
      description: `Current year award rate increase set to ${value}%`,
    });
  };

  const handleFutureYearChange = (yearIndex: number, value: number) => {
    setFutureYears(prev => {
      const updated = [...prev];
      updated[yearIndex] = { ...updated[yearIndex], increase: value };
      return updated;
    });
    toast({
      title: "Future Rate Updated",
      description: `${futureYears[yearIndex].year} award rate increase set to ${value}%`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Award Rate Configuration
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Set award rate increases for current and future years</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
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
          <p className="text-sm text-muted-foreground">
            This percentage will be applied to all direct employment award rates
          </p>
        </div>

        <Separator className="my-4" />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Future Year Increases</h3>
          {futureYears.map((year, index) => (
            <div key={year.year} className="space-y-2">
              <Label htmlFor={`year${year.year}`}>
                {year.year} Award Rate Increase (%)
              </Label>
              <Input
                id={`year${year.year}`}
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={year.increase}
                onChange={(e) => handleFutureYearChange(index, parseFloat(e.target.value) || 0)}
                className="max-w-xs"
              />
            </div>
          ))}
          <p className="text-sm text-muted-foreground">
            Set anticipated award rate increases for future years to assist with long-term planning
          </p>
        </div>
      </CardContent>
    </Card>
  );
};