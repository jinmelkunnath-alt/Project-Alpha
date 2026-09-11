import Collapsible from './Collapsible';
import EvidencePanel from './EvidencePanel';
import AssumptionsPanel from './AssumptionsPanel';
import RiskPanel from './RiskPanel';
import { IconDocument, IconSparkle, IconAlert } from './icons';
import type { Decision } from '../types';
import type { EvidenceItem, AssumptionItem, RiskItem } from '../data/mock';

interface DecisionContextProps {
  decision: Decision;
  evidence: EvidenceItem[];
  assumptions: AssumptionItem[];
  risks: RiskItem[];
  onUpload: (file: { name: string; sizeLabel: string }) => void;
}

export default function DecisionContext({
  decision,
  evidence,
  assumptions,
  risks,
  onUpload,
}: DecisionContextProps) {
  return (
    <div className="space-y-4">
      {/* Decision summary */}
      <div className="glass p-5">
        <p className="panel-title">Decision</p>
        <p className="mt-2 text-lg font-semibold leading-snug tracking-tight text-alpha-ink">
          {decision.title}
        </p>
        {decision.description && (
          <p className="mt-2 text-sm leading-relaxed text-alpha-muted">{decision.description}</p>
        )}
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="chip">
            <span className="h-1.5 w-1.5 rounded-full bg-alpha-accent" /> {decision.status}
          </span>
          <span className="chip">ID {decision.id.slice(0, 8)}</span>
        </div>
      </div>

      <Collapsible
        title="Evidence"
        icon={<IconDocument size={16} />}
        count={evidence.length}
        defaultOpen
      >
        <EvidencePanel items={evidence} onUpload={onUpload} />
      </Collapsible>

      <Collapsible
        title="Assumptions"
        icon={<IconSparkle size={16} />}
        count={assumptions.length}
        defaultOpen
      >
        <AssumptionsPanel items={assumptions} />
      </Collapsible>

      <Collapsible title="Risks" icon={<IconAlert size={16} />} count={risks.length}>
        <RiskPanel items={risks} />
      </Collapsible>
    </div>
  );
}
