import PageHeader from '../components/PageHeader';
import ModulePlaceholder from '../components/Placeholder';
import { useAnalysis } from '../context/AnalysisContext';
import { IconFlask } from '../components/icons';

export default function Research() {
  const { researchStatus } = useAnalysis();
  const label = researchStatus.charAt(0).toUpperCase() + researchStatus.slice(1);

  return (
    <div>
      <PageHeader
        eyebrow="Research"
        title="Market & Web Research"
        description="Alpha gathers external market, competitive and regulatory signals to ground each decision in reality."
        actions={<span className="chip capitalize">Research · {label}</span>}
      />
      <ModulePlaceholder
        stage="Research"
        title="External Research Engine"
        icon={<IconFlask size={20} />}
        description="Web research via search providers (e.g. Brave Search) and source synthesis is scheduled for a later milestone. No external services are connected yet."
      />
    </div>
  );
}
