import type { Decision } from '../types';

// In dev, requests are relative and Vite proxies /api to the Express server.
// Override with VITE_API_BASE_URL (e.g. https://api.example.com) if needed.
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

export class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const isJson = res.headers.get('content-type')?.includes('application/json');
  const body = isJson ? await res.json().catch(() => ({})) : {};

  if (!res.ok) {
    const message =
      (body as { error?: string }).error ?? `Request failed with status ${res.status}`;
    throw new ApiError(message, res.status);
  }
  return body as T;
}

export interface HealthResponse {
  status: string;
  service: string;
}

export interface StatusResponse {
  service: string;
  version: string;
  status: string;
  firebase: { configured: boolean };
}

export interface ListDecisionsResponse {
  decisions: Decision[];
  count: number;
}

export interface GetDecisionResponse {
  decision: Decision;
}

export interface CreateDecisionPayload {
  title: string;
  description?: string;
}

export const api = {
  getHealth: () => request<HealthResponse>('/api/health'),
  getStatus: () => request<StatusResponse>('/api'),
  listDecisions: () => request<ListDecisionsResponse>('/api/decisions'),
  getDecision: (id: string) => request<GetDecisionResponse>(`/api/decisions/${id}`),
  createDecision: (payload: CreateDecisionPayload) =>
    request<GetDecisionResponse>('/api/decisions', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};
