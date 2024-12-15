import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { CleaningTask } from '@/data/types/taskManagement';
import { loadTasks, groupTasksByCategory } from '@/utils/taskStorage';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

export const ScopeOfWorkPage = () => {
  const [availableTasks, setAvailableTasks] = useState<CleaningTask[]>([]);
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const tasks = loadTasks();
    setAvailableTasks(tasks);
  }, []);

  const handleAddToScope = (taskId: string) => {
    if (selectedTaskIds.includes(taskId)) {
      toast({
        title: "Task Already Added",
        description: "This task is already in your scope of work.",
        variant: "destructive",
      });
      return;
    }
    setSelectedTaskIds(prev => [...prev, taskId]);
    toast({
      title: "Task Added",
      description: "Task has been added to your scope of work.",
    });
  };

  const handleRemoveFromScope = (taskId: string) => {
    setSelectedTaskIds(prev => prev.filter(id => id !== taskId));
    toast({
      title: "Task Removed",
      description: "Task has been removed from your scope of work.",
    });
  };

  const selectedTasks = availableTasks.filter(task => selectedTaskIds.includes(task.id));
  const groupedAvailableTasks = groupTasksByCategory(availableTasks);
  const groupedSelectedTasks = groupTasksByCategory(selectedTasks);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Scope of Work</h1>
      
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Available Tasks</h2>
          <div className="space-y-6">
            {Object.entries(groupedAvailableTasks).map(([category, tasks]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle>{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="space-y-1">
                          <h4 className="font-medium">{task.taskName}</h4>
                          <Badge variant="secondary">
                            {task.productivityRate} {task.measurementUnit}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleAddToScope(task.id)}
                          disabled={selectedTaskIds.includes(task.id)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Selected Tasks</h2>
          <div className="space-y-6">
            {Object.entries(groupedSelectedTasks).map(([category, tasks]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle>{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="space-y-1">
                          <h4 className="font-medium">{task.taskName}</h4>
                          <Badge variant="secondary">
                            {task.productivityRate} {task.measurementUnit}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveFromScope(task.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
            {selectedTasks.length === 0 && (
              <Card>
                <CardContent className="p-6 text-center text-muted-foreground">
                  No tasks selected. Add tasks from the available tasks list.
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};