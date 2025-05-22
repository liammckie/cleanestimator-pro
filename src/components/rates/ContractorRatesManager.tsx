
import React, { useState } from 'react';
import {
  Table, TableBody, TableCaption, TableCell,
  TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Save, Trash } from "lucide-react";
import { useRates } from '@/contexts/RatesContext';
import { ContractorRate } from '@/data/types/rates';

export const ContractorRatesManager: React.FC = () => {
  const { contractorRates, setContractorRate } = useRates();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRate, setNewRate] = useState<Partial<ContractorRate>>({
    name: '',
    value: 0,
  });
  
  // Mock contractor data (in a real app, this would come from a database)
  const contractors = [
    { id: 'contractor-1', name: 'ABC Cleaning Services' },
    { id: 'contractor-2', name: 'XYZ Maintenance' },
    { id: 'contractor-3', name: 'Sparkle & Shine Co.' },
  ];

  const handleAddRate = () => {
    if (!newRate.name || !newRate.contractorId || newRate.value === undefined || newRate.value <= 0) {
      return;
    }
    
    const now = new Date();
    const completeRate: ContractorRate = {
      id: `contractor-rate-${now.getTime()}`,
      name: newRate.name,
      type: 'contractor',
      value: newRate.value,
      contractorId: newRate.contractorId,
      taskType: newRate.taskType,
      industryType: newRate.industryType,
      effectiveDate: now,
      isActive: true,
      createdAt: now,
      updatedAt: now
    };
    
    setContractorRate(newRate.contractorId, newRate.value);
    setShowAddForm(false);
    setNewRate({
      name: '',
      value: 0,
    });
  };

  // Get contractor name by ID
  const getContractorName = (contractorId: string): string => {
    const contractor = contractors.find(c => c.id === contractorId);
    return contractor ? contractor.name : 'Unknown Contractor';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Contractor Rates</h3>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Contractor Rate
        </Button>
      </div>

      {showAddForm && (
        <div className="bg-muted p-4 rounded-md space-y-4">
          <h4 className="font-medium">Add New Contractor Rate</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rate-name">Rate Description</Label>
              <Input 
                id="rate-name"
                value={newRate.name || ''}
                onChange={(e) => setNewRate({...newRate, name: e.target.value})}
                placeholder="E.g. Standard cleaning rate"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rate-value">Hourly Rate ($)</Label>
              <Input 
                id="rate-value"
                type="number"
                value={newRate.value || ''}
                onChange={(e) => setNewRate({...newRate, value: parseFloat(e.target.value)})}
                placeholder="0.00"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contractor">Contractor</Label>
              <select
                id="contractor"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                value={newRate.contractorId || ''}
                onChange={(e) => setNewRate({...newRate, contractorId: e.target.value})}
              >
                <option value="">Select a contractor</option>
                {contractors.map(contractor => (
                  <option key={contractor.id} value={contractor.id}>
                    {contractor.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="task-type">Task Type (Optional)</Label>
              <Input 
                id="task-type"
                value={newRate.taskType || ''}
                onChange={(e) => setNewRate({...newRate, taskType: e.target.value})}
                placeholder="E.g. Window Cleaning"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="industry-type">Industry Type (Optional)</Label>
              <Input 
                id="industry-type"
                value={newRate.industryType || ''}
                onChange={(e) => setNewRate({...newRate, industryType: e.target.value})}
                placeholder="E.g. Healthcare"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            <Button onClick={handleAddRate}>Save Rate</Button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <h4 className="font-medium">Current Contractor Rates</h4>
        <div className="rounded-md border">
          <Table>
            <TableCaption>Contractor hourly rates</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Contractor</TableHead>
                <TableHead>Task Type</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead className="text-right">Rate</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contractorRates.filter(rate => rate.isActive).map(rate => (
                <TableRow key={rate.id}>
                  <TableCell className="font-medium">{rate.name}</TableCell>
                  <TableCell>{getContractorName(rate.contractorId || '')}</TableCell>
                  <TableCell>{rate.taskType || "-"}</TableCell>
                  <TableCell>{rate.industryType || "-"}</TableCell>
                  <TableCell className="text-right">${rate.value.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {contractorRates.filter(rate => rate.isActive).length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                    No contractor rates defined yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
