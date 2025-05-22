
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, AlertCircle, Info, AlertTriangle, Database, Server, Wifi } from 'lucide-react';
import { errorTracker } from '@/utils/errorTracker';

export const ErrorTracker: React.FC = () => {
  const [errors, setErrors] = useState(errorTracker.getErrors());
  const [showResolved, setShowResolved] = useState(false);
  const [filterSource, setFilterSource] = useState<string | null>(null);
  const [filterPriority, setFilterPriority] = useState<string | null>(null);

  useEffect(() => {
    // Get filtered errors
    let filteredErrors = errorTracker.getErrors(showResolved);
    
    // Apply source filter if selected
    if (filterSource) {
      filteredErrors = filteredErrors.filter(e => e.source === filterSource);
    }
    
    // Apply priority filter if selected
    if (filterPriority) {
      filteredErrors = filteredErrors.filter(e => e.priority === filterPriority);
    }
    
    setErrors(filteredErrors);
  }, [showResolved, filterSource, filterPriority]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-amber-500 text-white';
      case 'low': return 'bg-blue-500 text-white';
      default: return 'bg-slate-500 text-white';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'client': return <AlertCircle className="h-4 w-4 mr-1 text-blue-500" />;
      case 'server': return <Server className="h-4 w-4 mr-1 text-purple-500" />;
      case 'database': return <Database className="h-4 w-4 mr-1 text-amber-500" />;
      case 'network': return <Wifi className="h-4 w-4 mr-1 text-green-500" />;
      default: return <Info className="h-4 w-4 mr-1 text-slate-500" />;
    }
  };

  const handleResolve = (id: string) => {
    errorTracker.resolveError(id);
    setErrors(errorTracker.getErrors(showResolved));
  };

  const handleUpdateStatus = (id: string, status: string) => {
    errorTracker.updateErrorStatus(id, status as any);
    setErrors(errorTracker.getErrors(showResolved));
  };

  if (errors.length === 0) {
    return (
      <div className="p-4">
        <Card className="bg-green-50">
          <CardContent className="py-6 flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <p className="text-green-800">All tracked issues have been resolved!</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <CardTitle className="text-lg flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
              Issue Tracker
            </CardTitle>
            
            <div className="flex items-center gap-2 flex-wrap">
              <Select value={filterSource || ''} onValueChange={(value) => setFilterSource(value || null)}>
                <SelectTrigger className="w-[140px] h-8">
                  <SelectValue placeholder="Filter by source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All sources</SelectItem>
                  <SelectItem value="client">Client</SelectItem>
                  <SelectItem value="server">Server</SelectItem>
                  <SelectItem value="database">Database</SelectItem>
                  <SelectItem value="network">Network</SelectItem>
                  <SelectItem value="unknown">Unknown</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterPriority || ''} onValueChange={(value) => setFilterPriority(value || null)}>
                <SelectTrigger className="w-[140px] h-8">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowResolved(!showResolved)}
              >
                {showResolved ? 'Hide Resolved' : 'Show Resolved'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active">
            <TabsList className="mb-4">
              <TabsTrigger value="active">Active Issues</TabsTrigger>
              <TabsTrigger value="all">All Issues</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active">
              <ul className="space-y-2">
                {errors.filter(error => !error.resolved).map((error) => (
                  <ErrorItem 
                    key={error.id} 
                    error={error} 
                    onResolve={handleResolve}
                    onUpdateStatus={handleUpdateStatus}
                  />
                ))}
                {errors.filter(error => !error.resolved).length === 0 && (
                  <div className="text-center p-4 text-muted-foreground">
                    No active issues found.
                  </div>
                )}
              </ul>
            </TabsContent>
            
            <TabsContent value="all">
              <ul className="space-y-2">
                {errors.map((error) => (
                  <ErrorItem 
                    key={error.id} 
                    error={error} 
                    onResolve={handleResolve} 
                    onUpdateStatus={handleUpdateStatus}
                  />
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

interface ErrorItemProps {
  error: any;
  onResolve: (id: string) => void;
  onUpdateStatus: (id: string, status: string) => void;
}

const ErrorItem: React.FC<ErrorItemProps> = ({ error, onResolve, onUpdateStatus }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-amber-500 text-white';
      case 'low': return 'bg-blue-500 text-white';
      default: return 'bg-slate-500 text-white';
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'investigating': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'in-progress': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'client': return <AlertCircle className="h-4 w-4 mr-1 text-blue-500" />;
      case 'server': return <Server className="h-4 w-4 mr-1 text-purple-500" />;
      case 'database': return <Database className="h-4 w-4 mr-1 text-amber-500" />;
      case 'network': return <Wifi className="h-4 w-4 mr-1 text-green-500" />;
      default: return <Info className="h-4 w-4 mr-1 text-slate-500" />;
    }
  };
  
  return (
    <li className={`p-3 rounded-md border ${error.resolved ? 'opacity-60 bg-slate-50' : 'bg-white'}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center mb-1 flex-wrap gap-2">
            <Badge className={getPriorityColor(error.priority)} variant="default">
              {error.priority}
            </Badge>
            <div className="flex items-center">
              {getSourceIcon(error.source)}
              <span className="text-xs text-muted-foreground capitalize">{error.source}</span>
            </div>
            <Badge className={getStatusColor(error.status)}>
              {error.status}
            </Badge>
            {error.resolved && (
              <Badge className="ml-2 bg-green-100 text-green-800 border-green-300">
                resolved
              </Badge>
            )}
          </div>
          <p className="text-sm font-medium">{error.message}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {new Date(error.timestamp).toLocaleString()}
          </p>
          
          {showDetails && error.stack && (
            <div className="mt-2 p-2 bg-slate-50 rounded text-xs overflow-x-auto">
              <pre className="whitespace-pre-wrap">{error.stack}</pre>
            </div>
          )}
          
          {showDetails && error.context && Object.keys(error.context).length > 0 && (
            <div className="mt-2">
              <h4 className="text-xs font-semibold mb-1">Context:</h4>
              <div className="p-2 bg-slate-50 rounded text-xs overflow-x-auto">
                <pre className="whitespace-pre-wrap">{JSON.stringify(error.context, null, 2)}</pre>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowDetails(!showDetails)}
            className="text-slate-600"
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </Button>
          
          {!error.resolved && (
            <>
              <Select defaultValue={error.status} onValueChange={(value) => onUpdateStatus(error.id, value)}>
                <SelectTrigger className="h-8 w-[130px]">
                  <SelectValue placeholder="Update status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                size="sm" 
                variant="ghost"
                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                onClick={() => onResolve(error.id)}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Resolve
              </Button>
            </>
          )}
        </div>
      </div>
    </li>
  );
};

export default ErrorTracker;
