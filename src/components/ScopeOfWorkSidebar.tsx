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
    <Sidebar className="border-r h-[calc(100vh-4rem)]">
      <SidebarHeader className="border-b px-6 py-4">
        <h2 className="text-xl font-semibold text-white">Scope of Work</h2>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-full px-6">
          {selectedTasks.length === 0 ? (
            <p className="text-muted-foreground text-sm py-4">
              No tasks selected. Select tasks to build your scope of work.
            </p>
          ) : (
            <div className="space-y-6 py-4">
              {selectedTasks.map((task, index) => {
                const rateInfo = getProductivityRate(task.taskId);
                if (!rateInfo) return null;

                return (
                  <div key={`${task.taskId}-${index}`} className="bg-accent/5 rounded-lg p-6 space-y-3">
                    <div className="font-medium text-lg text-white">{rateInfo.task}</div>
                    <div className="space-y-2 text-sm text-gray-300">
                      {task.siteName && (
                        <div className="flex justify-between">
                          <span>Site:</span>
                          <span className="font-medium">{task.siteName}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Category:</span>
                        <span className="font-medium">{rateInfo.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tool:</span>
                        <span className="font-medium">{task.selectedTool || rateInfo.tool}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Quantity:</span>
                        <span className="font-medium">{task.quantity} {rateInfo.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Frequency:</span>
                        <span className="font-medium">{task.frequency?.timesPerWeek || 1} times per week</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time per service:</span>
                        <span className="font-medium">{((task.timeRequired / (task.frequency?.timesPerWeek || 1)) / 4 * 60).toFixed(1)} minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly time:</span>
                        <span className="font-medium">{(task.timeRequired * 60).toFixed(1)} minutes</span>
                      </div>
                    </div>
                  </div>
                );
              })}

              <Separator className="my-6" />

              <div className="bg-accent/5 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-lg text-white">Total Monthly Time Required:</h3>
                <p className="text-2xl font-bold text-secondary">
                  {(selectedTasks.reduce((sum, task) => sum + (task.timeRequired || 0), 0) * 60).toFixed(1)} minutes
                </p>
              </div>

              <Separator className="my-6" />

              <div className="bg-accent/5 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-lg text-white">Tools Required:</h3>
                <div className="space-y-4">
                  {Object.entries(toolsSummary).map(([tool, details]) => (
                    <div key={tool} className="space-y-2">
                      <p className="font-medium text-white">{tool}</p>
                      <div className="text-sm text-gray-300">
                        <p>Used in {details.count} task{details.count !== 1 ? 's' : ''}</p>
                        <p>Sites: {Array.from(details.sites).join(', ')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
};