import { IconDocument } from './icons';
import UploadEvidence from './UploadEvidence';
import type { EvidenceItem } from '../data/mock';

interface EvidencePanelProps {
  items: EvidenceItem[];
  onUpload: (file: { name: string; sizeLabel: string }) => void;
}

export default function EvidencePanel({ items, onUpload }: EvidencePanelProps) {
  return (
    <div>
      <UploadEvidence onAdd={onUpload} />

      <ul className="mt-3 space-y-2">
        {items.map((it) => (
          <li
            key={it.id}
            className="glass-soft flex items-center gap-3 px-3 py-2.5"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-alpha-accent">
              <IconDocument size={15} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-alpha-ink">{it.name}</p>
              <p className="truncate text-xs text-alpha-faint">{it.detail}</p>
            </div>
            <span className="chip capitalize">{it.kind}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
