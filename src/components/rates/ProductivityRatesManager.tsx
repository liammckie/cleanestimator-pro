
import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Search, Save, Plus, Edit } from "lucide-react";
import { useRates } from '@/contexts/RatesContext';
import { getAllRates } from '@/data/rates/ratesManager';
import { ProductivityRate } from '@/data/types/rates';

export const ProductivityRatesManager: React.FC = () => {
  const { productivityRates, setProductivityRate } = useRates();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [editMode, setEditMode] = useState<Record<string, boolean>>({});
  const [editValues, setEditValues] = useState<Record<string, number>>({});

  // Get all task data from the rates manager
  const allTasks = getAllRates();
  const categories = [...new Set(allTasks.map(task => task.category))];

  // Filter tasks based on search and category
  const filteredTasks = allTasks.filter(task => {
    if (selectedCategory && task.category !== selectedCategory) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return task.task.toLowerCase().includes(query) || 
             task.category.toLowerCase().includes(query) ||
             task.subcategory.toLowerCase().includes(query);
    }
    return true;
  });

  // Start editing a rate
  const startEdit = (taskId: string, currentRate: number) => {
    setEditMode(prev => ({ ...prev, [taskId]: true }));
    setEditValues(prev => ({ ...prev, [taskId]: currentRate }));
  };

  // Save edited rate
  const saveRate = (taskId: string) => {
    const newRate = editValues[taskId];
    if (newRate !== undefined) {
      setProductivityRate(taskId, newRate);
      setEditMode(prev => ({ ...prev, [taskId]: false }));
    }
  };

  // Get the current rate for a task
  const getCurrentRate = (taskId: string): number => {
    const existingRate = productivityRates.find(r => 
      r.taskId === taskId && r.isActive
    );
    
    if (existingRate) return existingRate.value;
    
    // If no rate is defined, use the default from allTasks
    const taskInfo = allTasks.find(t => t.id === taskId);
    return taskInfo?.ratePerHour || 0;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full sm:w-[200px]">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableCaption>Productivity rates for cleaning tasks</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Task</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Subcategory</TableHead>
              <TableHead className="text-right">Rate (Units/Hour)</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.slice(0, 20).map(task => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.task}</TableCell>
                <TableCell>{task.category}</TableCell>
                <TableCell>{task.subcategory}</TableCell>
                <TableCell className="text-right">
                  {editMode[task.id] ? (
                    <Input
                      type="number"
                      value={editValues[task.id]}
                      onChange={(e) => setEditValues(prev => ({
                        ...prev,
                        [task.id]: parseFloat(e.target.value)
                      }))}
                      className="w-24 ml-auto"
                    />
                  ) : (
                    getCurrentRate(task.id)
                  )}
                </TableCell>
                <TableCell>
                  {editMode[task.id] ? (
                    <Button size="sm" onClick={() => saveRate(task.id)}>
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                  ) : (
                    <Button size="sm" variant="ghost" onClick={() => 
                      startEdit(task.id, getCurrentRate(task.id))
                    }>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {filteredTasks.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                  No tasks found matching your search criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
