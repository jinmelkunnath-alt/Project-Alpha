export type DecisionStatus =
  | 'draft'
  | 'ingesting'
  | 'evidence'
  | 'research'
  | 'debate'
  | 'verification'
  | 'risk'
  | 'scenario'
  | 'scored'
  | 'verdict'
  | 'monitoring'
  | 'archived';

export interface Decision {
  id: string;
  title: string;
  description: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}
