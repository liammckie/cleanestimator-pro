
import React from 'react';
import { TabsTrigger } from "@/components/ui/tabs";
import { menuOptions } from './MenuOptions';
import { useLocation } from 'react-router-dom';

export const MainNavigation = () => {
  const location = useLocation();
  const pathname = location.pathname;
  
  return (
    <>
      {menuOptions.map((option) => {
        const isActive = pathname.includes(option.id);
        
        return (
          <TabsTrigger 
            key={option.id} 
            value={option.id}
            className={`transition-all duration-200 hover:text-primary ${
              isActive ? "bg-primary text-primary-foreground" : ""
            }`}
          >
            {option.label}
          </TabsTrigger>
        );
      })}
    </>
  );
};
