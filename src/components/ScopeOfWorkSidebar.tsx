import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getProductivityRate } from '@/data/productivityRates';
import { Separator } from "@/components/ui/separator";

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

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b px-4 py-2">
        <h2 className="text-lg font-semibold">Scope of Work</h2>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-[calc(100vh-5rem)] px-4">
          {selectedTasks.length === 0 ? (
            <p className="text-muted-foreground text-sm py-4">
              No tasks selected. Select tasks to build your scope of work.
            </p>
          ) : (
            <div className="space-y-4 py-4">
              {selectedTasks.map((task, index) => {
                const rateInfo = getProductivityRate(task.taskId);
                if (!rateInfo) return null;

                return (
                  <div key={`${task.taskId}-${index}`} className="border rounded-lg p-4 space-y-2">
                    <div className="font-medium">{rateInfo.task}</div>
                    <div className="text-sm text-muted-foreground">
                      {task.siteName && <p>Site: {task.siteName}</p>}
                      <p>Category: {rateInfo.category}</p>
                      <p>Tool: {task.selectedTool || rateInfo.tool}</p>
                      <p>Quantity: {task.quantity} {rateInfo.unit}</p>
                      <p>Frequency: {task.frequency?.timesPerWeek || 1} times per week</p>
                      <p>Time per service: {((task.timeRequired / (task.frequency?.timesPerWeek || 1)) / 4 * 60).toFixed(1)} minutes</p>
                      <p>Monthly time: {(task.timeRequired * 60).toFixed(1)} minutes</p>
                    </div>
                  </div>
                );
              })}

              <div className="border-t pt-4">
                <p className="font-medium">Total Monthly Time Required:</p>
                <p className="text-sm text-muted-foreground">
                  {(selectedTasks.reduce((sum, task) => sum + (task.timeRequired || 0), 0) * 60).toFixed(1)} minutes
                </p>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <h3 className="font-medium">Tools Required:</h3>
                {Object.entries(toolsSummary).map(([tool, details]) => (
                  <div key={tool} className="text-sm text-muted-foreground">
                    <p className="font-medium">{tool}</p>
                    <p>Used in {details.count} task{details.count !== 1 ? 's' : ''}</p>
                    <p>Sites: {Array.from(details.sites).join(', ')}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
};