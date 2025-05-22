
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/spinner';
import { CheckCircle, XCircle, AlertCircle, RefreshCw, Server, Database, Wifi, AlertTriangle } from 'lucide-react';
import { errorTracker } from '@/utils/errorTracker';
import { useToast } from '@/hooks/use-toast';
import { ErrorTracker } from '../common/ErrorTracker';

// Types
interface HealthCheckResponse {
  timestamp: string;
  version: string;
  status: 'healthy' | 'unhealthy' | 'degraded';
  checks: {
    database: { status: string; message: string };
    workflows: { status: string; message: string };
    productivity_rates: { status: string; message: string };
    services: { status: string; message: string };
  };
  errors: Array<{
    component: string;
    message: string;
    timestamp: string;
  }>;
}

interface SystemHealthLog {
  id: string;
  created_at: string;
  health_data: HealthCheckResponse;
  status: 'healthy' | 'unhealthy' | 'degraded';
  version: string;
}

export const ProjectHealthDashboard: React.FC = () => {
  const [healthData, setHealthData] = useState<HealthCheckResponse | null>(null);
  const [healthLogs, setHealthLogs] = useState<SystemHealthLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [checkingHealth, setCheckingHealth] = useState<boolean>(false);
  const { toast } = useToast();

  // Fetch health data
  const fetchHealthCheck = async () => {
    setCheckingHealth(true);
    try {
      const { data, error } = await supabase.functions.invoke('project-health');
      
      if (error) throw error;
      
      setHealthData(data as HealthCheckResponse);
      
      toast({
        title: "Health Check Completed",
        description: `System status: ${data.status}`,
      });
    } catch (error) {
      console.error('Error fetching health check:', error);
      errorTracker.trackError(
        `Failed to fetch health check: ${error.message}`,
        'high',
        'network',
        error.stack
      );
      
      toast({
        title: "Health Check Failed",
        description: "Could not verify system health. Please try again.",
        variant: "destructive"
      });
    } finally {
      setCheckingHealth(false);
    }
  };

  // Fetch health logs
  const fetchHealthLogs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('system_health_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
        
      if (error) throw error;
      
      if (data && data.length > 0) {
        setHealthLogs(data as SystemHealthLog[]);
        setHealthData(data[0].health_data);
      }
    } catch (error) {
      console.error('Error fetching health logs:', error);
      errorTracker.trackError(
        `Failed to fetch health logs: ${error.message}`,
        'medium',
        'database',
        error.stack
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealthLogs();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-500';
      case 'unhealthy':
        return 'bg-red-500';
      case 'degraded':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'unhealthy':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'degraded':
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getComponentIcon = (component: string) => {
    switch (component) {
      case 'database':
        return <Database className="h-4 w-4 mr-1" />;
      case 'server':
        return <Server className="h-4 w-4 mr-1" />;
      case 'network':
        return <Wifi className="h-4 w-4 mr-1" />;
      default:
        return <AlertTriangle className="h-4 w-4 mr-1" />;
    }
  };

  // Get error statistics
  const errorStats = errorTracker.getErrorStats();

  if (loading && !healthData) {
    return (
      <div className="flex items-center justify-center h-96">
        <Spinner className="h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Project Health Dashboard</h1>
        <Button 
          onClick={fetchHealthCheck} 
          disabled={checkingHealth}
          className="flex items-center gap-2"
        >
          {checkingHealth ? <Spinner className="h-4 w-4" /> : <RefreshCw className="h-4 w-4" />}
          Check Now
        </Button>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="errors">Error Tracker</TabsTrigger>
          <TabsTrigger value="history">Health History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 pt-4">
          {healthData && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">System Status</CardTitle>
                  <Badge className={getStatusColor(healthData.status) + " text-white"}>
                    {healthData.status.toUpperCase()}
                  </Badge>
                </div>
                <CardDescription>
                  Last checked: {new Date(healthData.timestamp).toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(healthData.checks).map(([key, check]) => (
                  <Card key={key} className="shadow-sm">
                    <CardHeader className="py-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg capitalize">{key.replace(/_/g, ' ')}</CardTitle>
                        {getStatusIcon(check.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="py-3">
                      <p className="text-sm text-muted-foreground">{check.message}</p>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Error Statistics</CardTitle>
              <CardDescription>Active errors across the system</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="shadow-sm">
                <CardHeader className="py-3">
                  <CardTitle className="text-lg">By Priority</CardTitle>
                </CardHeader>
                <CardContent className="py-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Badge className="bg-red-500 text-white mr-2">High</Badge>
                      </span>
                      <span className="font-semibold">{errorStats.byPriority.high}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Badge className="bg-yellow-500 text-white mr-2">Medium</Badge>
                      </span>
                      <span className="font-semibold">{errorStats.byPriority.medium}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Badge className="bg-blue-500 text-white mr-2">Low</Badge>
                      </span>
                      <span className="font-semibold">{errorStats.byPriority.low}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="py-3">
                  <CardTitle className="text-lg">By Source</CardTitle>
                </CardHeader>
                <CardContent className="py-3">
                  <div className="space-y-2">
                    {Object.entries(errorStats.bySource).map(([source, count]) => (
                      <div key={source} className="flex items-center justify-between">
                        <span className="flex items-center">
                          {getComponentIcon(source)}
                          <span className="capitalize">{source}</span>
                        </span>
                        <span className="font-semibold">{count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="py-3">
                  <CardTitle className="text-lg">Summary</CardTitle>
                </CardHeader>
                <CardContent className="py-3">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Total errors tracked:</span>
                      <span className="font-semibold">{errorStats.total}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Active issues:</span>
                      <span className="font-semibold">{errorStats.active}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Resolved:</span>
                      <span className="font-semibold">{errorStats.total - errorStats.active}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errors" className="pt-4">
          <ErrorTracker />
        </TabsContent>

        <TabsContent value="history" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Health Check History</CardTitle>
              <CardDescription>Recent system health checks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {healthLogs.length > 0 ? (
                  healthLogs.map((log) => (
                    <Card key={log.id} className="shadow-sm">
                      <CardHeader className="py-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg flex items-center gap-2">
                              {getStatusIcon(log.status)}
                              <span className="capitalize">{log.status}</span>
                            </CardTitle>
                            <CardDescription>
                              {new Date(log.created_at).toLocaleString()}
                            </CardDescription>
                          </div>
                          <Badge>v{log.version}</Badge>
                        </div>
                      </CardHeader>
                      {log.health_data?.errors?.length > 0 && (
                        <CardContent className="py-3">
                          <div className="space-y-2">
                            <h4 className="font-semibold">Issues Detected:</h4>
                            {log.health_data.errors.map((error, index) => (
                              <Alert key={index} variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle className="capitalize">{error.component}</AlertTitle>
                                <AlertDescription>{error.message}</AlertDescription>
                              </Alert>
                            ))}
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  ))
                ) : (
                  <div className="text-center p-8 text-muted-foreground">
                    No health check history available.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectHealthDashboard;
