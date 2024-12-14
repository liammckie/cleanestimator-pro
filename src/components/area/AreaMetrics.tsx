import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AreaMetricsProps {
  squareMeters: number;
  onSquareMetersChange: (value: number) => void;
}

export const AreaMetrics: React.FC<AreaMetricsProps> = ({ 
  squareMeters, 
  onSquareMetersChange 
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="squareMeters">Total Area (Square Meters)</Label>
      <Input
        id="squareMeters"
        type="number"
        placeholder="Enter total area in square meters"
        value={squareMeters || ''}
        onChange={(e) => {
          const value = parseFloat(e.target.value) || 0;
          onSquareMetersChange(value);
        }}
      />
    </div>
  );
};