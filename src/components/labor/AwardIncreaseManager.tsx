import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AwardIncreaseManagerProps {
  onAwardIncreaseChange: (increase: number) => void;
  currentIncrease: number;
}

export const AwardIncreaseManager: React.FC<AwardIncreaseManagerProps> = ({
  onAwardIncreaseChange,
  currentIncrease
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Award Rate Increase</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="awardIncrease">Award Increase Percentage (%)</Label>
            <Input
              id="awardIncrease"
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={currentIncrease}
              onChange={(e) => onAwardIncreaseChange(parseFloat(e.target.value) || 0)}
              className="mt-1"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};