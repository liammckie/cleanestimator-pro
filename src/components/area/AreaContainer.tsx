
import React from 'react';
import { CategoryPanel } from './CategoryPanel';
import { TaskManager } from './TaskManager';
import { TimeDisplay } from './TimeDisplay';
import { AreaData } from './task/types';
import { useTaskContext } from './task/TaskContext';

interface AreaContainerProps {
  onAreaChange: (area: AreaData) => void;
}

export const AreaContainer: React.FC<AreaContainerProps> = ({ onAreaChange }) => {
  const [category, setCategory] = React.useState('');
  const { selectedTasks } = useTaskContext();

  // Update area data when selected tasks change
  React.useEffect(() => {
    if (selectedTasks.length > 0) {
      const areaData: AreaData = {
        squareMeters: 0,
        spaceType: '',
        industryType: '',
        selectedTasks: selectedTasks.map(task => ({
          taskId: task.taskId,
          quantity: task.quantity,
          timeRequired: task.timeRequired,
          frequency: task.frequency,
          productivityOverride: task.productivityOverride,
          selectedTool: task.selectedTool,
          laborRate: task.laborRate
        })),
        totalTime: selectedTasks.reduce((sum, task) => sum + (task.timeRequired * task.frequency.timesPerMonth), 0),
        totalLaborCost: selectedTasks.reduce((sum, task) => {
          const hourlyRate = task.laborRate || 38;
          return sum + (task.timeRequired * hourlyRate * task.frequency.timesPerMonth);
        }, 0)
      };
      
      onAreaChange(areaData);
    }
  }, [selectedTasks, onAreaChange]);

  return (
    <div className="space-y-4">
      <CategoryPanel value={category} onValueChange={setCategory} />
      <TaskManager category={category} />
      <TimeDisplay selectedTasks={selectedTasks} />
    </div>
  );
};
