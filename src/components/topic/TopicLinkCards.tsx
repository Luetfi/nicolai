import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface TopicLink {
  to: string;
  /** Kurzlabel, z. B. „B" oder „ASF" — erscheint in der Kachel-Plakette. */
  badge: string;
  title: string;
  description: string;
  icon: LucideIcon;
  /** Akzentfarbe der Kachel — beibehalten aus der Leistungen-Seite. */
  tone?: 'pkw' | 'motorrad' | 'extra';
}

const TONES = {
  pkw: {
    badge: 'from-blue-500 to-cyan-500 text-white',
    glow: 'from-blue-500/20 to-cyan-500/20',
    link: 'text-blue-300',
  },
  motorrad: {
    badge: 'from-accent to-orange-600 text-white',
    glow: 'from-accent/20 to-orange-600/20',
    link: 'text-accent',
  },
  extra: {
    badge: 'from-green-500 to-emerald-500 text-white',
    glow: 'from-green-500/20 to-emerald-500/20',
    link: 'text-green-400',
  },
} as const;

/**
 * Kachel-Grid für die Querverlinkung zwischen den Themenseiten.
 * Hält den Themen-Cluster (Hub ↔ Klasse B ↔ Motorrad ↔ ASF) zusammen —
 * jede Seite verlinkt auf die jeweils anderen, damit Linkkraft im Cluster bleibt.
 */
export function TopicLinkCards({ links }: { links: TopicLink[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {links.map((link, index) => {
        const tone = TONES[link.tone ?? 'pkw'];
        const Icon = link.icon;
        return (
          <Link
            key={link.to}
            to={link.to}
            className="group relative block"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div
              aria-hidden="true"
              className={`absolute -inset-1 bg-gradient-to-r ${tone.glow} rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`}
            />

            <div className="relative h-full bg-secondary-light rounded-3xl border border-white/10 p-7 card-hover flex flex-col">
              <div className="flex items-center gap-4 mb-5">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tone.badge} flex items-center justify-center shadow-lg flex-shrink-0`}
                >
                  <span className="font-display text-2xl leading-none">{link.badge}</span>
                </div>
                <Icon className="w-5 h-5 text-gray-500" />
              </div>

              <h3 className="font-display text-2xl text-white mb-2 tracking-wide">
                {link.title.toUpperCase()}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">{link.description}</p>

              <span
                className={`mt-auto inline-flex items-center gap-2 font-semibold text-sm ${tone.link}`}
              >
                Mehr erfahren
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
