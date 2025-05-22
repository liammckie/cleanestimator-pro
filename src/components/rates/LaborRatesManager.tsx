
import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCaption, TableCell,
  TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Save, Trash } from "lucide-react";
import { useRates } from '@/contexts/RatesContext';
import { LaborRate } from '@/data/types/rates';
import { fetchAwardRates } from '@/services/awardRatesService';
import { cleaningAwardLevels } from '@/data/award/cleaningAward';

export const LaborRatesManager: React.FC = () => {
  const { laborRates, setLaborRate } = useRates();
  const [loadedAwardRates, setLoadedAwardRates] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRate, setNewRate] = useState<Partial<LaborRate>>({
    name: '',
    value: 0,
    employmentType: 'full-time',
    isDefault: false,
    effectiveDate: new Date(),
  });

  // Load award rates from database
  useEffect(() => {
    const loadRates = async () => {
      try {
        const rates = await fetchAwardRates();
        setLoadedAwardRates(rates);
      } catch (error) {
        console.error('Error loading award rates:', error);
      }
    };
    
    loadRates();
  }, []);

  const handleAddRate = () => {
    if (!newRate.name || newRate.value === undefined || newRate.value <= 0) {
      return;
    }
    
    const now = new Date();
    const completeRate: LaborRate = {
      id: `labor-${now.getTime()}`,
      name: newRate.name,
      type: 'labor',
      value: newRate.value,
      employmentType: newRate.employmentType || 'full-time',
      awardLevel: newRate.awardLevel,
      shiftType: newRate.shiftType,
      isDefault: newRate.isDefault || false,
      effectiveDate: newRate.effectiveDate || now,
      isActive: true,
      createdAt: now,
      updatedAt: now
    };
    
    setLaborRate(completeRate);
    setShowAddForm(false);
    setNewRate({
      name: '',
      value: 0,
      employmentType: 'full-time',
      isDefault: false,
      effectiveDate: new Date(),
    });
  };

  // Format date for display
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Labor Rates</h3>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Rate
        </Button>
      </div>

      {showAddForm && (
        <div className="bg-muted p-4 rounded-md space-y-4">
          <h4 className="font-medium">Add New Labor Rate</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rate-name">Rate Name</Label>
              <Input 
                id="rate-name"
                value={newRate.name || ''}
                onChange={(e) => setNewRate({...newRate, name: e.target.value})}
                placeholder="E.g. Custom Supervisor Rate"
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
              <Label htmlFor="employment-type">Employment Type</Label>
              <Select 
                value={newRate.employmentType} 
                onValueChange={(value) => setNewRate({...newRate, employmentType: value as any})}
              >
                <SelectTrigger id="employment-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full Time</SelectItem>
                  <SelectItem value="part-time">Part Time</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="contractor">Contractor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="award-level">Award Level (Optional)</Label>
              <Select 
                value={newRate.awardLevel?.toString() || ''} 
                onValueChange={(value) => setNewRate({...newRate, awardLevel: parseInt(value)})}
              >
                <SelectTrigger id="award-level">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {cleaningAwardLevels.map(level => (
                    <SelectItem key={level.level} value={level.level.toString()}>
                      Level {level.level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 col-span-1 md:col-span-2 flex items-center space-x-2">
              <Checkbox 
                id="is-default" 
                checked={newRate.isDefault || false}
                onCheckedChange={(checked) => 
                  setNewRate({...newRate, isDefault: checked as boolean})
                } 
              />
              <Label htmlFor="is-default">Set as default labor rate</Label>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            <Button onClick={handleAddRate}>Save Rate</Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h4 className="font-medium">Custom Labor Rates</h4>
        <div className="rounded-md border">
          <Table>
            <TableCaption>Your custom labor rates</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Effective Date</TableHead>
                <TableHead>Default</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {laborRates.filter(rate => rate.isActive).map(rate => (
                <TableRow key={rate.id}>
                  <TableCell className="font-medium">{rate.name}</TableCell>
                  <TableCell>${rate.value.toFixed(2)}</TableCell>
                  <TableCell>{rate.employmentType}</TableCell>
                  <TableCell>{formatDate(rate.effectiveDate)}</TableCell>
                  <TableCell>{rate.isDefault ? "Yes" : "No"}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {laborRates.filter(rate => rate.isActive).length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                    No custom labor rates defined yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium">Award Rates</h4>
        <div className="rounded-md border">
          <Table>
            <TableCaption>Cleaning award rates from database</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Level</TableHead>
                <TableHead>Employment Type</TableHead>
                <TableHead>Shift Type</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Effective Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loadedAwardRates.slice(0, 10).map((rate, index) => (
                <TableRow key={index}>
                  <TableCell>Level {rate.level}</TableCell>
                  <TableCell>{rate.employment_type}</TableCell>
                  <TableCell>{rate.shift_type}</TableCell>
                  <TableCell>${parseFloat(rate.hourly_rate).toFixed(2)}</TableCell>
                  <TableCell>{new Date(rate.effective_date).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
              {loadedAwardRates.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                    No award rates loaded yet
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
