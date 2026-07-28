import { Link } from 'react-router-dom';
import { MapPin, Clock, Phone, ArrowRight } from 'lucide-react';
import { locations } from '../../data/contact';

/**
 * Kompakte Standort-Leiste für die Themenseiten.
 *
 * Erfüllt drei Aufgaben gleichzeitig: lokaler Vertrauensbeweis (echte
 * Adressen statt „Raum Ludwigsburg"), interne Verlinkung auf die beiden
 * Standort-Landingpages und wiederholte NAP-Angaben, die KI-Dienste dem
 * Unternehmen eindeutig zuordnen können.
 */
export function LocationBand({
  headline = 'Wo du bei uns lernst',
  intro,
}: {
  headline?: string;
  intro?: string;
}) {
  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="display-lg text-white">{headline.toUpperCase()}</h2>
        {intro && <p className="text-gray-300 text-lg mt-5 max-w-2xl mx-auto">{intro}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {locations.map((location) => (
          <Link
            key={location.id}
            to={location.landingPath}
            className="group relative block bg-secondary-light rounded-3xl border border-white/10 p-7 card-hover"
          >
            <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-2xl text-white leading-tight">
                  {location.district.toUpperCase()}
                </h3>
                <p className="text-gray-300 text-sm mt-1">{location.address}</p>
                <p className="text-gray-400 text-sm">{location.city}</p>
              </div>
            </div>

            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  Theorie {location.lessonDays.join(' & ')}, {location.lessonTime}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">{location.phone}</span>
              </div>
            </div>

            <span className="mt-6 inline-flex items-center gap-2 text-primary font-semibold text-sm">
              Standort ansehen
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
