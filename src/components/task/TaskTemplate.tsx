
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTaskContext } from '../area/task/TaskContext';
import { useToast } from "@/hooks/use-toast";
import { getRateById } from '@/data/rates/ratesManager';
import { Save, Plus } from "lucide-react";

interface TaskTemplateProps {
  taskId: string;
  defaultName?: string;
}

export const TaskTemplate: React.FC<TaskTemplateProps> = ({ taskId, defaultName }) => {
  const { handleTaskSelection } = useTaskContext();
  const { toast } = useToast();
  const [templateName, setTemplateName] = useState(defaultName || '');
  const [quantity, setQuantity] = useState<number>(0);
  const [frequency, setFrequency] = useState<number>(1);

  const taskDetails = getRateById(taskId);
  const taskName = taskDetails?.task || 'Unknown Task';
  
  const handleSaveTemplate = () => {
    if (!templateName.trim()) {
      toast({
        title: "Template Error",
        description: "Please provide a template name",
        variant: "destructive"
      });
      return;
    }

    // Save the template to localStorage
    const templates = JSON.parse(localStorage.getItem('task-templates') || '[]');
    const newTemplate = {
      id: `${taskId}-${Date.now()}`,
      taskId,
      name: templateName,
      quantity,
      frequency: {
        timesPerWeek: frequency,
        timesPerMonth: frequency * 4.33
      }
    };
    
    localStorage.setItem('task-templates', JSON.stringify([...templates, newTemplate]));
    
    toast({
      title: "Template Saved",
      description: `${templateName} has been saved as a template`
    });
  };

  const handleApplyTemplate = () => {
    // Create a task from this template
    handleTaskSelection(taskId, true);
    
    // We'll use a timeout to ensure the task is created before we try to modify it
    setTimeout(() => {
      const customEvent = new CustomEvent('apply-task-template', {
        detail: {
          taskId,
          quantity,
          frequency
        }
      });
      window.dispatchEvent(customEvent);
      
      toast({
        title: "Template Applied",
        description: `${taskName} has been added with template values`
      });
    }, 100);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{taskName} Template</CardTitle>
        <CardDescription>
          Create a reusable template for this task
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="template-name">Template Name</Label>
          <Input
            id="template-name"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            placeholder="e.g., Standard Bathroom Cleaning"
          />
        </div>
        
        <div>
          <Label htmlFor="template-quantity">Quantity ({taskDetails?.unit || 'units'})</Label>
          <Input
            id="template-quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min={0}
          />
        </div>
        
        <div>
          <Label htmlFor="template-frequency">Frequency (times per week)</Label>
          <Input
            id="template-frequency"
            type="number"
            value={frequency}
            onChange={(e) => setFrequency(Number(e.target.value))}
            min={1}
            max={7}
          />
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button onClick={handleSaveTemplate} className="flex-1">
            <Save className="w-4 h-4 mr-2" />
            Save Template
          </Button>
          <Button onClick={handleApplyTemplate} variant="outline" className="flex-1">
            <Plus className="w-4 h-4 mr-2" />
            Apply Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
