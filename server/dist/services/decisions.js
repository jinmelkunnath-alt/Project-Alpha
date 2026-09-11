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
    constructor(id) {
        super(`Decision not found: ${id}`);
        this.name = 'DecisionNotFoundError';
    }
}
const COLLECTION = 'decisions';
function serialize(id, raw) {
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
export async function createDecision(input) {
    const now = new Date().toISOString();
    const id = randomUUID();
    const doc = {
        title: input.title.trim(),
        description: input.description ?? null,
        status: 'draft',
        createdAt: now,
        updatedAt: now,
    };
    await getDb().collection(COLLECTION).doc(id).set(doc);
    return serialize(id, doc);
}
export async function getDecision(id) {
    const snap = await getDb().collection(COLLECTION).doc(id).get();
    if (!snap.exists)
        return null;
    return serialize(snap.id, snap.data());
}
export async function listDecisions(limit = 100) {
    const snap = await getDb()
        .collection(COLLECTION)
        .orderBy('createdAt', 'desc')
        .limit(limit)
        .get();
    return snap.docs.map((d) => serialize(d.id, d.data()));
}
export async function updateDecision(id, patch) {
    const ref = getDb().collection(COLLECTION).doc(id);
    const snap = await ref.get();
    if (!snap.exists)
        throw new DecisionNotFoundError(id);
    const next = { updatedAt: new Date().toISOString() };
    if (patch.title !== undefined)
        next.title = patch.title.trim();
    if (patch.description !== undefined)
        next.description = patch.description;
    if (patch.status !== undefined)
        next.status = patch.status;
    await ref.update(next);
    const updated = await ref.get();
    return serialize(updated.id, updated.data());
}
// ---------- Pipeline stages (subcollections) ----------
async function addStage(decisionId, stage, data) {
    const ref = getDb().collection(COLLECTION).doc(decisionId).collection(stage).doc();
    await ref.set({ ...data, createdAt: new Date().toISOString() });
    return ref.id;
}
export const storeEvidence = (decisionId, data) => addStage(decisionId, 'evidence', data);
export const storeResearch = (decisionId, data) => addStage(decisionId, 'research', data);
export const storeDebate = (decisionId, data) => addStage(decisionId, 'debate', data);
export const storeVerification = (decisionId, data) => addStage(decisionId, 'verification', data);
export const storeRisk = (decisionId, data) => addStage(decisionId, 'risks', data);
export const storeVerdict = (decisionId, data) => addStage(decisionId, 'verdict', data);
// Monitoring configuration (one doc per configuration revision).
export const storeMonitoringConfig = (decisionId, data) => addStage(decisionId, 'monitoring', data);
export async function uploadDocument(decisionId, fileName, data, contentType) {
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
//# sourceMappingURL=decisions.js.map