import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { CleaningTask } from '@/data/types/taskManagement';
import { Badge } from '@/components/ui/badge';
import { useTaskContext } from '../area/task/TaskContext';

interface TaskListProps {
  tasks: CleaningTask[];
  onEditTask: (task: CleaningTask) => void;
  onDeleteTask: (taskId: string) => void;
  mode?: 'default' | 'selection';
}

export const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onEditTask, 
  onDeleteTask,
  mode = 'default'
}) => {
  const { handleTaskSelection, selectedTasks } = useTaskContext();
  
  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = [];
    }
    acc[task.category].push(task);
    return acc;
  }, {} as Record<string, CleaningTask[]>);

  const isTaskSelected = (taskId: string) => {
    return selectedTasks.some(task => task.taskId === taskId);
  };

  if (tasks.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          No tasks available. Add tasks using the form above.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedTasks).map(([category, categoryTasks]) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle>{category}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="space-y-1">
                    <h4 className="font-medium">{task.taskName}</h4>
                    <div className="flex gap-2">
                      <Badge variant="secondary">
                        {task.productivityRate} {task.measurementUnit}
                      </Badge>
                    </div>
                    {task.notes && (
                      <p className="text-sm text-muted-foreground">{task.notes}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {mode === 'default' && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEditTask(task)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDeleteTask(task.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    {mode === 'selection' && (
                      <Button
                        variant={isTaskSelected(task.id) ? "secondary" : "outline"}
                        onClick={() => handleTaskSelection(task.id, !isTaskSelected(task.id))}
                      >
                        {isTaskSelected(task.id) ? 'Remove from Scope' : 'Add to Scope'}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};