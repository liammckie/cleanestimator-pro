
import { supabase, trackDatabaseError } from "./client";
import { TableName, DatabaseResponse } from "./types";

/**
 * Fetches all records from a specified table
 * @param tableName - The name of the table to fetch from
 * @returns A promise containing the data or error
 */
export const fetchAllRecords = async <T = any>(tableName: TableName): Promise<DatabaseResponse<T[]>> => {
  try {
    const { data, error } = await supabase.from(tableName).select('*');
    
    if (error) {
      trackDatabaseError(
        `Error fetching ${tableName}: ${error.message}`,
        'medium',
        error
      );
      return { data: null, error };
    }
    
    return { data: data as T[], error: null };
  } catch (error: any) {
    trackDatabaseError(
      `Exception in fetchAllRecords for ${tableName}: ${error.message}`,
      'high',
      error
    );
    return { data: null, error };
  }
};

/**
 * Fetches a single record by ID
 * @param tableName - The name of the table to fetch from
 * @param id - The ID of the record to fetch
 * @returns A promise containing the data or error
 */
export const fetchRecordById = async <T = any>(tableName: TableName, id: string): Promise<DatabaseResponse<T>> => {
  try {
    // Use maybeSingle instead of single to handle possibility of no records found
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error) {
      trackDatabaseError(
        `Error fetching ${tableName} with ID ${id}: ${error.message}`,
        'medium',
        error
      );
      return { data: null, error };
    }
    
    return { data: data as T, error: null };
  } catch (error: any) {
    trackDatabaseError(
      `Exception in fetchRecordById for ${tableName} with ID ${id}: ${error.message}`,
      'high',
      error
    );
    return { data: null, error };
  }
};
