
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskEditPanel } from './TaskEditPanel';
import { SelectedTask } from '@/components/area/task/types';
import { getRateById } from '@/data/rates/ratesManager';

interface ScopeContentProps {
  selectedTasks: SelectedTask[];
  onQuantityChange: (taskId: string, quantity: number) => void;
  onFrequencyChange: (taskId: string, timesPerWeek: number) => void;
  onRemoveTask: (taskId: string) => void;
}

export const ScopeContent: React.FC<ScopeContentProps> = ({
  selectedTasks,
  onQuantityChange,
  onFrequencyChange,
  onRemoveTask,
}) => {
  // Add task details for display if not present
  const tasksWithDetails = selectedTasks.map(task => {
    if (!task.name) {
      const rateDetails = getRateById(task.taskId);
      return {
        ...task,
        name: rateDetails?.task || `Task ${task.taskId.slice(0, 6)}...`
      };
    }
    return task;
  });

  if (tasksWithDetails.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            No tasks selected. Add tasks from the task database to get started.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Selected Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasksWithDetails.map((task) => (
            <TaskEditPanel
              key={task.taskId}
              task={task}
              onQuantityChange={onQuantityChange}
              onFrequencyChange={onFrequencyChange}
              onRemoveTask={onRemoveTask}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
