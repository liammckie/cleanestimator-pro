
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TaskSelectionPanel } from './TaskSelectionPanel';
import { CsvImport } from './CsvImport';
import { CleaningTask } from '@/data/types/taskManagement';
import { saveTasks } from '@/utils/taskStorage';
import { SelectedTask } from '@/components/area/task/types';

interface TaskDatabaseProps {
  tasks: CleaningTask[];
  setTasks: (tasks: CleaningTask[]) => void;
  selectedTasks: SelectedTask[];
  onTaskSelection: (task: CleaningTask) => void;
  onQuantityChange: (taskId: string, quantity: number) => void;
  onFrequencyChange: (taskId: string, timesPerWeek: number) => void;
}

export const TaskDatabase: React.FC<TaskDatabaseProps> = ({
  tasks,
  setTasks,
  selectedTasks,
  onTaskSelection,
  onQuantityChange,
  onFrequencyChange,
}) => {
  const tasksByCategory = tasks.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = [];
    }
    acc[task.category].push(task);
    return acc;
  }, {} as Record<string, CleaningTask[]>);

  // Function to check if a task is selected
  const isTaskSelected = (taskId: string) => {
    return selectedTasks.some(t => t.taskId === taskId);
  };

  // Function to get the selected task by ID
  const getSelectedTask = (taskId: string) => {
    return selectedTasks.find(t => t.taskId === taskId);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Task Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {Object.entries(tasksByCategory).map(([category, categoryTasks]) => (
              <AccordionItem key={category} value={category}>
                <AccordionTrigger className="text-lg font-semibold">
                  {category}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 p-4">
                    {categoryTasks.map((task) => (
                      <TaskSelectionPanel
                        key={task.id}
                        task={task}
                        selectedTask={isTaskSelected(task.id) ? getSelectedTask(task.id) : undefined}
                        onSelect={() => onTaskSelection(task)}
                        onQuantityChange={(id, quantity) => onQuantityChange(id, quantity)}
                        onFrequencyChange={(id, timesPerWeek) => onFrequencyChange(id, timesPerWeek)}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Import Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <CsvImport onImport={(tasksToImport) => {
            const newTasks = tasksToImport.map(task => ({
              ...task,
              id: crypto.randomUUID(),
            }));
            const updatedTasks = [...tasks, ...newTasks];
            setTasks(updatedTasks);
            saveTasks(updatedTasks);
          }} />
        </CardContent>
      </Card>
    </>
  );
};
