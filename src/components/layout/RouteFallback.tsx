import { Loader2 } from 'lucide-react';

export function RouteFallback() {
  return (
    <div
      className="min-h-[60vh] flex items-center justify-center"
      role="status"
      aria-live="polite"
      aria-label="Inhalt wird geladen"
    >
      <Loader2 className="w-8 h-8 text-primary animate-spin" />
    </div>
  );
}
