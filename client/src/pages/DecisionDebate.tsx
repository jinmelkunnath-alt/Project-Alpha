import StagePage from '../components/StagePage';
import { IconChat } from '../components/icons';

export default function DecisionDebate() {
  return (
    <StagePage
      stage="Debate"
      title="Structured Debate"
      icon={<IconChat size={20} />}
      description="Multi-perspective argumentation — modeling supporting and opposing positions — is scheduled for a later milestone. No LLM debate is running yet."
    />
  );
}
