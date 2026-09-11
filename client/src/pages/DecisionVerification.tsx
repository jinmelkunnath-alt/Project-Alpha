import StagePage from '../components/StagePage';
import { IconShieldCheck } from '../components/icons';

export default function DecisionVerification() {
  return (
    <StagePage
      stage="Verification"
      title="Claim Verification"
      icon={<IconShieldCheck size={20} />}
      description="Cross-checking claims against sources and flagging contradictions is scheduled for a later milestone. No verification engine is connected yet."
    />
  );
}
