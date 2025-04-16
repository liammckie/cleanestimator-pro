
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CleaningTask } from '@/data/types/taskManagement';
import { loadTasks } from '@/utils/taskStorage';
import { useToast } from '@/hooks/use-toast';
import { TaskDatabase } from './TaskDatabase';
import { ScopeContent } from './scope/ScopeContent';
import { useTaskContext } from '@/components/area/task/TaskContext';

export const TaskManagementPage = () => {
  const [tasks, setTasks] = useState<CleaningTask[]>(() => loadTasks());
  const { toast } = useToast();
  const { 
    selectedTasks,
    handleTaskSelection,
    handleQuantityChange,
    handleFrequencyChange 
  } = useTaskContext();

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
