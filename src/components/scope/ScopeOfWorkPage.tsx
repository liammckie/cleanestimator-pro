import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useTaskContext } from '../area/task/TaskContext';
import { ToolSelect } from '../ToolSelect';
import { calculateTaskProductivity } from '@/utils/productivityCalculations';
import { getRateById } from '@/data/rates/ratesManager';
import { Site } from '@/data/types/site';

export const ScopeOfWorkPage = () => {
  const [sites, setSites] = useState<Site[]>([]);
  const { selectedTasks, handleTaskSelection, handleQuantityChange, handleFrequencyChange, handleToolChange } = useTaskContext();
  const { toast } = useToast();

  useEffect(() => {
    const savedSites = localStorage.getItem('sites');
    if (savedSites) {
      setSites(JSON.parse(savedSites));
    }
  }, []);

  const handleRemoveTask = (taskId: string, siteId?: string) => {
    handleTaskSelection(taskId, false, siteId);
    toast({
      title: "Task Removed",
      description: "Task has been removed from the scope.",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Scope of Work</h1>
      
      <div className="grid grid-cols-1 gap-6">
        {selectedTasks.map((selectedTask) => {
          const taskDetails = getRateById(selectedTask.taskId);
          if (!taskDetails) return null;

          const productivity = calculateTaskProductivity(
            selectedTask.taskId,
            selectedTask.quantity,
            selectedTask.selectedTool,
            selectedTask.frequency,
            selectedTask.quantity
          );

          return (
            <Card key={`${selectedTask.taskId}-${selectedTask.siteId}`} className="w-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">
                  {taskDetails.task}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveTask(selectedTask.taskId, selectedTask.siteId)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Site Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Site</label>
                    <Select
                      value={selectedTask.siteId}
                      onValueChange={(siteId) => {
                        const site = sites.find(s => s.id === siteId);
                        if (site) {
                          handleTaskSelection(selectedTask.taskId, false, selectedTask.siteId);
                          handleTaskSelection(selectedTask.taskId, true, site.id, site.name);
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a site" />
                      </SelectTrigger>
                      <SelectContent>
                        {sites.map((site) => (
                          <SelectItem key={site.id} value={site.id}>
                            {site.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Quantity Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {taskDetails.unit === 'SQM/hour' ? 'Area (SQM)' : `Quantity (${taskDetails.unit})`}
                    </label>
                    <Input
                      type="number"
                      value={selectedTask.quantity || ''}
                      onChange={(e) => handleQuantityChange(selectedTask.taskId, Number(e.target.value))}
                      placeholder={`Enter ${taskDetails.unit === 'SQM/hour' ? 'area' : 'quantity'}`}
                    />
                  </div>

                  {/* Tool Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tool Selection</label>
                    <ToolSelect
                      taskId={selectedTask.taskId}
                      currentTool={selectedTask.selectedTool || ''}
                      onToolChange={handleToolChange}
                    />
                  </div>

                  {/* Frequency Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Frequency (times per week)</label>
                    <Select
                      value={selectedTask.frequency.timesPerWeek.toString()}
                      onValueChange={(value) => handleFrequencyChange(selectedTask.taskId, Number(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7].map((freq) => (
                          <SelectItem key={freq} value={freq.toString()}>
                            {freq}x per week
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Time Requirements Display */}
                  {productivity && (
                    <div className="mt-4 p-4 bg-accent/50 rounded-lg space-y-2">
                      <h4 className="font-medium">Time Requirements</h4>
                      <div className="text-sm space-y-1">
                        <p>Time per service: {(productivity.timeRequired * 60).toFixed(1)} minutes</p>
                        <p>Monthly hours: {(productivity.timeRequired * selectedTask.frequency.timesPerMonth).toFixed(1)} hours</p>
                        <p>Productivity rate: {productivity.adjustedRate.toFixed(2)} {taskDetails.unit}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}

        {selectedTasks.length === 0 && (
          <div className="text-center p-8 text-muted-foreground">
            <p>No tasks selected. Add tasks from the task database to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};