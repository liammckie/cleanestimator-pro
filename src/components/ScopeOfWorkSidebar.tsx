
import React, { memo, useMemo } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { Site } from '@/data/types/site';
import { useTaskContext } from './area/task/TaskContext';
import { useToast } from '@/hooks/use-toast';
import { TaskList } from './scope/TaskList';
import { SiteSummaryCard } from './scope/SiteSummaryCard';
import { TimeSummaryCards } from './scope/TimeSummaryCards';
import { Button } from './ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface ScopeOfWorkSidebarProps {
  sites?: Site[];
}

// Use memo to prevent unnecessary re-renders
export const ScopeOfWorkSidebar: React.FC<ScopeOfWorkSidebarProps> = memo(({
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
  const [isOpen, setIsOpen] = React.useState(true);

  // Only log once during development, not on every render
  React.useEffect(() => {
    console.log('ScopeOfWorkSidebar mounted with tasks:', {
      selectedTasks: selectedTasks.length,
      totalWeeklyHours,
      totalMonthlyHours
    });
    // Empty dependency array so this only runs once on mount
  }, []);

  const handleRemoveTask = (taskId: string, siteId?: string) => {
    handleTaskSelection(taskId, false, siteId);
    toast({
      title: "Task Removed",
      description: "Task has been removed from the scope.",
    });
  };

  // Group tasks by site - use useMemo to prevent recalculation on every render
  const tasksBySite = useMemo(() => {
    return selectedTasks.reduce((acc, task) => {
      const siteName = task.siteName || 'Default Site';
      if (!acc[siteName]) {
        acc[siteName] = [];
      }
      acc[siteName].push(task);
      return acc;
    }, {} as Record<string, typeof selectedTasks>);
  }, [selectedTasks]);

  return (
    <div className="w-full md:w-[320px] shrink-0 border-l bg-white shadow-sm flex flex-col">
      <div className="border-b px-6 py-4 bg-primary/5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-primary">Scope Summary</h2>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden"
        >
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>
      
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="md:block">
        <CollapsibleContent className="md:block">
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
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
});

// Add display name for debugging
ScopeOfWorkSidebar.displayName = 'ScopeOfWorkSidebar';
