import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, Calculator } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useTaskContext } from '../area/task/TaskContext';
import { ToolSelect } from '../ToolSelect';
import { calculateTaskProductivity } from '@/utils/productivityCalculations';
import { getRateById } from '@/data/rates/ratesManager';
import { Site } from '@/data/types/site';
import { LaborSummaryPanel } from './LaborSummaryPanel';

interface ScopeOfWorkProps {
  sites: Site[];
  onUpdateSite: (siteId: string, tasks: any[]) => void;
}

export const ScopeOfWork: React.FC<ScopeOfWorkProps> = ({ sites, onUpdateSite }) => {
  const { selectedTasks, handleTaskSelection, handleQuantityChange, handleFrequencyChange, handleToolChange } = useTaskContext();
  const { toast } = useToast();

  const handleRemoveTask = (taskId: string, siteId?: string) => {
    handleTaskSelection(taskId, false, siteId);
    toast({
      title: "Task Removed",
      description: "Task has been removed from the scope.",
    });
  };

  return (
    <div className="grid grid-cols-[2fr,1fr] gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Scope of Work</span>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {selectedTasks.map((selectedTask) => {
              const taskDetails = getRateById(selectedTask.taskId);
              if (!taskDetails) return null;

              const productivity = calculateTaskProductivity(
                selectedTask.taskId,
                selectedTask.quantity,
                selectedTask.selectedTool,
                selectedTask.frequency,
                selectedTask.quantity
              );

              return (
                <Card key={`${selectedTask.taskId}-${selectedTask.siteId}`} className="relative">
                  <CardContent className="pt-6">
                    <div className="absolute top-2 right-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveTask(selectedTask.taskId, selectedTask.siteId)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium">{taskDetails.task}</h3>
                        {selectedTask.siteName && (
                          <p className="text-sm text-muted-foreground">{selectedTask.siteName}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Quantity ({taskDetails.unit})</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              value={selectedTask.quantity || ''}
                              onChange={(e) => handleQuantityChange(selectedTask.taskId, Number(e.target.value))}
                              placeholder={`Enter ${taskDetails.unit}`}
                            />
                            <Calculator className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>

                        <div>
                          <Label>Tool</Label>
                          <ToolSelect
                            taskId={selectedTask.taskId}
                            currentTool={selectedTask.selectedTool || ''}
                            onToolChange={handleToolChange}
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Frequency (times per week)</Label>
                        <Select
                          value={selectedTask.frequency.timesPerWeek.toString()}
                          onValueChange={(value) => handleFrequencyChange(selectedTask.taskId, Number(value))}
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

                      {productivity && (
                        <div className="bg-accent/50 p-4 rounded-lg space-y-2">
                          <h4 className="font-medium">Time Requirements</h4>
                          <div className="text-sm space-y-1">
                            <p>Time per service: {(productivity.timeRequired * 60).toFixed(1)} minutes</p>
                            <p>Monthly hours: {(productivity.timeRequired * selectedTask.frequency.timesPerMonth).toFixed(1)} hours</p>
                            <p>Productivity rate: {productivity.adjustedRate.toFixed(2)} {taskDetails.unit}/hr</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {selectedTasks.length === 0 && (
              <div className="text-center p-8 text-muted-foreground">
                <p>No tasks selected. Add tasks from the task database to get started.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {sites.map((site) => {
          const siteTasks = selectedTasks.filter(task => task.siteId === site.id);
          const totalDailyMinutes = siteTasks.reduce((acc, task) => {
            const productivity = calculateTaskProductivity(
              task.taskId,
              task.quantity,
              task.selectedTool,
              task.frequency,
              task.quantity
            );
            if (!productivity) return acc;
            return acc + (productivity.timeRequired * 60 * task.frequency.timesPerWeek) / site.daysPerWeek;
          }, 0);

          const totalWeeklyHours = (totalDailyMinutes * site.daysPerWeek) / 60;
          const totalMonthlyHours = totalWeeklyHours * 4.33;

          return (
            <LaborSummaryPanel
              key={site.id}
              siteName={site.name}
              dailyHours={totalDailyMinutes / 60}
              weeklyHours={totalWeeklyHours}
              monthlyHours={totalMonthlyHours}
            />
          );
        })}
      </div>
    </div>
  );
};