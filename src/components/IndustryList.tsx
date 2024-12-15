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
  // Ensure groups is an array and handle undefined/null case
  const safeGroups = Array.isArray(groups) ? groups : [];

  // Filter valid groups
  const filteredGroups = safeGroups.filter(group => 
    group && 
    typeof group === 'object' &&
    group.name &&
    Array.isArray(group.categories)
  );

  if (filteredGroups.length === 0) {
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
        const filteredCategories = categories.filter(category =>
          category && 
          typeof category === 'string' &&
          category.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (filteredCategories.length === 0) return null;

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
                {filteredCategories.map((category) => (
                  <CommandItem
                    key={category}
                    value={category}
                    onSelect={() => onSelect(category)}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedValue === category ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {category}
                  </CommandItem>
                ))}
              </CommandGroup>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};