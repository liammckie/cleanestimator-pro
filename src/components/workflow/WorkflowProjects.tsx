
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Folder, ArrowRight, Trash2, Search, CalendarClock, Users, ClipboardList } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { WorkflowProject } from '@/utils/workflowTypes';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export const WorkflowProjects: React.FC = () => {
  const [projects, setProjects] = useState<WorkflowProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<WorkflowProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
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
      setFilteredProjects(data as WorkflowProject[] || []);
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

  // Filter projects when search query changes
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProjects(projects);
    } else {
      const lowercaseQuery = searchQuery.toLowerCase();
      const filtered = projects.filter(project => 
        project.project_name.toLowerCase().includes(lowercaseQuery) ||
        (project.client_name && project.client_name.toLowerCase().includes(lowercaseQuery))
      );
      setFilteredProjects(filtered);
    }
  }, [searchQuery, projects]);
  
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

  const getStepIcon = (stepId: string) => {
    const icons: Record<string, React.ReactNode> = {
      'site-setup': <Users className="h-4 w-4" />,
      'scope-definition': <ClipboardList className="h-4 w-4" />,
      'task-management': <ClipboardList className="h-4 w-4" />,
      'labor-costs': <Users className="h-4 w-4" />,
      'equipment': <ClipboardList className="h-4 w-4" />,
      'contract': <ClipboardList className="h-4 w-4" />,
      'summary': <ClipboardList className="h-4 w-4" />,
      'review': <ClipboardList className="h-4 w-4" />
    };
    
    return icons[stepId] || <ClipboardList className="h-4 w-4" />;
  };
  
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Cleaning Projects</h1>
          <p className="text-muted-foreground mt-1">Manage and create cleaning project estimates</p>
        </div>
        <Button onClick={createNewWorkflow} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> New Project
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search projects..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading projects...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <Folder className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">No projects found</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchQuery ? 'Try a different search term' : 'Start by creating your first cleaning project.'}
                  </p>
                  {!searchQuery && (
                    <Button onClick={createNewWorkflow} className="flex items-center gap-2">
                      <Plus className="h-4 w-4" /> Create New Project
                    </Button>
                  )}
                </div>
              ) : (
                filteredProjects.map(project => (
                  <Card key={project.id} className="flex flex-col overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="truncate">{project.project_name}</CardTitle>
                      <CardDescription>
                        {project.client_name || 'No client specified'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 py-2">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          {getStepIcon(project.current_step)}
                          <span className="font-medium text-sm">
                            Current: {getStepName(project.current_step)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarClock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            Updated {format(new Date(project.updated_at), 'PP')}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => deleteWorkflow(project.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => continueWorkflow(project.id)}
                        className="flex items-center gap-1"
                      >
                        Continue <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="recent">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.slice(0, 6).map(project => (
              // Same card as above for recent projects
              <Card key={project.id} className="flex flex-col overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="truncate">{project.project_name}</CardTitle>
                  <CardDescription>
                    {project.client_name || 'No client specified'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 py-2">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      {getStepIcon(project.current_step)}
                      <span className="font-medium text-sm">
                        Current: {getStepName(project.current_step)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarClock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Updated {format(new Date(project.updated_at), 'PP')}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => deleteWorkflow(project.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => continueWorkflow(project.id)}
                    className="flex items-center gap-1"
                  >
                    Continue <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Completed projects will appear here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
