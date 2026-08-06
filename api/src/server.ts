import app from './app';
import { checkDatabaseConnection } from '@sls/database';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load root environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const PORT = process.env.API_PORT || 4000;

const startServer = async () => {
  console.log('Booting Sierra Leone Server API...');

  // Ensure Database is reachable before accepting HTTP requests
  const isDbConnected = await checkDatabaseConnection();
  if (!isDbConnected) {
    console.error('CRITICAL: Unable to connect to the database. Exiting.');
    process.exit(1);
  }
  console.log('✅ Database connection established.');

  const server = app.listen(PORT, () => {
    console.log(`✅ SLS API listening on http://localhost:${PORT}`);
  });

  // Graceful shutdown handling
  const shutdown = () => {
    console.log('\nGracefully shutting down SLS API...');
    server.close(() => {
      console.log('HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
};

startServer();
