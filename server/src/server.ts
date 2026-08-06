import { SystemService } from './services/system.service';
import { DockerService } from './services/docker.service';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const startDaemon = async () => {
  console.log('Booting Sierra Leone Server System Daemon...');

  try {
    // Perform initial system health check
    const metrics = await SystemService.getMetrics();
    console.log(`✅ System Hardware Initialized. CPU Load: ${metrics.cpuUsage}% | Free RAM: ${(metrics.freeMemory / 1024 / 1024).toFixed(1)} MB`);

    const containers = await DockerService.listContainers();
    console.log(`✅ Docker Socket Connected. Active Containers: ${containers.length}`);

    console.log('✅ SLS System Daemon is running successfully.');
  } catch (error) {
    console.error('⚠️ Daemon started with warnings (some system tools may require root or active docker daemon):', error);
  }
};

startDaemon();
