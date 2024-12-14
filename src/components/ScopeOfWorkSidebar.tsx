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
import { Clock, BarChart2, MapPin, Building, Calendar, Wrench } from "lucide-react";
import { Site } from '@/data/types/site';
import { Badge } from "@/components/ui/badge";

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
                            <div key={`${task.taskId}-${index}`} className="pl-4 border-l-2 border-accent">
                              <p className="text-sm font-medium">{task.rate.task}</p>
                              <div className="flex flex-wrap gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {task.frequency.timesPerWeek}x/week
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  <Wrench className="w-3 h-3 mr-1" />
                                  {task.selectedTool || task.rate.tool}
                                </Badge>
                              </div>
                            </div>
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