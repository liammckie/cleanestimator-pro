
import React from 'react';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Check, Download, Mail } from 'lucide-react';
import { useCostContext } from '@/contexts/CostContext';

export const ReviewStep: React.FC = () => {
  const { workflowData } = useWorkflow();
  const { totalLaborCost, totalWeeklyHours } = useCostContext();
  
  // Calculate monthly revenue (placeholder for actual calculation)
  const monthlyRevenue = totalLaborCost * 1.25; // 25% margin
  const profit = monthlyRevenue - totalLaborCost - (workflowData.equipmentCosts?.monthly || 0);
  const margin = (profit / monthlyRevenue) * 100;
  
  const handleExport = () => {
    // Placeholder for export functionality
    alert('Export functionality would generate a PDF or Excel file with estimate details');
  };
  
  const handleSendEmail = () => {
    // Placeholder for email functionality
    alert('Email functionality would send the estimate to the client');
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Final Review: {workflowData.projectName}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Client Information</h3>
              <p>{workflowData.clientName}</p>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium">Sites</h3>
              <ul className="list-disc pl-5 mt-2">
                {workflowData.sites.map(site => (
                  <li key={site.id}>
                    {site.name} - {site.address.suburb}, {site.address.state}
                  </li>
                ))}
              </ul>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium">Scope Summary</h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-sm text-muted-foreground">Total Tasks</p>
                  <p className="text-lg font-medium">{workflowData.selectedTasks.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Weekly Hours</p>
                  <p className="text-lg font-medium">{totalWeeklyHours.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Hours</p>
                  <p className="text-lg font-medium">{(totalWeeklyHours * 4.33).toFixed(2)}</p>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium">Financial Summary</h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                  <p className="text-lg font-medium">${monthlyRevenue.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Labor Cost</p>
                  <p className="text-lg font-medium">${totalLaborCost.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Equipment Cost</p>
                  <p className="text-lg font-medium">
                    ${(workflowData.equipmentCosts?.monthly || 0).toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Profit</p>
                  <p className={`text-lg font-medium ${profit > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    ${profit.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Margin</p>
                  <p className={`text-lg font-medium ${margin > 20 ? 'text-green-500' : margin > 10 ? 'text-amber-500' : 'text-red-500'}`}>
                    {margin.toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium">Contract Details</h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-sm text-muted-foreground">Contract Length</p>
                  <p className="text-lg font-medium">{workflowData.contractDetails?.lengthYears || 1} year(s)</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Year 1 CPI</p>
                  <p className="text-lg font-medium">{workflowData.contractDetails?.cpiIncreases?.yearOne || 0}%</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between mt-8 gap-4">
            <Button 
              variant="outline" 
              className="flex-1 flex items-center justify-center gap-2"
              onClick={handleExport}
            >
              <Download className="h-4 w-4" /> Export Estimate
            </Button>
            <Button 
              className="flex-1 flex items-center justify-center gap-2"
              onClick={handleSendEmail}
            >
              <Mail className="h-4 w-4" /> Send to Client
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex items-center justify-center p-4 bg-green-50 rounded-lg">
        <div className="flex items-center gap-2">
          <Check className="h-5 w-5 text-green-600" />
          <span className="text-green-800 font-medium">Workflow Complete!</span>
        </div>
      </div>
    </div>
  );
};
