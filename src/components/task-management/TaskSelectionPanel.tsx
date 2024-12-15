import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { SelectedTask } from '@/data/types/taskManagement';
import { calculateManHours } from '@/utils/manHourCalculations';

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
  const totalMonthlyHours = selectedTasks.reduce((total, task) => 
    total + task.manHours, 0
  );

  const totalWeeklyHours = totalMonthlyHours / 4.33;

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
                  <Label className="text-sm text-muted-foreground">
                    {task.measurementUnit === 'SQM/hour' ? 'Area (SQM)' : 'Unit Count'}
                  </Label>
                  <Input
                    type="number"
                    value={task.quantity || ''}
                    onChange={(e) => onQuantityChange(task.id, Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Times per Week</Label>
                  <Input
                    type="number"
                    value={task.frequency.timesPerWeek}
                    onChange={(e) => onFrequencyChange(task.id, Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Productivity Rate: {task.productivityRate} {task.measurementUnit}</p>
                  <p>Monthly Hours: {task.manHours.toFixed(2)}</p>
                  <p>Weekly Hours: {(task.manHours / 4.33).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
          
          {selectedTasks.length === 0 && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                No tasks selected. Select tasks from the database tab.
              </AlertDescription>
            </Alert>
          )}

          {selectedTasks.length > 0 && (
            <div className="mt-6 p-4 bg-accent rounded">
              <h4 className="font-medium mb-2">Summary</h4>
              <div className="space-y-1">
                <p>Total Monthly Hours: {totalMonthlyHours.toFixed(2)}</p>
                <p>Total Weekly Hours: {totalWeeklyHours.toFixed(2)}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};