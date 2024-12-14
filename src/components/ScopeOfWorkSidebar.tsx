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
import { Clock, BarChart2, MapPin } from "lucide-react";

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
}

export const ScopeOfWorkSidebar: React.FC<ScopeOfWorkSidebarProps> = ({ selectedTasks }) => {
  // Calculate tools summary
  const toolsSummary = selectedTasks.reduce((acc, task) => {
    const tool = task.selectedTool || getProductivityRate(task.taskId)?.tool || 'Unknown Tool';
    if (!acc[tool]) {
      acc[tool] = {
        count: 1,
        sites: new Set([task.siteName || 'Default Site'])
      };
    } else {
      acc[tool].count += 1;
      acc[tool].sites.add(task.siteName || 'Default Site');
    }
    return acc;
  }, {} as Record<string, { count: number; sites: Set<string> }>);

  // Calculate total monthly time
  const totalMonthlyTime = selectedTasks.reduce((sum, task) => sum + (task.timeRequired || 0), 0) * 60;

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
        <h2 className="text-2xl font-semibold text-primary-foreground">Scope of Work</h2>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-[calc(100vh-5rem)] px-6">
          {selectedTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4 text-center">
              <BarChart2 className="w-12 h-12 text-muted-foreground" />
              <p className="text-muted-foreground text-lg">
                No tasks selected. Select tasks to build your scope of work.
              </p>
            </div>
          ) : (
            <div className="space-y-6 py-6">
              {/* Summary Card */}
              <Card className="p-4 bg-accent/50">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-lg">Time Summary</h3>
                </div>
                <p className="text-muted-foreground">
                  Total Monthly Time: {totalMonthlyTime.toFixed(1)} minutes
                </p>
              </Card>

              {/* Tasks by Site */}
              {Object.entries(tasksBySite).map(([siteName, siteTasks]) => (
                <div key={siteName} className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-lg">{siteName}</h3>
                  </div>
                  {siteTasks.map((task, index) => {
                    const rateInfo = getProductivityRate(task.taskId);
                    if (!rateInfo) return null;

                    return (
                      <Card key={`${task.taskId}-${index}`} className="p-4 bg-card/50 space-y-3">
                        <div className="font-medium text-lg text-primary-foreground">{rateInfo.task}</div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <p>Category: {rateInfo.category}</p>
                          <p>Tool: {task.selectedTool || rateInfo.tool}</p>
                          <p>Quantity: {task.quantity} {rateInfo.unit}</p>
                          <p>Frequency: {task.frequency?.timesPerWeek || 1} times per week</p>
                          <p>Time per service: {((task.timeRequired / (task.frequency?.timesPerWeek || 1)) / 4 * 60).toFixed(1)} minutes</p>
                          <p>Monthly time: {(task.timeRequired * 60).toFixed(1)} minutes</p>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              ))}

              <Separator className="my-6" />

              {/* Tools Summary */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <BarChart2 className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-lg">Tools Required</h3>
                </div>
                {Object.entries(toolsSummary).map(([tool, details]) => (
                  <Card key={tool} className="p-4 bg-card/50">
                    <p className="font-medium text-primary-foreground">{tool}</p>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>Used in {details.count} task{details.count !== 1 ? 's' : ''}</p>
                      <p>Sites: {Array.from(details.sites).join(', ')}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
};