import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Clock,
  ArrowRight,
  Navigation,
  Star,
  ClipboardCheck,
  Car,
  Bike,
  Users,
} from 'lucide-react';
import { PageHero } from '../components/common';
import { FaqSection } from '../components/common/FaqSection';
import { MapsConsent } from '../components/cookie';
import { locations, generalInfo } from '../data/contact';
import type { LocationPageContent } from '../data/locationPages';
import { locationPages } from '../data/locationPages';
import { licenseClasses } from '../data/services';
import { Seo } from '../seo/Seo';
import { breadcrumbsSchema, drivingSchoolSchema, faqSchema } from '../seo/schema';

function StandortPage({ content }: { content: LocationPageContent }) {
  const location = locations.find((l) => l.id === content.locationId);
  if (!location) return null;

  const mapQuery = location.mapQuery ?? `${location.address}, ${location.city}`;
  const pkwClasses = licenseClasses.filter((c) => c.category === 'pkw');
  const motorradClasses = licenseClasses.filter((c) => c.category === 'motorrad');

  return (
    <>
      <Seo
        title={content.metaTitle}
        description={content.metaDescription}
        jsonLd={[
          breadcrumbsSchema([
            { name: 'Startseite', url: '/' },
            { name: content.crumb, url: content.path },
          ]),
          drivingSchoolSchema(location),
          faqSchema(content.faqs, content.path),
        ]}
      />
      <PageHero
        crumb={content.crumb}
        eyebrow={content.heroEyebrow}
        eyebrowIcon={MapPin}
        title={<span className="gradient-text">{content.heroTitle}</span>}
        subtitle={content.heroSubtitle}
      />

      {/* Intro + Standort-Infos */}
      <section className="py-24 bg-secondary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="display-lg text-white mb-6">
                DEINE FAHRSCHULE IN <span className="gradient-text">{location.district.toUpperCase()}</span>
              </h2>
              {content.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-gray-300 text-lg leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}

              <div className="flex flex-wrap gap-2 mt-2">
                {content.nearbyAreas.map((area) => (
                  <span
                    key={area}
                    className="px-4 py-2 rounded-full bg-secondary-light border border-white/10 text-gray-300 text-sm"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Standort-Karte (Pattern wie Kontakt-Seite) */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-xl opacity-60" />
              <div className="relative bg-secondary-light rounded-3xl shadow-xl shadow-black/40 border border-white/10 overflow-hidden flex flex-col">
                <div className="p-10">
                  <h3 className="font-display text-3xl text-white mb-8">{location.name}</h3>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">Adresse</p>
                        <p className="text-gray-300">{location.address}</p>
                        <p className="text-gray-300">{location.city}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">Telefon</p>
                        <a
                          href={`tel:${location.phoneTel}`}
                          className="text-accent text-xl font-bold hover:text-accent-dark transition-colors"
                        >
                          {location.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">Theorieunterricht</p>
                        <p className="text-gray-300">{location.lessonDays.join(' & ')}</p>
                        <p className="text-gray-300">{location.lessonTime}</p>
                        {location.infoTime && (
                          <p className="text-gray-400 text-sm mt-1">{location.infoTime}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative mt-auto border-t border-white/10">
                  <div className="relative aspect-[4/3] md:aspect-[16/10] bg-secondary overflow-hidden">
                    <MapsConsent
                      query={mapQuery}
                      locationName={location.name}
                      address={location.address}
                      city={location.city}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Anfahrt */}
      <section className="py-24 bg-secondary-light/30 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass">
              <Navigation className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium text-sm">Anfahrt</span>
            </div>
          </div>
          <h2 className="display-lg text-white mb-8 text-center">{content.anfahrtTitle.toUpperCase()}</h2>
          {content.anfahrt.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-gray-300 text-lg leading-relaxed mb-6 text-center">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Führerscheinklassen kompakt */}
      <section className="py-24 bg-secondary relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="display-lg text-white mb-4">
              ALLE KLASSEN IN <span className="gradient-text">{location.district.toUpperCase()}</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Am Standort {location.district} bilden wir dich in allen PKW- und Motorradklassen aus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-secondary-light rounded-3xl border border-white/10 p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                  <Car className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-2xl text-white">PKW</h3>
              </div>
              <ul className="space-y-3">
                {pkwClasses.map((c) => (
                  <li key={c.id} className="flex items-baseline gap-3 text-gray-300">
                    <span className="text-primary font-bold min-w-[3.5rem]">{c.name}</span>
                    <span>{c.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-secondary-light rounded-3xl border border-white/10 p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center">
                  <Bike className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-2xl text-white">MOTORRAD</h3>
              </div>
              <ul className="space-y-3">
                {motorradClasses.map((c) => (
                  <li key={c.id} className="flex items-baseline gap-3 text-gray-300">
                    <span className="text-accent font-bold min-w-[3.5rem]">{c.name}</span>
                    <span>{c.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/leistungen"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors group"
            >
              Alle Führerscheinklassen im Detail
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Team-Teaser */}
      <section className="py-16 bg-secondary-light/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center">
              <Users className="w-7 h-7 text-primary" />
            </div>
          </div>
          <h2 className="display-lg text-white mb-4">FAMILIENGEFÜHRT SEIT 1969</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Bei {generalInfo.companyName} lernst du bei erfahrenen, geduldigen Fahrlehrern —
            persönlich betreut von der ersten Theoriestunde bis zur Prüfung.
          </p>
          <Link
            to="/fahrschule"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors group"
          >
            Lerne unser Team kennen
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection
        title={`HÄUFIGE FRAGEN — STANDORT ${location.district.toUpperCase()}`}
        items={content.faqs}
      />

      {/* CTA */}
      <section className="py-24 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="display-lg text-white mb-6">
            STARTE JETZT IN <span className="gradient-text">{location.district.toUpperCase()}</span>
          </h2>
          <p className="text-gray-300 text-lg mb-10">
            Ruf uns an oder melde dich direkt online an — wir melden uns persönlich bei dir.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${location.phoneTel}`}
              className="inline-flex items-center gap-3 btn-primary text-secondary px-8 py-4 rounded-2xl font-bold text-lg group"
            >
              <Phone className="w-5 h-5" />
              {location.phone}
            </a>
            <Link
              to="/kontakt#anmeldung"
              className="inline-flex items-center gap-3 btn-accent text-white px-8 py-4 rounded-2xl font-bold text-lg group"
            >
              <ClipboardCheck className="w-5 h-5" />
              Online anmelden
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {location.googleReviewUrl && (
            <div className="mt-10">
              <a
                href={location.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-300 hover:text-primary transition-colors font-semibold"
              >
                <Star className="w-5 h-5 text-primary" />
                Bewerte uns auf Google
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export function StandortEglosheim() {
  return <StandortPage content={locationPages[0]} />;
}

export function StandortGruenbuehl() {
  return <StandortPage content={locationPages[1]} />;
}
