import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskForm } from './TaskForm';
import { TaskList } from './TaskList';
import { CleaningTask } from '@/data/types/taskManagement';
import { loadTasks, saveTasks } from '@/utils/taskStorage';
import { useToast } from '@/components/ui/use-toast';

export const TaskManagementPage = () => {
  const [tasks, setTasks] = useState<CleaningTask[]>([]);
  const [editingTask, setEditingTask] = useState<CleaningTask | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedTasks = loadTasks();
    setTasks(savedTasks);
  }, []);

  const handleAddTask = (taskData: Omit<CleaningTask, 'id'>) => {
    const newTask: CleaningTask = {
      ...taskData,
      id: crypto.randomUUID(),
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const handleEditTask = (task: CleaningTask) => {
    setEditingTask(task);
  };

  const handleUpdateTask = (taskData: Omit<CleaningTask, 'id'>) => {
    const updatedTasks = tasks.map(task => 
      task.id === editingTask?.id ? { ...taskData, id: task.id } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    toast({
      title: "Task Deleted",
      description: "The task has been removed from the database.",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Task Management</h1>
      
      <Tabs defaultValue="input" className="space-y-6">
        <TabsList>
          <TabsTrigger value="input">Add Tasks</TabsTrigger>
          <TabsTrigger value="view">View Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="input">
          <Card>
            <CardHeader>
              <CardTitle>{editingTask ? 'Edit Task' : 'Add New Task'}</CardTitle>
            </CardHeader>
            <CardContent>
              <TaskForm
                onSubmit={editingTask ? handleUpdateTask : handleAddTask}
                initialData={editingTask || undefined}
                mode={editingTask ? 'edit' : 'create'}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="view">
          <TaskList
            tasks={tasks}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};