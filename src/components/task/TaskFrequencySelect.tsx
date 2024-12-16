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
  const frequencyOptions = [
    { label: 'Monthly', value: '0.25', timesPerMonth: 1 },
    { label: 'Fortnightly', value: '0.5', timesPerMonth: 2.17 },
    { label: 'Weekly', value: '1', timesPerMonth: 4.33 },
    { label: '2x Weekly', value: '2', timesPerMonth: 8.66 },
    { label: '3x Weekly', value: '3', timesPerMonth: 13 },
    { label: '4x Weekly', value: '4', timesPerMonth: 17.33 },
    { label: '5x Weekly', value: '5', timesPerMonth: 21.66 },
    { label: '6x Weekly', value: '6', timesPerMonth: 26 },
    { label: '7x Weekly', value: '7', timesPerMonth: 30.33 },
  ];

  return (
    <div className="space-y-2">
      <Label>Frequency</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="bg-background">
          <SelectValue placeholder="Select frequency" />
        </SelectTrigger>
        <SelectContent
          position="popper"
          className="bg-popover border border-border shadow-md z-[1000]"
          style={{ 
            minWidth: "200px",
            maxHeight: "300px",
            overflowY: "auto"
          }}
        >
          {frequencyOptions.map((freq) => (
            <SelectItem 
              key={freq.value} 
              value={freq.value}
              className="cursor-pointer hover:bg-accent focus:bg-accent"
            >
              {freq.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};