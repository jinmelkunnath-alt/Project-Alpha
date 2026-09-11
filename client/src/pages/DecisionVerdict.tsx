import StagePage from '../components/StagePage';
import { IconScale } from '../components/icons';

export default function DecisionVerdict() {
  return (
    <StagePage
      stage="Verdict"
      title="Decision Score & Verdict"
      icon={<IconScale size={20} />}
      description="Combining evidence, debate, verification, and risk into a scored recommendation is scheduled for a later milestone. No scoring engine is active yet."
    />
  );
}
