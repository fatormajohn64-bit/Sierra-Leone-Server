import type { Knex } from 'knex';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from the root .env file
dotenv.config({ path: path.resolve(__line, '../../.env') });

/**
 * Enterprise connection pool configuration.
 * Adjusts min/max connections based on the environment to prevent connection starvation.
 */
const poolConfig = {
  min: process.env.NODE_ENV === 'production' ? 2 : 0,
  max: process.env.NODE_ENV === 'production' ? 10 : 5,
};

/**
 * Knex database configuration mapping environments to database connections.
 */
const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/sls_dev',
    pool: poolConfig,
    migrations: {
      directory: './src/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './src/seeds',
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: poolConfig,
    migrations: {
      directory: './src/migrations',
      tableName: 'knex_migrations',
    },
  },
};

export default config;
