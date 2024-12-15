import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useTaskContext } from '../area/task/TaskContext';
import { Site } from '@/data/types/site';
import { TimeSummaryCard } from './TimeSummaryCard';
import { TaskList } from './TaskList';
import { calculateTaskProductivity } from '@/utils/productivityCalculations';

interface ScopeOfWorkProps {
  sites: Site[];
  onUpdateSite: (siteId: string, tasks: any[]) => void;
}

export const ScopeOfWork: React.FC<ScopeOfWorkProps> = ({ sites, onUpdateSite }) => {
  const { 
    selectedTasks, 
    handleTaskSelection, 
    handleQuantityChange, 
    handleFrequencyChange, 
    handleToolChange, 
    totalWeeklyHours 
  } = useTaskContext();
  
  const { toast } = useToast();

  // Calculate monthly hours
  const totalMonthlyHours = totalWeeklyHours * 4.33;

  console.log('Current total weekly hours:', totalWeeklyHours);
  console.log('Selected tasks:', selectedTasks);

  // Update site's tasks whenever selectedTasks changes
  React.useEffect(() => {
    if (sites.length > 0 && selectedTasks.length > 0) {
      // For now, we'll add all tasks to the first site
      const siteId = sites[0].id;
      
      // Format tasks for site storage
      const formattedTasks = selectedTasks.map(task => ({
        taskId: task.taskId,
        quantity: task.quantity,
        timeRequired: task.timeRequired,
        frequency: task.frequency,
        productivityOverride: task.productivityOverride
      }));

      console.log('Updating site tasks:', formattedTasks);
      onUpdateSite(siteId, formattedTasks);
    }
  }, [selectedTasks, sites, onUpdateSite]);

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
            <TimeSummaryCard 
              weeklyHours={totalWeeklyHours} 
              monthlyHours={totalMonthlyHours}
            />
            <TaskList
              selectedTasks={selectedTasks}
              onQuantityChange={handleQuantityChange}
              onFrequencyChange={handleFrequencyChange}
              onToolChange={handleToolChange}
              onRemoveTask={handleRemoveTask}
            />
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