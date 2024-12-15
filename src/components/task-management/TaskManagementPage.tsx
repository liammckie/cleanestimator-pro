import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskForm } from './TaskForm';
import { TaskList } from './TaskList';
import { CleaningTask } from '@/data/types/taskManagement';
import { loadTasks, saveTasks } from '@/utils/taskStorage';
import { useToast } from '@/components/ui/use-toast';
import { ScopeOfWorkSidebar } from '../ScopeOfWorkSidebar';

export const TaskManagementPage = () => {
  const [tasks, setTasks] = useState<CleaningTask[]>([]);
  const [editingTask, setEditingTask] = useState<CleaningTask | null>(null);
  const { toast } = useToast();

  React.useEffect(() => {
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
    toast({
      title: "Task Added",
      description: "New task has been added to the database.",
    });
  };

  const handleEditTask = (task: CleaningTask) => {
    setEditingTask(task);
  };

  const handleUpdateTask = (taskData: Omit<CleaningTask, 'id'>) => {
    if (!editingTask) return;
    
    const updatedTasks = tasks.map(task => 
      task.id === editingTask.id ? { ...taskData, id: task.id } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setEditingTask(null);
    toast({
      title: "Task Updated",
      description: "The task has been updated successfully.",
    });
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
                  onSubmit={editingTask ? handleUpdateTask : handleAddTask}
                  initialData={editingTask || undefined}
                  mode={editingTask ? 'edit' : 'create'}
                />
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Task Database</CardTitle>
              </CardHeader>
              <CardContent>
                <TaskList
                  tasks={tasks}
                  onEditTask={handleEditTask}
                  onDeleteTask={handleDeleteTask}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scope">
            <Card>
              <CardHeader>
                <CardTitle>Available Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <TaskList
                  tasks={tasks}
                  onEditTask={handleEditTask}
                  onDeleteTask={handleDeleteTask}
                  mode="selection"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <ScopeOfWorkSidebar selectedTasks={[]} sites={[]} />
    </div>
  );
};