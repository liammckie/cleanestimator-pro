
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';
import { errorTracker } from '@/utils/errorTracker';

export const ErrorTracker: React.FC = () => {
  const [errors, setErrors] = useState(errorTracker.getErrors());
  const [showResolved, setShowResolved] = useState(false);

  useEffect(() => {
    setErrors(errorTracker.getErrors(showResolved));
  }, [showResolved]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-amber-500 text-white';
      case 'low': return 'bg-blue-500 text-white';
      default: return 'bg-slate-500 text-white';
    }
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
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
              Issue Tracker
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowResolved(!showResolved)}
            >
              {showResolved ? 'Hide Resolved' : 'Show Resolved'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {errors.map((error) => (
              <li key={error.id} className={`p-3 rounded-md border ${error.resolved ? 'opacity-60 bg-slate-50' : 'bg-white'}`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <Badge className={getPriorityColor(error.priority)} variant="default">
                        {error.priority}
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
                  </div>
                  {!error.resolved && (
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="text-green-600 hover:text-green-700 hover:bg-green-50"
                      onClick={() => {
                        errorTracker.resolveError(error.id);
                        setErrors(errorTracker.getErrors(showResolved));
                      }}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Mark Resolved
                    </Button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
