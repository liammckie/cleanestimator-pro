import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Trash2, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useTaskContext } from '../area/task/TaskContext';
import { ToolSelect } from '../ToolSelect';
import { calculateTaskProductivity } from '@/utils/productivityCalculations';
import { getRateById } from '@/data/rates/ratesManager';
import { Site } from '@/data/types/site';

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
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Scope of Work</CardTitle>
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
                  <Card key={`${selectedTask.taskId}-${selectedTask.siteId}`}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium">{taskDetails.task}</h3>
                          <p className="text-sm text-muted-foreground">{selectedTask.siteName}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveTask(selectedTask.taskId, selectedTask.siteId)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label>Quantity ({taskDetails.unit})</Label>
                          <Input
                            type="number"
                            value={selectedTask.quantity || ''}
                            onChange={(e) => handleQuantityChange(selectedTask.taskId, Number(e.target.value))}
                            placeholder={`Enter ${taskDetails.unit}`}
                          />
                        </div>

                        <div>
                          <Label>Tool</Label>
                          <ToolSelect
                            taskId={selectedTask.taskId}
                            currentTool={selectedTask.selectedTool || ''}
                            onToolChange={handleToolChange}
                          />
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
                      </div>

                      {productivity && (
                        <div className="mt-4 bg-accent/50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Time Requirements</h4>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Time per service:</span>
                              <p>{(productivity.timeRequired * 60).toFixed(1)} minutes</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Monthly hours:</span>
                              <p>{(productivity.timeRequired * selectedTask.frequency.timesPerMonth).toFixed(1)} hours</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Productivity rate:</span>
                              <p>{productivity.adjustedRate.toFixed(2)} {taskDetails.unit}</p>
                            </div>
                          </div>
                        </div>
                      )}
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
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Labor Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
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
                  <div key={site.id} className="border-b pb-4 last:border-b-0">
                    <h3 className="font-medium mb-2">{site.name}</h3>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Daily Hours:</span>
                        <p>{(totalDailyMinutes / 60).toFixed(1)}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Weekly Hours:</span>
                        <p>{totalWeeklyHours.toFixed(1)}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Monthly Hours:</span>
                        <p>{totalMonthlyHours.toFixed(1)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};