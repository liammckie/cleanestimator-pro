import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash, AlertCircle } from "lucide-react";
import { CleaningTask } from '@/data/types/taskManagement';
import { loadTasks, groupTasksByCategory } from '@/utils/taskStorage';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTaskContext } from '../area/task/TaskContext';

export const ScopeOfWorkPage = () => {
  const [availableTasks, setAvailableTasks] = useState<CleaningTask[]>([]);
  const { selectedTasks, handleTaskSelection, handleQuantityChange, handleFrequencyChange } = useTaskContext();
  const { toast } = useToast();

  useEffect(() => {
    const tasks = loadTasks();
    setAvailableTasks(tasks);
  }, []);

  const handleAddToScope = (taskId: string, siteName?: string) => {
    if (selectedTasks.some(task => task.taskId === taskId)) {
      toast({
        title: "Task Already Added",
        description: "This task is already in your scope of work.",
        variant: "destructive",
      });
      return;
    }
    handleTaskSelection(taskId, true, undefined, siteName);
    toast({
      title: "Task Added",
      description: "Task has been added to your scope of work.",
    });
  };

  const handleRemoveFromScope = (taskId: string) => {
    handleTaskSelection(taskId, false);
    toast({
      title: "Task Removed",
      description: "Task has been removed from your scope of work.",
    });
  };

  const groupedAvailableTasks = groupTasksByCategory(availableTasks);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Scope of Work</h1>
      
      <div className="grid grid-cols-1 gap-6">
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
                    {tasks.map((task) => {
                      const selectedTask = selectedTasks.find(t => t.taskId === task.id);
                      
                      return (
                        <div
                          key={task.id}
                          className="flex flex-col space-y-4 p-4 border rounded-lg"
                        >
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <h4 className="font-medium">{task.taskName}</h4>
                              <Badge variant="secondary">
                                {task.productivityRate} {task.measurementUnit}
                              </Badge>
                            </div>
                            {!selectedTask ? (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleAddToScope(task.id)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveFromScope(task.id)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            )}
                          </div>

                          {selectedTask && (
                            <div className="space-y-4 pt-4 border-t">
                              <div className="space-y-2">
                                <label className="text-sm font-medium">
                                  {task.measurementUnit === 'SQM/hour' ? 'Area (SQM)' : 'Quantity'}
                                </label>
                                <Input
                                  type="number"
                                  value={selectedTask.quantity || ''}
                                  onChange={(e) => handleQuantityChange(task.id, Number(e.target.value))}
                                  placeholder={`Enter ${task.measurementUnit === 'SQM/hour' ? 'area' : 'quantity'}`}
                                  className="max-w-xs"
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-sm font-medium">Frequency (times per week)</label>
                                <Select
                                  value={selectedTask.frequency.timesPerWeek.toString()}
                                  onValueChange={(value) => handleFrequencyChange(task.id, Number(value))}
                                >
                                  <SelectTrigger className="max-w-xs">
                                    <SelectValue placeholder="Select frequency" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {[1, 2, 3, 4, 5, 6, 7].map((freq) => (
                                      <SelectItem key={freq} value={freq.toString()}>
                                        {freq}x per week
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              {selectedTask.timeRequired > 0 && (
                                <div className="text-sm text-muted-foreground space-y-1">
                                  <p>Monthly Hours: {(selectedTask.timeRequired * selectedTask.frequency.timesPerMonth).toFixed(2)}</p>
                                  <p>Hours per Service: {selectedTask.timeRequired.toFixed(2)}</p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};