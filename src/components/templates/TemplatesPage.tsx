
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TaskTemplate } from '../task/TaskTemplate';
import { TemplateManager } from '../task/TemplateManager';
import { getAllProductivityRates } from '@/data/productivityRates';
import { IndustryTemplatesPage } from './IndustryTemplatesPage';

export const TemplatesPage: React.FC = () => {
  const [templateType, setTemplateType] = useState<string>("general");
  const [selectedCategory, setSelectedCategory] = useState<string>("_all");
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTaskId, setSelectedTaskId] = useState<string>('');
  
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

  return (
    <div className="container mx-auto py-8">
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
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="task-category">Category</Label>
                    <Select
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger id="task-category" className="bg-background">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent className="bg-background">
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
                    <Label htmlFor="task-search">Search</Label>
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
                  {filteredRates.slice(0, 9).map(rate => (
                    <Button
                      key={rate.id}
                      variant={selectedTaskId === rate.id ? "default" : "outline"}
                      className={`h-auto py-3 justify-start ${selectedTaskId === rate.id ? 'bg-primary text-primary-foreground' : 'bg-muted/50 text-foreground hover:bg-muted'}`}
                      onClick={() => setSelectedTaskId(rate.id)}
                    >
                      <div className="text-left">
                        <p className="font-medium">{rate.task}</p>
                        <p className="text-xs text-muted-foreground">{rate.category}</p>
                      </div>
                    </Button>
                  ))}
                </div>
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
      )}
    </div>
  );
};
