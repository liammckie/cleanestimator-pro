import React, { useState } from 'react';
import { MainContent } from '@/components/layout/MainContent';
import { MainNavigation } from '@/components/navigation/MainNavigation';
import { TaskProvider } from '@/components/area/task/TaskContext';
import { Toaster } from '@/components/ui/toaster';
import { getTaskGroups } from '@/data/rates/ratesManager';
import { CategoryList } from '@/components/CategoryList';
import { TaskStack } from '@/components/task/TaskStack';

const Index = () => {
  const taskGroups = getTaskGroups();

  return (
    <TaskProvider>
      <div className="min-h-screen">
        <MainNavigation />
        <div className="container mx-auto py-8">
          <div className="flex gap-6">
            <div className="flex-1">
              <CategoryList groups={taskGroups} />
            </div>
            <TaskStack />
          </div>
        </div>
        <Toaster />
      </div>
    </TaskProvider>
  );
};

export default Index;