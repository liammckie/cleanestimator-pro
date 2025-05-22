
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';
import { SystemErrorLog } from '@/utils/types/systemHealth';

export const ErrorTracker: React.FC = () => {
  const [errors, setErrors] = useState<SystemErrorLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchErrors = async () => {
    setLoading(true);
    setError(null);

    try {
      // Directly call the edge function instead of attempting to query a table
      const { data, error: funcError } = await supabase.functions.invoke('project-health', {
        body: { action: 'getErrors' },
      });

      if (funcError) {
        setError(`Failed to fetch errors: ${funcError.message}`);
      } else if (data && data.errors) {
        setErrors(data.errors as SystemErrorLog[]);
      } else {
        // If no errors are returned from the function, set an empty array
        setErrors([]);
      }
    } catch (err: any) {
      setError(`Error loading error logs: ${err.message}`);
      console.error('Error fetching error logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchErrors();
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500 text-white';
      case 'high':
        return 'bg-orange-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-black';
      case 'low':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusIcon = (resolved: boolean) => {
    return resolved ? (
      <CheckCircle className="h-5 w-5 text-green-500" />
    ) : (
      <AlertCircle className="h-5 w-5 text-red-500" />
    );
  };

  const handleResolveError = async (errorId: string) => {
    try {
      const { error: funcError } = await supabase.functions.invoke('project-health', {
        body: { 
          action: 'resolveError',
          errorId
        },
      });

      if (funcError) {
        setError(`Failed to resolve error: ${funcError.message}`);
      } else {
        // Update the local state to reflect the change
        setErrors(prevErrors =>
          prevErrors.map(err =>
            err.id === errorId ? { ...err, resolved: true, resolved_at: new Date().toISOString() } : err
          )
        );
      }
    } catch (err: any) {
      setError(`Error resolving error: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Error Tracker</h2>
        <Button 
          onClick={fetchErrors}
          variant="outline"
          className="flex items-center gap-2"
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>
      
      {error && (
        <Card className="border-red-300 bg-red-50 dark:bg-red-950">
          <CardContent className="pt-6">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </CardContent>
        </Card>
      )}
      
      {!error && errors.length === 0 && !loading && (
        <Card>
          <CardContent className="p-6 text-center">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-xl font-medium mb-2">No errors detected</h3>
            <p className="text-muted-foreground">Your system is running smoothly.</p>
          </CardContent>
        </Card>
      )}
      
      {!error && errors.length > 0 && (
        <div className="space-y-4">
          {errors.map((errorLog) => (
            <Card key={errorLog.id} className={errorLog.resolved ? 'bg-gray-50 dark:bg-gray-900/50 opacity-70' : ''}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{errorLog.component}</CardTitle>
                    <Badge className={getSeverityColor(errorLog.severity)}>
                      {errorLog.severity}
                    </Badge>
                  </div>
                  {getStatusIcon(errorLog.resolved)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(errorLog.created_at || '').toLocaleString()}
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{errorLog.message}</p>
                {errorLog.stack_trace && (
                  <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-2 mb-4 overflow-auto max-h-32 rounded">
                    {errorLog.stack_trace}
                  </pre>
                )}
                <div className="flex justify-between items-center">
                  {!errorLog.resolved ? (
                    <Button 
                      variant="outline"
                      size="sm" 
                      onClick={() => handleResolveError(errorLog.id)}
                    >
                      Mark as Resolved
                    </Button>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      Resolved: {errorLog.resolved_at && new Date(errorLog.resolved_at).toLocaleString()}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {loading && (
        <div className="flex items-center justify-center h-40">
          <RefreshCw className="h-8 w-8 text-primary animate-spin" />
        </div>
      )}
    </div>
  );
};
