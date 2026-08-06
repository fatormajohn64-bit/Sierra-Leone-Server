import Docker from 'dockerode';

/**
 * DockerService manages container lifecycles via the Docker socket.
 */
export class DockerService {
  private static docker = new Docker({ socketPath: process.env.DOCKER_SOCKET || '/var/run/docker.sock' });

  /**
   * Lists all containers managed by SLS.
   * 
   * @returns {Promise<Docker.ContainerInfo[]>} Array of container details.
   */
  public static async listContainers(): Promise<Docker.ContainerInfo[]> {
    return await DockerService.docker.listContainers({ all: true });
  }

  /**
   * Starts a specific container by ID.
   * 
   * @param {string} containerId - The target container ID.
   */
  public static async startContainer(containerId: string): Promise<void> {
    const container = DockerService.docker.getContainer(containerId);
    await container.start();
  }

  /**
   * Stops a specific container by ID.
   * 
   * @param {string} containerId - The target container ID.
   */
  public static async stopContainer(containerId: string): Promise<void> {
    const container = DockerService.docker.getContainer(containerId);
    await container.stop();
  }
  }
