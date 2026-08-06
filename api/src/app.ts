import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/auth.routes';

const app: Application = express();

// Global Middlewares
app.use(helmet()); // Secure HTTP headers
app.use(cors()); // Allow Cross-Origin Resource Sharing from the React dashboard
app.use(express.json()); // Parse incoming JSON payloads

// Healthcheck Endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', service: 'SLS API', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/v1/auth', authRoutes);

// Global 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('[Express Error]', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
