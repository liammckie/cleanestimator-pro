
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { industryGroups } from '@/utils/categoryGroups';
import { industrySpecific } from '@/data/tasks/categories/industrySpecific';
import { IndustryList } from '@/components/IndustryList';
import { TaskTemplate } from '../task/TaskTemplate';
import { TemplateManager } from '../task/TemplateManager';
import { Building, Search, Plus, Repeat, Ruler } from 'lucide-react';
import { PeriodicalTaskInput } from './PeriodicalTaskInput';
import { useToast } from '@/hooks/use-toast';
import { TaskFrequencySelect } from '../task/TaskFrequencySelect';

export const IndustryTemplatesPage: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTaskId, setSelectedTaskId] = useState<string>('');
  const [periodicalTasks, setPeriodicalTasks] = useState<Array<{id: string, name: string, frequency: string}>>([]);
  const [unitOfMeasurement, setUnitOfMeasurement] = useState<string>('sqm');
  const [templateName, setTemplateName] = useState<string>('');
  const [frequency, setFrequency] = useState<string>('1');
  const { toast } = useToast();
  
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

  const handleAddPeriodicalTask = () => {
    if (!templateName.trim()) {
      toast({
        title: "Error",
        description: "Please provide a task name",
        variant: "destructive"
      });
      return;
    }

    const newTask = {
      id: `periodical-${Date.now()}`,
      name: templateName,
      frequency: frequency
    };

    setPeriodicalTasks([...periodicalTasks, newTask]);
    setTemplateName('');
    setFrequency('1');

    toast({
      title: "Task Added",
      description: `${templateName} has been added as a periodical task`
    });
  };

  const handleRemovePeriodicalTask = (id: string) => {
    setPeriodicalTasks(periodicalTasks.filter(task => task.id !== id));
  };

  const handleSaveTemplate = () => {
    if (!selectedIndustry) {
      toast({
        title: "Error",
        description: "Please select an industry first",
        variant: "destructive"
      });
      return;
    }

    // Here you would save the template including periodical tasks and unit of measurement
    toast({
      title: "Template Saved",
      description: `Industry template for ${selectedIndustry} has been saved`,
    });
  };

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
                  <Label htmlFor="measurement-unit" className="flex items-center gap-2">
                    <Ruler className="h-4 w-4" />
                    Unit of Measurement
                  </Label>
                  <Select
                    value={unitOfMeasurement}
                    onValueChange={setUnitOfMeasurement}
                  >
                    <SelectTrigger id="measurement-unit" className="bg-background mt-1.5">
                      <SelectValue placeholder="Select Unit" />
                    </SelectTrigger>
                    <SelectContent className="bg-background">
                      <SelectItem value="sqm">Square Meters (sqm)</SelectItem>
                      <SelectItem value="units">Units/Count</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedIndustry && (
                <>
                  <div className="pt-4 border-t">
                    <h3 className="text-md font-medium mb-3">Periodical Tasks</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <div className="col-span-1 md:col-span-1">
                          <Label htmlFor="task-name" className="flex items-center gap-2">
                            <Repeat className="h-4 w-4" />
                            Task Name
                          </Label>
                          <Input
                            id="task-name"
                            value={templateName}
                            onChange={(e) => setTemplateName(e.target.value)}
                            placeholder="Enter task name"
                            className="mt-1.5"
                          />
                        </div>
                        
                        <div className="col-span-1 md:col-span-1">
                          <TaskFrequencySelect
                            value={frequency}
                            onValueChange={setFrequency}
                          />
                        </div>
                        
                        <div className="col-span-1 md:col-span-1">
                          <Button 
                            onClick={handleAddPeriodicalTask}
                            className="w-full"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Task
                          </Button>
                        </div>
                      </div>
                      
                      {periodicalTasks.length > 0 && (
                        <div className="bg-muted/50 rounded-md p-4 space-y-2">
                          <h4 className="text-sm font-medium">Added Tasks:</h4>
                          <div className="space-y-2">
                            {periodicalTasks.map(task => (
                              <PeriodicalTaskInput
                                key={task.id}
                                task={task}
                                onRemove={handleRemovePeriodicalTask}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Label htmlFor="task-search" className="flex items-center gap-2 mb-2">
                      <Search className="h-4 w-4" />
                      Search Industry-Specific Tasks
                    </Label>
                    <Input
                      id="task-search"
                      placeholder="Search tasks..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

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
                </>
              )}
              
              {!selectedIndustry && (
                <div className="mt-6 bg-muted p-4 rounded-md">
                  <p className="text-center text-muted-foreground">
                    Select an industry to view specialized cleaning task templates
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSaveTemplate} disabled={!selectedIndustry}>
                Save Industry Template
              </Button>
            </CardFooter>
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
