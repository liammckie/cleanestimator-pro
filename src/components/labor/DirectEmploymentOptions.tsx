
import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cleaningAwardLevels } from '@/data/award/cleaningAward';
import { fetchAwardRates, EmploymentType, ShiftType } from '@/services/awardRatesService';

interface DirectEmploymentOptionsProps {
  awardLevel: number;
  shiftType: string;
  employmentType?: string;
  onAwardLevelChange: (value: string) => void;
  onShiftTypeChange: (value: string) => void;
  onEmploymentTypeChange?: (value: string) => void;
}

export const DirectEmploymentOptions: React.FC<DirectEmploymentOptionsProps> = ({
  awardLevel,
  shiftType,
  employmentType = 'full-time',
  onAwardLevelChange,
  onShiftTypeChange,
  onEmploymentTypeChange
}) => {
  const [currentRate, setCurrentRate] = useState<number | null>(null);
  
  useEffect(() => {
    const fetchRate = async () => {
      try {
        const rates = await fetchAwardRates();
        const matchingRate = rates.find(
          rate => 
            rate.level === awardLevel &&
            rate.employment_type === employmentType &&
            rate.shift_type === shiftType as ShiftType
        );
        
        if (matchingRate) {
          setCurrentRate(matchingRate.hourly_rate);
        }
      } catch (error) {
        console.error("Error fetching award rate:", error);
      }
    };
    
    fetchRate();
  }, [awardLevel, shiftType, employmentType]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="employmentType">Employment Type</Label>
        <Select 
          value={employmentType} 
          onValueChange={onEmploymentTypeChange ? onEmploymentTypeChange : () => {}}
          disabled={!onEmploymentTypeChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select employment type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full-time">Full Time</SelectItem>
            <SelectItem value="part-time">Part Time</SelectItem>
            <SelectItem value="casual">Casual</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="awardLevel">Award Level</Label>
        <Select onValueChange={onAwardLevelChange} value={awardLevel.toString()}>
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
        <Select onValueChange={onShiftTypeChange} value={shiftType}>
          <SelectTrigger>
            <SelectValue placeholder="Select shift type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mon-fri-day">Weekday (Standard)</SelectItem>
            <SelectItem value="mon-fri-evening">Early/Late (+15%)</SelectItem>
            <SelectItem value="mon-fri-night">Night (+25%)</SelectItem>
            <SelectItem value="saturday">Saturday (+50%)</SelectItem>
            <SelectItem value="sunday">Sunday (+100%)</SelectItem>
            <SelectItem value="public-holiday">Public Holiday (+150%)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {currentRate !== null && (
        <div className="bg-secondary/20 p-3 rounded-md">
          <p className="text-sm font-medium">Current Award Rate: ${currentRate.toFixed(2)}/hr</p>
          <p className="text-xs text-muted-foreground">Effective July 1, 2024</p>
        </div>
      )}
    </div>
  );
};
