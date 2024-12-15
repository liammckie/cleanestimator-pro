import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TaskForm } from './TaskForm';
import { TaskList } from './TaskList';
import { CsvImport } from './CsvImport';
import { CleaningTask, SelectedTask } from '@/data/types/taskManagement';
import { loadTasks, saveTasks } from '@/utils/taskStorage';
import { useToast } from '@/components/ui/use-toast';
import { TaskProvider } from '../area/task/TaskContext';
import { ScopeOfWorkSidebar } from '../ScopeOfWorkSidebar';
import { calculateManHours, validateTaskInput } from '@/utils/manHourCalculations';
import { TaskSelectionPanel } from './TaskSelectionPanel';

const SELECTED_TASKS_STORAGE_KEY = 'selected-tasks';

export const TaskManagementPage = () => {
  const [tasks, setTasks] = useState<CleaningTask[]>(() => loadTasks());
  const [selectedTasks, setSelectedTasks] = useState<SelectedTask[]>(() => {
    const savedTasks = localStorage.getItem(SELECTED_TASKS_STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const { toast } = useToast();

  // Save selected tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(SELECTED_TASKS_STORAGE_KEY, JSON.stringify(selectedTasks));
  }, [selectedTasks]);

  // Group tasks by category
  const tasksByCategory = tasks.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = [];
    }
    acc[task.category].push(task);
    return acc;
  }, {} as Record<string, CleaningTask[]>);

  const handleTaskSelection = (task: CleaningTask) => {
    const existingTask = selectedTasks.find(t => t.id === task.id);
    
    if (!existingTask) {
      const newSelectedTask: SelectedTask = {
        ...task,
        taskId: task.id,
        quantity: 0,
        manHours: 0,
        frequency: {
          timesPerWeek: 1,
          timesPerMonth: 4.33
        },
        timeRequired: 0,
        selectedTool: task.defaultTool
      };
      
      setSelectedTasks(prev => [...prev, newSelectedTask]);
      toast({
        title: "Task Added",
        description: `${task.taskName} has been added to your scope of work.`,
      });
    }
  };

  const handleQuantityChange = (taskId: string, quantity: number) => {
    setSelectedTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        if (!validateTaskInput(task, quantity)) return task;
        
        const manHours = calculateManHours(
          task,
          quantity,
          task.frequency
        );
        
        return {
          ...task,
          quantity,
          manHours,
          timeRequired: manHours / task.frequency.timesPerMonth
        };
      }
      return task;
    }));
  };

  const handleFrequencyChange = (taskId: string, timesPerWeek: number) => {
    setSelectedTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const frequency = {
          timesPerWeek,
          timesPerMonth: timesPerWeek * 4.33
        };
        
        const manHours = calculateManHours(
          task,
          task.quantity,
          frequency
        );
        
        return {
          ...task,
          frequency,
          manHours,
          timeRequired: manHours / frequency.timesPerMonth
        };
      }
      return task;
    }));
  };

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
      <div className="grid grid-cols-[1fr,auto] gap-6">
        <div className="space-y-6">
          <Tabs defaultValue="database" className="space-y-6">
            <TabsList>
              <TabsTrigger value="database">Task Database</TabsTrigger>
              <TabsTrigger value="scope">Scope of Work</TabsTrigger>
            </TabsList>

            <TabsContent value="database">
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
                                onSelect={() => handleTaskSelection(task)}
                                onQuantityChange={handleQuantityChange}
                                onFrequencyChange={handleFrequencyChange}
                                selectedTask={selectedTasks.find(t => t.id === task.id)}
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
                  <CsvImport onImport={handleImportTasks} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="scope">
              <Card>
                <CardHeader>
                  <CardTitle>Selected Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <TaskList
                    tasks={selectedTasks}
                    onQuantityChange={handleQuantityChange}
                    onFrequencyChange={handleFrequencyChange}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <ScopeOfWorkSidebar 
          selectedTasks={selectedTasks.map(task => ({
            taskId: task.id,
            quantity: task.quantity,
            timeRequired: task.timeRequired,
            frequency: task.frequency,
            selectedTool: task.selectedTool,
            siteName: undefined
          }))} 
          sites={[]} 
        />
      </div>
    </TaskProvider>
  );
};