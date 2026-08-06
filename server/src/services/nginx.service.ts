import * as fs from 'fs/promises';
import * as path from 'path';
import { SystemService } from './system.service';

/**
 * NginxService handles reverse proxy configuration files and service reloads.
 */
export class NginxService {
  private static sitesAvailable = process.env.NGINX_SITES_PATH || '/etc/nginx/conf.d';

  /**
   * Creates or updates a virtual host configuration file for a hosted website or API.
   * 
   * @param {string} domain - The domain name (e.g., myapp.sierraleoneserver.local).
   * @param {number} targetPort - The internal port the application is listening on.
   */
  public static async writeVhost(domain: string, targetPort: number): Promise<void> {
    const configContent = `
server {
    listen 80;
    server_name ${domain};

    location / {
        proxy_pass http://127.0.0.1:${targetPort};
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
`;

    const filePath = path.join(NginxService.sitesAvailable, `${domain}.conf`);
    await fs.writeFile(filePath, configContent.trim(), 'utf-8');
    await NginxService.reloadNginx();
  }

  /**
   * Triggers an Nginx configuration reload to apply changes without downtime.
   */
  public static async reloadNginx(): Promise<void> {
    try {
      await SystemService.executeCommand('nginx -s reload');
    } catch (error) {
      console.error('[Nginx Service] Failed to reload Nginx. Ensure permissions or service status are correct:', error);
      throw error;
    }
  }
                                         }
