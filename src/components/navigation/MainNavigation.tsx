
import React from 'react';
import { TabsTrigger } from "@/components/ui/tabs";
import { menuOptions } from './MenuOptions';

export const MainNavigation = () => {
  return (
    <>
      {menuOptions.map((option) => (
        <TabsTrigger 
          key={option.id} 
          value={option.id}
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          {option.label}
        </TabsTrigger>
      ))}
    </>
  );
};
