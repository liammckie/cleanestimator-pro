
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface TaskFrequencySelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const TaskFrequencySelect: React.FC<TaskFrequencySelectProps> = ({
  value,
  onValueChange
}) => {
  return (
    <div className="space-y-2">
      <Label>Frequency (times per week)</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="bg-background">
          <SelectValue placeholder="Select frequency" />
        </SelectTrigger>
        <SelectContent className="bg-background">
          {[1, 2, 3, 4, 5, 6, 7].map((freq) => (
            <SelectItem key={freq} value={freq.toString()}>
              {freq}x per week
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
