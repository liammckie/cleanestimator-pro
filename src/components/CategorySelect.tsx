import React, { useState } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { categoryGroups, industryGroups } from '@/utils/categoryGroups';

interface CategorySelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const CategorySelect: React.FC<CategorySelectProps> = ({ value, onValueChange }) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const renderCategories = (categories: Array<{ name: string; subcategories: string[] }> = []) => {
    if (!Array.isArray(categories)) return [];

    return categories.map((category) => {
      if (!category?.name || !Array.isArray(category?.subcategories)) return null;

      const filteredSubcategories = category.subcategories.filter(subcategory =>
        subcategory?.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (filteredSubcategories.length === 0) return null;

      return (
        <AccordionItem key={category.name} value={category.name}>
          <AccordionTrigger className="text-sm font-medium">
            {category.name}
          </AccordionTrigger>
          <AccordionContent>
            {filteredSubcategories.map((subcategory) => (
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
          </AccordionContent>
        </AccordionItem>
      );
    }).filter(Boolean);
  };

  const renderIndustryGroups = () => {
    if (!Array.isArray(industryGroups)) return [];

    return industryGroups.map(group => {
      if (!group?.name || !Array.isArray(group?.categories)) return null;

      const filteredCategories = group.categories.filter(category =>
        category?.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (filteredCategories.length === 0) return null;

      return (
        <AccordionItem key={group.name} value={group.name}>
          <AccordionTrigger className="font-semibold">
            {group.name}
          </AccordionTrigger>
          <AccordionContent>
            {filteredCategories.map((category) => (
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
          </AccordionContent>
        </AccordionItem>
      );
    }).filter(Boolean);
  };

  const hasResults = () => {
    if (!Array.isArray(categoryGroups) || !Array.isArray(industryGroups)) return false;

    const categoryResults = categoryGroups.some(group => 
      group?.categories?.some(category =>
        category?.subcategories?.some(subcategory =>
          subcategory?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    );

    const industryResults = industryGroups.some(group =>
      group?.categories?.some(category =>
        category?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    return categoryResults || industryResults;
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
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command>
          <CommandInput 
            placeholder="Search categories..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandGroup>
            <div className="max-h-[300px] overflow-y-auto">
              <Accordion type="single" collapsible className="w-full">
                {Array.isArray(categoryGroups) && categoryGroups.map(group => (
                  <AccordionItem key={group.name} value={group.name}>
                    <AccordionTrigger className="font-semibold">
                      {group.name}
                    </AccordionTrigger>
                    <AccordionContent>
                      <Accordion type="single" collapsible className="w-full">
                        {renderCategories(group.categories)}
                      </Accordion>
                    </AccordionContent>
                  </AccordionItem>
                ))}
                {renderIndustryGroups()}
              </Accordion>
            </div>
          </CommandGroup>
          {!hasResults() && (
            <div className="py-6 text-center text-sm">
              <CommandEmpty>No category found.</CommandEmpty>
            </div>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
};