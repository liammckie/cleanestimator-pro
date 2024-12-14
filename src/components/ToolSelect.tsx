import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ToolSelectProps {
  taskId: string;
  currentTool: string;
  availableTools: string[];
  onToolChange: (taskId: string, tool: string) => void;
}

export const ToolSelect: React.FC<ToolSelectProps> = ({
  taskId,
  currentTool,
  availableTools,
  onToolChange,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={`tool-${taskId}`}>Tool Selection</Label>
      <Select
        value={currentTool}
        onValueChange={(value) => onToolChange(taskId, value)}
      >
        <SelectTrigger id={`tool-${taskId}`}>
          <SelectValue placeholder="Select a tool" />
        </SelectTrigger>
        <SelectContent>
          {availableTools.map((tool) => (
            <SelectItem key={tool} value={tool}>
              {tool}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};