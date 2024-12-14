import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getProductivityRate } from '@/data/productivityRates';

interface ScopeOfWorkSidebarProps {
  selectedTasks: Array<{
    taskId: string;
    quantity: number;
    timeRequired: number;
  }>;
}

export const ScopeOfWorkSidebar: React.FC<ScopeOfWorkSidebarProps> = ({ selectedTasks }) => {
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
              {selectedTasks.map((task) => {
                const rateInfo = getProductivityRate(task.taskId);
                if (!rateInfo) return null;

                return (
                  <div key={task.taskId} className="border rounded-lg p-4 space-y-2">
                    <div className="font-medium">{rateInfo.task}</div>
                    <div className="text-sm text-muted-foreground">
                      <p>Category: {rateInfo.category}</p>
                      <p>Tool: {rateInfo.tool}</p>
                      <p>Quantity: {task.quantity} {rateInfo.unit}</p>
                      <p>Time Required: {(task.timeRequired * 60).toFixed(1)} minutes</p>
                    </div>
                  </div>
                );
              })}
              <div className="border-t pt-4">
                <p className="font-medium">Total Time Required:</p>
                <p className="text-sm text-muted-foreground">
                  {(selectedTasks.reduce((sum, task) => sum + task.timeRequired, 0) * 60).toFixed(1)} minutes
                </p>
              </div>
            </div>
          )}
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
};