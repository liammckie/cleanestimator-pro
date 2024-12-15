import React from 'react';
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TaskGroup } from '@/data/types/productivity';

interface CategorySelectProps {
  value: string;
  onValueChange: (value: string) => void;
  defaultTab?: string;
  groups?: TaskGroup[];
}

export const CategorySelect = ({
  value = '',
  onValueChange,
  defaultTab = 'categories',
  groups = []
}: CategorySelectProps) => {
  const [open, setOpen] = React.useState(false);

  // Ensure we have valid groups and categories
  const validGroups = React.useMemo(() => {
    if (!Array.isArray(groups)) return [];
    return groups.filter(group => 
      group && 
      typeof group === 'object' && 
      Array.isArray(group.categories) &&
      group.categories.length > 0
    );
  }, [groups]);

  // Create a flat list of all categories from all groups
  const categories = React.useMemo(() => {
    const result: Array<{ value: string; label: string; group: string }> = [];
    
    validGroups.forEach(group => {
      if (!group?.categories) return;
      
      group.categories.forEach(category => {
        if (category && category.name) {
          result.push({
            value: category.name.toLowerCase(),
            label: category.name,
            group: group.name
          });
        }
      });
    });
    
    return result;
  }, [validGroups]);

  // Ensure we have a valid value
  const displayValue = React.useMemo(() => {
    if (!value) return '';
    const category = categories.find(cat => cat.value === value.toLowerCase());
    return category?.label || '';
  }, [categories, value]);

  if (!validGroups.length) {
    return (
      <Button
        variant="outline"
        className="w-full justify-between"
        disabled
      >
        No categories available
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {displayValue || "Select category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search categories..." />
          <CommandEmpty>No category found.</CommandEmpty>
          {validGroups.map((group) => {
            if (!group?.categories?.length) return null;
            
            const validCategories = group.categories.filter(category => 
              category && typeof category === 'object' && category.name
            );

            if (!validCategories.length) return null;

            return (
              <CommandGroup key={group.id} heading={group.name}>
                {validCategories.map((category) => (
                  <CommandItem
                    key={category.id}
                    value={category.name.toLowerCase()}
                    onSelect={(currentValue) => {
                      onValueChange(currentValue === value ? '' : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === category.name.toLowerCase() ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {category.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })}
        </Command>
      </PopoverContent>
    </Popover>
  );
};