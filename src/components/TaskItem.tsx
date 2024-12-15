import React, { useMemo, useCallback } from 'react';
import { calculateTaskProductivity } from '@/utils/productivityCalculations';
import { Card } from "@/components/ui/card";
import { ProductivityCard } from './task/ProductivityCard';
import { TimeDisplay } from './task/TimeDisplay';
import { TaskControls } from './task/TaskControls';
import { TaskHeader } from './task/TaskHeader';
import { useTaskContext } from './area/task/TaskContext';

interface TaskItemProps {
  rate: {
    id: string;
    task: string;
    tool: string;
    unit: string;
    ratePerHour: number;
  };
  siteId?: string;
  siteName?: string;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  rate,
  siteId,
  siteName,
}) => {
  const { selectedTasks, handleTaskSelection, handleQuantityChange, handleFrequencyChange, handleProductivityOverride, handleToolChange } = useTaskContext();
  
  const selectedTask = selectedTasks.find(task => task.taskId === rate.id && task.siteId === siteId);

  const productivity = useMemo(() => 
    selectedTask ? calculateTaskProductivity(
      rate.id,
      selectedTask.quantity,
      selectedTask.selectedTool,
      selectedTask.frequency,
      selectedTask.quantity
    ) : null,
  [rate.id, selectedTask]);

  const weeklyHours = useMemo(() => {
    if (!selectedTask?.timeRequired) return 0;
    return selectedTask.timeRequired / 4.33; // Convert monthly to weekly
  }, [selectedTask?.timeRequired]);

  const handleLocalTaskSelection = useCallback((taskId: string, checked: boolean) => {
    handleTaskSelection(taskId, checked, siteId, siteName);
  }, [handleTaskSelection, siteId, siteName]);

  return (
    <div key={rate.id} className="flex flex-col gap-2 p-2 border rounded">
      <TaskHeader
        taskId={rate.id}
        taskName={rate.task}
        isSelected={!!selectedTask}
        onTaskSelection={handleLocalTaskSelection}
        onRemoveTask={(taskId) => handleTaskSelection(taskId, false, siteId, siteName)}
      />

      {selectedTask && (
        <div className="ml-6 space-y-4">
          <TaskControls
            taskId={rate.id}
            quantity={selectedTask.quantity}
            frequency={selectedTask.frequency}
            productivityOverride={selectedTask.productivityOverride}
            selectedTool={selectedTask.selectedTool}
            unit={rate.unit}
            ratePerHour={rate.ratePerHour}
            onQuantityChange={handleQuantityChange}
            onFrequencyChange={handleFrequencyChange}
            onProductivityOverride={handleProductivityOverride}
            onToolChange={handleToolChange}
          />

          {productivity && (
            <ProductivityCard productivity={productivity} />
          )}

          <div className="bg-accent/50 p-4 rounded-lg space-y-2">
            <h4 className="font-medium">Time Requirements</h4>
            <div className="text-sm space-y-1">
              <p>Weekly Hours: {weeklyHours.toFixed(1)} hours</p>
              <p>Monthly Hours: {selectedTask.timeRequired.toFixed(1)} hours</p>
            </div>
          </div>

          {selectedTask.timeRequired > 0 && (
            <TimeDisplay
              timeRequired={selectedTask.timeRequired}
              frequency={selectedTask.frequency}
            />
          )}
        </div>
      )}
    </div>
  );
};