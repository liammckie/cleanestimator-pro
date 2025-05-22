
import { supabase } from '@/integrations/supabase/client';
import { WorkflowData, WorkflowStepId } from './types';
import { WorkflowInsert, WorkflowUpdate } from '@/utils/workflowTypes';

export const saveWorkflow = async (
  saveWorkflowId: string | undefined,
  workflowData: WorkflowData,
  currentStep: WorkflowStepId
): Promise<{ id?: string; error?: any }> => {
  console.log("Attempting to save workflow progress...");
  
  try {
    if (!saveWorkflowId) {
      // Create new workflow with improved error handling
      console.log("Creating new workflow...");
      const workflowInsert: WorkflowInsert = {
        project_name: workflowData.projectName || 'New Cleaning Project',
        client_name: workflowData.clientName || '',
        workflow_data: workflowData,
        current_step: currentStep
      };
      
      const { data, error } = await supabase
        .from('cleaning_workflows')
        .insert([workflowInsert])
        .select('id')
        .single();
        
      if (error) {
        console.error('Error creating workflow:', error);
        return { error };
      }
      
      if (data?.id) {
        console.log("Workflow created with ID:", data.id);
        return { id: data.id };
      }
    } else {
      // Update existing workflow with improved error handling
      console.log("Updating existing workflow:", saveWorkflowId);
      const workflowUpdate: WorkflowUpdate = {
        project_name: workflowData.projectName,
        client_name: workflowData.clientName || '',
        workflow_data: workflowData,
        current_step: currentStep,
        updated_at: new Date().toISOString()
      };
      
      const { error } = await supabase
        .from('cleaning_workflows')
        .update(workflowUpdate)
        .eq('id', saveWorkflowId);
        
      if (error) {
        console.error('Error updating workflow:', error);
        return { error };
      }
      
      console.log("Workflow updated successfully");
      return { id: saveWorkflowId };
    }
    
    return {};
  } catch (error: any) {
    console.error('Exception in saveProgress:', error);
    return { error };
  }
};

export const loadWorkflow = async (id: string): Promise<{ 
  data?: { 
    id: string; 
    workflowData: WorkflowData; 
    currentStep: WorkflowStepId;
    projectName: string;
  }; 
  error?: any 
}> => {
  try {
    console.log("Loading workflow:", id);
    const { data, error } = await supabase
      .from('cleaning_workflows')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error('Error loading workflow:', error);
      return { error };
    }
    
    if (data) {
      console.log("Workflow loaded:", data);
      
      // Handle the data loading properly by ensuring proper types
      const workflowData = data.workflow_data as unknown as WorkflowData;
      const currentStep = data.current_step as WorkflowStepId;
      
      return { 
        data: { 
          id: data.id, 
          workflowData,
          currentStep,
          projectName: data.project_name
        } 
      };
    }
    
    return {};
  } catch (error: any) {
    console.error('Exception in loadProgress:', error);
    return { error };
  }
};
