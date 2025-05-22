
import { supabase, trackDatabaseError } from "./client";
import { DatabaseResponse } from "./types";

/**
 * Runs a health check on the database and tables
 * @returns A promise containing the health check results
 */
export const runDatabaseHealthCheck = async (): Promise<DatabaseResponse> => {
  try {
    const { data, error } = await supabase.functions.invoke('project-health');
    
    if (error) {
      trackDatabaseError(
        `Error running database health check: ${error.message}`,
        'high',
        error
      );
      return { data: null, error };
    }
    
    return { data, error: null };
  } catch (error: any) {
    trackDatabaseError(
      `Exception in runDatabaseHealthCheck: ${error.message}`,
      'high',
      error
    );
    return { data: null, error };
  }
};
