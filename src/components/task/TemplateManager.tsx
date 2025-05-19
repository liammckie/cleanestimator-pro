
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTaskContext } from '../area/task/TaskContext';
import { useToast } from "@/hooks/use-toast";
import { getRateById } from '@/data/rates/ratesManager';
import { Trash2, Plus } from "lucide-react";

interface Template {
  id: string;
  taskId: string;
  name: string;
  quantity: number;
  frequency: {
    timesPerWeek: number;
    timesPerMonth: number;
  };
}

export const TemplateManager: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const { handleTaskSelection, handleQuantityChange, handleFrequencyChange } = useTaskContext();
  const { toast } = useToast();

  useEffect(() => {
    // Load templates from localStorage
    const savedTemplates = localStorage.getItem('task-templates');
    if (savedTemplates) {
      try {
        setTemplates(JSON.parse(savedTemplates));
      } catch (error) {
        console.error('Error loading templates:', error);
        toast({
          title: "Error",
          description: "Failed to load saved templates",
          variant: "destructive"
        });
      }
    }
  }, [toast]);

  const handleDeleteTemplate = (templateId: string) => {
    const updatedTemplates = templates.filter(t => t.id !== templateId);
    setTemplates(updatedTemplates);
    localStorage.setItem('task-templates', JSON.stringify(updatedTemplates));
    
    toast({
      title: "Template Deleted",
      description: "The template has been removed"
    });
  };

  const handleApplyTemplate = (template: Template) => {
    // First add the task
    handleTaskSelection(template.taskId, true);
    
    // Wait for the task to be added then apply template values
    setTimeout(() => {
      handleQuantityChange(template.taskId, template.quantity);
      handleFrequencyChange(template.taskId, template.frequency.timesPerWeek);
      
      toast({
        title: "Template Applied",
        description: `${template.name} has been applied`
      });
    }, 100);
  };

  if (templates.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">
            No saved templates. Create templates from task items to save them here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Saved Templates</h2>
      
      {templates.map(template => {
        const taskDetails = getRateById(template.taskId);
        return (
          <Card key={template.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{template.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">{taskDetails?.task || template.taskId}</p>
                <p className="text-sm text-muted-foreground">
                  Quantity: {template.quantity} {taskDetails?.unit || 'units'} | 
                  Frequency: {template.frequency.timesPerWeek}x per week
                </p>
                
                <div className="flex gap-2 pt-2">
                  <Button 
                    onClick={() => handleApplyTemplate(template)} 
                    variant="outline" 
                    size="sm"
                    className="flex-1"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Apply
                  </Button>
                  <Button
                    onClick={() => handleDeleteTemplate(template.id)}
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
