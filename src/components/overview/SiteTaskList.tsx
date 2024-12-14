import React from 'react';

interface Task {
  taskId: string;
  quantity: number;
  timeRequired: number;
  frequency: {
    timesPerWeek: number;
    timesPerMonth: number;
  };
}

interface SiteTaskListProps {
  tasks: Task[];
}

export const SiteTaskList: React.FC<SiteTaskListProps> = ({ tasks }) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-muted-foreground mb-2">Tasks</h3>
      <div className="space-y-2">
        {tasks.map((task, index) => (
          <div key={index} className="bg-muted p-3 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{task.taskId}</p>
                <p className="text-sm text-muted-foreground">
                  Quantity: {task.quantity} | Time: {task.timeRequired} hours
                </p>
              </div>
              <div className="text-sm text-muted-foreground text-right">
                <p>{task.frequency.timesPerWeek}x per week</p>
                <p>{task.frequency.timesPerMonth}x per month</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};