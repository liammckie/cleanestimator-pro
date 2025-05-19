
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import { SelectedTask } from '@/components/area/task/types';
import { getRateById } from '@/data/rates/ratesManager';
import { getServiceById } from '@/services/periodicServicesService';

interface TaskEditPanelProps {
  task: SelectedTask;
  onQuantityChange: (taskId: string, quantity: number) => void;
  onFrequencyChange: (taskId: string, timesPerWeek: number) => void;
  onRemoveTask: (taskId: string) => void;
}

export const TaskEditPanel: React.FC<TaskEditPanelProps> = ({
  task,
  onQuantityChange,
  onFrequencyChange,
  onRemoveTask,
}) => {
  const [taskName, setTaskName] = useState(task.name || '');
  const [isLoading, setIsLoading] = useState(false);

  // Attempt to get task details from various sources
  useEffect(() => {
    const loadTaskDetails = async () => {
      // If we already have a name, don't need to fetch
      if (task.name) {
        setTaskName(task.name);
        return;
      }

      setIsLoading(true);
      
      // First try from rates data
      const rateDetails = getRateById(task.taskId);
      if (rateDetails?.task) {
        setTaskName(rateDetails.task);
        setIsLoading(false);
        return;
      }
      
      // Then try from periodic services
      try {
        const serviceDetails = await getServiceById(task.taskId);
        if (serviceDetails?.service_name) {
          setTaskName(serviceDetails.service_name);
        } else {
          // Fallback to task ID
          setTaskName(`Task ${task.taskId.slice(0, 8)}...`);
        }
      } catch (error) {
        console.error('Failed to load task details:', error);
        setTaskName(`Task ${task.taskId.slice(0, 8)}...`);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTaskDetails();
  }, [task.taskId, task.name]);

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-medium">
              {isLoading ? 'Loading task details...' : taskName}
            </h3>
            <p className="text-sm text-muted-foreground">
              Time Required: {task.timeRequired.toFixed(1)} hours/month
            </p>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onRemoveTask(task.taskId)}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor={`quantity-${task.taskId}`}>Quantity</Label>
            <Input
              id={`quantity-${task.taskId}`}
              type="number"
              min="0"
              value={task.quantity || ''}
              onChange={(e) => onQuantityChange(task.taskId, Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`frequency-${task.taskId}`}>Frequency (times per week)</Label>
            <Select
              value={task.frequency.timesPerWeek.toString()}
              onValueChange={(value) => onFrequencyChange(task.taskId, Number(value))}
            >
              <SelectTrigger id={`frequency-${task.taskId}`} className="bg-background">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent className="bg-background">
                <SelectItem value="1">1x per week</SelectItem>
                <SelectItem value="2">2x per week</SelectItem>
                <SelectItem value="3">3x per week</SelectItem>
                <SelectItem value="4">4x per week</SelectItem>
                <SelectItem value="5">5x per week</SelectItem>
                <SelectItem value="6">6x per week</SelectItem>
                <SelectItem value="7">7x per week</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
