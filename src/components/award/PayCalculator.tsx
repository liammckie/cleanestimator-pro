
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { PayCalculation, EmploymentType } from '@/data/types/award';
import { shiftTimings, cleaningAwardLevels, calculatePayRate, getHourlyRate } from '@/data/award/cleaningAward';

interface PayCalculatorProps {
  onCalculationUpdate: (calculation: PayCalculation) => void;
  employeeLevel?: number;
  employmentType?: EmploymentType;
}

export const PayCalculator: React.FC<PayCalculatorProps> = ({ 
  onCalculationUpdate,
  employeeLevel = 1,
  employmentType = EmploymentType.PERMANENT
}) => {
  const [level, setLevel] = useState(employeeLevel);
  const [empType, setEmpType] = useState(employmentType);
  const [shiftType, setShiftType] = useState<string>('weekday');
  const [hours, setHours] = useState(8);
  const [isPublicHoliday, setIsPublicHoliday] = useState(false);
  const [hourlyRate, setHourlyRate] = useState<number>(0);
  
  useEffect(() => {
    // Update hourly rate when level, employment type, or shift type changes
    const rate = getHourlyRate(
      level, 
      empType, 
      isPublicHoliday ? 'publicHoliday' : shiftType as any
    );
    setHourlyRate(rate);
    
    // Calculate full pay details
    const calculation = calculatePayRate(
      level,
      empType,
      isPublicHoliday ? 'publicHoliday' : shiftType as any,
      hours,
      [] // No allowances by default
    );
    
    onCalculationUpdate(calculation);
  }, [level, empType, shiftType, hours, isPublicHoliday, onCalculationUpdate]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Pay Rate Calculation</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="level">Award Level</Label>
          <Select value={level.toString()} onValueChange={(value) => setLevel(parseInt(value))}>
            <SelectTrigger>
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              {cleaningAwardLevels.map((awardLevel) => (
                <SelectItem key={awardLevel.level} value={awardLevel.level.toString()}>
                  {awardLevel.description || `Level ${awardLevel.level}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="employmentType">Employment Type</Label>
          <Select value={empType} onValueChange={(value) => setEmpType(value as EmploymentType)}>
            <SelectTrigger>
              <SelectValue placeholder="Select employment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={EmploymentType.PERMANENT}>Permanent</SelectItem>
              <SelectItem value={EmploymentType.CASUAL}>Casual</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="hourlyRate">Hourly Pay Rate</Label>
          <Input id="hourlyRate" type="text" value={`$${hourlyRate.toFixed(2)}`} readOnly />
        </div>

        <div className="space-y-2">
          <Label htmlFor="shiftType">Shift Type</Label>
          <Select value={shiftType} onValueChange={setShiftType} disabled={isPublicHoliday}>
            <SelectTrigger>
              <SelectValue placeholder="Select shift type" />
            </SelectTrigger>
            <SelectContent>
              {shiftTimings.filter(timing => timing.type !== 'publicHoliday').map((timing) => (
                <SelectItem key={timing.type} value={timing.type}>
                  {timing.description || timing.type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="hours">Hours Worked</Label>
          <Input 
            id="hours" 
            type="number" 
            min="0.5" 
            step="0.5" 
            value={hours}
            onChange={(e) => setHours(parseFloat(e.target.value) || 0)}
          />
        </div>

        <div className="flex items-center space-x-2 pt-6">
          <Checkbox 
            id="publicHoliday" 
            checked={isPublicHoliday}
            onCheckedChange={(checked) => setIsPublicHoliday(checked === true)}
          />
          <Label htmlFor="publicHoliday">Public Holiday</Label>
        </div>
      </div>
    </div>
  );
};
