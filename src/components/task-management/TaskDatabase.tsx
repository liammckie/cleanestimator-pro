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
import { CleaningTask, SelectedTask } from '@/data/types/taskManagement';
import { saveTasks } from '@/utils/taskStorage';

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
                        selectedTask={selectedTasks.find(t => t.id === task.id)}
                        onSelect={() => onTaskSelection(task)}
                        onQuantityChange={onQuantityChange}
                        onFrequencyChange={onFrequencyChange}
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