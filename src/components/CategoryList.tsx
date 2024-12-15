import React from 'react';
import { Check } from "lucide-react";
import { CommandGroup, CommandItem } from "@/components/ui/command";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CategoryGroup {
  name: string;
  categories: {
    name: string;
    subcategories: string[];
  }[];
}

interface CategoryListProps {
  groups: CategoryGroup[];
  selectedValue: string;
  searchQuery: string;
  onSelect: (value: string) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  groups,
  selectedValue,
  searchQuery,
  onSelect,
}) => {
  const safeGroups = Array.isArray(groups) ? groups : [];

  const filterTasks = (tasks: string[]) => {
    if (!Array.isArray(tasks)) return [];
    return tasks.filter(task => 
      task.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const getCategoryTasks = (categoryName: string): string[] => {
    const group = safeGroups.find(g => g.name === categoryName);
    if (!group?.categories) return [];
    
    return group.categories.reduce((acc: string[], category) => {
      if (!category?.subcategories) return acc;
      return [...acc, ...category.subcategories];
    }, []);
  };

  const coreCleaningTasks = filterTasks(getCategoryTasks('Core Cleaning'));
  const specializedCleaningTasks = filterTasks(getCategoryTasks('Specialized Cleaning'));
  const industrySpecificTasks = filterTasks(getCategoryTasks('Industry-Specific'));

  const renderTaskList = (tasks: string[]) => {
    if (!Array.isArray(tasks)) return null;
    return tasks.map((task) => (
      <CommandItem
        key={task}
        value={task}
        onSelect={() => onSelect(task)}
        className="cursor-pointer"
      >
        <Check
          className={cn(
            "mr-2 h-4 w-4",
            selectedValue === task ? "opacity-100" : "opacity-0"
          )}
        />
        {task}
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