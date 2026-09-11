import StagePage from '../components/StagePage';
import { IconDocument } from '../components/icons';

export default function DecisionEvidence() {
  return (
    <StagePage
      stage="Evidence"
      title="Evidence Analysis"
      icon={<IconDocument size={20} />}
      description="Structured extraction of source documents into verifiable evidence claims is scheduled for a later milestone. No document processing is wired up yet."
    />
  );
}
