import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cleaningAwardLevels } from '@/data/award/cleaningAward';

interface LaborCostsProps {
  onLaborCostChange: (costs: { 
    hourlyRate: number;
    employmentType: 'contracted' | 'direct';
    awardLevel?: number;
    shiftType?: string;
  }) => void;
}

export const LaborCosts: React.FC<LaborCostsProps> = ({ onLaborCostChange }) => {
  const [employmentType, setEmploymentType] = useState<'contracted' | 'direct'>('contracted');
  const [contractedRate, setContractedRate] = useState<number>(0);
  const [awardLevel, setAwardLevel] = useState<number>(1);
  const [shiftType, setShiftType] = useState<string>('standard');

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
        shiftType
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
        shiftType
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
        shiftType: value
      });
    }
  };

  return (
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
  );
};