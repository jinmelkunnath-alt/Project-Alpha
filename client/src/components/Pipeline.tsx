import { IconChevronRight } from './icons';

export const PIPELINE: { key: string; label: string }[] = [
  { key: 'document', label: 'Document' },
  { key: 'ingestion', label: 'Ingestion' },
  { key: 'evidence', label: 'Evidence' },
  { key: 'research', label: 'Research' },
  { key: 'debate', label: 'Debate' },
  { key: 'verification', label: 'Verification' },
  { key: 'risk', label: 'Risk' },
  { key: 'scenario', label: 'Scenario' },
  { key: 'scored', label: 'Score' },
  { key: 'verdict', label: 'Verdict' },
  { key: 'monitoring', label: 'Monitoring' },
];

interface PipelineProps {
  current?: string;
}

export function Pipeline({ current }: PipelineProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {PIPELINE.map((step, i) => {
        const active = current === step.key;
        return (
          <div key={step.key} className="flex items-center gap-2">
            <div
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium ${
                active
                  ? 'border-alpha-accent/40 bg-alpha-accent/10 text-alpha-ink'
                  : 'border-alpha-border bg-white/[0.02] text-alpha-muted'
              }`}
            >
              <span className="font-mono text-[10px] text-alpha-faint">
                {String(i + 1).padStart(2, '0')}
              </span>
              {step.label}
            </div>
            {i < PIPELINE.length - 1 && (
              <IconChevronRight size={14} className="text-alpha-faint" />
            )}
          </div>
        );
      })}
    </div>
  );
}
