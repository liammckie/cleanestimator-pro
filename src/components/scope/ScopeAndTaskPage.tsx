import React from 'react';
import { ScopeOfWorkSidebar } from '../ScopeOfWorkSidebar';
import { Site } from '@/data/types/site';

interface ScopeAndTaskPageProps {
  sites: Site[];
}

export const ScopeAndTaskPage: React.FC<ScopeAndTaskPageProps> = ({ sites }) => {
  const selectedTasks = sites.flatMap(site => 
    site.area?.selectedTasks?.map(task => ({
      ...task,
      siteName: site.name
    })) || []
  );

  return (
    <div className="grid grid-cols-[auto,1fr] gap-6">
      <ScopeOfWorkSidebar selectedTasks={selectedTasks} sites={sites} />
      <div className="space-y-6">
        {/* Task selection UI will go here */}
        <p className="text-muted-foreground">Select tasks for your sites from the task database.</p>
      </div>
    </div>
  );
};
