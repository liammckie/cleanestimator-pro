import React, { useState } from 'react';
import { Command, CommandInput } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { CategoryList } from './CategoryList';
import { TaskGroup } from '@/data/types/productivity';

interface CategorySelectProps {
  value: string;
  onValueChange: (value: string) => void;
  defaultTab?: string;
  groups?: TaskGroup[];
}

export const CategorySelect: React.FC<CategorySelectProps> = ({
  value,
  onValueChange,
  defaultTab = 'categories',
  groups = []
}) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Transform TaskGroup[] to CategoryGroup[] format
  const transformedGroups = groups.map(group => ({
    name: group.name,
    categories: group.categories.map(category => ({
      name: category.name,
      subcategories: category.subcategories.map(sub => 
        sub.tasks.map(task => task.task)
      ).flat()
    }))
  }));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value || "Select task..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Search tasks..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CategoryList
            groups={transformedGroups}
            selectedValue={value}
            searchQuery={searchQuery}
            onSelect={(category) => {
              onValueChange(category);
              setOpen(false);
            }}
          />
        </Command>
      </PopoverContent>
    </Popover>
  );
};