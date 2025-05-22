import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Folder, ArrowRight, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { WorkflowProject } from '@/utils/workflowTypes';

export const WorkflowProjects: React.FC = () => {
  const [projects, setProjects] = useState<WorkflowProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const loadProjects = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('cleaning_workflows')
        .select('*')
        .order('updated_at', { ascending: false });
        
      if (error) throw error;
      
      console.log('Loaded projects:', data);
      setProjects(data as WorkflowProject[] || []);
    } catch (error) {
      console.error('Error loading projects:', error);
      toast({
        title: "Error loading projects",
        description: "Could not load your cleaning projects.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const createNewWorkflow = () => {
    navigate('/workflow/site-setup');
  };
  
  const continueWorkflow = (id: string) => {
    navigate(`/workflow/continue/${id}`);
  };
  
  const deleteWorkflow = async (id: string) => {
    try {
      const { error } = await supabase
        .from('cleaning_workflows')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      // Refresh the list after deletion
      loadProjects();
      
      toast({
        title: "Project deleted",
        description: "The project has been deleted successfully."
      });
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Delete failed",
        description: "Could not delete the project.",
        variant: "destructive"
      });
    }
  };
  
  useEffect(() => {
    loadProjects();
  }, []);
  
  const getStepName = (stepId: string) => {
    const stepNames: Record<string, string> = {
      'site-setup': 'Site Setup',
      'scope-definition': 'Scope Definition',
      'task-management': 'Task Management',
      'labor-costs': 'Labor Costs',
      'equipment': 'Equipment',
      'contract': 'Contract Details',
      'summary': 'Financial Summary',
      'review': 'Final Review'
    };
    
    return stepNames[stepId] || stepId;
  };
  
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Cleaning Projects</h1>
        <Button onClick={createNewWorkflow} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> New Project
        </Button>
      </div>
      
      {isLoading ? (
        <div className="text-center py-12">Loading projects...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Folder className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No projects yet</h3>
              <p className="text-muted-foreground mb-6">
                Start by creating your first cleaning project.
              </p>
              <Button onClick={createNewWorkflow} className="flex items-center gap-2">
                <Plus className="h-4 w-4" /> Create New Project
              </Button>
            </div>
          ) : (
            projects.map(project => (
              <Card key={project.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="truncate">{project.project_name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Client</p>
                      <p>{project.client_name || 'No client specified'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Current Step</p>
                      <p>{getStepName(project.current_step)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                      <p>{format(new Date(project.updated_at), 'PP')}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => deleteWorkflow(project.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => continueWorkflow(project.id)}
                  >
                    Continue <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};
