import React from 'react';
import { MainContent } from '@/components/layout/MainContent';
import { MainNavigation } from '@/components/navigation/MainNavigation';
import { TaskProvider } from '@/components/area/task/TaskContext';
import { Toaster } from '@/components/ui/toaster';
import { getTaskGroups } from '@/data/rates/ratesManager';
import { CategoryList } from '@/components/CategoryList';
import { TaskStack } from '@/components/task/TaskStack';
import { Tabs } from '@/components/ui/tabs';

const Index = () => {
  const taskGroups = getTaskGroups();

  const handleTasksChange = (tasks: Array<{
    taskId: string;
    siteId?: string;
    siteName?: string;
    quantity: number;
    timeRequired: number;
    frequency: {
      timesPerWeek: number;
      timesPerMonth: number;
    };
    productivityOverride?: number;
    selectedTool?: string;
  }>) => {
    console.log('Tasks updated:', tasks);
    // You can add additional logic here to handle task changes
  };

  return (
    <TaskProvider onTasksChange={handleTasksChange}>
      <div className="min-h-screen">
        <Tabs defaultValue="sites">
          <MainNavigation />
          <div className="container mx-auto py-8">
            <div className="flex gap-6">
              <div className="flex-1">
                <CategoryList groups={taskGroups} />
              </div>
              <TaskStack />
            </div>
          </div>
        </Tabs>
        <Toaster />
      </div>
    </TaskProvider>
  );
};

export default Index;