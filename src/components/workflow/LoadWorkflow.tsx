
import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useWorkflow } from '@/contexts/WorkflowContext';
import { Spinner } from "@/components/ui/spinner";
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const LoadWorkflow: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { loadProgress } = useWorkflow();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWorkflow = async () => {
      try {
        if (id) {
          await loadProgress(id);
        } else {
          throw new Error('No workflow ID provided');
        }
      } catch (err) {
        console.error('Error loading workflow:', err);
        setError('Failed to load workflow. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadWorkflow();
  }, [id, loadProgress]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <Spinner className="h-8 w-8 mb-4" />
          <p className="text-lg text-muted-foreground">Loading workflow...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="w-full max-w-md">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  // If we successfully loaded the workflow, we can navigate back to the workflow page
  return <Navigate to="/workflow" replace />;
};
