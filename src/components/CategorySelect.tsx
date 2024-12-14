import React, { useState } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { categoryGroups } from '@/utils/categoryGroups';

interface CategorySelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const CategorySelect: React.FC<CategorySelectProps> = ({ value, onValueChange }) => {
  const [open, setOpen] = useState(false);

  // Flatten categories for searching
  const allCategories = categoryGroups.flatMap(group => 
    group.categories.map(category => ({
      group: group.name,
      category
    }))
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value || "Select a category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search categories..." />
          <CommandEmpty>No category found.</CommandEmpty>
          {categoryGroups.map((group) => (
            <CommandGroup key={group.name} heading={group.name}>
              {group.categories.map((category) => (
                <CommandItem
                  key={category}
                  value={category}
                  onSelect={() => {
                    onValueChange(category);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === category ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {category}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </Command>
      </PopoverContent>
    </Popover>
  );
};