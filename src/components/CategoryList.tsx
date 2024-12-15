import React, { useState } from 'react';
import { Check } from "lucide-react";
import { CommandGroup, CommandItem } from "@/components/ui/command";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CategoryGroup, CleaningTask } from '@/data/types/categories';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ToolSelect } from './ToolSelect';
import { calculateTaskProductivity } from '@/utils/productivityCalculations';
import { Site } from '@/data/types/site';

interface CategoryListProps {
  groups: CategoryGroup[];
  selectedValue: string;
  searchQuery: string;
  onSelect: (value: string) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  groups = [],
  selectedValue,
  searchQuery,
  onSelect,
}) => {
  const [selectedTask, setSelectedTask] = useState<CleaningTask | null>(null);
  const [selectedSite, setSelectedSite] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);
  const [frequency, setFrequency] = useState<number>(1);
  const [selectedTool, setSelectedTool] = useState<string>('');
  const { toast } = useToast();
  const [sites, setSites] = useState<Site[]>(() => {
    const savedSites = localStorage.getItem('sites');
    return savedSites ? JSON.parse(savedSites) : [];
  });

  const filterTasks = (tasks: CleaningTask[] = []): CleaningTask[] => {
    return tasks.filter(task => 
      task?.task?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const getGroupTasks = (group: CategoryGroup): CleaningTask[] => {
    if (!group?.categories) return [];
    
    return group.categories.reduce((allTasks: CleaningTask[], category) => {
      if (!category?.subcategories) return allTasks;
      
      const categoryTasks = category.subcategories.reduce((subTasks: CleaningTask[], subcategory) => {
        if (!subcategory?.tasks) return subTasks;
        return [...subTasks, ...subcategory.tasks];
      }, []);
      
      return [...allTasks, ...categoryTasks];
    }, []);
  };

  const handleTaskClick = (task: CleaningTask) => {
    setSelectedTask(task);
    onSelect(task.task);
  };

  const handleApplyTask = () => {
    if (!selectedTask || !selectedSite || quantity <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please select a site and enter a valid quantity.",
        variant: "destructive",
      });
      return;
    }

    const productivity = calculateTaskProductivity(
      selectedTask.id,
      quantity,
      selectedTool,
      { timesPerWeek: frequency, timesPerMonth: frequency * 4.33 },
      quantity
    );

    // Update site with new task
    const updatedSites = sites.map(site => {
      if (site.id === selectedSite) {
        const newTask = {
          taskId: selectedTask.id,
          quantity,
          timeRequired: productivity?.timeRequired || 0,
          frequency: {
            timesPerWeek: frequency,
            timesPerMonth: frequency * 4.33
          },
          selectedTool
        };

        return {
          ...site,
          area: {
            ...site.area,
            selectedTasks: [...(site.area.selectedTasks || []), newTask],
            totalTime: (site.area.totalTime || 0) + (productivity?.timeRequired || 0)
          }
        };
      }
      return site;
    });

    setSites(updatedSites);
    localStorage.setItem('sites', JSON.stringify(updatedSites));

    toast({
      title: "Task Applied",
      description: `Task has been applied to ${sites.find(s => s.id === selectedSite)?.name}`,
    });

    // Reset form
    setQuantity(0);
    setFrequency(1);
    setSelectedSite('');
  };

  const coreCleaning = groups.find(g => g.name === 'Core Cleaning Tasks');
  const specializedCleaning = groups.find(g => g.name === 'Specialized Cleaning');
  const industrySpecific = groups.find(g => g.name === 'Industry-Specific Cleaning');

  const coreCleaningTasks = coreCleaning ? filterTasks(getGroupTasks(coreCleaning)) : [];
  const specializedCleaningTasks = specializedCleaning ? filterTasks(getGroupTasks(specializedCleaning)) : [];
  const industrySpecificTasks = industrySpecific ? filterTasks(getGroupTasks(industrySpecific)) : [];

  const renderTaskList = (tasks: CleaningTask[] = []) => {
    return tasks.map((task) => (
      <CommandItem
        key={task.id}
        value={task.task}
        onSelect={() => handleTaskClick(task)}
        className="cursor-pointer"
      >
        <Check
          className={cn(
            "mr-2 h-4 w-4",
            selectedValue === task.task ? "opacity-100" : "opacity-0"
          )}
        />
        {task.task}
      </CommandItem>
    ));
  };

  return (
    <div className="grid grid-cols-[1fr,300px] gap-4">
      <div className="space-y-4">
        {!searchQuery && !coreCleaningTasks.length && !specializedCleaningTasks.length && !industrySpecificTasks.length && (
          <div className="p-4 text-sm text-muted-foreground text-center">
            Select a category to view available tasks.
          </div>
        )}

        {searchQuery && !coreCleaningTasks.length && !specializedCleaningTasks.length && !industrySpecificTasks.length && (
          <div className="p-4 text-sm text-muted-foreground text-center">
            No tasks found matching your search.
          </div>
        )}

        <div className="space-y-4 p-2">
          {coreCleaningTasks.length > 0 && (
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm font-medium">Core Cleaning</CardTitle>
              </CardHeader>
              <CardContent>
                <CommandGroup>{renderTaskList(coreCleaningTasks)}</CommandGroup>
              </CardContent>
            </Card>
          )}

          {specializedCleaningTasks.length > 0 && (
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm font-medium">Specialized Cleaning</CardTitle>
              </CardHeader>
              <CardContent>
                <CommandGroup>{renderTaskList(specializedCleaningTasks)}</CommandGroup>
              </CardContent>
            </Card>
          )}

          {industrySpecificTasks.length > 0 && (
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm font-medium">Industry-Specific</CardTitle>
              </CardHeader>
              <CardContent>
                <CommandGroup>{renderTaskList(industrySpecificTasks)}</CommandGroup>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {selectedTask && (
        <Card className="h-fit sticky top-4">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Apply Task</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Selected Task</Label>
              <div className="text-sm font-medium">{selectedTask.task}</div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="site">Select Site</Label>
              <Select value={selectedSite} onValueChange={setSelectedSite}>
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

            <div className="space-y-2">
              <Label htmlFor="quantity">
                {selectedTask.unit === 'SQM/hour' ? 'Area (SQM)' : 'Quantity'}
              </Label>
              <Input
                id="quantity"
                type="number"
                value={quantity || ''}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="0"
              />
            </div>

            <ToolSelect
              taskId={selectedTask.id}
              currentTool={selectedTool}
              onToolChange={(_, tool) => setSelectedTool(tool)}
            />

            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency (times per week)</Label>
              <Select value={frequency.toString()} onValueChange={(value) => setFrequency(Number(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7].map((freq) => (
                    <SelectItem key={freq} value={freq.toString()}>
                      {freq}x per week
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleApplyTask} className="w-full">
              Apply to Site
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};