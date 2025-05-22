
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { runDatabaseHealthCheck } from '@/utils/database';
import { 
  AlertCircle, 
  CheckCircle2, 
  Database, 
  RefreshCw, 
  Server, 
  ShieldCheck,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';

// Define the structure of health data returned from the edge function
interface HealthCheck {
  timestamp: string;
  version: string;
  status: 'healthy' | 'unhealthy';
  checks: {
    [key: string]: {
      status: 'healthy' | 'unhealthy' | 'pending';
      message?: string;
    };
  };
  errors: {
    component: string;
    message: string;
    timestamp: string;
  }[];
}

export const ProjectHealthDashboard: React.FC = () => {
  const [healthData, setHealthData] = useState<HealthCheck | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHealthData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Call the edge function directly
      const { data, error: funcError } = await supabase.functions.invoke('project-health');
      
      if (funcError) {
        setError(`Error fetching health data: ${funcError.message}`);
        console.error('Health check error:', funcError);
      } else if (data) {
        setHealthData(data as HealthCheck);
      }
    } catch (err: any) {
      setError(`Failed to fetch health data: ${err.message}`);
      console.error('Health check exception:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHealthData();
  }, []);

  // Determine overall status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-500 text-white';
      case 'unhealthy':
        return 'bg-red-500 text-white';
      default:
        return 'bg-yellow-500 text-white';
    }
  };

  // Get icon for status
  const getStatusIcon = (status: string) => {
    return status === 'healthy' ? (
      <CheckCircle2 className="w-5 h-5 text-green-500" />
    ) : (
      <AlertCircle className="w-5 h-5 text-red-500" />
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Project Health</h2>
        <Button 
          onClick={fetchHealthData}
          variant="outline"
          className="flex items-center gap-2"
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>
      
      {error && (
        <Card className="border-red-300 bg-red-50 dark:bg-red-950 dark:border-red-800">
          <CardContent className="pt-6">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <p className="font-medium text-red-600 dark:text-red-400">Error Fetching Health Data</p>
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!error && !isLoading && healthData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-full">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>System Status</CardTitle>
                <Badge 
                  className={getStatusColor(healthData.status)}
                >
                  {healthData.status.toUpperCase()}
                </Badge>
              </div>
              <CardDescription>
                Last checked: {new Date(healthData.timestamp).toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(healthData.checks).map(([key, check]) => (
                  <div key={key} className="border rounded-lg p-3 flex flex-col items-center text-center">
                    <div className="mb-2">
                      {key === 'database' ? (
                        <Database className="h-8 w-8 text-primary" />
                      ) : key === 'workflows' ? (
                        <Activity className="h-8 w-8 text-primary" />
                      ) : (
                        <Server className="h-8 w-8 text-primary" />
                      )}
                    </div>
                    <p className="text-sm font-medium">{key}</p>
                    <div className="flex items-center mt-2">
                      {getStatusIcon(check.status)}
                      <span className="text-xs ml-1">
                        {check.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              {healthData.errors.length > 0 && (
                <>
                  <Separator className="my-4" />
                  <div className="mt-4">
                    <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      System Errors
                    </h3>
                    <div className="space-y-2 max-h-36 overflow-y-auto text-sm">
                      {healthData.errors.map((err, idx) => (
                        <div key={idx} className="bg-red-50 dark:bg-red-950 p-2 rounded-md">
                          <p className="font-medium text-red-600 dark:text-red-400">{err.component}</p>
                          <p className="text-red-600 dark:text-red-400">{err.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="col-span-full lg:col-span-2">
            <CardHeader>
              <CardTitle>Database Health</CardTitle>
              <CardDescription>Status of your database tables and connections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(healthData.checks)
                  .filter(([key]) => ['database', 'workflows', 'productivity_rates', 'services'].includes(key))
                  .map(([key, check]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Database className="h-5 w-5 text-primary" />
                        <span className="font-medium">{key}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{check.message}</span>
                        {getStatusIcon(check.status)}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Version Info</CardTitle>
              <CardDescription>System version information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Health Check Version</span>
                  <span className="font-mono text-sm">{healthData.version}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Last Updated</span>
                  <span className="text-sm">{new Date(healthData.timestamp).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-600 mt-4">
                  <ShieldCheck className="h-5 w-5" />
                  <span>Edge Function Active</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {isLoading && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center h-40">
              <RefreshCw className="h-8 w-8 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground">Fetching health data...</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProjectHealthDashboard;
