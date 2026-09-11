export interface Decision {
  id: string;
  title: string;
  description: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export type StageKey =
  | 'evidence'
  | 'research'
  | 'debate'
  | 'verification'
  | 'risks'
  | 'verdict';
