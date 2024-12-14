import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cleaningAwardLevels } from '@/data/award/cleaningAward';

interface DirectEmploymentOptionsProps {
  awardLevel: number;
  shiftType: string;
  onAwardLevelChange: (value: string) => void;
  onShiftTypeChange: (value: string) => void;
}

export const DirectEmploymentOptions: React.FC<DirectEmploymentOptionsProps> = ({
  awardLevel,
  shiftType,
  onAwardLevelChange,
  onShiftTypeChange
}) => {
  return (
    <div className="space-y-4">
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
  );
};