
/**
 * Define a more specific type that matches the structure expected by Supabase
 */
export interface TableColumns {
  [key: string]: any;
}

/**
 * Define the type for table names - only include existing tables
 */
export type TableName = 'cleaning_workflows' | 'industry_productivity_rates' | 'periodic_cleaning_services' | 'cleaning_award_rates';

/**
 * Standard response type for database operations
 */
export interface DatabaseResponse<T = any> {
  data: T | null;
  error: any | null;
}
