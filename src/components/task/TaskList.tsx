import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useTaskContext } from './TaskContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2 } from "lucide-react";

export const TaskList = () => {
  const { 
    selectedTasks, 
    removeTask, 
    updateTaskQuantity, 
    updateTaskFrequency 
  } = useTaskContext();

  if (selectedTasks.length === 0) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        No tasks selected. Add tasks to get started.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {selectedTasks.map((task) => (
        <Card key={task.id} className="p-4">
          <CardContent className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{task.id}</h3>
                <p className="text-sm text-muted-foreground">
                  {task.frequency.timesPerWeek}x per week
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeTask(task.id)}
                className="text-destructive hover:text-destructive/90"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-4">
              <div>
                <Label>Quantity</Label>
                <Input
                  type="number"
                  value={task.quantity}
                  onChange={(e) => updateTaskQuantity(task.id, Number(e.target.value))}
                  min={0}
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Frequency (times per week)</Label>
                <Select
                  value={task.frequency.timesPerWeek.toString()}
                  onValueChange={(value) => updateTaskFrequency(task.id, {
                    timesPerWeek: Number(value),
                    timesPerMonth: Number(value) * 4.33
                  })}
                >
                  <SelectTrigger>
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
            </div>

            <div className="bg-accent/50 p-4 rounded-lg space-y-2">
              <h4 className="font-medium">Time Requirements</h4>
              <div className="text-sm space-y-1">
                <p>Time per service: {task.timeRequired.toFixed(1)} hours</p>
                <p>Weekly hours: {(task.timeRequired * task.frequency.timesPerWeek).toFixed(1)}</p>
                <p>Monthly hours: {(task.timeRequired * task.frequency.timesPerMonth).toFixed(1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};