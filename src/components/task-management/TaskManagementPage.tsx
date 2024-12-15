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

interface SelectedTask extends CleaningTask {
  quantity: number;
  frequency: {
    timesPerWeek: number;
    timesPerMonth: number;
  };
  timeRequired: number;
}

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
        quantity: 0,
        frequency: {
          timesPerWeek: 1,
          timesPerMonth: 4.33
        },
        timeRequired: 0
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
          task.defaultTool,
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
          task.defaultTool,
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

  const totalMonthlyHours = selectedTasks.reduce((total, task) => {
    return total + (task.timeRequired * task.frequency.timesPerMonth);
  }, 0);

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
              <Card>
                <CardHeader>
                  <CardTitle>Selected Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedTasks.map(task => (
                      <div key={task.id} className="p-4 border rounded">
                        <h3 className="font-medium">{task.taskName}</h3>
                        <div className="mt-2 space-y-2">
                          <div>
                            <label className="text-sm text-muted-foreground">Quantity ({task.measurementUnit})</label>
                            <input
                              type="number"
                              value={task.quantity}
                              onChange={(e) => handleQuantityChange(task.id, Number(e.target.value))}
                              className="w-full mt-1 p-2 border rounded"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-muted-foreground">Times per Week</label>
                            <input
                              type="number"
                              value={task.frequency.timesPerWeek}
                              onChange={(e) => handleFrequencyChange(task.id, Number(e.target.value))}
                              className="w-full mt-1 p-2 border rounded"
                            />
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Monthly Hours: {(task.timeRequired * task.frequency.timesPerMonth).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                    {selectedTasks.length === 0 && (
                      <p className="text-muted-foreground">No tasks selected. Select tasks from the database tab.</p>
                    )}
                    {selectedTasks.length > 0 && (
                      <div className="mt-4 p-4 bg-accent rounded">
                        <p className="font-medium">Total Monthly Hours: {totalMonthlyHours.toFixed(2)}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <ScopeOfWorkSidebar selectedTasks={selectedTasks} sites={[]} />
      </div>
    </TaskProvider>
  );
};