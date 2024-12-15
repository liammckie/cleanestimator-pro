import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { TaskEditForm } from './TaskEditForm';

interface TaskListProps {
  tasks: Array<{
    taskId: string;
    quantity: number;
    timeRequired: number;
    frequency: {
      timesPerWeek: number;
      timesPerMonth: number;
    };
  }>;
  onQuantityChange: (taskId: string, value: number) => void;
  onFrequencyChange: (taskId: string, value: number) => void;
  onRemoveTask: (taskId: string) => void;
  getTaskName: (taskId: string) => string;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onQuantityChange,
  onFrequencyChange,
  onRemoveTask,
  getTaskName,
}) => {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.taskId} className="p-4">
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-medium">{getTaskName(task.taskId)}</h4>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemoveTask(task.taskId)}
              className="text-destructive hover:text-destructive/90"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <TaskEditForm
            task={task}
            onQuantityChange={onQuantityChange}
            onFrequencyChange={onFrequencyChange}
          />
        </Card>
      ))}
    </div>
  );
};