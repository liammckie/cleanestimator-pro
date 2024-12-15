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
    <div className="grid grid-cols-[1fr,auto]">
      <div className="p-6">
        <CategoryList groups={taskGroups} />
      </div>
      <TaskStack />
    </div>
  );
};