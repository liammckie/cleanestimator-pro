
import { supabase } from "../integrations/supabase/client";
import { errorTracker } from "./errorTracker";

// Define a more specific type that matches the structure expected by Supabase
interface TableColumns {
  [key: string]: any;
}

// Define the type for table names
type TableName = 'industry_productivity_rates' | 'periodic_cleaning_services' | 'cleaning_workflows' | 'system_errors' | 'system_health_logs';

/**
 * Fetches all records from a specified table
 * @param tableName - The name of the table to fetch from
 * @returns A promise containing the data or error
 */
export const fetchAllRecords = async (tableName: TableName) => {
  try {
    const { data, error } = await supabase.from(tableName).select('*');
    
    if (error) {
      console.error(`Error fetching ${tableName}:`, error);
      errorTracker.trackError(
        `Error fetching ${tableName}: ${error.message}`,
        'medium',
        'database',
        error.stack
      );
      return { data: null, error };
    }
    
    return { data, error: null };
  } catch (error) {
    console.error(`Error in fetchAllRecords for ${tableName}:`, error);
    errorTracker.trackError(
      `Exception in fetchAllRecords for ${tableName}: ${error.message}`,
      'high',
      'database',
      error.stack
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
export const fetchRecordById = async (tableName: TableName, id: string) => {
  try {
    // Use maybeSingle instead of single to handle possibility of no records found
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error) {
      console.error(`Error fetching ${tableName} with ID ${id}:`, error);
      errorTracker.trackError(
        `Error fetching ${tableName} with ID ${id}: ${error.message}`,
        'medium',
        'database',
        error.stack
      );
      return { data: null, error };
    }
    
    return { data, error: null };
  } catch (error) {
    console.error(`Error in fetchRecordById for ${tableName} with ID ${id}:`, error);
    errorTracker.trackError(
      `Exception in fetchRecordById for ${tableName} with ID ${id}: ${error.message}`,
      'high',
      'database',
      error.stack
    );
    return { data: null, error };
  }
};

/**
 * Creates a new record in the specified table
 * @param tableName - The name of the table to insert into
 * @param record - The record data to insert
 * @returns A promise containing the inserted data or error
 */
export const createRecord = async (tableName: TableName, record: TableColumns) => {
  try {
    // Convert record to array if it's not already an array
    const recordToInsert = Array.isArray(record) ? record : [record];
    
    const { data, error } = await supabase
      .from(tableName)
      .insert(recordToInsert as any[])
      .select();
    
    if (error) {
      console.error(`Error creating record in ${tableName}:`, error);
      errorTracker.trackError(
        `Error creating record in ${tableName}: ${error.message}`,
        'medium',
        'database',
        error.stack,
        { record }
      );
      return { data: null, error };
    }
    
    return { data, error: null };
  } catch (error) {
    console.error(`Error in createRecord for ${tableName}:`, error);
    errorTracker.trackError(
      `Exception in createRecord for ${tableName}: ${error.message}`,
      'high',
      'database',
      error.stack,
      { record }
    );
    return { data: null, error };
  }
};

/**
 * Updates an existing record in the specified table
 * @param tableName - The name of the table to update
 * @param id - The ID of the record to update
 * @param updates - The data to update
 * @returns A promise containing the updated data or error
 */
export const updateRecord = async (
  tableName: TableName,
  id: string,
  updates: TableColumns
) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .update(updates as any)
      .eq('id', id)
      .select();
    
    if (error) {
      console.error(`Error updating record in ${tableName} with ID ${id}:`, error);
      errorTracker.trackError(
        `Error updating record in ${tableName} with ID ${id}: ${error.message}`,
        'medium',
        'database',
        error.stack,
        { updates }
      );
      return { data: null, error };
    }
    
    return { data, error: null };
  } catch (error) {
    console.error(`Error in updateRecord for ${tableName} with ID ${id}:`, error);
    errorTracker.trackError(
      `Exception in updateRecord for ${tableName} with ID ${id}: ${error.message}`,
      'high',
      'database',
      error.stack,
      { updates }
    );
    return { data: null, error };
  }
};

/**
 * Deletes a record from the specified table
 * @param tableName - The name of the table to delete from
 * @param id - The ID of the record to delete
 * @returns A promise containing the result of the deletion
 */
export const deleteRecord = async (tableName: TableName, id: string) => {
  try {
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Error deleting record from ${tableName} with ID ${id}:`, error);
      errorTracker.trackError(
        `Error deleting record from ${tableName} with ID ${id}: ${error.message}`,
        'medium',
        'database',
        error.stack
      );
      return { success: false, error };
    }
    
    return { success: true, error: null };
  } catch (error) {
    console.error(`Error in deleteRecord for ${tableName} with ID ${id}:`, error);
    errorTracker.trackError(
      `Exception in deleteRecord for ${tableName} with ID ${id}: ${error.message}`,
      'high',
      'database',
      error.stack
    );
    return { success: false, error };
  }
};

/**
 * Runs a health check on the database and tables
 * @returns A promise containing the health check results
 */
export const runDatabaseHealthCheck = async () => {
  try {
    const { data, error } = await supabase.functions.invoke('project-health');
    
    if (error) {
      errorTracker.trackError(
        `Error running database health check: ${error.message}`,
        'high',
        'network',
        error.stack
      );
      return { data: null, error };
    }
    
    return { data, error: null };
  } catch (error) {
    errorTracker.trackError(
      `Exception in runDatabaseHealthCheck: ${error.message}`,
      'high',
      'network',
      error.stack
    );
    return { data: null, error };
  }
};
