import { useAnalysis } from '../context/AnalysisContext';

export default function AnalysisActivity() {
  const { activity } = useAnalysis();

  return (
    <div className="glass p-5">
      <p className="panel-title mb-4">Analysis Activity</p>
      <ul className="space-y-0">
        {activity.map((a) => (
          <li key={a.id} className="flex items-start gap-3 py-1.5 rise">
            <span className="shrink-0 font-mono text-xs text-alpha-faint">{a.time}</span>
            <span className="mt-1.5 h-2.5 w-px shrink-0 bg-alpha-edge" />
            <span className="text-sm text-alpha-muted">{a.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
