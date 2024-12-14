import React, { useState } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Building } from "lucide-react";
import { cn } from "@/lib/utils";
import { categoryGroups, industryGroups } from '@/utils/categoryGroups';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CategorySelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const CategorySelect: React.FC<CategorySelectProps> = ({ value, onValueChange }) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  // Ensure we have arrays even if the imports are undefined
  const safeGeneralGroups = categoryGroups || [];
  const safeIndustryGroups = industryGroups || [];

  const renderGeneralGroups = () => {
    if (!Array.isArray(safeGeneralGroups)) return null;

    return safeGeneralGroups.map((group) => {
      if (!group?.categories?.length) return null;
      
      return group.categories.map((category) => {
        if (!category?.subcategories?.length) return null;
        
        return (
          <CommandGroup key={category.name} heading={category.name}>
            {category.subcategories.map((subcategory) => (
              <CommandItem
                key={subcategory}
                value={subcategory}
                onSelect={() => {
                  onValueChange(subcategory);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === subcategory ? "opacity-100" : "opacity-0"
                  )}
                />
                {subcategory}
              </CommandItem>
            ))}
          </CommandGroup>
        );
      });
    });
  };

  const renderIndustryGroups = () => {
    if (!Array.isArray(safeIndustryGroups)) return null;

    return safeIndustryGroups.map((group) => {
      if (!group?.categories?.length) return null;
      
      return (
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
      );
    });
  };

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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="industry">
              <Building className="mr-2 h-4 w-4" />
              Industry Specific
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Command>
              <CommandInput placeholder="Search categories..." />
              <CommandEmpty>No category found.</CommandEmpty>
              {renderGeneralGroups()}
            </Command>
          </TabsContent>

          <TabsContent value="industry">
            <Command>
              <CommandInput placeholder="Search industry categories..." />
              <CommandEmpty>No category found.</CommandEmpty>
              {renderIndustryGroups()}
            </Command>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};