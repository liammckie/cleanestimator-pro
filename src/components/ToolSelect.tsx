import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Wrench } from "lucide-react";
import { getProductivityRate } from '@/data/productivityRates';

interface ToolSelectProps {
  taskId: string;
  currentTool: string;
  onToolChange: (taskId: string, tool: string) => void;
}

export const ToolSelect: React.FC<ToolSelectProps> = ({
  taskId,
  currentTool,
  onToolChange,
}) => {
  const taskRate = getProductivityRate(taskId);
  const defaultTool = taskRate?.tool || '';
  
  // Common cleaning tools
  const availableTools = [
    'Vacuum Cleaner',
    'Mop',
    'Scrubber',
    'Steam Cleaner',
    'Pressure Washer',
    'Broom',
    'Duster',
    'Extractor',
    'Chemical Sprayer',
    'Brush',
    'Cloth',
    'Bucket',
    'Wringer',
    'Squeegee',
    'Telescopic Pole',
    'Microfiber Tools',
    'Floor Machine',
    'Air Mover',
    'Dehumidifier'
  ];

  // Filter tools based on the task's default tool
  const relevantTools = availableTools.filter(tool => {
    const toolLower = tool.toLowerCase();
    const defaultToolLower = defaultTool.toLowerCase();
    
    // Check if the tool matches or contains keywords from the default tool
    return defaultToolLower.split(' ').some(keyword => 
      toolLower.includes(keyword.toLowerCase()) && keyword.length > 2
    );
  });

  // Always include the default tool if it's not in the filtered list
  if (!relevantTools.includes(defaultTool)) {
    relevantTools.unshift(defaultTool);
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={`tool-${taskId}`} className="flex items-center gap-2">
        <Wrench className="h-4 w-4" />
        Tool Selection
      </Label>
      <Select
        value={currentTool}
        onValueChange={(value) => onToolChange(taskId, value)}
      >
        <SelectTrigger id={`tool-${taskId}`}>
          <SelectValue placeholder="Select a tool" />
        </SelectTrigger>
        <SelectContent>
          {relevantTools.map((tool) => (
            <SelectItem key={tool} value={tool}>
              {tool}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};