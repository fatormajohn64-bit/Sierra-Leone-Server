import { Router } from 'express';
import { login, setupAdmin } from '../controllers/auth.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

// Public routes
router.post('/setup', setupAdmin);
router.post('/login', login);

// Protected test route (requires JWT Bearer token)
router.get('/me', requireAuth, (req, res) => {
  res.status(200).json({
    message: 'You are authenticated',
    user: req.user
  });
});

export default router;
