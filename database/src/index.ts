import knex, { Knex } from 'knex';
import config from '../knexfile';

// Determine the current environment, defaulting to development
const environment = process.env.NODE_ENV || 'development';
const connectionConfig = config[environment];

/**
 * Singleton database connection instance.
 * Using a singleton prevents connection leaks when imported by multiple files.
 */
export const db: Knex = knex(connectionConfig);

/**
 * Pings the database to ensure the connection pool is healthy.
 * Used by the API server's health check endpoints.
 * 
 * @returns {Promise<boolean>} True if connected, false otherwise
 */
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await db.raw('SELECT 1');
    return true;
  } catch (error) {
    console.error('[SLS Database] Connection check failed:', error);
    return false;
  }
}

// Export Knex types so importing workspaces have access to them
export type { Knex };
    
