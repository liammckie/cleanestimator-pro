
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { useToast } from '@/hooks/use-toast';

export const LoadWorkflow: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { loadProgress } = useWorkflow();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const load = async () => {
      if (id) {
        try {
          await loadProgress(id);
        } catch (error) {
          console.error('Error loading workflow:', error);
          toast({
            title: "Failed to load project",
            description: "Could not load the selected project.",
            variant: "destructive"
          });
          navigate('/workflow/projects');
        }
      } else {
        navigate('/workflow/projects');
      }
    };
    
    load();
  }, [id]);
  
  return (
    <div className="flex items-center justify-center h-[50vh]">
      <div className="text-center">
        <p className="text-xl mb-2">Loading project...</p>
        <p className="text-muted-foreground">Please wait while we load your project.</p>
      </div>
    </div>
  );
};
