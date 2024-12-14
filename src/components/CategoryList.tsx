import React from 'react';
import { Check } from "lucide-react";
import { CommandGroup, CommandItem } from "@/components/ui/command";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { CategoryGroup } from '@/utils/categoryGroups';

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
  const renderCategories = (categories: Array<{ name: string; subcategories: string[] }> = []) => {
    if (!Array.isArray(categories)) return null;

    return categories
      .filter(category => category && typeof category === 'object')
      .map((category) => {
        if (!category?.name || !Array.isArray(category?.subcategories)) return null;

        const filteredSubcategories = category.subcategories.filter(subcategory => 
          subcategory && typeof subcategory === 'string' &&
          subcategory.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (filteredSubcategories.length === 0) return null;

        return (
          <AccordionItem key={category.name} value={category.name}>
            <AccordionTrigger className="text-sm font-medium">
              {category.name}
            </AccordionTrigger>
            <AccordionContent>
              <CommandGroup>
                {filteredSubcategories.map((subcategory) => (
                  <CommandItem
                    key={subcategory}
                    value={subcategory}
                    onSelect={() => onSelect(subcategory)}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedValue === subcategory ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {subcategory}
                  </CommandItem>
                ))}
              </CommandGroup>
            </AccordionContent>
          </AccordionItem>
        );
      })
      .filter(Boolean);
  };

  if (!Array.isArray(groups)) return null;

  return (
    <Accordion type="single" collapsible className="w-full">
      {groups.map(group => (
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
    </Accordion>
  );
};