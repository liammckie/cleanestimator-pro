
import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useWorkflow } from '@/contexts/WorkflowContext';

export const LoadWorkflow: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { loadProgress } = useWorkflow();

  useEffect(() => {
    if (id) {
      loadProgress(id);
    }
  }, [id]);

  // Return an empty div or redirect to home page since loadProgress will navigate to the proper step
  return <div>Loading workflow...</div>;
};
