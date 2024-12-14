import React, { useState } from 'react';
import { Command, CommandEmpty, CommandInput } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categoryGroups, industryGroups } from '@/utils/categoryGroups';
import { CategoryList } from './CategoryList';
import { IndustryList } from './IndustryList';

interface CategorySelectProps {
  value: string;
  onValueChange: (value: string) => void;
  defaultTab?: 'categories' | 'industries';
}

export const CategorySelect: React.FC<CategorySelectProps> = ({ 
  value, 
  onValueChange,
  defaultTab = 'categories'
}) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'categories' | 'industries'>(defaultTab);

  const handleSelect = (selectedValue: string) => {
    onValueChange(selectedValue);
    setOpen(false);
  };

  const renderContent = () => {
    if (!searchQuery) {
      return (
        <CommandEmpty className="py-6 text-center text-sm">
          Start typing to search...
        </CommandEmpty>
      );
    }

    return (
      <div className="border-t pt-2">
        <Tabs value={activeTab} onValueChange={(value: 'categories' | 'industries') => setActiveTab(value)}>
          <TabsList className="w-full">
            <TabsTrigger value="categories" className="flex-1">Categories</TabsTrigger>
            <TabsTrigger value="industries" className="flex-1">Industries</TabsTrigger>
          </TabsList>
          <div className="mt-2 max-h-[300px] overflow-y-auto">
            <TabsContent value="categories">
              <CategoryList
                groups={categoryGroups}
                selectedValue={value}
                searchQuery={searchQuery}
                onSelect={handleSelect}
              />
            </TabsContent>
            <TabsContent value="industries">
              <IndustryList
                groups={industryGroups}
                selectedValue={value}
                searchQuery={searchQuery}
                onSelect={handleSelect}
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    );
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
          {value || "Select..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command>
          <CommandInput 
            placeholder="Search..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          {renderContent()}
        </Command>
      </PopoverContent>
    </Popover>
  );
};