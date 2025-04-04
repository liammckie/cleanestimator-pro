
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock } from "lucide-react";
import { Site } from '@/data/types/site';
import { useTaskContext } from './area/task/TaskContext';
import { useToast } from '@/hooks/use-toast';
import { TaskList } from './scope/TaskList';
import { SiteSummaryCard } from './scope/SiteSummaryCard';
import { TimeSummaryCards } from './scope/TimeSummaryCards';

interface ScopeOfWorkSidebarProps {
  sites?: Site[];
}

export const ScopeOfWorkSidebar: React.FC<ScopeOfWorkSidebarProps> = ({
  sites = []
}) => {
  const { 
    selectedTasks, 
    handleTaskSelection, 
    totalWeeklyHours, 
    totalMonthlyHours,
    handleQuantityChange,
    handleFrequencyChange,
    handleToolChange 
  } = useTaskContext();
  const { toast } = useToast();

  console.log('ScopeOfWorkSidebar rendering with tasks:', {
    selectedTasks: selectedTasks.length,
    totalWeeklyHours,
    totalMonthlyHours
  });

  const handleRemoveTask = (taskId: string, siteId?: string) => {
    handleTaskSelection(taskId, false, siteId);
    toast({
      title: "Task Removed",
      description: "Task has been removed from the scope.",
    });
  };

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
    <div className="w-[300px] shrink-0 border-l bg-background">
      <div className="border-b px-6 py-4 bg-accent">
        <h2 className="text-2xl font-semibold text-primary">Scope Summary</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-10rem)] px-6">
        <div className="space-y-6 py-6">
          <TimeSummaryCards
            siteCount={sites.length}
            weeklyHours={totalWeeklyHours}
            monthlyHours={totalMonthlyHours}
          />

          {Object.entries(tasksBySite).map(([siteName, siteTasks]) => {
            const siteMonthlyTime = siteTasks.reduce((sum, task) => 
              sum + (task.timeRequired * task.frequency.timesPerMonth || 0), 0);
            const siteWeeklyTime = siteMonthlyTime / 4.33;
            
            return (
              <div key={siteName} className="space-y-4">
                <SiteSummaryCard
                  siteName={siteName}
                  weeklyHours={siteWeeklyTime}
                  monthlyHours={siteMonthlyTime}
                />
                
                <TaskList
                  selectedTasks={siteTasks}
                  onQuantityChange={handleQuantityChange}
                  onFrequencyChange={handleFrequencyChange}
                  onToolChange={handleToolChange}
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
