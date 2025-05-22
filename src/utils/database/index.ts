
// Re-export all database functions from their respective modules
export * from './client';
export * from './types';
export * from './read';
export * from './write';
export * from './health';

// Export a default object with all functions for backward compatibility
import { fetchAllRecords, fetchRecordById } from './read';
import { createRecord, updateRecord, deleteRecord } from './write';
import { runDatabaseHealthCheck } from './health';

// Consolidated export for backward compatibility
const databaseHandler = {
  fetchAllRecords,
  fetchRecordById,
  createRecord,
  updateRecord,
  deleteRecord,
  runDatabaseHealthCheck
};

export default databaseHandler;
