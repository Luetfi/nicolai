import { MapPin, Phone, Clock } from 'lucide-react';
import type { Location } from '../../data/contact';

interface ContactInfoProps {
  location: Location;
  showMap?: boolean;
}

export function ContactInfo({ location }: ContactInfoProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-secondary">{location.name}</h3>

      <div className="flex items-start gap-3">
        <MapPin className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
        <div>
          <p className="text-gray-700">{location.address}</p>
          <p className="text-gray-700">{location.city}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Phone className="w-5 h-5 text-accent flex-shrink-0" />
        <a
          href={`tel:${location.phone.replace(/\s/g, '')}`}
          className="text-gray-700 hover:text-accent transition-colors"
        >
          {location.phone}
        </a>
      </div>

      <div className="flex items-start gap-3">
        <Clock className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
        <div>
          <p className="text-gray-700">
            Theorieunterricht: {location.lessonDays.join(' & ')}
          </p>
          <p className="text-gray-700">{location.lessonTime}</p>
          {location.infoTime && (
            <p className="text-gray-700 text-sm mt-1">{location.infoTime}</p>
          )}
        </div>
      </div>
    </div>
  );
}
