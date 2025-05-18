
import React from 'react';
import { TaskManagementPage } from '@/components/task-management/TaskManagementPage';
import { DatabaseNavigation } from '@/components/navigation/DatabaseNavigation';

const Index = () => {
  return (
    <div className="container mx-auto py-8 space-y-4">
      <DatabaseNavigation />
      <TaskManagementPage />
    </div>
  );
};

export default Index;
