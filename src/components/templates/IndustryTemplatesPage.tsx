
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Search, Plus, Repeat, Ruler, Save, Clock } from 'lucide-react';
import { PeriodicalTaskInput } from './PeriodicalTaskInput';
import { useToast } from '@/hooks/use-toast';
import { TaskFrequencySelect } from '../task/TaskFrequencySelect';
import { 
  getIndustryTypes, 
  getIndustryTemplate, 
  industryProductivityRates 
} from '@/data/industryProductivityRates';
import { v4 as uuidv4 } from 'uuid';
import { IndustryTemplateDashboard } from './IndustryTemplateDashboard';
import { calculateTaskTimes, calculateTotalTime } from '@/utils/industryCalculations';
import { TemplateTask, IndustryArea, SavedIndustryTemplate } from '@/data/types/industryRates';

export const IndustryTemplatesPage: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [templateName, setTemplateName] = useState<string>('');
  const [tasks, setTasks] = useState<TemplateTask[]>([]);
  const [frequency, setFrequency] = useState<string>('1');
  const [customTaskName, setCustomTaskName] = useState<string>('');
  const [unitOfMeasurement, setUnitOfMeasurement] = useState<'sqm' | 'units'>('sqm');
  const [industryAreas, setIndustryAreas] = useState<IndustryArea[]>([]);
  const [activeTab, setActiveTab] = useState<string>('create');
  const [savedTemplates, setSavedTemplates] = useState<SavedIndustryTemplate[]>([]);
  
  const { toast } = useToast();
  
  // Get available industry types
  const industryTypes = getIndustryTypes();
  
  // When industry changes, update available areas
  useEffect(() => {
    if (selectedIndustry) {
      const template = getIndustryTemplate(selectedIndustry);
      setIndustryAreas(template.areas);
      
      // Reset measurements when industry changes
      setTasks([]);
    } else {
      setIndustryAreas([]);
    }
  }, [selectedIndustry]);

  // Load saved templates
  useEffect(() => {
    try {
      const saved = localStorage.getItem('industry-templates');
      if (saved) {
        const parsedTemplates = JSON.parse(saved) as SavedIndustryTemplate[];
        setSavedTemplates(parsedTemplates);
      }
    } catch (error) {
      console.error('Error loading saved templates:', error);
    }
  }, []);
  
  // Calculate times whenever tasks or measurements change
  useEffect(() => {
    if (tasks.length > 0) {
      const updatedTasks = calculateTaskTimes(tasks);
      setTasks(updatedTasks);
    }
  }, [tasks.length]);
  
  // Filter areas by search query if provided
  const filteredAreas = searchQuery 
    ? industryAreas.filter(area => 
        area.areaName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : industryAreas;

  const handleAddCustomTask = () => {
    if (!customTaskName.trim()) {
      toast({
        title: "Error",
        description: "Please provide a task name",
        variant: "destructive"
      });
      return;
    }

    const newTask: TemplateTask = {
      id: `custom-${uuidv4()}`,
      name: customTaskName,
      frequency: frequency,
      isArea: false,
      unitType: unitOfMeasurement,
      measurement: 0,
      timeRequired: 0
    };

    setTasks(prev => {
      const updated = [...prev, newTask];
      return calculateTaskTimes(updated);
    });
    
    setCustomTaskName('');
    setFrequency('1');

    toast({
      title: "Task Added",
      description: `${customTaskName} has been added as a custom task`
    });
  };

  const handleAddAreaToTemplate = (area: IndustryArea) => {
    // Add this area as a task
    const newTask: TemplateTask = {
      id: `area-${uuidv4()}`,
      name: area.areaName,
      frequency: '1',
      isArea: true,
      areaType: area.areaName,
      floorType: 'soft',
      unitType: area.toiletFixtures ? 'units' : 'sqm',
      measurement: area.toiletFixtures ? 1 : 0, // Default to 1 unit for toilets
      timeRequired: 0,
      productivityRate: {
        softFloor: area.prodRateSoftFloor,
        hardFloor: area.prodRateHardFloor,
        toiletFixtures: area.toiletFixtures
      }
    };

    setTasks(prev => {
      const updated = [...prev, newTask];
      return calculateTaskTimes(updated);
    });
    
    toast({
      title: "Area Added",
      description: `${area.areaName} has been added to the template`
    });
  };

  const handleUpdateMeasurement = (id: string, value: number) => {
    setTasks(prev => {
      const updated = prev.map(task => 
        task.id === id ? { ...task, measurement: value } : task
      );
      return calculateTaskTimes(updated);
    });
  };

  const handleUpdateFloorType = (id: string, floorType: 'soft' | 'hard') => {
    setTasks(prev => {
      const updated = prev.map(task => 
        task.id === id ? { ...task, floorType } : task
      );
      return calculateTaskTimes(updated);
    });
  };

  const handleRemoveTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
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

    if (tasks.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one task to the template",
        variant: "destructive"
      });
      return;
    }

    if (!templateName.trim()) {
      toast({
        title: "Error",
        description: "Please provide a name for this template",
        variant: "destructive"
      });
      return;
    }

    // Save the template
    const totalTime = calculateTotalTime(tasks);
    
    const templateData: SavedIndustryTemplate = {
      id: uuidv4(),
      name: templateName,
      industry: selectedIndustry,
      tasks: tasks,
      totalTime: totalTime,
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    const savedTemplates = JSON.parse(localStorage.getItem('industry-templates') || '[]');
    savedTemplates.push(templateData);
    localStorage.setItem('industry-templates', JSON.stringify(savedTemplates));
    
    // Update state
    setSavedTemplates(savedTemplates);
    
    toast({
      title: "Template Saved",
      description: `Industry template "${templateName}" has been saved`,
    });

    // Switch to saved tab
    setActiveTab('saved');
  };

  const handleLoadTemplate = (template: SavedIndustryTemplate) => {
    setSelectedIndustry(template.industry);
    setTemplateName(template.name);
    setTasks(template.tasks);
    setActiveTab('create');
    
    toast({
      title: "Template Loaded",
      description: `Industry template "${template.name}" has been loaded`,
    });
  };

  const handleDeleteTemplate = (id: string) => {
    const updatedTemplates = savedTemplates.filter(t => t.id !== id);
    setSavedTemplates(updatedTemplates);
    localStorage.setItem('industry-templates', JSON.stringify(updatedTemplates));
    
    toast({
      title: "Template Deleted",
      description: "The template has been deleted",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="create">Create Template</TabsTrigger>
          <TabsTrigger value="saved">Saved Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="create" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Create Industry Template</CardTitle>
                  <CardDescription>
                    Select an industry to create a specialized cleaning template
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="col-span-1">
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
                            {industryTypes.map(industry => (
                              <SelectItem key={industry} value={industry}>
                                {industry}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="col-span-1">
                      <Label htmlFor="measurement-unit" className="flex items-center gap-2">
                        <Ruler className="h-4 w-4" />
                        Unit of Measurement
                      </Label>
                      <Select
                        value={unitOfMeasurement}
                        onValueChange={(val) => setUnitOfMeasurement(val as 'sqm' | 'units')}
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
                    
                    <div className="col-span-1">
                      <Label htmlFor="template-name" className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Template Name
                      </Label>
                      <Input 
                        id="template-name"
                        value={templateName}
                        onChange={(e) => setTemplateName(e.target.value)}
                        placeholder="Enter template name"
                        className="mt-1.5"
                      />
                    </div>
                  </div>

                  {selectedIndustry && (
                    <>
                      <div className="pt-4 border-t">
                        <h3 className="text-md font-medium mb-3">Custom Tasks</h3>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                            <div className="col-span-1 md:col-span-1">
                              <Label htmlFor="task-name" className="flex items-center gap-2">
                                <Repeat className="h-4 w-4" />
                                Task Name
                              </Label>
                              <Input
                                id="task-name"
                                value={customTaskName}
                                onChange={(e) => setCustomTaskName(e.target.value)}
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
                                onClick={handleAddCustomTask}
                                className="w-full"
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Task
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <Label htmlFor="task-search" className="flex items-center gap-2 mb-2">
                          <Search className="h-4 w-4" />
                          Search Industry Areas
                        </Label>
                        <Input
                          id="task-search"
                          placeholder="Search areas..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>

                      <div className="mt-4">
                        <h3 className="text-sm font-medium mb-2">Available Industry Areas</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {filteredAreas.length > 0 ? (
                            filteredAreas.map((area, index) => (
                              <Button
                                key={`${area.areaName}-${index}`}
                                variant="outline"
                                className="h-auto py-3 justify-start text-left flex flex-col items-start"
                                onClick={() => handleAddAreaToTemplate(area)}
                              >
                                <div className="space-y-1 w-full">
                                  <p className="font-medium">{area.areaName}</p>
                                  {area.prodRateSoftFloor > 0 && (
                                    <p className="text-xs text-muted-foreground">
                                      Soft floor: {area.prodRateSoftFloor} SQM/hr
                                    </p>
                                  )}
                                  {area.prodRateHardFloor > 0 && (
                                    <p className="text-xs text-muted-foreground">
                                      Hard floor: {area.prodRateHardFloor} SQM/hr
                                    </p>
                                  )}
                                  {area.toiletFixtures && (
                                    <p className="text-xs text-muted-foreground">
                                      Toilet fixtures: Yes
                                    </p>
                                  )}
                                </div>
                              </Button>
                            ))
                          ) : (
                            <p className="text-muted-foreground col-span-2 text-center py-4">
                              No areas found for this industry. Try another industry or search term.
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {tasks.length > 0 && (
                        <div className="mt-4 bg-muted/50 rounded-md p-4 space-y-2">
                          <h4 className="text-sm font-medium mb-2">Added to Template:</h4>
                          <div className="space-y-2">
                            {tasks.map(task => (
                              <PeriodicalTaskInput
                                key={task.id}
                                task={task}
                                onRemove={handleRemoveTask}
                                onUpdateMeasurement={handleUpdateMeasurement}
                                onUpdateFloorType={handleUpdateFloorType}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  
                  {!selectedIndustry && (
                    <div className="mt-6 bg-muted p-4 rounded-md">
                      <p className="text-center text-muted-foreground">
                        Select an industry to view specialized cleaning areas
                      </p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button 
                    onClick={handleSaveTemplate} 
                    disabled={!selectedIndustry || tasks.length === 0 || !templateName.trim()}
                  >
                    Save Industry Template
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Dashboard panel */}
            <div className="lg:col-span-1">
              {tasks.length > 0 ? (
                <IndustryTemplateDashboard 
                  tasks={tasks}
                  industryType={selectedIndustry}
                />
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-medium text-lg mb-2">No Tasks Added Yet</h3>
                    <p className="text-muted-foreground">
                      Add industry areas or custom tasks to see time calculations and metrics
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="saved">
          <Card>
            <CardHeader>
              <CardTitle>Saved Industry Templates</CardTitle>
              <CardDescription>Your previously saved industry templates</CardDescription>
            </CardHeader>
            <CardContent>
              {savedTemplates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedTemplates.map(template => (
                    <Card key={template.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center justify-between">
                          {template.name}
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                            {template.industry}
                          </span>
                        </CardTitle>
                        <CardDescription>
                          Created: {new Date(template.createdAt).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Tasks</span>
                            <span className="font-medium">{template.tasks.length}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Weekly Hours</span>
                            <span className="font-medium">{template.totalTime.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Monthly Hours</span>
                            <span className="font-medium">{(template.totalTime * 4.33).toFixed(2)}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-2">
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteTemplate(template.id)}
                        >
                          Delete
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={() => handleLoadTemplate(template)}
                        >
                          Load
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-muted-foreground text-center py-8">
                  <Save className="h-12 w-12 mx-auto mb-4" />
                  <p>No saved industry templates found</p>
                  <p className="text-sm mt-2">
                    Create and save templates to see them here
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
