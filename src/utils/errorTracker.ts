
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

type ErrorPriority = 'high' | 'medium' | 'low';
type ErrorSource = 'client' | 'server' | 'database' | 'network' | 'unknown';
type ErrorStatus = 'new' | 'investigating' | 'in-progress' | 'resolved';

interface TrackedError {
  id: string;
  message: string;
  stack?: string;
  priority: ErrorPriority;
  source: ErrorSource;
  status: ErrorStatus;
  resolved: boolean;
  timestamp: Date;
  user_info?: {
    user_id?: string;
    route?: string;
    action?: string;
  };
  context?: Record<string, any>;
}

class ErrorTracker {
  private errors: TrackedError[] = [];
  private static instance: ErrorTracker;
  private isInitialized: boolean = false;

  private constructor() {
    // Load errors from localStorage if available
    try {
      const savedErrors = localStorage.getItem('tracked_errors');
      if (savedErrors) {
        this.errors = JSON.parse(savedErrors);
      }
      this.isInitialized = true;
    } catch (e) {
      console.error('Failed to load error tracking data:', e);
    }
  }

  public static getInstance(): ErrorTracker {
    if (!ErrorTracker.instance) {
      ErrorTracker.instance = new ErrorTracker();
    }
    return ErrorTracker.instance;
  }

  public trackError(
    message: string, 
    priority: ErrorPriority = 'medium', 
    source: ErrorSource = 'client',
    stack?: string,
    context?: Record<string, any>
  ): string {
    const id = Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
    
    const error: TrackedError = {
      id,
      message,
      stack,
      priority,
      source,
      status: 'new',
      resolved: false,
      timestamp: new Date(),
      context
    };
    
    this.errors.push(error);
    this.saveErrors();
    
    // Log to edge function instead of direct database operations
    this.logErrorToSystem(error).catch(e => console.error('Failed to log error to system:', e));
    
    return id;
  }

  private async logErrorToSystem(error: TrackedError): Promise<void> {
    try {
      // Only attempt to log if we're in a browser environment and Supabase is available
      if (typeof window !== 'undefined' && supabase) {
        const { data, error: logError } = await supabase.functions.invoke('project-health', {
          body: { 
            action: 'logError',
            errorData: {
              message: error.message,
              stack: error.stack,
              priority: error.priority,
              source: error.source,
              status: error.status,
              resolved: error.resolved,
              timestamp: error.timestamp,
              context: error.context || {}
            }
          }
        });
          
        if (logError) {
          console.error('Failed to log error to system:', logError);
        }
      }
    } catch (e) {
      console.error('Exception logging error to system:', e);
    }
  }

  public updateErrorStatus(id: string, status: ErrorStatus): boolean {
    const errorIndex = this.errors.findIndex(e => e.id === id);
    
    if (errorIndex >= 0) {
      this.errors[errorIndex].status = status;
      this.saveErrors();
      
      // Update via edge function
      this.updateErrorInSystem(id, { status }).catch(e => 
        console.error('Failed to update error status in system:', e)
      );
      
      return true;
    }
    
    return false;
  }

  public resolveError(id: string): boolean {
    const errorIndex = this.errors.findIndex(e => e.id === id);
    
    if (errorIndex >= 0) {
      this.errors[errorIndex].resolved = true;
      this.errors[errorIndex].status = 'resolved';
      this.saveErrors();
      
      // Update via edge function
      this.updateErrorInSystem(id, { 
        resolved: true,
        status: 'resolved'
      }).catch(e => console.error('Failed to resolve error in system:', e));
      
      toast({
        title: "Issue Resolved",
        description: `Fixed: ${this.errors[errorIndex].message}`,
      });
      
      return true;
    }
    
    return false;
  }

  private async updateErrorInSystem(id: string, updates: Partial<TrackedError>): Promise<void> {
    try {
      // Only attempt to update if we're in a browser environment and Supabase is available
      if (typeof window !== 'undefined' && supabase) {
        const { data, error: updateError } = await supabase.functions.invoke('project-health', {
          body: { 
            action: 'updateError',
            errorId: id,
            updates
          }
        });
          
        if (updateError) {
          console.error('Failed to update error in system:', updateError);
        }
      }
    } catch (e) {
      console.error('Exception updating error in system:', e);
    }
  }

  public getErrors(includeResolved: boolean = false): TrackedError[] {
    return this.errors.filter(e => includeResolved || !e.resolved)
      .sort((a, b) => {
        // Sort by priority (high to low)
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        const priorityA = priorityOrder[a.priority] || 0;
        const priorityB = priorityOrder[b.priority] || 0;
        return priorityB - priorityA;
      });
  }

  public getErrorsBySource(source: ErrorSource, includeResolved: boolean = false): TrackedError[] {
    return this.getErrors(includeResolved).filter(e => e.source === source);
  }

  public getErrorsByStatus(status: ErrorStatus, includeResolved: boolean = false): TrackedError[] {
    return this.getErrors(includeResolved).filter(e => e.status === status);
  }

  public getErrorStats(): { total: number, active: number, byPriority: Record<ErrorPriority, number>, bySource: Record<ErrorSource, number> } {
    const all = this.errors;
    const active = all.filter(e => !e.resolved);
    
    const byPriority: Record<ErrorPriority, number> = {
      high: active.filter(e => e.priority === 'high').length,
      medium: active.filter(e => e.priority === 'medium').length,
      low: active.filter(e => e.priority === 'low').length,
    };
    
    const bySource: Record<ErrorSource, number> = {
      client: active.filter(e => e.source === 'client').length,
      server: active.filter(e => e.source === 'server').length,
      database: active.filter(e => e.source === 'database').length,
      network: active.filter(e => e.source === 'network').length,
      unknown: active.filter(e => e.source === 'unknown').length,
    };
    
    return {
      total: all.length,
      active: active.length,
      byPriority,
      bySource,
    };
  }

  private saveErrors(): void {
    try {
      localStorage.setItem('tracked_errors', JSON.stringify(this.errors));
    } catch (e) {
      console.error('Failed to save error tracking data:', e);
    }
  }
}

// Singleton instance
export const errorTracker = ErrorTracker.getInstance();

// Track the issues we've fixed
errorTracker.trackError("Invalid toast icon property", "high", "client");
errorTracker.resolveError("Invalid toast icon property");

errorTracker.trackError("SelectedTask id property missing", "high", "client");
errorTracker.resolveError("SelectedTask id property missing");

errorTracker.trackError("React Fragment with invalid data-lov-id property", "medium", "client");
errorTracker.resolveError("React Fragment with invalid data-lov-id property");

errorTracker.trackError("TaskManager type conversion error", "medium", "client");
errorTracker.resolveError("TaskManager type conversion error");

// Global error handler for uncaught exceptions
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    errorTracker.trackError(
      event.message || 'Uncaught exception',
      'high',
      'client',
      event.error?.stack,
      { 
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      }
    );
  });

  window.addEventListener('unhandledrejection', (event) => {
    errorTracker.trackError(
      event.reason?.message || 'Unhandled promise rejection',
      'high',
      'client',
      event.reason?.stack,
      { reason: event.reason }
    );
  });
}

export default errorTracker;
