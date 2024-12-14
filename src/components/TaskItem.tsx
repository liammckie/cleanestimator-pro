import React, { useMemo, useCallback } from 'react';
import { calculateTaskProductivity } from '@/utils/productivityCalculations';
import { Card } from "@/components/ui/card";
import { ProductivityCard } from './task/ProductivityCard';
import { TimeDisplay } from './task/TimeDisplay';
import { TaskControls } from './task/TaskControls';
import { TaskHeader } from './task/TaskHeader';

interface TaskItemProps {
  rate: {
    id: string;
    task: string;
    tool: string;
    unit: string;
    ratePerHour: number;
  };
  selectedTask: {
    taskId: string;
    quantity: number;
    timeRequired: number;
    frequency: {
      timesPerWeek: number;
      timesPerMonth: number;
    };
    productivityOverride?: number;
    selectedTool?: string;
  } | undefined;
  onTaskSelection: (taskId: string, checked: boolean) => void;
  onQuantityChange: (taskId: string, quantity: number) => void;
  onFrequencyChange: (taskId: string, timesPerWeek: number) => void;
  onProductivityOverride: (taskId: string, override: number) => void;
  onRemoveTask: (taskId: string) => void;
  onToolChange: (taskId: string, tool: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  rate,
  selectedTask,
  onTaskSelection,
  onQuantityChange,
  onFrequencyChange,
  onProductivityOverride,
  onRemoveTask,
  onToolChange,
}) => {
  const productivity = useMemo(() => 
    selectedTask ? calculateTaskProductivity(
      rate.id,
      selectedTask.quantity,
      selectedTask.selectedTool,
      selectedTask.frequency,
      selectedTask.quantity
    ) : null,
  [rate.id, selectedTask]);

  const handleTaskSelection = useCallback((taskId: string, checked: boolean) => {
    onTaskSelection(taskId, checked);
  }, [onTaskSelection]);

  const handleQuantityChange = useCallback((taskId: string, quantity: number) => {
    onQuantityChange(taskId, quantity);
  }, [onQuantityChange]);

  const handleFrequencyChange = useCallback((taskId: string, timesPerWeek: number) => {
    onFrequencyChange(taskId, timesPerWeek);
  }, [onFrequencyChange]);

  const handleProductivityOverride = useCallback((taskId: string, override: number) => {
    onProductivityOverride(taskId, override);
  }, [onProductivityOverride]);

  const handleToolChange = useCallback((taskId: string, tool: string) => {
    onToolChange(taskId, tool);
  }, [onToolChange]);

  return (
    <div key={rate.id} className="flex flex-col gap-2 p-2 border rounded">
      <TaskHeader
        taskId={rate.id}
        taskName={rate.task}
        isSelected={!!selectedTask}
        onTaskSelection={handleTaskSelection}
        onRemoveTask={onRemoveTask}
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