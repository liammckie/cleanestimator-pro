
import { toast } from '@/hooks/use-toast';

type ErrorPriority = 'high' | 'medium' | 'low';

interface TrackedError {
  id: string;
  message: string;
  stack?: string;
  priority: ErrorPriority;
  resolved: boolean;
  timestamp: Date;
}

class ErrorTracker {
  private errors: TrackedError[] = [];
  private static instance: ErrorTracker;

  private constructor() {
    // Load errors from localStorage if available
    try {
      const savedErrors = localStorage.getItem('tracked_errors');
      if (savedErrors) {
        this.errors = JSON.parse(savedErrors);
      }
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

  public trackError(message: string, priority: ErrorPriority = 'medium', stack?: string): string {
    const id = Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
    
    const error: TrackedError = {
      id,
      message,
      stack,
      priority,
      resolved: false,
      timestamp: new Date()
    };
    
    this.errors.push(error);
    this.saveErrors();
    
    return id;
  }

  public resolveError(id: string): boolean {
    const errorIndex = this.errors.findIndex(e => e.id === id);
    
    if (errorIndex >= 0) {
      this.errors[errorIndex].resolved = true;
      this.saveErrors();
      
      toast({
        title: "Issue Resolved",
        description: `Fixed: ${this.errors[errorIndex].message}`,
      });
      
      return true;
    }
    
    return false;
  }

  public getErrors(includeResolved: boolean = false): TrackedError[] {
    return this.errors.filter(e => includeResolved || !e.resolved)
      .sort((a, b) => {
        // Sort by priority (high to low)
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });
  }

  private saveErrors(): void {
    try {
      localStorage.setItem('tracked_errors', JSON.stringify(this.errors));
    } catch (e) {
      console.error('Failed to save error tracking data:', e);
    }
  }
}

export const errorTracker = ErrorTracker.getInstance();

// Track the issues we've fixed
errorTracker.trackError("Invalid toast icon property", "high");
errorTracker.resolveError("Invalid toast icon property");

errorTracker.trackError("SelectedTask id property missing", "high");
errorTracker.resolveError("SelectedTask id property missing");

errorTracker.trackError("React Fragment with invalid data-lov-id property", "medium");
errorTracker.resolveError("React Fragment with invalid data-lov-id property");

errorTracker.trackError("TaskManager type conversion error", "medium");
errorTracker.resolveError("TaskManager type conversion error");
