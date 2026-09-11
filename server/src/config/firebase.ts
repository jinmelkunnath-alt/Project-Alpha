import { initializeApp, cert, getApps, type App } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { getStorage, type Storage } from 'firebase-admin/storage';

/**
 * Firebase configuration layer.
 *
 * Credentials are read ONLY from environment variables. Nothing is hardcoded.
 * Two supported shapes:
 *   1. FIREBASE_SERVICE_ACCOUNT  -> a JSON service-account string
 *   2. FIREBASE_PROJECT_ID + FIREBASE_CLIENT_EMAIL + FIREBASE_PRIVATE_KEY
 *
 * If neither is present the app boots in "local-only" mode: the API still runs
 * but any Firestore/Storage call throws FirebaseNotConfiguredError so the
 * caller gets a clear, actionable error instead of a crash.
 */

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKeyRaw = process.env.FIREBASE_PRIVATE_KEY;
const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;
const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;

export class FirebaseNotConfiguredError extends Error {
  constructor() {
    super(
      'Firebase is not configured. Set FIREBASE_SERVICE_ACCOUNT (JSON) or ' +
        'FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY, ' +
        'then restart the server. See server/.env.example.'
    );
    this.name = 'FirebaseNotConfiguredError';
  }
}

function buildCredential() {
  if (serviceAccountJson) {
    try {
      return cert(JSON.parse(serviceAccountJson) as object);
    } catch {
      throw new Error('FIREBASE_SERVICE_ACCOUNT is present but is not valid JSON.');
    }
  }
  if (projectId && clientEmail && privateKeyRaw) {
    // Private keys from env often arrive with escaped newlines.
    const privateKey = privateKeyRaw.replace(/\\n/g, '\n');
    return cert({ projectId, clientEmail, privateKey });
  }
  // Only reached if isFirebaseConfigured is false; the caller guards this.
  throw new FirebaseNotConfiguredError();
}

export const isFirebaseConfigured: boolean = Boolean(
  serviceAccountJson || (projectId && clientEmail && privateKeyRaw)
);

let app: App | null = null;
let db: Firestore | null = null;
let storage: Storage | null = null;

if (isFirebaseConfigured) {
  const credential = buildCredential();
  const existing = getApps();
  app = existing.length ? existing[0] : initializeApp({ credential, storageBucket });
  db = getFirestore(app);
  storage = getStorage(app);
}

export function getDb(): Firestore {
  if (!db) throw new FirebaseNotConfiguredError();
  return db;
}

export function getStorageBucket(): Storage {
  if (!storage) throw new FirebaseNotConfiguredError();
  return storage;
}
