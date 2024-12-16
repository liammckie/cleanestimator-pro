import React from 'react';
import { Input } from "@/components/ui/input";

interface TaskSearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const TaskSearchInput: React.FC<TaskSearchInputProps> = ({ value, onChange }) => {
  return (
    <Input
      type="text"
      placeholder="Search tasks..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mb-4"
    />
  );
};