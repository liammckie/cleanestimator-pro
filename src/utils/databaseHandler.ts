
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import type { PostgrestError, PostgrestSingleResponse } from "@supabase/supabase-js";

// Define helper types for better readability and type safety
type PublicSchema = Database['public'];
type Tables = PublicSchema['Tables'];
type TableName = keyof Tables;

// Helper type to get the Row type for a given table
type TableRow<T extends TableName> = Tables[T]['Row'];
// Helper type to get the Insert type for a given table
type TableInsert<T extends TableName> = Tables[T]['Insert'];
// Helper type to get the Update type for a given table
type TableUpdate<T extends TableName> = Tables[T]['Update'];

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
    data: TableRow<T>[] | null;
    error: PostgrestError | null;
  }> {
    let query = supabase.from(table).select(options?.select || '*');

    if (options?.filter) {
      Object.entries(options.filter).forEach(([column, value]) => {
        query = query.eq(column, value);
      });
    }

    if (options?.order) {
      query = query.order(options.order.column, {
        ascending: options.order.ascending ?? true,
      });
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.range) {
      query = query.range(options.range[0], options.range[1]);
    }

    const result = await query;
    return { data: result.data as TableRow<T>[] | null, error: result.error };
  },

  /**
   * Insert data into a specific table
   * @param table The table name
   * @param data The data to insert (single object or array of objects)
   */
  async insert<T extends TableName>(
    table: T,
    data: Tables[T]['Insert'] | Tables[T]['Insert'][]
  ): Promise<{
    data: TableRow<T>[] | null;
    error: PostgrestError | null;
  }> {
    const result = await supabase
      .from(table)
      .insert(data)
      .select();
    return { data: result.data as TableRow<T>[] | null, error: result.error };
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
    filter: Partial<TableRow<T>>
  ): Promise<{
    data: TableRow<T>[] | null;
    error: PostgrestError | null;
  }> {
    let queryBuilder = supabase.from(table).update(data);

    Object.entries(filter).forEach(([column, value]) => {
      queryBuilder = queryBuilder.eq(column, value);
    });

    const result = await queryBuilder.select();
    return { data: result.data as TableRow<T>[] | null, error: result.error };
  },

  /**
   * Delete data from a specific table
   * @param table The table name
   * @param filter The filter to apply for the deletion
   */
  async delete<T extends TableName>(
    table: T,
    filter: Partial<TableRow<T>>
  ): Promise<{
    data: TableRow<T>[] | null;
    error: PostgrestError | null;
  }> {
    let queryBuilder = supabase.from(table).delete();

    Object.entries(filter).forEach(([column, value]) => {
      queryBuilder = queryBuilder.eq(column, value);
    });
    
    const result = await queryBuilder.select();
    return { data: result.data as TableRow<T>[] | null, error: result.error };
  },

  /**
   * Execute a custom query using the RPC functionality
   * @param functionName The function name
   * @param params The parameters
   */
  async rpc<TResult = any, TParams = Record<string, any>>(
    functionName: string,
    params?: TParams
  ): Promise<{ data: TResult | null; error: PostgrestError | null }> {
    const result = await supabase.rpc(functionName, params as any);
    return { data: result.data, error: result.error };
  }
};
