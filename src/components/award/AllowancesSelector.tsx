import React from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { PayCalculation } from '@/data/types/award';

interface AllowancesSelectorProps {
  onAllowancesUpdate: (calculation: PayCalculation) => void;
}

export const AllowancesSelector: React.FC<AllowancesSelectorProps> = ({ onAllowancesUpdate }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Allowances</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="brokenShift" />
          <Label htmlFor="brokenShift">Broken Shift ($4.35/day, max $21.73/week)</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="coldPlaces" />
          <Label htmlFor="coldPlaces">Cold Places ($0.64/hour)</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="firstAid" />
          <Label htmlFor="firstAid">First Aid ($15.56/week)</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="heightUnder22" />
          <Label htmlFor="heightUnder22">Height ≤ 22nd floor ($1.02/hour)</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="heightAbove22" />
          <Label htmlFor="heightAbove22">Height > 22nd floor ($2.10/hour)</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="hotPlaces46" />
          <Label htmlFor="hotPlaces46">Hot Places 46-54°C ($0.64/hour)</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="hotPlaces54" />
          <Label htmlFor="hotPlaces54">Hot Places >54°C ($0.77/hour)</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="leadingHand" />
          <Label htmlFor="leadingHand">Leading Hand Allowance</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="mealAllowance" />
          <Label htmlFor="mealAllowance">Meal Allowance ($16.41/meal)</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="refuseCollection" />
          <Label htmlFor="refuseCollection">Refuse Collection ($4.33/shift)</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="toiletCleaning" />
          <Label htmlFor="toiletCleaning">Toilet Cleaning ($3.41/shift, max $16.76/week)</Label>
        </div>

        <div className="space-y-2">
          <Label htmlFor="vehicleAllowance">Vehicle Allowance</Label>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="motorVehicle" />
              <Label htmlFor="motorVehicle">Motor Vehicle ($0.99/km)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="motorCycle" />
              <Label htmlFor="motorCycle">Motor Cycle ($0.33/km)</Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};