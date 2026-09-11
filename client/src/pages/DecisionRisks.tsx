import StagePage from '../components/StagePage';
import { IconAlert } from '../components/icons';

export default function DecisionRisks() {
  return (
    <StagePage
      stage="Risks"
      title="Risk Assessment"
      icon={<IconAlert size={20} />}
      description="Identifying, scoring, and ranking risks and failure modes is scheduled for a later milestone. No risk model is active yet."
    />
  );
}
