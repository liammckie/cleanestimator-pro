import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CleaningTask, SelectedTask } from '@/data/types/taskManagement';
import { loadTasks } from '@/utils/taskStorage';
import { useToast } from '@/hooks/use-toast';
import { TaskProvider } from '../area/task/TaskContext';
import { calculateManHours, validateTaskInput } from '@/utils/manHourCalculations';
import { TaskDatabase } from './TaskDatabase';
import { ScopeContent } from './scope/ScopeContent';

const SELECTED_TASKS_STORAGE_KEY = 'selected-tasks';

export const TaskManagementPage = () => {
  const [tasks, setTasks] = useState<CleaningTask[]>(() => loadTasks());
  const [selectedTasks, setSelectedTasks] = useState<SelectedTask[]>(() => {
    const savedTasks = localStorage.getItem(SELECTED_TASKS_STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem(SELECTED_TASKS_STORAGE_KEY, JSON.stringify(selectedTasks));
  }, [selectedTasks]);

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

  const handleRemoveTask = (taskId: string) => {
    setSelectedTasks(prev => prev.filter(task => task.id !== taskId));
    toast({
      title: "Task Removed",
      description: "Task has been removed from the scope of work.",
    });
  };

  return (
    <TaskProvider onTasksChange={(tasks) => console.log('Tasks updated:', tasks)}>
      <div className="space-y-6">
        <Tabs defaultValue="database" className="space-y-6">
          <TabsList>
            <TabsTrigger value="database">Task Database</TabsTrigger>
            <TabsTrigger value="scope">Scope of Work</TabsTrigger>
          </TabsList>

          <TabsContent value="database">
            <TaskDatabase
              tasks={tasks}
              setTasks={setTasks}
              selectedTasks={selectedTasks}
              onTaskSelection={handleTaskSelection}
              onQuantityChange={handleQuantityChange}
              onFrequencyChange={handleFrequencyChange}
            />
          </TabsContent>

          <TabsContent value="scope">
            <ScopeContent
              selectedTasks={selectedTasks}
              onQuantityChange={handleQuantityChange}
              onFrequencyChange={handleFrequencyChange}
              onRemoveTask={handleRemoveTask}
            />
          </TabsContent>
        </Tabs>
      </div>
    </TaskProvider>
  );
};