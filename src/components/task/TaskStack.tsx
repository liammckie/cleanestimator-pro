import React from 'react';
import { useTaskContext } from '../area/task/TaskContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Clock, Trash2, Calculator } from 'lucide-react';
import { calculateTaskProductivity } from '@/utils/productivityCalculations';
import { getRateById } from '@/data/rates/ratesManager';
import { ToolSelect } from '../ToolSelect';

export const TaskStack = () => {
  const { 
    selectedTasks, 
    handleTaskSelection, 
    handleQuantityChange, 
    handleFrequencyChange,
    handleToolChange 
  } = useTaskContext();

  return (
    <div className="w-96 border-l bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="h-screen flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Selected Tasks</h2>
          <p className="text-sm text-muted-foreground">
            {selectedTasks.length} tasks selected
          </p>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {selectedTasks.map((task) => {
              const taskDetails = getRateById(task.taskId);
              if (!taskDetails) return null;

              const productivity = calculateTaskProductivity(
                task.taskId,
                task.quantity,
                task.selectedTool,
                task.frequency,
                task.quantity
              );

              return (
                <Card key={task.taskId} className="p-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{taskDetails.task}</h3>
                        {task.siteName && (
                          <p className="text-sm text-muted-foreground">{task.siteName}</p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleTaskSelection(task.taskId, false)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label>
                          {taskDetails.unit === 'SQM/hour' ? 'Area (SQM)' : `Quantity (${taskDetails.unit})`}
                        </Label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={task.quantity || ''}
                            onChange={(e) => handleQuantityChange(task.taskId, Number(e.target.value))}
                            placeholder={`Enter ${taskDetails.unit === 'SQM/hour' ? 'area' : 'quantity'}`}
                          />
                          <Calculator className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>

                      <div>
                        <Label>Tool Selection</Label>
                        <ToolSelect
                          taskId={task.taskId}
                          currentTool={task.selectedTool || ''}
                          onToolChange={handleToolChange}
                        />
                      </div>

                      <div>
                        <Label>Frequency (times per week)</Label>
                        <Select
                          value={task.frequency.timesPerWeek.toString()}
                          onValueChange={(value) => handleFrequencyChange(task.taskId, Number(value))}
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

                      {productivity && (
                        <div className="bg-accent/50 p-3 rounded-lg space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4" />
                            <span>Time Requirements</span>
                          </div>
                          <div className="text-sm space-y-1">
                            <p>Per service: {(productivity.timeRequired * 60).toFixed(1)} minutes</p>
                            <p>Monthly: {(productivity.timeRequired * task.frequency.timesPerMonth).toFixed(1)} hours</p>
                            <p>Rate: {productivity.adjustedRate.toFixed(2)} {taskDetails.unit}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}

            {selectedTasks.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p>No tasks selected</p>
                <p className="text-sm">Select tasks from the list to get started</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};