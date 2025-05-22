
import { supabase, trackDatabaseError } from "./client";
import { TableName, TableColumns, DatabaseResponse } from "./types";

/**
 * Creates a new record in the specified table
 * @param tableName - The name of the table to insert into
 * @param record - The record data to insert
 * @returns A promise containing the inserted data or error
 */
export const createRecord = async <T = any>(tableName: TableName, record: TableColumns): Promise<DatabaseResponse<T[]>> => {
  try {
    // Convert record to array if it's not already an array
    const recordToInsert = Array.isArray(record) ? record : [record];
    
    const { data, error } = await supabase
      .from(tableName)
      .insert(recordToInsert as any[])
      .select();
    
    if (error) {
      trackDatabaseError(
        `Error creating record in ${tableName}: ${error.message}`,
        'medium',
        error,
        { record }
      );
      return { data: null, error };
    }
    
    return { data: data as T[], error: null };
  } catch (error: any) {
    trackDatabaseError(
      `Exception in createRecord for ${tableName}: ${error.message}`,
      'high',
      error,
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
export const updateRecord = async <T = any>(
  tableName: TableName,
  id: string,
  updates: TableColumns
): Promise<DatabaseResponse<T[]>> => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .update(updates as any)
      .eq('id', id)
      .select();
    
    if (error) {
      trackDatabaseError(
        `Error updating record in ${tableName} with ID ${id}: ${error.message}`,
        'medium',
        error,
        { updates }
      );
      return { data: null, error };
    }
    
    return { data: data as T[], error: null };
  } catch (error: any) {
    trackDatabaseError(
      `Exception in updateRecord for ${tableName} with ID ${id}: ${error.message}`,
      'high',
      error,
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
export const deleteRecord = async (tableName: TableName, id: string): Promise<{ success: boolean; error: any | null }> => {
  try {
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id);
    
    if (error) {
      trackDatabaseError(
        `Error deleting record from ${tableName} with ID ${id}: ${error.message}`,
        'medium',
        error
      );
      return { success: false, error };
    }
    
    return { success: true, error: null };
  } catch (error: any) {
    trackDatabaseError(
      `Exception in deleteRecord for ${tableName} with ID ${id}: ${error.message}`,
      'high',
      error
    );
    return { success: false, error };
  }
};
