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
  
  // Enhanced cleaning tools with specific models and types
  const availableTools = [
    // Vacuum Cleaners
    'Backpack Vacuum - ProTeam Super CoachVac',
    'Upright Vacuum - SEBO Essential G4',
    'Wet/Dry Vacuum - Karcher NT 70/2',
    
    // Floor Care
    'Auto Scrubber - Tennant T300e',
    'Floor Burnisher - Polivac Sumo',
    'Steam Cleaner - Duplex 420',
    'Pressure Washer - Karcher HDS 10/20-4M',
    
    // Manual Tools
    'Commercial Mop - Kentucky Style',
    'Microfiber Mop - Rubbermaid HYGEN',
    'Telescopic Pole - Unger OptiLoc',
    'Window Squeegee - Unger ErgoTec',
    
    // Specialty Equipment
    'Carpet Extractor - Mytee Lite III',
    'Dehumidifier - Dri-Eaz F413',
    'Air Scrubber - HEPA 500',
    'Chemical Sprayer - Victory VP200',
    
    // Basic Tools
    'Microfiber Cloth Set - Commercial Grade',
    'Dust Mop - Industrial 36"',
    'Wet Mop - Loop End',
    'Broom - Heavy Duty'
  ];

  // Filter tools based on the task's default tool and category
  const relevantTools = availableTools.filter(tool => {
    const toolLower = tool.toLowerCase();
    const defaultToolLower = defaultTool.toLowerCase();
    
    // Check if the tool matches or contains keywords from the default tool
    return defaultToolLower.split(' ').some(keyword => 
      toolLower.includes(keyword.toLowerCase()) && keyword.length > 2
    );
  });

  // Always include the default tool if it's not in the filtered list
  if (defaultTool && !relevantTools.includes(defaultTool)) {
    relevantTools.unshift(defaultTool);
  }

  // If no relevant tools found, show all tools
  const displayTools = relevantTools.length > 0 ? relevantTools : availableTools;

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
          {displayTools.map((tool) => (
            <SelectItem key={tool} value={tool}>
              {tool}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};