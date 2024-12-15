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
  value,
  onValueChange,
  defaultTab = 'categories',
  groups = []
}: CategorySelectProps) => {
  const [open, setOpen] = React.useState(false);

  // Ensure we have valid groups to work with
  const validGroups = Array.isArray(groups) ? groups : [];

  // Create a flat list of all categories from all groups, with null checks
  const categories = validGroups.reduce((acc, group) => {
    if (!group?.categories) return acc;
    
    const groupCategories = group.categories
      .filter(category => category && category.name) // Filter out invalid categories
      .map(category => ({
        value: category.name.toLowerCase(),
        label: category.name,
        group: group.name
      }));
    
    return [...acc, ...groupCategories];
  }, [] as Array<{ value: string; label: string; group: string }>);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? categories.find((category) => category.value === value.toLowerCase())?.label
            : "Select category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search categories..." />
          <CommandEmpty>No category found.</CommandEmpty>
          {validGroups.map((group) => {
            if (!group?.categories?.length) return null;
            
            return (
              <CommandGroup key={group.id} heading={group.name}>
                {group.categories
                  .filter(category => category && category.name)
                  .map((category) => (
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