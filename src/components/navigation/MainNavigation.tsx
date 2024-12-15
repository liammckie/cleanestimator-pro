import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export const MainNavigation = () => {
  return (
    <TabsList className="w-full justify-start border-b">
      <TabsTrigger value="scope">Sites</TabsTrigger>
      <TabsTrigger value="labor">Labor Costs</TabsTrigger>
      <TabsTrigger value="equipment">Equipment</TabsTrigger>
      <TabsTrigger value="roster">Roster</TabsTrigger>
      <TabsTrigger value="contract">Contract</TabsTrigger>
      <TabsTrigger value="summary">Summary</TabsTrigger>
      <TabsTrigger value="settings">Settings</TabsTrigger>
      <TabsTrigger value="overview">Site Overview</TabsTrigger>
    </TabsList>
  );
};