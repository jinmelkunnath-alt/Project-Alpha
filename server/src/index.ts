import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { isFirebaseConfigured } from './config/firebase';
import healthRouter from './routes/health';
import decisionsRouter from './routes/decisions';

const app = express();
const PORT = Number(process.env.PORT ?? 3001);

app.use(cors());
app.use(express.json());

app.get('/api', (_req, res) => {
  res.json({
    service: 'project-alpha',
    version: '0.1.0',
    status: 'online',
    firebase: { configured: isFirebaseConfigured },
  });
});

app.use('/api', healthRouter);
app.use('/api/decisions', decisionsRouter);

// Fallback 404 for unknown API routes.
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`[project-alpha] API listening on http://localhost:${PORT}`);
  console.log(
    `[project-alpha] Firebase: ${
      isFirebaseConfigured
        ? 'configured'
        : 'NOT configured — running local-only (set env vars, see server/.env.example)'
    }`
  );
});
