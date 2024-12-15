import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SelectedTask } from './types';

interface TaskSelectionPanelProps {
  selectedTasks: SelectedTask[];
  onQuantityChange: (taskId: string, quantity: number) => void;
  onFrequencyChange: (taskId: string, timesPerWeek: number) => void;
}

export const TaskSelectionPanel: React.FC<TaskSelectionPanelProps> = ({
  selectedTasks,
  onQuantityChange,
  onFrequencyChange,
}) => {
  const totalMonthlyHours = selectedTasks.reduce((total, task) => {
    return total + (task.timeRequired * task.frequency.timesPerMonth);
  }, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Selected Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {selectedTasks.map(task => (
            <div key={task.id} className="p-4 border rounded">
              <h3 className="font-medium">{task.taskName}</h3>
              <div className="mt-2 space-y-2">
                <div>
                  <label className="text-sm text-muted-foreground">Quantity ({task.measurementUnit})</label>
                  <input
                    type="number"
                    value={task.quantity}
                    onChange={(e) => onQuantityChange(task.id, Number(e.target.value))}
                    className="w-full mt-1 p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Times per Week</label>
                  <input
                    type="number"
                    value={task.frequency.timesPerWeek}
                    onChange={(e) => onFrequencyChange(task.id, Number(e.target.value))}
                    className="w-full mt-1 p-2 border rounded"
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  Monthly Hours: {(task.timeRequired * task.frequency.timesPerMonth).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
          {selectedTasks.length === 0 && (
            <p className="text-muted-foreground">No tasks selected. Select tasks from the database tab.</p>
          )}
          {selectedTasks.length > 0 && (
            <div className="mt-4 p-4 bg-accent rounded">
              <p className="font-medium">Total Monthly Hours: {totalMonthlyHours.toFixed(2)}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};