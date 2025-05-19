
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { industryGroups } from '@/utils/categoryGroups';
import { industrySpecific } from '@/data/tasks/categories/industrySpecific';
import { IndustryList } from '@/components/IndustryList';
import { TaskTemplate } from '../task/TaskTemplate';
import { TemplateManager } from '../task/TemplateManager';
import { Building, Search } from 'lucide-react';

export const IndustryTemplatesPage: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTaskId, setSelectedTaskId] = useState<string>('');
  
  // Find tasks that match the selected industry
  const getIndustryTasks = () => {
    if (!selectedIndustry) return [];
    
    // Find tasks that match the industry and then map to a format compatible with our TaskTemplate component
    return industrySpecific.categories.flatMap(category => 
      category.subcategories.flatMap(subcategory => 
        subcategory.tasks.filter(task => 
          task.task.includes(selectedIndustry) || 
          task.notes?.toLowerCase().includes(selectedIndustry.toLowerCase())
        )
      )
    );
  };
  
  const industryTasks = getIndustryTasks();
  
  // Filter tasks by search query if provided
  const filteredTasks = searchQuery 
    ? industryTasks.filter(task => 
        task.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.notes?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : industryTasks;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Industry Task Templates</h1>
      
      <Tabs defaultValue="create" className="space-y-6">
        <TabsList>
          <TabsTrigger value="create">Create Industry Template</TabsTrigger>
          <TabsTrigger value="saved">Saved Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Industry Type</CardTitle>
              <CardDescription>Choose an industry to view specialized cleaning tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="industry-type" className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Industry
                  </Label>
                  <div className="relative mt-1.5">
                    <Select
                      value={selectedIndustry}
                      onValueChange={setSelectedIndustry}
                    >
                      <SelectTrigger id="industry-type" className="bg-background">
                        <SelectValue placeholder="Select Industry" />
                      </SelectTrigger>
                      <SelectContent className="bg-background">
                        {industryGroups.map(group => (
                          <SelectItem key={group.name} value={group.name}>
                            {group.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="task-search" className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    Search
                  </Label>
                  <Input
                    id="task-search"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mt-1.5"
                  />
                </div>
              </div>
              
              {selectedIndustry && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Available Specialized Tasks</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {filteredTasks.length > 0 ? (
                      filteredTasks.map(task => (
                        <Button
                          key={task.id}
                          variant={selectedTaskId === task.id ? "default" : "outline"}
                          className="h-auto py-3 justify-start text-left"
                          onClick={() => setSelectedTaskId(task.id)}
                        >
                          <div>
                            <p className="font-medium">{task.task}</p>
                            <p className="text-xs text-muted-foreground">
                              {task.unit} - {task.ratePerHour} per hour
                            </p>
                          </div>
                        </Button>
                      ))
                    ) : (
                      <p className="text-muted-foreground col-span-3 text-center py-4">
                        No specialized tasks found for this industry. Try another industry or search term.
                      </p>
                    )}
                  </div>
                </div>
              )}
              
              {!selectedIndustry && (
                <div className="mt-6 bg-muted p-4 rounded-md">
                  <p className="text-center text-muted-foreground">
                    Select an industry to view specialized cleaning task templates
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {selectedTaskId && (
            <TaskTemplate taskId={selectedTaskId} />
          )}
        </TabsContent>
        
        <TabsContent value="saved">
          <TemplateManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};
