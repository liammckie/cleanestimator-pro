
import { supabase } from "@/integrations/supabase/client";

/**
 * General purpose database handler functions to streamline database operations
 */
export const databaseHandler = {
  /**
   * Fetch data from a specific table
   * @param table The table name
   * @param options Query options
   */
  async fetch<T>(
    table: string,
    options?: {
      select?: string;
      filter?: Record<string, any>;
      order?: { column: string; ascending?: boolean };
      limit?: number;
      range?: [number, number];
    }
  ): Promise<{ data: T[] | null; error: any }> {
    let query = supabase.from(table).select(options?.select || '*');

    // Apply filters
    if (options?.filter) {
      Object.entries(options.filter).forEach(([column, value]) => {
        query = query.eq(column, value);
      });
    }

    // Apply ordering
    if (options?.order) {
      query = query.order(options.order.column, {
        ascending: options.order.ascending ?? true
      });
    }

    // Apply limit
    if (options?.limit) {
      query = query.limit(options.limit);
    }

    // Apply range
    if (options?.range) {
      query = query.range(options.range[0], options.range[1]);
    }

    return await query;
  },

  /**
   * Insert data into a specific table
   * @param table The table name
   * @param data The data to insert
   */
  async insert<T>(
    table: string,
    data: Record<string, any> | Record<string, any>[]
  ): Promise<{ data: T[] | null; error: any }> {
    return await supabase.from(table).insert(data).select();
  },

  /**
   * Update data in a specific table
   * @param table The table name
   * @param data The data to update
   * @param filter The filter to apply for the update
   */
  async update<T>(
    table: string,
    data: Record<string, any>,
    filter: Record<string, any>
  ): Promise<{ data: T[] | null; error: any }> {
    let query = supabase.from(table).update(data);

    // Apply filters
    Object.entries(filter).forEach(([column, value]) => {
      query = query.eq(column, value);
    });

    return await query.select();
  },

  /**
   * Delete data from a specific table
   * @param table The table name
   * @param filter The filter to apply for the deletion
   */
  async delete<T>(
    table: string,
    filter: Record<string, any>
  ): Promise<{ data: T[] | null; error: any }> {
    let query = supabase.from(table).delete();

    // Apply filters
    Object.entries(filter).forEach(([column, value]) => {
      query = query.eq(column, value);
    });

    return await query.select();
  },

  /**
   * Execute a custom query using the RPC functionality
   * @param functionName The function name
   * @param params The parameters
   */
  async rpc<T>(
    functionName: string,
    params?: Record<string, any>
  ): Promise<{ data: T[] | null; error: any }> {
    return await supabase.rpc(functionName, params);
  }
};
