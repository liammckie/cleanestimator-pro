
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Tables = Database['public']['Tables'];
type TableName = keyof Tables;

/**
 * General purpose database handler functions to streamline database operations
 */
export const databaseHandler = {
  /**
   * Fetch data from a specific table
   * @param table The table name
   * @param options Query options
   */
  async fetch<T extends TableName>(
    table: T,
    options?: {
      select?: string;
      filter?: Record<string, any>;
      order?: { column: string; ascending?: boolean };
      limit?: number;
      range?: [number, number];
    }
  ): Promise<{ 
    data: Tables[T]['Row'][] | null; 
    error: any 
  }> {
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

    const result = await query;
    return { data: result.data, error: result.error };
  },

  /**
   * Insert data into a specific table
   * @param table The table name
   * @param data The data to insert
   */
  async insert<T extends TableName>(
    table: T,
    data: Tables[T]['Insert'] | Tables[T]['Insert'][]
  ): Promise<{ 
    data: Tables[T]['Row'][] | null; 
    error: any 
  }> {
    const result = await supabase.from(table).insert(data).select();
    return { data: result.data, error: result.error };
  },

  /**
   * Update data in a specific table
   * @param table The table name
   * @param data The data to update
   * @param filter The filter to apply for the update
   */
  async update<T extends TableName>(
    table: T,
    data: Tables[T]['Update'],
    filter: Record<string, any>
  ): Promise<{ 
    data: Tables[T]['Row'][] | null; 
    error: any 
  }> {
    let query = supabase.from(table).update(data);

    // Apply filters
    Object.entries(filter).forEach(([column, value]) => {
      query = query.eq(column, value);
    });

    const result = await query.select();
    return { data: result.data, error: result.error };
  },

  /**
   * Delete data from a specific table
   * @param table The table name
   * @param filter The filter to apply for the deletion
   */
  async delete<T extends TableName>(
    table: T,
    filter: Record<string, any>
  ): Promise<{ 
    data: Tables[T]['Row'][] | null; 
    error: any 
  }> {
    let query = supabase.from(table).delete();

    // Apply filters
    Object.entries(filter).forEach(([column, value]) => {
      query = query.eq(column, value);
    });

    const result = await query.select();
    return { data: result.data, error: result.error };
  },

  /**
   * Execute a custom query using the RPC functionality
   * @param functionName The function name
   * @param params The parameters
   */
  async rpc<T>(
    functionName: string,
    params?: Record<string, any>
  ): Promise<{ data: T | null; error: any }> {
    const result = await supabase.rpc(functionName, params);
    return { data: result.data, error: result.error };
  }
};
