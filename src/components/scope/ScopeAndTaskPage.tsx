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
    <div className="grid grid-cols-[1fr,auto] gap-6">
      <div className="space-y-6">
        {/* Task selection UI will go here */}
        <p className="text-muted-foreground">Select tasks for your sites from the task database.</p>
      </div>
      <ScopeOfWorkSidebar selectedTasks={selectedTasks} sites={sites} />
    </div>
  );
};