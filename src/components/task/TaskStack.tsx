
import React, { useState, useEffect } from 'react';
import { useTaskContext } from '../area/task/TaskContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Clock, Repeat, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getRateById } from '@/data/rates/ratesManager';
import { getServiceById } from '@/services/periodicServicesService';

export const TaskStack = () => {
  const { selectedTasks, handleTaskSelection } = useTaskContext();

  // Early return if selectedTasks is undefined (loading state)
  if (selectedTasks === undefined) {
    return (
      <div className="w-64 border-r bg-muted/30 p-4">
        <h3 className="font-semibold mb-4">Selected Tasks</h3>
        <p className="text-sm text-muted-foreground">Loading tasks...</p>
      </div>
    );
  }

  // Only show "No tasks selected" if the array is empty
  if (selectedTasks.length === 0) {
    return (
      <div className="w-64 border-r bg-muted/30 p-4">
        <h3 className="font-semibold mb-4">Selected Tasks</h3>
        <p className="text-sm text-muted-foreground">No tasks selected</p>
      </div>
    );
  }

  return (
    <div className="w-64 border-r bg-muted/30 p-4">
      <h3 className="font-semibold mb-4">Selected Tasks ({selectedTasks.length})</h3>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="space-y-2">
          {selectedTasks.map((task) => (
            <TaskStackItem 
              key={task.taskId} 
              task={task} 
              onRemove={() => handleTaskSelection(task.taskId, false)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

interface TaskStackItemProps {
  task: any;
  onRemove: () => void;
}

const TaskStackItem: React.FC<TaskStackItemProps> = ({ task, onRemove }) => {
  const [taskName, setTaskName] = useState(task.name || '');
  const [isLoading, setIsLoading] = useState(!task.name);

  useEffect(() => {
    const loadTaskName = async () => {
      // If we already have a name, no need to fetch
      if (task.name) {
        setTaskName(task.name);
        return;
      }

      setIsLoading(true);
      
      // First try from rates manager
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
        console.error('Failed to load task name:', error);
        setTaskName(`Task ${task.taskId.slice(0, 8)}...`);
      } finally {
        setIsLoading(false);
      }
    };

    loadTaskName();
  }, [task.taskId, task.name]);

  return (
    <Card key={task.taskId} className="p-3">
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1">
          <div className="text-sm font-medium">
            {isLoading ? '...' : taskName}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
            <Clock className="h-3 w-3" />
            <span>{task.timeRequired.toFixed(1)}h</span>
            <Repeat className="h-3 w-3 ml-2" />
            <span>{task.frequency.timesPerWeek}x/week</span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};
