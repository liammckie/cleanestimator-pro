import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskForm } from './TaskForm';
import { TaskList } from './TaskList';
import { CsvImport } from './CsvImport';
import { CleaningTask, SelectedTask } from '@/data/types/taskManagement';
import { loadTasks, saveTasks } from '@/utils/taskStorage';
import { useToast } from '@/components/ui/use-toast';
import { TaskProvider } from '../area/task/TaskContext';

const SELECTED_TASKS_STORAGE_KEY = 'selected-tasks';

export const TaskManagementPage = () => {
  const [tasks, setTasks] = useState<CleaningTask[]>(() => loadTasks());
  const { toast } = useToast();

  // Group tasks by category
  const tasksByCategory = tasks.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = [];
    }
    acc[task.category].push(task);
    return acc;
  }, {} as Record<string, CleaningTask[]>);

  const handleImportTasks = (tasksToImport: Omit<CleaningTask, 'id'>[]) => {
    const newTasks = tasksToImport.map(task => ({
      ...task,
      id: crypto.randomUUID(),
    }));
    const updatedTasks = [...tasks, ...newTasks];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  return (
    <TaskProvider onTasksChange={(tasks) => console.log('Tasks updated:', tasks)}>
      <div className="space-y-6">
        <Tabs defaultValue="database" className="space-y-6">
          <TabsList>
            <TabsTrigger value="database">Task Database</TabsTrigger>
          </TabsList>

          <TabsContent value="database">
            <Card>
              <CardHeader>
                <CardTitle>Task Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(tasksByCategory).map(([category, categoryTasks]) => (
                    <div key={category} className="space-y-4">
                      <h3 className="text-lg font-semibold">{category}</h3>
                      <div className="grid gap-4">
                        {categoryTasks.map((task) => (
                          <TaskList
                            key={task.id}
                            tasks={[task]}
                            onQuantityChange={() => {}}
                            onFrequencyChange={() => {}}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Import Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <CsvImport onImport={handleImportTasks} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </TaskProvider>
  );
};