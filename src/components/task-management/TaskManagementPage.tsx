import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Download, Upload } from "lucide-react";
import { TaskTable } from './TaskTable';
import { TaskInput } from './TaskInput';
import { Task } from '@/data/types/productivity';

export const TaskManagementPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [bulkInput, setBulkInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleBulkImport = () => {
    try {
      const lines = bulkInput.trim().split('\n');
      const parsedTasks = lines.map(line => {
        const [category, taskName, productivityRate, measurementUnit, notes] = line.split(',').map(item => item.trim());
        
        if (!category || !taskName || !productivityRate || !measurementUnit) {
          throw new Error(`Invalid line: ${line}`);
        }

        const rate = parseFloat(productivityRate);
        if (isNaN(rate)) {
          throw new Error(`Invalid productivity rate: ${productivityRate}`);
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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse tasks');
    }
  };

  const handleExport = () => {
    const csv = tasks.map(task => 
      `${task.category},${task.name},${task.productivityRate},${task.unit},${task.notes}`
    ).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tasks.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

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
              <TaskInput onAddTask={(task) => setTasks(prev => [...prev, task])} />
              
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
                    <Upload className="mr-2 h-4 w-4" />
                    Import Tasks
                  </Button>
                  <Button variant="outline" onClick={handleExport}>
                    <Download className="mr-2 h-4 w-4" />
                    Export Tasks
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="view">
          <TaskTable tasks={tasks} onDeleteTask={(taskId) => {
            setTasks(prev => prev.filter(task => task.id !== taskId));
          }} />
        </TabsContent>
      </Tabs>
    </div>
  );
};