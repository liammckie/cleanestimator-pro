
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, ArrowRight, Save, CheckCircle } from 'lucide-react';
import { WorkflowSidebar } from './WorkflowSidebar';

export const WorkflowLayout: React.FC = () => {
  const { 
    steps, 
    currentStep, 
    setCurrentStep, 
    nextStep, 
    previousStep, 
    saveProgress,
    workflowData
  } = useWorkflow();
  const navigate = useNavigate();

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const handleStepClick = (stepId: string) => {
    // We can add logic here to prevent skipping steps if needed
    setCurrentStep(stepId as any);
    const step = steps.find(step => step.id === stepId);
    if (step) {
      navigate(step.path);
    }
  };

  const handleSave = async () => {
    await saveProgress();
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <WorkflowSidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">
          <div className="flex flex-col space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">{workflowData.projectName || 'New Cleaning Project'}</h1>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handleSave}
              >
                <Save className="w-4 h-4" />
                Save Progress
              </Button>
            </div>
            
            {/* Step indicator */}
            <div className="flex items-center space-x-2">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div 
                    className={`flex items-center justify-center rounded-full cursor-pointer transition-all ${
                      step.isActive 
                        ? 'bg-primary text-primary-foreground' 
                        : step.isComplete
                          ? 'bg-green-500 text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                    } w-10 h-10`}
                    onClick={() => handleStepClick(step.id)}
                  >
                    {step.isComplete ? <CheckCircle className="w-5 h-5" /> : index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <Separator className="flex-1" />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Current step info */}
            <div className="mb-4">
              <h2 className="text-2xl font-semibold">{steps[currentStepIndex]?.label}</h2>
              <p className="text-muted-foreground">{steps[currentStepIndex]?.description}</p>
            </div>

            {/* Content area */}
            <Card className="p-6">
              <Outlet />
            </Card>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={previousStep}
                disabled={isFirstStep}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </Button>
              
              <Button
                onClick={nextStep}
                disabled={isLastStep}
                className="flex items-center gap-2"
              >
                Next <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
