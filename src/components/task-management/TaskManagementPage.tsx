
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CleaningTask, SelectedTask } from '@/data/types/taskManagement';
import { loadTasks } from '@/utils/taskStorage';
import { useToast } from '@/hooks/use-toast';
import { calculateManHours, validateTaskInput } from '@/utils/manHourCalculations';
import { TaskDatabase } from './TaskDatabase';
import { ScopeContent } from './scope/ScopeContent';
import { useTaskContext } from '@/components/area/task/TaskContext';

const SELECTED_TASKS_STORAGE_KEY = 'selected-tasks';

export const TaskManagementPage = () => {
  const [tasks, setTasks] = useState<CleaningTask[]>(() => loadTasks());
  const [selectedTasks, setSelectedTasks] = useState<SelectedTask[]>(() => {
    const savedTasks = localStorage.getItem(SELECTED_TASKS_STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const { toast } = useToast();
  const { 
    handleTaskSelection,
    handleQuantityChange,
    handleFrequencyChange 
  } = useTaskContext();

  useEffect(() => {
    localStorage.setItem(SELECTED_TASKS_STORAGE_KEY, JSON.stringify(selectedTasks));
  }, [selectedTasks]);

  const handleTaskSelect = (task: CleaningTask) => {
    // Use the global task context
    handleTaskSelection(task.id, true, undefined, task.taskName);
    
    toast({
      title: "Task Added",
      description: `${task.taskName} has been added to your scope of work.`,
    });
  };

  const handleRemoveTask = (taskId: string) => {
    // Use the global task context
    handleTaskSelection(taskId, false);
    
    toast({
      title: "Task Removed",
      description: "Task has been removed from the scope of work.",
    });
  };

  return (
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
            onTaskSelection={handleTaskSelect}
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
  );
};
