
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectHealthDashboard from './ProjectHealthDashboard';
import { ErrorTracker } from '../common/ErrorTracker';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <Tabs defaultValue="health" className="space-y-6">
        <TabsList>
          <TabsTrigger value="health">Project Health</TabsTrigger>
          <TabsTrigger value="errors">Error Tracker</TabsTrigger>
        </TabsList>
        
        <TabsContent value="health">
          <ProjectHealthDashboard />
        </TabsContent>
        
        <TabsContent value="errors">
          <ErrorTracker />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
