
import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { Spinner } from "@/components/ui/spinner";

export const LoadWorkflow: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { loadProgress } = useWorkflow();

  useEffect(() => {
    if (id) {
      loadProgress(id);
    }
  }, [id, loadProgress]);

  // Return a loading indicator while the workflow is being loaded
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <Spinner className="h-8 w-8 mb-4" />
        <p className="text-lg text-muted-foreground">Loading workflow...</p>
      </div>
    </div>
  );
};
