import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Download, FileJson, Import, Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { TaskTable } from './TaskTable';
import { TaskInput } from './TaskInput';
import { Task } from '@/data/types/productivity';

export const TaskManagementPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [bulkInput, setBulkInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleBulkImport = () => {
    try {
      if (!bulkInput.trim()) {
        throw new Error('Please enter task data to import');
      }

      const lines = bulkInput.trim().split('\n');
      const parsedTasks = lines.map((line, index) => {
        const [category, taskName, productivityRate, measurementUnit, notes] = line.split(',').map(item => item.trim());
        
        if (!category || !taskName || !productivityRate || !measurementUnit) {
          throw new Error(`Invalid data format in line ${index + 1}: ${line}`);
        }

        const rate = parseFloat(productivityRate);
        if (isNaN(rate) || rate <= 0) {
          throw new Error(`Invalid productivity rate in line ${index + 1}: ${productivityRate}`);
        }

        return {
          id: crypto.randomUUID(),
          category,
          name: taskName,
          productivityRate: rate,
          unit: measurementUnit,
          notes: notes || ''
        };
      });

      setTasks(prev => [...prev, ...parsedTasks]);
      setBulkInput('');
      setError(null);
      toast({
        title: "Tasks Imported",
        description: `Successfully imported ${parsedTasks.length} tasks.`,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to parse tasks';
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Import Failed",
        description: errorMessage,
      });
    }
  };

  const handleExport = () => {
    try {
      if (tasks.length === 0) {
        toast({
          variant: "destructive",
          title: "Export Failed",
          description: "No tasks available to export.",
        });
        return;
      }

      const csv = tasks.map(task => 
        `${task.category},${task.name},${task.productivityRate},${task.unit},${task.notes}`
      ).join('\n');
      
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cleaning-tasks-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);

      toast({
        title: "Tasks Exported",
        description: `Successfully exported ${tasks.length} tasks.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Export Failed",
        description: "Failed to export tasks. Please try again.",
      });
    }
  };

  const handleSaveToLocalStorage = () => {
    try {
      localStorage.setItem('cleaning-tasks', JSON.stringify(tasks));
      toast({
        title: "Tasks Saved",
        description: "Successfully saved tasks to local storage.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Save Failed",
        description: "Failed to save tasks. Please try again.",
      });
    }
  };

  React.useEffect(() => {
    try {
      const savedTasks = localStorage.getItem('cleaning-tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error('Failed to load saved tasks:', error);
    }
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Task Management</h1>
      
      <Tabs defaultValue="input" className="space-y-6">
        <TabsList>
          <TabsTrigger value="input">Add Tasks</TabsTrigger>
          <TabsTrigger value="view">View Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="input" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <TaskInput onAddTask={(task) => {
                setTasks(prev => [...prev, task]);
                toast({
                  title: "Task Added",
                  description: "Successfully added new task.",
                });
              }} />
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Bulk Import</h3>
                <p className="text-sm text-muted-foreground">
                  Paste tasks in CSV format: Category, Task Name, Productivity Rate, Measurement Unit, Notes
                </p>
                <Textarea 
                  value={bulkInput}
                  onChange={(e) => setBulkInput(e.target.value)}
                  placeholder="Core Cleaning, Vacuuming, 400, SQM/hour, Regular carpet vacuuming"
                  rows={10}
                />
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <div className="flex gap-4">
                  <Button onClick={handleBulkImport}>
                    <Import className="mr-2 h-4 w-4" />
                    Import Tasks
                  </Button>
                  <Button onClick={handleExport} variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export Tasks
                  </Button>
                  <Button onClick={handleSaveToLocalStorage} variant="secondary">
                    <Save className="mr-2 h-4 w-4" />
                    Save Tasks
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="view">
          <TaskTable 
            tasks={tasks} 
            onDeleteTask={(taskId) => {
              setTasks(prev => prev.filter(task => task.id !== taskId));
              toast({
                title: "Task Deleted",
                description: "Successfully removed task.",
              });
            }} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};