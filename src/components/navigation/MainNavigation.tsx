import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { menuOptions } from './MenuOptions';

export const MainNavigation = () => {
  return (
    <TabsList className="w-full justify-start border-b bg-background">
      {menuOptions.map((option) => (
        <TabsTrigger key={option.id} value={option.id}>
          {option.label}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};