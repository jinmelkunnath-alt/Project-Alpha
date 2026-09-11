import PageHeader from '../components/PageHeader';
import ModulePlaceholder from '../components/Placeholder';
import { IconActivity } from '../components/icons';

export default function Monitoring() {
  return (
    <div>
      <PageHeader
        eyebrow="Monitoring"
        title="Live Monitoring"
        description="Track verdict stability, new evidence, and drifting assumptions over time."
      />
      <ModulePlaceholder
        stage="Monitoring"
        title="Outcome & Assumption Monitoring"
        icon={<IconActivity size={20} />}
        description="Continuous monitoring of decisions — detecting contradicting evidence, assumption drift, and recommendation decay — is scheduled for a later milestone. No external services are connected."
      />
    </div>
  );
}
