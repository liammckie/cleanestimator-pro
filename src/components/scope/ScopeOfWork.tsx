import React from 'react';
import { TaskStack } from '../task/TaskStack';
import { CategoryList } from '../CategoryList';
import { getTaskGroups } from '@/data/rates/ratesManager';
import { Site } from '@/data/types/site';

interface ScopeOfWorkProps {
  sites: Site[];
  onUpdateSite: (siteId: string, tasks: any[]) => void;
}

export const ScopeOfWork: React.FC<ScopeOfWorkProps> = ({ sites, onUpdateSite }) => {
  const taskGroups = React.useMemo(() => {
    try {
      const groups = getTaskGroups();
      return Array.isArray(groups) ? groups : [];
    } catch (error) {
      console.error('Error loading task groups:', error);
      return [];
    }
  }, []);

  return (
    <div className="fixed right-0 top-0 h-screen w-96 border-l bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Selected Tasks</h2>
        <TaskStack />
      </div>
    </div>
  );
};