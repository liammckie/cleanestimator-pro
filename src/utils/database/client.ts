
import { supabase } from "@/integrations/supabase/client";
import { errorTracker } from "../errorTracker";

/**
 * Exported supabase client with integrated error tracking
 */
export { supabase };

/**
 * Error tracking helper specifically for database operations
 * @param message - The error message to track
 * @param severity - The severity level of the error
 * @param error - The original error object
 * @param metadata - Optional additional metadata to log
 */
export const trackDatabaseError = (
  message: string, 
  severity: 'low' | 'medium' | 'high' = 'medium',
  error: any = null,
  metadata: any = {}
) => {
  console.error(message, error);
  errorTracker.trackError(
    message,
    severity,
    'database',
    error?.stack,
    metadata
  );
};
