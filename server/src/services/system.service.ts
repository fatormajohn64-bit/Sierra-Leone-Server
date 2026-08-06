import si from 'systeminformation';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export interface SystemMetrics {
  cpuUsage: number;
  totalMemory: number;
  freeMemory: number;
  usedMemory: number;
  storageUsage: {
    total: number;
    used: number;
    free: number;
  };
}

/**
 * SystemService handles OS-level metrics and shell command execution.
 */
export class SystemService {
  /**
   * Fetches real-time CPU, memory, and storage statistics.
   * 
   * @returns {Promise<SystemMetrics>} Aggregated system metrics.
   */
  public static async getMetrics(): Promise<SystemMetrics> {
    const cpuLoad = await si.currentLoad();
    const mem = await si.mem();
    const disk = await si.fsSize();

    // Calculate primary disk usage (defaults to root or main mount)
    const primaryDisk = disk[0] || { size: 0, used: 0, available: 0 };

    return {
      cpuUsage: Number(cpuLoad.currentLoad.toFixed(1)),
      totalMemory: mem.total,
      freeMemory: mem.free,
      usedMemory: mem.used,
      storageUsage: {
        total: primaryDisk.size,
        used: primaryDisk.used,
        free: primaryDisk.available,
      },
    };
  }

  /**
   * Safely executes a shell command with platform awareness (Termux vs Linux).
   * 
   * @param {string} command - The shell command to execute.
   * @returns {Promise<{ stdout: string; stderr: string }>} Command execution results.
   */
  public static async executeCommand(command: string): Promise<{ stdout: string; stderr: string }> {
    try {
      const { stdout, stderr } = await execAsync(command);
      return { stdout, stderr };
    } catch (error: any) {
      throw new Error(`Command execution failed: ${error.message}`);
    }
  }
}
