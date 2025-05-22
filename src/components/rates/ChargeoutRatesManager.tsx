
import React, { useState } from 'react';
import {
  Table, TableBody, TableCaption, TableCell,
  TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Edit } from "lucide-react";
import { useRates } from '@/contexts/RatesContext';
import { getAllRates } from '@/data/rates/ratesManager';

export const ChargeoutRatesManager: React.FC = () => {
  const { chargeoutRates, setChargeoutRate, getChargeoutRate } = useRates();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [editMode, setEditMode] = useState<Record<string, boolean>>({});
  const [editValues, setEditValues] = useState<Record<string, number>>({});

  // Get all task data from the rates manager for task selection
  const allTasks = getAllRates();
  
  // Filter tasks based on search
  const filteredTasks = allTasks.filter(task => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return task.task.toLowerCase().includes(query) || 
             task.category.toLowerCase().includes(query);
    }
    return true;
  }).slice(0, 20); // Limit display for performance
  
  // Start editing a rate
  const startEdit = (taskId: string) => {
    const currentRate = getChargeoutRate(taskId) || 0;
    setEditMode(prev => ({ ...prev, [taskId]: true }));
    setEditValues(prev => ({ ...prev, [taskId]: currentRate }));
  };

  // Save edited rate
  const saveRate = (taskId: string) => {
    const newRate = editValues[taskId];
    if (newRate !== undefined) {
      setChargeoutRate(taskId, newRate);
      setEditMode(prev => ({ ...prev, [taskId]: false }));
    }
  };

  // Get task name by ID
  const getTaskName = (taskId: string): string => {
    const task = allTasks.find(t => t.id === taskId);
    return task ? task.task : 'Unknown Task';
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks for pricing..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <h4 className="font-medium">Task Charge-out Rates</h4>
          <p className="text-sm text-muted-foreground">Set customer pricing for specific tasks</p>
          
          <div className="rounded-md border">
            <Table>
              <TableCaption>Charge-out rates for tasks</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Base Rate</TableHead>
                  <TableHead className="text-right">Charge-out Rate ($)</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.map(task => {
                  const currentRate = getChargeoutRate(task.id);
                  
                  return (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.task}</TableCell>
                      <TableCell>{task.category}</TableCell>
                      <TableCell className="text-right">{task.ratePerHour || '-'}</TableCell>
                      <TableCell className="text-right">
                        {editMode[task.id] ? (
                          <Input
                            type="number"
                            value={editValues[task.id] || 0}
                            onChange={(e) => setEditValues(prev => ({
                              ...prev,
                              [task.id]: parseFloat(e.target.value) || 0
                            }))}
                            className="w-24 ml-auto"
                          />
                        ) : (
                          currentRate ? `$${currentRate.toFixed(2)}` : 'Not set'
                        )}
                      </TableCell>
                      <TableCell>
                        {editMode[task.id] ? (
                          <Button 
                            size="sm" 
                            onClick={() => saveRate(task.id)}
                          >
                            Save
                          </Button>
                        ) : (
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => startEdit(task.id)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            {currentRate ? 'Edit' : 'Set Rate'}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium">Existing Charge-out Rates</h4>
          <div className="rounded-md border">
            <Table>
              <TableCaption>Your configured charge-out rates</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead className="text-right">Rate ($)</TableHead>
                  <TableHead>Effective Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {chargeoutRates.filter(rate => rate.isActive).map(rate => (
                  <TableRow key={rate.id}>
                    <TableCell className="font-medium">{getTaskName(rate.taskId || '')}</TableCell>
                    <TableCell className="text-right">${rate.value.toFixed(2)}</TableCell>
                    <TableCell>{new Date(rate.effectiveDate).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
                {chargeoutRates.filter(rate => rate.isActive).length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-4 text-muted-foreground">
                      No charge-out rates defined yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};
