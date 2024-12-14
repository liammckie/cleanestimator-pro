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
  if (!Array.isArray(groups)) return null;

  return (
    <Accordion type="single" collapsible className="w-full">
      {groups
        .filter(group => group && typeof group === 'object')
        .map(group => {
          if (!group?.name || !Array.isArray(group?.categories)) return null;

          const filteredCategories = group.categories.filter(category =>
            category && typeof category === 'string' &&
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
        })
        .filter(Boolean)}
    </Accordion>
  );
};