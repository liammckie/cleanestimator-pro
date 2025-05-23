
import React from 'react';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';
import { CheckCircle2, Circle, ChevronRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export const WorkflowSidebar = () => {
  const { steps, currentStep, setCurrentStep } = useWorkflow();
  
  const navigate = (stepId: string) => {
    setCurrentStep(stepId as any);
  };

  return (
    <aside className="md:w-64 w-full md:h-screen bg-white border-r flex flex-col shadow-sm">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-lg">Workflow Steps</h2>
        <p className="text-sm text-muted-foreground">Complete all steps</p>
      </div>
      
      <ScrollArea className="flex-1 px-2">
        <nav className="space-y-1 py-2">
          <TooltipProvider>
            {steps.map((step, index) => {
              const isActive = step.id === currentStep;
              const isDisabled = false; // You could add logic to disable steps
              
              return (
                <Tooltip key={step.id}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      onClick={() => navigate(step.id)}
                      disabled={isDisabled}
                      className={cn(
                        "w-full justify-start text-left font-normal px-3 py-2 h-auto relative",
                        isActive ? "bg-primary/10 text-primary" : "hover:bg-muted",
                        isDisabled && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="flex-shrink-0">
                          {step.isComplete ? (
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                          ) : (
                            <Circle className="h-5 w-5" />
                          )}
                        </div>
                        
                        <div className="flex-grow">
                          <div className="font-medium">{step.label}</div>
                          <div className="text-xs text-muted-foreground line-clamp-1">
                            {step.description}
                          </div>
                        </div>
                        
                        {isActive && (
                          <ChevronRight className="h-5 w-5 text-primary ml-auto" />
                        )}
                        
                        {step.isComplete && !isActive && (
                          <Badge 
                            variant="outline" 
                            className="ml-auto bg-primary/10 text-primary border-primary/20"
                          >
                            Done
                          </Badge>
                        )}
                      </div>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-xs">
                    <p>{step.description}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </TooltipProvider>
        </nav>
      </ScrollArea>
      
      <div className="p-4 border-t bg-muted/10">
        <div className="text-xs text-muted-foreground">
          <p className="font-medium">Progress</p>
          <div className="w-full bg-muted h-2 rounded-full mt-2 overflow-hidden">
            <div 
              className="bg-primary h-full transition-all" 
              style={{ 
                width: `${(steps.filter(step => step.isComplete).length / steps.length) * 100}%` 
              }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
};
