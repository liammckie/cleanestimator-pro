import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface AwardSettingsProps {
  currentIncrease: number;
  onAwardIncreaseChange: (increase: number) => void;
}

export const AwardSettings: React.FC<AwardSettingsProps> = ({
  currentIncrease,
  onAwardIncreaseChange
}) => {
  const { toast } = useToast();

  const handleIncreaseChange = (value: number) => {
    onAwardIncreaseChange(value);
    toast({
      title: "Award Rate Updated",
      description: `Award rate increase set to ${value}%`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Award Rate Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="globalAwardIncrease">Global Award Rate Increase (%)</Label>
          <Input
            id="globalAwardIncrease"
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
      </CardContent>
    </Card>
  );
};