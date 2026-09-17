import { Link, useParams } from 'react-router-dom';
import { IconAlpha } from '../components/icons';

export default function OutcomePlaceholder() {
  const { id } = useParams();
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="glass max-w-lg p-10 text-center">
        <span className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-alpha-accent to-alpha-accent-2 text-[#04130d] shadow-glow">
          <IconAlpha size={24} />
        </span>
        <h1 className="text-2xl font-semibold tracking-tight text-alpha-ink">Analysis complete.</h1>
        <p className="mt-2 text-sm text-alpha-muted">Outcome synthesis is ready.</p>
        <div className="mt-5 flex items-center justify-center gap-3">
          <Link to={`/decision/${id ?? ''}/analyze`} className="btn-ghost">
            Back to analysis
          </Link>
          <span className="chip">Outcome Report — coming next</span>
        </div>
      </div>
    </div>
  );
}
