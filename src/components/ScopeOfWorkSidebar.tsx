import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getProductivityRate } from '@/data/productivityRates';
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Clock, BarChart2, MapPin, Building, Calendar, Wrench, Trash2, Edit2 } from "lucide-react";
import { Site } from '@/data/types/site';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTaskContext } from './area/task/TaskContext';
import { toast } from './ui/use-toast';

interface ScopeOfWorkSidebarProps {
  selectedTasks: Array<{
    taskId: string;
    quantity: number;
    timeRequired: number;
    frequency: {
      timesPerWeek: number;
      timesPerMonth: number;
    };
    siteName?: string;
    selectedTool?: string;
  }>;
  sites?: Site[];
}

export const ScopeOfWorkSidebar: React.FC<ScopeOfWorkSidebarProps> = ({ selectedTasks, sites = [] }) => {
  const { handleTaskSelection, handleQuantityChange, handleFrequencyChange } = useTaskContext();

  const handleRemoveTask = (taskId: string, siteId?: string) => {
    handleTaskSelection(taskId, false, siteId);
    toast({
      title: "Task Removed",
      description: "Task has been removed from the scope.",
    });
  };

  // Group tasks by category
  const tasksByCategory = selectedTasks.reduce((acc, task) => {
    const rate = getProductivityRate(task.taskId);
    if (!rate) return acc;
    
    if (!acc[rate.category]) {
      acc[rate.category] = [];
    }
    acc[rate.category].push({ ...task, rate });
    return acc;
  }, {} as Record<string, Array<any>>);

  // Calculate total monthly time
  const totalMonthlyTime = selectedTasks.reduce((sum, task) => 
    sum + (task.timeRequired || 0), 0) * 60;

  // Calculate total weekly hours
  const weeklyHours = totalMonthlyTime / (4.33 * 60);

  // Group tasks by site
  const tasksBySite = selectedTasks.reduce((acc, task) => {
    const siteName = task.siteName || 'Default Site';
    if (!acc[siteName]) {
      acc[siteName] = [];
    }
    acc[siteName].push(task);
    return acc;
  }, {} as Record<string, typeof selectedTasks>);

  return (
    <Sidebar className="border-r w-96">
      <SidebarHeader className="border-b px-6 py-4 bg-accent">
        <h2 className="text-2xl font-semibold text-primary">Scope Summary</h2>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-[calc(100vh-5rem)] px-6">
          <div className="space-y-6 py-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 bg-accent/50">
                <div className="flex items-center space-x-2">
                  <Building className="w-4 h-4 text-primary" />
                  <p className="text-sm font-medium">Sites</p>
                </div>
                <p className="text-2xl font-bold mt-2">{sites.length}</p>
              </Card>
              
              <Card className="p-4 bg-accent/50">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <p className="text-sm font-medium">Weekly Hours</p>
                </div>
                <p className="text-2xl font-bold mt-2">{weeklyHours.toFixed(1)}</p>
              </Card>
            </div>

            {/* Sites Summary */}
            {Object.entries(tasksBySite).map(([siteName, siteTasks]) => {
              const siteMonthlyTime = siteTasks.reduce((sum, task) => 
                sum + (task.timeRequired || 0), 0) * 60;
              const siteWeeklyTime = siteMonthlyTime / 4.33;
              
              return (
                <Card key={siteName} className="p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <MapPin className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-lg">{siteName}</h3>
                  </div>
                  
                  {/* Tasks by Category */}
                  <div className="space-y-4">
                    {Object.entries(tasksByCategory).map(([category, tasks]) => {
                      const siteCategoryTasks = tasks.filter(t => t.siteName === siteName);
                      if (siteCategoryTasks.length === 0) return null;

                      return (
                        <div key={category} className="space-y-2">
                          <h4 className="text-sm font-medium text-muted-foreground">{category}</h4>
                          {siteCategoryTasks.map((task, index) => (
                            <Card key={`${task.taskId}-${index}`} className="p-4">
                              <div className="flex justify-between items-start">
                                <p className="text-sm font-medium">{task.rate.task}</p>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleRemoveTask(task.taskId, task.siteId)}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>

                              <div className="space-y-3 mt-3">
                                {/* SQM/Quantity Input */}
                                <div>
                                  <label className="text-xs text-muted-foreground">
                                    {task.rate.unit === 'm²' ? 'Area (SQM)' : 'Quantity'}
                                  </label>
                                  <Input
                                    type="number"
                                    value={task.quantity || ''}
                                    onChange={(e) => handleQuantityChange(task.taskId, Number(e.target.value))}
                                    className="h-8"
                                  />
                                </div>

                                {/* Frequency Selection */}
                                <div>
                                  <label className="text-xs text-muted-foreground">
                                    Frequency (times per week)
                                  </label>
                                  <Select
                                    value={task.frequency.timesPerWeek.toString()}
                                    onValueChange={(value) => handleFrequencyChange(task.taskId, Number(value))}
                                  >
                                    <SelectTrigger className="h-8">
                                      <SelectValue />
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

                                {/* Time Requirements */}
                                <div className="bg-accent/50 p-2 rounded-lg space-y-1">
                                  <div className="flex justify-between text-xs">
                                    <span>Time per service:</span>
                                    <span>{((task.timeRequired * 60) / task.frequency.timesPerWeek / 4.33).toFixed(1)} mins</span>
                                  </div>
                                  <div className="flex justify-between text-xs">
                                    <span>Monthly hours:</span>
                                    <span>{(task.timeRequired).toFixed(1)} hrs</span>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      );
                    })}
                  </div>

                  {/* Site Time Summary */}
                  <div className="mt-4 pt-4 border-t">
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Weekly Hours:</span>
                        <span>{(siteWeeklyTime / 60).toFixed(1)} hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly Hours:</span>
                        <span>{(siteMonthlyTime / 60).toFixed(1)} hours</span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}

            {selectedTasks.length === 0 && (
              <div className="flex flex-col items-center justify-center space-y-4 text-center p-8">
                <BarChart2 className="w-12 h-12 text-muted-foreground" />
                <p className="text-muted-foreground text-lg">
                  No tasks selected. Select tasks to build your scope of work.
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
};