import { Router } from 'express';

const router = Router();

// Lightweight liveness probe. This is a UI/backend status only — it does NOT
// indicate that external AI or search services are connected.
router.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'project-alpha' });
});

export default router;
