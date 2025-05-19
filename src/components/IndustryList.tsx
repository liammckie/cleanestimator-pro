
import React from 'react';
import { Check, Building } from "lucide-react";
import { CommandGroup, CommandItem } from "@/components/ui/command";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { IndustryGroup } from '@/utils/categoryGroups';

interface IndustryListProps {
  groups: IndustryGroup[];
  selectedValue: string;
  searchQuery: string;
  onSelect: (value: string) => void;
}

export const IndustryList: React.FC<IndustryListProps> = ({
  groups,
  selectedValue,
  searchQuery,
  onSelect,
}) => {
  console.log('INDUSTRY_SELECT Rendering IndustryList with:', {
    groupsCount: groups?.length,
    selectedValue,
    searchQuery
  });

  // Ensure groups is an array and handle undefined/null case
  const safeGroups = Array.isArray(groups) ? groups : [];

  // Filter valid groups and log the process
  const filteredGroups = safeGroups.filter(group => {
    const isValid = group && 
      typeof group === 'object' &&
      group.name &&
      Array.isArray(group.categories);
    
    console.log('INDUSTRY_SELECT Validating group:', {
      groupName: group?.name,
      isValid,
      categoriesCount: group?.categories?.length
    });
    
    return isValid;
  });

  if (filteredGroups.length === 0) {
    console.log('INDUSTRY_SELECT No valid industries found');
    return (
      <div className="p-4 text-sm text-muted-foreground text-center">
        No industries available.
      </div>
    );
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {filteredGroups.map(group => {
        // Ensure categories is an array and filter by search query
        const categories = Array.isArray(group.categories) ? group.categories : [];
        const filteredCategories = categories.filter(category => {
          const isValid = category && 
            typeof category === 'string' &&
            category.toLowerCase().includes(searchQuery.toLowerCase());
          
          console.log('INDUSTRY_SELECT Filtering category:', {
            category,
            matches: isValid,
            searchQuery
          });
          
          return isValid;
        });

        if (filteredCategories.length === 0) {
          console.log('INDUSTRY_SELECT No matching categories for group:', group.name);
          return null;
        }

        console.log('INDUSTRY_SELECT Rendering group:', {
          groupName: group.name,
          matchingCategories: filteredCategories.length
        });

        return (
          <AccordionItem key={group.name} value={group.name}>
            <AccordionTrigger className="font-semibold">
              <span className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                {group.name}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <CommandGroup>
                {filteredCategories.map((category) => {
                  // Skip empty category values
                  if (!category) return null;
                  
                  const isSelected = selectedValue === category;
                  console.log('INDUSTRY_SELECT Rendering category:', {
                    category,
                    isSelected
                  });

                  return (
                    <CommandItem
                      key={category}
                      value={category}
                      onSelect={() => {
                        console.log('INDUSTRY_SELECT Category selected:', category);
                        onSelect(category);
                      }}
                      className="cursor-pointer"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {category}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
