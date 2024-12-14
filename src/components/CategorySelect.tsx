import React, { useState } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Building } from "lucide-react";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categoryGroups, industryGroups } from '@/utils/categoryGroups';

interface CategorySelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const CategorySelect: React.FC<CategorySelectProps> = ({ value, onValueChange }) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'categories' | 'industries'>('categories');

  const renderCategories = (categories: Array<{ name: string; subcategories: string[] }> = []) => {
    if (!Array.isArray(categories)) return [];

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
            </AccordionContent>
          </AccordionItem>
        );
      })
      .filter(Boolean);
  };

  const renderIndustries = () => {
    if (!Array.isArray(industryGroups)) return [];

    return industryGroups
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
            </AccordionContent>
          </AccordionItem>
        );
      })
      .filter(Boolean);
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
          <div className="border-t pt-2">
            <Tabs value={activeTab} onValueChange={(value: 'categories' | 'industries') => setActiveTab(value)}>
              <TabsList className="w-full">
                <TabsTrigger value="categories" className="flex-1">Categories</TabsTrigger>
                <TabsTrigger value="industries" className="flex-1">Industries</TabsTrigger>
              </TabsList>
              <div className="mt-2 max-h-[300px] overflow-y-auto">
                <TabsContent value="categories">
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
                  </Accordion>
                </TabsContent>
                <TabsContent value="industries">
                  <Accordion type="single" collapsible className="w-full">
                    {renderIndustries()}
                  </Accordion>
                </TabsContent>
              </div>
            </Tabs>
          </div>
          {!searchQuery && (
            <CommandEmpty className="py-6 text-center text-sm">
              Start typing to search...
            </CommandEmpty>
          )}
          {searchQuery && !value && (
            <CommandEmpty className="py-6 text-center text-sm">
              No results found.
            </CommandEmpty>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
};