
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, Search, Plus, Repeat, Ruler } from 'lucide-react';
import { PeriodicalTaskInput } from './PeriodicalTaskInput';
import { useToast } from '@/hooks/use-toast';
import { TaskFrequencySelect } from '../task/TaskFrequencySelect';
import { getIndustryTypes, getIndustryTemplate, IndustryArea } from '@/data/industryProductivityRates';

export const IndustryTemplatesPage: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [periodicalTasks, setPeriodicalTasks] = useState<Array<{
    id: string, 
    name: string, 
    frequency: string,
    productivityRate?: {
      softFloor?: number;
      hardFloor?: number;
      toiletFixtures?: {
        pans?: number;
        basins?: number;
        ssUrinals?: number;
        ceramicUrinals?: number;
        showers?: number;
      };
    }
  }>>([]);
  const [unitOfMeasurement, setUnitOfMeasurement] = useState<string>('sqm');
  const [templateName, setTemplateName] = useState<string>('');
  const [frequency, setFrequency] = useState<string>('1');
  const [industryAreas, setIndustryAreas] = useState<IndustryArea[]>([]);
  const { toast } = useToast();
  
  // Get available industry types
  const industryTypes = getIndustryTypes();
  
  // When industry changes, update available areas
  useEffect(() => {
    if (selectedIndustry) {
      const template = getIndustryTemplate(selectedIndustry);
      setIndustryAreas(template.areas);
    } else {
      setIndustryAreas([]);
    }
  }, [selectedIndustry]);
  
  // Filter areas by search query if provided
  const filteredAreas = searchQuery 
    ? industryAreas.filter(area => 
        area.areaName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : industryAreas;

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

  const handleAddAreaToTemplate = (area: IndustryArea) => {
    // Add this area as a periodical task
    const newTask = {
      id: `area-${Date.now()}`,
      name: area.areaName,
      frequency: '1',
      productivityRate: {
        softFloor: area.prodRateSoftFloor,
        hardFloor: area.prodRateHardFloor,
        toiletFixtures: area.toiletFixtures
      }
    };

    setPeriodicalTasks([...periodicalTasks, newTask]);
    
    toast({
      title: "Area Added",
      description: `${area.areaName} has been added to the template`
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

    if (periodicalTasks.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one task to the template",
        variant: "destructive"
      });
      return;
    }

    // Here you would save the template including periodical tasks and unit of measurement
    const templateData = {
      industry: selectedIndustry,
      unitOfMeasurement,
      tasks: periodicalTasks,
      createdAt: new Date().toISOString()
    };

    // Save to localStorage for demo purposes
    const savedTemplates = JSON.parse(localStorage.getItem('industry-templates') || '[]');
    savedTemplates.push(templateData);
    localStorage.setItem('industry-templates', JSON.stringify(savedTemplates));
    
    toast({
      title: "Template Saved",
      description: `Industry template for ${selectedIndustry} has been saved`,
    });

    // Clear form after saving
    setPeriodicalTasks([]);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Industry Template</CardTitle>
          <CardDescription>
            Select an industry to create a specialized cleaning template
          </CardDescription>
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
                    {industryTypes.map(industry => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
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
                <h3 className="text-md font-medium mb-3">Custom Periodical Tasks</h3>
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <p className="text-muted-foreground col-span-3 text-center py-4">
                      No areas found for this industry. Try another industry or search term.
                    </p>
                  )}
                </div>
              </div>
              
              {periodicalTasks.length > 0 && (
                <div className="mt-4 bg-muted/50 rounded-md p-4 space-y-2">
                  <h4 className="text-sm font-medium">Added to Template:</h4>
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
          <Button onClick={handleSaveTemplate} disabled={!selectedIndustry || periodicalTasks.length === 0}>
            Save Industry Template
          </Button>
        </CardFooter>
      </Card>
      
      {/* Template management could go here */}
      <Card>
        <CardHeader>
          <CardTitle>Saved Industry Templates</CardTitle>
          <CardDescription>Your previously saved industry templates</CardDescription>
        </CardHeader>
        <CardContent>
          <div id="saved-templates-container">
            {/* Templates would be loaded and displayed here */}
            <p className="text-muted-foreground text-center py-4">
              No saved industry templates found
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
