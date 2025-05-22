
import React from 'react';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Check, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

export const WorkflowSidebar: React.FC = () => {
  const { workflowData, steps, currentStep } = useWorkflow();

  return (
    <div className="hidden lg:block w-[280px] border-r h-screen bg-background">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">{workflowData.projectName}</h2>
        <p className="text-sm text-muted-foreground">{workflowData.clientName || 'No client specified'}</p>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-medium mb-3">Workflow Progress</h3>
        <div className="space-y-2">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center gap-2">
              <div className={cn(
                "w-5 h-5 rounded-full flex items-center justify-center text-xs",
                step.id === currentStep 
                  ? "bg-primary text-primary-foreground"
                  : step.isComplete 
                    ? "bg-green-500 text-white"
                    : "bg-muted text-muted-foreground"
              )}>
                {step.isComplete ? <Check className="h-3 w-3" /> : index + 1}
              </div>
              <span className={cn(
                "text-sm",
                step.id === currentStep && "font-medium text-primary"
              )}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-2" />

      <div className="p-4">
        <h3 className="text-sm font-medium mb-3">Sites</h3>
        <div className="space-y-3">
          {workflowData.sites.length > 0 ? (
            workflowData.sites.map((site) => (
              <Card key={site.id} className="bg-muted">
                <CardContent className="p-3">
                  <div className="text-sm font-medium">{site.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {site.address.suburb && site.address.suburb + ', '}
                    {site.address.state}
                  </div>
                  <div className="text-xs mt-1 flex justify-between">
                    <span>{site.daysPerWeek} days/week</span>
                    <span className="capitalize">{site.area.industryType}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No sites added yet</p>
          )}
        </div>
      </div>

      <Separator className="my-2" />

      <div className="p-4">
        <h3 className="text-sm font-medium mb-1">Workflow Summary</h3>
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex justify-between">
            <span>Total Sites:</span>
            <span>{workflowData.sites.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Selected Tasks:</span>
            <span>{workflowData.selectedTasks.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Labor Rate:</span>
            <span>${workflowData.laborCosts.hourlyRate}/hr</span>
          </div>
          <div className="flex justify-between">
            <span>Contract Length:</span>
            <span>{workflowData.contractDetails.lengthYears || 1} year(s)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
