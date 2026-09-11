import { randomUUID } from 'node:crypto';
import { getDb, getStorageBucket } from '../config/firebase';

/**
 * Firestore service module for PROJECT ALPHA.
 *
 * Top-level collection: `decisions/{decisionId}`
 * Each decision owns subcollections for pipeline stages:
 *   evidence / research / debate / verification / risks / verdict / monitoring
 *
 * Schema is intentionally minimal for now — future milestones extend the
 * per-stage document shapes without restructuring.
 */

export class DecisionNotFoundError extends Error {
  constructor(id: string) {
    super(`Decision not found: ${id}`);
    this.name = 'DecisionNotFoundError';
  }
}

/** Loose shape for pipeline-stage documents (refined in later milestones). */
export type StageData = Record<string, unknown>;

const COLLECTION = 'decisions';

interface DecisionDoc {
  title: string;
  description: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface DecisionInput {
  title: string;
  description?: string | null;
}

export interface DecisionPatch {
  title?: string;
  description?: string | null;
  status?: string;
}

function serialize(id: string, raw: DecisionDoc) {
  return {
    id,
    title: raw.title,
    description: raw.description,
    status: raw.status,
    created_at: raw.createdAt,
    updated_at: raw.updatedAt,
  };
}

// ---------- Decisions ----------

export async function createDecision(input: DecisionInput) {
  const now = new Date().toISOString();
  const id = randomUUID();
  const doc: DecisionDoc = {
    title: input.title.trim(),
    description: input.description ?? null,
    status: 'draft',
    createdAt: now,
    updatedAt: now,
  };
  await getDb().collection(COLLECTION).doc(id).set(doc);
  return serialize(id, doc);
}

export async function getDecision(id: string) {
  const snap = await getDb().collection(COLLECTION).doc(id).get();
  if (!snap.exists) return null;
  return serialize(snap.id, snap.data() as DecisionDoc);
}

export async function listDecisions(limit = 100) {
  const snap = await getDb()
    .collection(COLLECTION)
    .orderBy('createdAt', 'desc')
    .limit(limit)
    .get();
  return snap.docs.map((d) => serialize(d.id, d.data() as DecisionDoc));
}

export async function updateDecision(id: string, patch: DecisionPatch) {
  const ref = getDb().collection(COLLECTION).doc(id);
  const snap = await ref.get();
  if (!snap.exists) throw new DecisionNotFoundError(id);
  const next: Partial<DecisionDoc> = { updatedAt: new Date().toISOString() };
  if (patch.title !== undefined) next.title = patch.title.trim();
  if (patch.description !== undefined) next.description = patch.description;
  if (patch.status !== undefined) next.status = patch.status;
  await ref.update(next);
  const updated = await ref.get();
  return serialize(updated.id, updated.data() as DecisionDoc);
}

// ---------- Pipeline stages (subcollections) ----------

async function addStage(decisionId: string, stage: string, data: StageData) {
  const ref = getDb().collection(COLLECTION).doc(decisionId).collection(stage).doc();
  await ref.set({ ...data, createdAt: new Date().toISOString() });
  return ref.id;
}

export const storeEvidence = (decisionId: string, data: StageData) =>
  addStage(decisionId, 'evidence', data);

export const storeResearch = (decisionId: string, data: StageData) =>
  addStage(decisionId, 'research', data);

export const storeDebate = (decisionId: string, data: StageData) =>
  addStage(decisionId, 'debate', data);

export const storeVerification = (decisionId: string, data: StageData) =>
  addStage(decisionId, 'verification', data);

export const storeRisk = (decisionId: string, data: StageData) =>
  addStage(decisionId, 'risks', data);

export const storeVerdict = (decisionId: string, data: StageData) =>
  addStage(decisionId, 'verdict', data);

// Monitoring configuration (one doc per configuration revision).
export const storeMonitoringConfig = (decisionId: string, data: StageData) =>
  addStage(decisionId, 'monitoring', data);

// ---------- Document storage (Firebase Storage) ----------

export interface UploadedDocument {
  path: string;
  url: string;
}

export async function uploadDocument(
  decisionId: string,
  fileName: string,
  data: Buffer,
  contentType?: string
): Promise<UploadedDocument> {
  const bucket = getStorageBucket().bucket();
  const path = `decisions/${decisionId}/documents/${fileName}`;
  const file = bucket.file(path);
  await file.save(data, { contentType, metadata: { contentType } });
  const [url] = await file.getSignedUrl({
    action: 'read',
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
  });
  return { path, url };
}
