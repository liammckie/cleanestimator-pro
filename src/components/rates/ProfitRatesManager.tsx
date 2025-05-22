
import React, { useState } from 'react';
import {
  Table, TableBody, TableCaption, TableCell,
  TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Save } from "lucide-react";
import { useRates } from '@/contexts/RatesContext';
import { ProfitRate } from '@/data/types/rates';

export const ProfitRatesManager: React.FC = () => {
  const { profitRates, setProfitRate, getDefaultProfitRate } = useRates();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRate, setNewRate] = useState<Partial<ProfitRate>>({
    name: '',
    value: 15, // default 15%
    isDefault: false,
  });

  const handleAddRate = () => {
    if (!newRate.name || newRate.value === undefined) {
      return;
    }
    
    const now = new Date();
    const completeRate: ProfitRate = {
      id: `profit-${now.getTime()}`,
      name: newRate.name,
      type: 'profit',
      value: newRate.value,
      industryType: newRate.industryType,
      clientType: newRate.clientType,
      isDefault: newRate.isDefault || false,
      effectiveDate: now,
      isActive: true,
      createdAt: now,
      updatedAt: now
    };
    
    setProfitRate(completeRate);
    setShowAddForm(false);
    setNewRate({
      name: '',
      value: 15,
      isDefault: false,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Profit Margins</h3>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Margin
        </Button>
      </div>

      {showAddForm && (
        <div className="bg-muted p-4 rounded-md space-y-4">
          <h4 className="font-medium">Add New Profit Margin</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="margin-name">Margin Name</Label>
              <Input 
                id="margin-name"
                value={newRate.name || ''}
                onChange={(e) => setNewRate({...newRate, name: e.target.value})}
                placeholder="E.g. Standard Profit Margin"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="margin-value">Margin Percentage (%)</Label>
              <Input 
                id="margin-value"
                type="number"
                value={newRate.value || ''}
                onChange={(e) => setNewRate({...newRate, value: parseFloat(e.target.value)})}
                placeholder="15"
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
            
            <div className="space-y-2">
              <Label htmlFor="client-type">Client Type (Optional)</Label>
              <Input 
                id="client-type"
                value={newRate.clientType || ''}
                onChange={(e) => setNewRate({...newRate, clientType: e.target.value})}
                placeholder="E.g. Corporate"
              />
            </div>
            
            <div className="space-y-2 col-span-1 md:col-span-2 flex items-center space-x-2">
              <Checkbox 
                id="is-default" 
                checked={newRate.isDefault || false}
                onCheckedChange={(checked) => 
                  setNewRate({...newRate, isDefault: checked as boolean})
                } 
              />
              <Label htmlFor="is-default">Set as default profit margin</Label>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            <Button onClick={handleAddRate}>Save Margin</Button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <h4 className="font-medium">Current Profit Margins</h4>
        <div className="rounded-md border">
          <Table>
            <TableCaption>Profit margins for pricing calculations</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Margin %</TableHead>
                <TableHead>Industry Type</TableHead>
                <TableHead>Client Type</TableHead>
                <TableHead>Default</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profitRates.filter(rate => rate.isActive).map(rate => (
                <TableRow key={rate.id}>
                  <TableCell className="font-medium">{rate.name}</TableCell>
                  <TableCell>{rate.value}%</TableCell>
                  <TableCell>{rate.industryType || "-"}</TableCell>
                  <TableCell>{rate.clientType || "-"}</TableCell>
                  <TableCell>{rate.isDefault ? "Yes" : "No"}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {profitRates.filter(rate => rate.isActive).length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                    <div className="space-y-2">
                      <p>No custom profit margins defined yet</p>
                      <p className="text-sm">Using default margin of {getDefaultProfitRate()}%</p>
                    </div>
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
