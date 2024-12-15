import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Building, Clock } from "lucide-react";
import { Site } from '@/data/types/site';
import { useTaskContext } from './area/task/TaskContext';
import { toast } from './ui/use-toast';
import { TaskList } from './scope/TaskList';
import { SiteSummaryCard } from './scope/SiteSummaryCard';

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
  }>;
  sites?: Site[];
}

export const ScopeOfWorkSidebar: React.FC<ScopeOfWorkSidebarProps> = ({
  sites = []
}) => {
  const { selectedTasks, handleTaskSelection, totalWeeklyHours } = useTaskContext();

  const handleRemoveTask = (taskId: string, siteId?: string) => {
    handleTaskSelection(taskId, false, siteId);
    toast({
      title: "Task Removed",
      description: "Task has been removed from the scope.",
    });
  };

  return (
    <div className="w-[300px] shrink-0 border-l bg-background">
      <div className="border-b px-6 py-4 bg-accent">
        <h2 className="text-2xl font-semibold text-primary">Scope Summary</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-10rem)] px-6">
        <div className="space-y-6 py-6">
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
              <p className="text-2xl font-bold mt-2">{totalWeeklyHours.toFixed(1)}</p>
            </Card>
          </div>

          {Object.entries(selectedTasks.reduce((acc, task) => {
            const siteName = task.siteName || 'Default Site';
            if (!acc[siteName]) {
              acc[siteName] = [];
            }
            acc[siteName].push(task);
            return acc;
          }, {} as Record<string, typeof selectedTasks>)).map(([siteName, siteTasks]) => {
            const siteMonthlyTime = siteTasks.reduce((sum, task) => 
              sum + (task.timeRequired || 0), 0) * 60;
            const siteWeeklyTime = siteMonthlyTime / 4.33;
            
            return (
              <div key={siteName} className="space-y-4">
                <SiteSummaryCard
                  siteName={siteName}
                  weeklyHours={siteWeeklyTime / 60}
                  monthlyHours={siteMonthlyTime / 60}
                />
                
                <TaskList
                  selectedTasks={siteTasks}
                  onQuantityChange={(taskId, quantity) => {
                    console.log('Updating quantity:', taskId, quantity);
                  }}
                  onFrequencyChange={(taskId, freq) => {
                    console.log('Updating frequency:', taskId, freq);
                  }}
                  onToolChange={(taskId, tool) => {
                    console.log('Updating tool:', taskId, tool);
                  }}
                  onRemoveTask={handleRemoveTask}
                />
              </div>
            );
          })}

          {selectedTasks.length === 0 && (
            <div className="flex flex-col items-center justify-center space-y-4 text-center p-8">
              <Clock className="w-12 h-12 text-muted-foreground" />
              <p className="text-muted-foreground text-lg">
                No tasks selected. Select tasks to build your scope of work.
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};