import React from 'react';
import { Check } from "lucide-react";
import { CommandGroup, CommandItem } from "@/components/ui/command";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CategoryGroup, CleaningTask } from '@/data/types/categories';

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
        onSelect={() => onSelect(task.task)}
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

  if (!searchQuery && !coreCleaningTasks.length && !specializedCleaningTasks.length && !industrySpecificTasks.length) {
    return (
      <div className="p-4 text-sm text-muted-foreground text-center">
        Select a category to view available tasks.
      </div>
    );
  }

  if (searchQuery && !coreCleaningTasks.length && !specializedCleaningTasks.length && !industrySpecificTasks.length) {
    return (
      <div className="p-4 text-sm text-muted-foreground text-center">
        No tasks found matching your search.
      </div>
    );
  }

  return (
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
  );
};