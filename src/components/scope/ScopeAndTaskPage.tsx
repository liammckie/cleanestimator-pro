import React from 'react';
import { TaskList } from '../TaskList';
import { ScopeOfWorkSidebar } from '../ScopeOfWorkSidebar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Site } from '@/data/types/site';
import { useTaskContext } from '../area/task/TaskContext';

interface ScopeAndTaskPageProps {
  sites: Site[];
}

export const ScopeAndTaskPage: React.FC<ScopeAndTaskPageProps> = ({ sites }) => {
  const {
    selectedTasks,
    handleTaskSelection,
    handleQuantityChange,
    handleFrequencyChange,
    handleProductivityOverride,
    handleToolChange,
    setSelectedSite,
    selectedSite
  } = useTaskContext();

  return (
    <div className="grid grid-cols-[1fr,auto] h-[calc(100vh-4rem)]">
      <div className="p-6 overflow-auto">
        <Card>
          <CardHeader>
            <CardTitle>Task Selection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Select Site</Label>
              <Select 
                value={selectedSite} 
                onValueChange={setSelectedSite}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a site" />
                </SelectTrigger>
                <SelectContent>
                  {sites.map((site) => (
                    <SelectItem key={site.id} value={site.id}>
                      {site.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <TaskList
              category="Core Cleaning Tasks"
              selectedTasks={selectedTasks}
              onTaskSelection={handleTaskSelection}
              onQuantityChange={handleQuantityChange}
              onFrequencyChange={handleFrequencyChange}
              onProductivityOverride={handleProductivityOverride}
              onRemoveTask={(taskId) => handleTaskSelection(taskId, false)}
              onToolChange={handleToolChange}
            />
          </CardContent>
        </Card>
      </div>
      
      <ScopeOfWorkSidebar 
        selectedTasks={selectedTasks}
        sites={sites}
      />
    </div>
  );
};