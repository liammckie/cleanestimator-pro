
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TaskTemplate } from '../task/TaskTemplate';
import { TemplateManager } from '../task/TemplateManager';
import { getAllProductivityRates } from '@/data/productivityRates';
import { IndustryTemplatesPage } from './IndustryTemplatesPage';
import { Plus, Search, Clock } from 'lucide-react';
import { useTaskContext } from '../area/task/TaskContext';
import { useToast } from '@/hooks/use-toast';

export const TemplatesPage: React.FC = () => {
  const [templateType, setTemplateType] = useState<string>("general");
  const [selectedCategory, setSelectedCategory] = useState<string>("_all");
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTaskId, setSelectedTaskId] = useState<string>('');
  const { toast } = useToast();
  
  const allRates = getAllProductivityRates();
  const categories = [...new Set(allRates.map(rate => rate.category))].sort();
  
  const filteredRates = allRates.filter(rate => {
    if (selectedCategory && selectedCategory !== "_all" && rate.category !== selectedCategory) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        rate.task.toLowerCase().includes(query) ||
        rate.category.toLowerCase().includes(query) ||
        rate.tool.toLowerCase().includes(query)
      );
    }
    return true;
  });

  // Get task context for managing tasks
  const { handleTaskSelection, selectedTasks } = useTaskContext();

  // Function to handle adding a task
  const handleAddTask = (taskId: string) => {
    handleTaskSelection(taskId, true);
    setSelectedTaskId(taskId);
    toast({
      title: "Task Added",
      description: `Task has been added to your template.`
    });
  };

  // Function to handle removing a task
  const handleRemoveTask = (taskId: string) => {
    handleTaskSelection(taskId, false);
    if (selectedTaskId === taskId) {
      setSelectedTaskId('');
    }
    toast({
      title: "Task Removed",
      description: `Task has been removed from your template.`
    });
  };

  // Check if task is already selected
  const isTaskSelected = (taskId: string) => {
    return selectedTasks.some(task => task.taskId === taskId);
  };

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Task Templates</h1>
      
      <Tabs value={templateType} onValueChange={setTemplateType} className="mb-6">
        <TabsList className="bg-muted">
          <TabsTrigger value="general" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">General Templates</TabsTrigger>
          <TabsTrigger value="industry" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Industry-Specific Templates</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {templateType === "industry" ? (
        <IndustryTemplatesPage />
      ) : (
        <Tabs defaultValue="create" className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="create" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Create Template</TabsTrigger>
            <TabsTrigger value="saved" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Saved Templates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create" className="space-y-6">
            <Card className="bg-card text-card-foreground">
              <CardHeader>
                <CardTitle>Find a Task</CardTitle>
                <CardDescription>Select tasks to add to your template</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="task-category" className="flex items-center gap-2">Category</Label>
                    <Select
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger id="task-category" className="bg-background">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover">
                        <SelectItem value="_all">All Categories</SelectItem>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                      className="bg-background"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  {filteredRates.slice(0, 9).map(rate => {
                    const isSelected = isTaskSelected(rate.id);
                    return (
                      <Button
                        key={rate.id}
                        variant={selectedTaskId === rate.id ? "default" : "outline"}
                        className={`h-auto py-3 justify-between ${
                          selectedTaskId === rate.id 
                            ? 'bg-primary text-primary-foreground'
                            : isSelected 
                              ? 'bg-secondary/30 text-foreground hover:bg-secondary/50'
                              : 'bg-muted/50 text-foreground hover:bg-muted'
                        }`}
                        onClick={() => {
                          if (isSelected) {
                            handleRemoveTask(rate.id);
                          } else {
                            handleAddTask(rate.id);
                          }
                        }}
                      >
                        <div className="text-left">
                          <p className="font-medium">{rate.task}</p>
                          <p className="text-xs text-muted-foreground">{rate.category}</p>
                        </div>
                        {isSelected && (
                          <div className="ml-2 bg-primary/20 text-primary rounded-full p-1">
                            <Plus className="h-4 w-4" />
                          </div>
                        )}
                      </Button>
                    );
                  })}
                  
                  {filteredRates.length === 0 && (
                    <div className="col-span-3 text-center py-8 text-muted-foreground">
                      <p>No tasks found matching your criteria.</p>
                      <p className="text-sm mt-2">Try changing your search or category filter.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {selectedTaskId && (
              <TaskTemplate taskId={selectedTaskId} />
            )}
            
            {/* Selected Tasks Summary */}
            {selectedTasks.length > 0 && (
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    Selected Tasks
                    <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                      {selectedTasks.length} task(s)
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedTasks.map(task => (
                      <div key={task.taskId} className="flex justify-between items-center bg-background p-3 rounded-md">
                        <div>
                          <p className="font-medium">{task.name || task.taskId}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <Clock className="h-3 w-3" />
                            {task.timeRequired ? 
                              `${task.timeRequired.toFixed(2)} hours per task` : 
                              'Set quantity to calculate time'}
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleRemoveTask(task.taskId)}
                        >
                          <span className="sr-only">Remove task</span>
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Save as Template</Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="saved">
            <TemplateManager />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};
