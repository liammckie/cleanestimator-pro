import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cleaningAwardLevels } from '@/data/award/cleaningAward';
import { OnCostsManager } from './OnCostsManager';
import { OnCostsState } from '@/data/types/onCosts';

interface LaborCostsProps {
  onLaborCostChange: (costs: { 
    hourlyRate: number;
    employmentType: 'contracted' | 'direct';
    awardLevel?: number;
    shiftType?: string;
    onCosts?: OnCostsState;
  }) => void;
}

const defaultOnCosts: OnCostsState = {
  statutoryOnCosts: [
    { name: 'Superannuation Guarantee', rate: 11.5, isEnabled: true, category: 'statutory', isMandatory: true },
    { name: 'Workers Compensation', rate: 5, isEnabled: true, category: 'statutory', isMandatory: true },
    { name: 'Payroll Tax', rate: 4.75, isEnabled: true, category: 'statutory', isMandatory: true },
    { name: 'Leave Entitlements', rate: 8.33, isEnabled: true, category: 'statutory', isMandatory: true },
  ],
  employmentOnCosts: [
    { name: 'Casual Loading', rate: 25, isEnabled: false, category: 'employment' },
    { name: 'Training Allowance', rate: 2, isEnabled: false, category: 'employment' },
  ],
  recruitmentOnCosts: [
    { name: 'Recruitment & Advertising', rate: 3, isEnabled: false, category: 'recruitment' },
    { name: 'Training & Induction', rate: 2, isEnabled: false, category: 'recruitment' },
  ],
  overheadOnCosts: [
    { name: 'Uniforms & PPE', rate: 2, isEnabled: false, category: 'overhead' },
    { name: 'Equipment & Tools', rate: 3, isEnabled: false, category: 'overhead' },
  ],
  miscellaneousOnCosts: [
    { name: 'Insurance', rate: 2, isEnabled: false, category: 'miscellaneous' },
    { name: 'Administrative Costs', rate: 3, isEnabled: false, category: 'miscellaneous' },
  ],
};

export const LaborCosts: React.FC<LaborCostsProps> = ({ onLaborCostChange }) => {
  const [employmentType, setEmploymentType] = useState<'contracted' | 'direct'>('contracted');
  const [contractedRate, setContractedRate] = useState<number>(0);
  const [awardLevel, setAwardLevel] = useState<number>(1);
  const [shiftType, setShiftType] = useState<string>('standard');
  const [onCosts, setOnCosts] = useState<OnCostsState>(defaultOnCosts);

  const handleEmploymentTypeChange = (value: 'contracted' | 'direct') => {
    setEmploymentType(value);
    if (value === 'contracted') {
      onLaborCostChange({
        hourlyRate: contractedRate,
        employmentType: value
      });
    } else {
      const selectedLevel = cleaningAwardLevels.find(level => level.level === awardLevel);
      onLaborCostChange({
        hourlyRate: selectedLevel?.payRates[shiftType as keyof typeof selectedLevel.payRates] || 0,
        employmentType: value,
        awardLevel,
        shiftType,
        onCosts
      });
    }
  };

  const handleContractedRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setContractedRate(value);
    if (employmentType === 'contracted') {
      onLaborCostChange({
        hourlyRate: value,
        employmentType
      });
    }
  };

  const handleAwardLevelChange = (value: string) => {
    const level = parseInt(value);
    setAwardLevel(level);
    if (employmentType === 'direct') {
      const selectedLevel = cleaningAwardLevels.find(l => l.level === level);
      onLaborCostChange({
        hourlyRate: selectedLevel?.payRates[shiftType as keyof typeof selectedLevel.payRates] || 0,
        employmentType,
        awardLevel: level,
        shiftType,
        onCosts
      });
    }
  };

  const handleShiftTypeChange = (value: string) => {
    setShiftType(value);
    if (employmentType === 'direct') {
      const selectedLevel = cleaningAwardLevels.find(level => level.level === awardLevel);
      onLaborCostChange({
        hourlyRate: selectedLevel?.payRates[value as keyof typeof selectedLevel.payRates] || 0,
        employmentType,
        awardLevel,
        shiftType: value,
        onCosts
      });
    }
  };

  const handleOnCostsChange = (newOnCosts: OnCostsState) => {
    setOnCosts(newOnCosts);
    if (employmentType === 'direct') {
      const selectedLevel = cleaningAwardLevels.find(level => level.level === awardLevel);
      onLaborCostChange({
        hourlyRate: selectedLevel?.payRates[shiftType as keyof typeof selectedLevel.payRates] || 0,
        employmentType,
        awardLevel,
        shiftType,
        onCosts: newOnCosts
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Labor Costs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="space-y-2">
              <Label>Employment Type</Label>
              <RadioGroup
                defaultValue="contracted"
                onValueChange={handleEmploymentTypeChange}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="contracted" id="contracted" />
                  <Label htmlFor="contracted">Contracted (All-Inclusive Rate)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="direct" id="direct" />
                  <Label htmlFor="direct">Direct Employment (Award Rates)</Label>
                </div>
              </RadioGroup>
            </div>

            {employmentType === 'contracted' ? (
              <div className="space-y-2">
                <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  placeholder="Enter hourly rate"
                  onChange={handleContractedRateChange}
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="awardLevel">Award Level</Label>
                  <Select onValueChange={handleAwardLevelChange} defaultValue="1">
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      {cleaningAwardLevels.map((level) => (
                        <SelectItem key={level.level} value={level.level.toString()}>
                          Level {level.level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shiftType">Shift Type</Label>
                  <Select onValueChange={handleShiftTypeChange} defaultValue="standard">
                    <SelectTrigger>
                      <SelectValue placeholder="Select shift type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Weekday (Standard)</SelectItem>
                      <SelectItem value="earlyLate">Early/Late (+15%)</SelectItem>
                      <SelectItem value="night">Night (+25%)</SelectItem>
                      <SelectItem value="saturday">Saturday (+50%)</SelectItem>
                      <SelectItem value="sunday">Sunday (+100%)</SelectItem>
                      <SelectItem value="publicHoliday">Public Holiday (+150%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {employmentType === 'direct' && (
        <OnCostsManager
          onCosts={onCosts}
          onOnCostsChange={handleOnCostsChange}
        />
      )}
    </div>
  );
};