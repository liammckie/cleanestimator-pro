import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export const MainNavigation = () => {
  return (
    <TabsList className="w-full justify-start border-b">
      <TabsTrigger value="scope">Scope of Work</TabsTrigger>
      <TabsTrigger value="labor">Labor</TabsTrigger>
      <TabsTrigger value="equipment">Equipment</TabsTrigger>
      <TabsTrigger value="oncosts">On-Costs</TabsTrigger>
      <TabsTrigger value="contract">Contract</TabsTrigger>
      <TabsTrigger value="overview">Overview</TabsTrigger>
      <TabsTrigger value="tasks">Task Management</TabsTrigger>
    </TabsList>
  );
};