import StagePage from '../components/StagePage';
import { IconSearch } from '../components/icons';

export default function DecisionResearch() {
  return (
    <StagePage
      stage="Research"
      title="Research Synthesis"
      icon={<IconSearch size={20} />}
      description="External research via web search (e.g. Brave Search) and source synthesis is scheduled for a later milestone. No search integration is connected yet."
    />
  );
}
