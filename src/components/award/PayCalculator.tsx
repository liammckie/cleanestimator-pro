import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { PayCalculation } from '@/data/types/award';

interface PayCalculatorProps {
  onCalculationUpdate: (calculation: PayCalculation) => void;
}

export const PayCalculator: React.FC<PayCalculatorProps> = ({ onCalculationUpdate }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Pay Rate Calculation</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="hourlyRate">Hourly Pay Rate</Label>
          <Input id="hourlyRate" type="number" readOnly />
        </div>

        <div className="space-y-2">
          <Label htmlFor="shiftStart">Shift Start Time</Label>
          <Input id="shiftStart" type="time" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="shiftEnd">Shift End Time</Label>
          <Input id="shiftEnd" type="time" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="overtimeHours">Overtime Hours</Label>
          <Input id="overtimeHours" type="number" min="0" step="0.5" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="overtimeType">Overtime Type</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select overtime type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="first2">First 2 hours</SelectItem>
              <SelectItem value="after2">After 2 hours</SelectItem>
              <SelectItem value="weekend">Weekend</SelectItem>
              <SelectItem value="publicHoliday">Public Holiday</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2 pt-6">
          <Checkbox id="publicHoliday" />
          <Label htmlFor="publicHoliday">Public Holiday Worked</Label>
        </div>
      </div>
    </div>
  );
};