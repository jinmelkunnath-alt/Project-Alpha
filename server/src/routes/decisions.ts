import { Router, type Response } from 'express';
import * as decisions from '../services/decisions';
import { FirebaseNotConfiguredError } from '../config/firebase';

const router = Router();

function handleError(res: Response, err: unknown) {
  if (err instanceof FirebaseNotConfiguredError) {
    return res.status(503).json({ error: err.message, code: 'FIREBASE_NOT_CONFIGURED' });
  }
  if (err instanceof decisions.DecisionNotFoundError) {
    return res.status(404).json({ error: 'Decision not found.' });
  }
  const message = err instanceof Error ? err.message : 'Internal error';
  return res.status(500).json({ error: message });
}

router.get('/', async (_req, res) => {
  try {
    const list = await decisions.listDecisions();
    res.json({ decisions: list, count: list.length });
  } catch (err) {
    handleError(res, err);
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description } = (req.body ?? {}) as {
      title?: unknown;
      description?: unknown;
    };
    if (typeof title !== 'string' || title.trim().length === 0) {
      return res.status(400).json({ error: 'A non-empty "title" is required.' });
    }
    const decision = await decisions.createDecision({
      title,
      description: typeof description === 'string' ? description : null,
    });
    res.status(201).json({ decision });
  } catch (err) {
    handleError(res, err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const decision = await decisions.getDecision(req.params.id);
    if (!decision) return res.status(404).json({ error: 'Decision not found.' });
    res.json({ decision });
  } catch (err) {
    handleError(res, err);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const decision = await decisions.updateDecision(req.params.id, (req.body ?? {}) as decisions.DecisionPatch);
    res.json({ decision });
  } catch (err) {
    handleError(res, err);
  }
});

export default router;
