import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskForm } from './TaskForm';
import { TaskList } from './TaskList';
import { CsvImport } from './CsvImport';
import { CleaningTask } from '@/data/types/taskManagement';
import { loadTasks, saveTasks } from '@/utils/taskStorage';
import { useToast } from '@/components/ui/use-toast';
import { TaskProvider } from '../area/task/TaskContext';
import { ScopeOfWorkSidebar } from '../ScopeOfWorkSidebar';
import { calculateTaskProductivity } from '@/utils/productivityCalculations';
import { TaskSelectionPanel } from './TaskSelectionPanel';
import { SelectedTask } from './types';

export const TaskManagementPage = () => {
  const [tasks, setTasks] = useState<CleaningTask[]>(() => loadTasks());
  const [editingTask, setEditingTask] = useState<CleaningTask | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<SelectedTask[]>([]);
  const { toast } = useToast();

  const handleAddTask = (taskData: Omit<CleaningTask, 'id'>) => {
    const newTask: CleaningTask = {
      ...taskData,
      id: crypto.randomUUID(),
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    toast({
      title: "Task Added",
      description: "New task has been added to the database.",
    });
  };

  const handleTaskSelection = (task: CleaningTask) => {
    const existingTask = selectedTasks.find(t => t.id === task.id);
    
    if (!existingTask) {
      const newSelectedTask: SelectedTask = {
        ...task,
        taskId: task.id,
        quantity: 0,
        frequency: {
          timesPerWeek: 1,
          timesPerMonth: 4.33
        },
        timeRequired: 0,
        selectedTool: task.defaultTool
      };
      
      setSelectedTasks(prev => [...prev, newSelectedTask]);
      toast({
        title: "Task Added to Scope",
        description: `${task.taskName} has been added to your scope of work.`,
      });
    }
  };

  const handleQuantityChange = (taskId: string, quantity: number) => {
    setSelectedTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        const productivity = calculateTaskProductivity(
          taskId,
          quantity,
          task.selectedTool,
          task.frequency,
          quantity
        );
        
        return {
          ...task,
          quantity,
          timeRequired: productivity?.timeRequired || 0
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
        
        const productivity = calculateTaskProductivity(
          taskId,
          task.quantity,
          task.selectedTool,
          frequency,
          task.quantity
        );
        
        return {
          ...task,
          frequency,
          timeRequired: productivity?.timeRequired || 0
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
                  <CardTitle>{editingTask ? 'Edit Task' : 'Add New Task'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <TaskForm
                    onSubmit={handleAddTask}
                    initialData={editingTask || undefined}
                    mode={editingTask ? 'edit' : 'create'}
                  />
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

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Task Database</CardTitle>
                </CardHeader>
                <CardContent>
                  <TaskList
                    tasks={tasks}
                    onTaskSelect={handleTaskSelection}
                    onQuantityChange={handleQuantityChange}
                    onFrequencyChange={handleFrequencyChange}
                    selectedTasks={selectedTasks}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="scope">
              <TaskSelectionPanel
                selectedTasks={selectedTasks}
                onQuantityChange={handleQuantityChange}
                onFrequencyChange={handleFrequencyChange}
              />
            </TabsContent>
          </Tabs>
        </div>
        
        <ScopeOfWorkSidebar 
          selectedTasks={selectedTasks.map(task => ({
            taskId: task.id,
            quantity: task.quantity,
            timeRequired: task.timeRequired,
            frequency: task.frequency,
            selectedTool: task.selectedTool
          }))} 
          sites={[]} 
        />
      </div>
    </TaskProvider>
  );
};