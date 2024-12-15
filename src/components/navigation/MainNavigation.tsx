import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { menuOptions } from './MenuOptions';
import { 
  Wrench, 
  User, 
  DollarSign, 
  BarChart2, 
  ClipboardList, 
  List, 
  Settings 
} from 'lucide-react';

const iconMap = {
  'wrench': Wrench,
  'user': User,
  'dollar-sign': DollarSign,
  'chart-bar': BarChart2,
  'clipboard-list': ClipboardList,
  'list': List,
  'settings': Settings
};

export const MainNavigation = () => {
  return (
    <TabsList className="w-full justify-start border-b p-0 bg-background">
      {menuOptions.map((option) => {
        const Icon = iconMap[option.icon as keyof typeof iconMap];
        return (
          <TabsTrigger 
            key={option.id} 
            value={option.id}
            className="flex items-center gap-2 px-4 py-3"
          >
            {Icon && <Icon className="w-4 h-4" />}
            {option.label}
          </TabsTrigger>
        );
      })}
    </TabsList>
  );
};