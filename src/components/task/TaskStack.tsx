import React from 'react';
import { useTaskContext } from '../area/task/TaskContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Clock, Repeat, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const TaskStack = () => {
  const { selectedTasks, handleTaskSelection } = useTaskContext();

  if (!selectedTasks?.length) {
    return (
      <div className="w-64 border-r bg-muted/30 p-4">
        <h3 className="font-semibold mb-4">Selected Tasks</h3>
        <p className="text-sm text-muted-foreground">No tasks selected</p>
      </div>
    );
  }

  return (
    <div className="w-64 border-r bg-muted/30 p-4">
      <h3 className="font-semibold mb-4">Selected Tasks</h3>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="space-y-2">
          {selectedTasks.map((task) => (
            <Card key={task.taskId} className="p-3">
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1">
                  <div className="text-sm font-medium">{task.taskId}</div>
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
                  onClick={() => handleTaskSelection(task.taskId, false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};