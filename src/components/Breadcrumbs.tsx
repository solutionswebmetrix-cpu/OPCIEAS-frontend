import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface Crumb { label: string; to?: string; }

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="flex items-center gap-1 font-sub text-xs text-white/50">
      <Link to="/" className="transition hover:text-gold">Home</Link>
      {items.map((c, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight className="h-3 w-3" />
          {c.to ? <Link to={c.to} className="transition hover:text-gold">{c.label}</Link> : <span className="text-white/80">{c.label}</span>}
        </span>
      ))}
    </nav>
  );
}
