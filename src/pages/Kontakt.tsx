import { Phone, Mail, Clock, MapPin, Send, ArrowRight, MessageSquare, ClipboardCheck } from 'lucide-react';
import { PageHero } from '../components/common';
import { MapsConsent } from '../components/cookie';
import { locations, generalInfo } from '../data/contact';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type FormMode = 'inquiry' | 'registration';

const VALID_LICENSE_CLASSES = ['B', 'BE', 'B96', 'A', 'A2', 'A1', 'AM'];

export function Kontakt() {
  const [formMode, setFormMode] = useState<FormMode>('inquiry');
  const { hash, search } = useLocation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [regData, setRegData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    birthPlace: '',
    street: '',
    zip: '',
    city: '',
    phone: '',
    email: '',
    licenseClass: '',
    location: '',
    hasLicense: 'nein',
    existingLicense: '',
    notes: '',
  });

  useEffect(() => {
    const params = new URLSearchParams(search);
    const klasse = params.get('klasse');

    if (hash === '#anmeldung' || klasse) {
      setFormMode('registration');
    }

    if (klasse && VALID_LICENSE_CLASSES.includes(klasse)) {
      setRegData((prev) => ({ ...prev, licenseClass: klasse }));

      requestAnimationFrame(() => {
        const el = document.getElementById('anmeldung');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, [hash, search]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = formData.subject.trim() || `Anfrage von ${formData.name}`;
    const mailtoLink = `mailto:${generalInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nE-Mail: ${formData.email}\nTelefon: ${formData.phone}\nBetreff: ${subject}\n\nNachricht:\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullName = `${regData.firstName} ${regData.lastName}`.trim();
    const lines = [
      `Vorname: ${regData.firstName}`,
      `Nachname: ${regData.lastName}`,
      `Geburtsdatum: ${regData.birthDate}`,
      `Geburtsort: ${regData.birthPlace}`,
      ``,
      `Adresse: ${regData.street}`,
      `PLZ / Ort: ${regData.zip} ${regData.city}`,
      ``,
      `Telefon: ${regData.phone}`,
      `E-Mail: ${regData.email}`,
      ``,
      `Gewünschte Führerscheinklasse: ${regData.licenseClass}`,
      `Bevorzugter Standort: ${regData.location}`,
      `Bestehender Führerschein: ${regData.hasLicense}${regData.hasLicense === 'ja' && regData.existingLicense ? ` (Klasse: ${regData.existingLicense})` : ''}`,
      ``,
      `Bemerkung:`,
      regData.notes || '-',
    ];
    const mailtoLink = `mailto:${generalInfo.email}?subject=${encodeURIComponent(
      `Anmeldung von ${fullName}`
    )}&body=${encodeURIComponent(lines.join('\n'))}`;
    window.location.href = mailtoLink;
  };

  const handleRegChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setRegData({
      ...regData,
      [e.target.name]: e.target.value,
    });
  };

  const inputClass = 'w-full px-5 py-4 rounded-xl border-2 border-white/10 focus:border-primary focus:ring-0 outline-none transition-all bg-secondary focus:bg-secondary-light text-white placeholder:text-gray-500';
  const selectClass = `${inputClass} appearance-none cursor-pointer`;
  const labelClass = 'block text-sm font-semibold text-white mb-2';

  return (
    <>
      <PageHero
        crumb="Kontakt"
        title={<span className="gradient-text">KONTAKT</span>}
        subtitle="Hast du Fragen oder möchtest dich anmelden? Wir sind für dich da!"
      />

      {/* Contact Form */}
      <section id="anmeldung" className="py-24 bg-secondary relative overflow-hidden scroll-mt-24">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-10">
            <h2 className="display-lg text-white mb-4">SCHREIB UNS</h2>
            <p className="text-gray-300 text-lg">
              Wähle aus, was du tun möchtest — und wir melden uns bei dir.
            </p>
          </div>

          {/* Form mode toggle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <button
              type="button"
              onClick={() => setFormMode('inquiry')}
              className={`group relative overflow-hidden rounded-2xl border-2 p-6 text-left transition-all duration-300 ${
                formMode === 'inquiry'
                  ? 'border-primary bg-gradient-to-br from-primary/15 to-primary/5 shadow-lg shadow-primary/10'
                  : 'border-white/10 bg-secondary-light hover:border-white/20'
              }`}
              aria-pressed={formMode === 'inquiry'}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                    formMode === 'inquiry' ? 'bg-primary text-secondary' : 'bg-white/5 text-gray-400'
                  }`}
                >
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`font-display text-xl mb-1 ${formMode === 'inquiry' ? 'text-primary' : 'text-white'}`}>
                    ALLGEMEINE ANFRAGE
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Du hast eine Frage? Schreib uns kurz.
                  </p>
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setFormMode('registration')}
              className={`group relative overflow-hidden rounded-2xl border-2 p-6 text-left transition-all duration-300 ${
                formMode === 'registration'
                  ? 'border-accent bg-gradient-to-br from-accent/15 to-accent/5 shadow-lg shadow-accent/10'
                  : 'border-white/10 bg-secondary-light hover:border-white/20'
              }`}
              aria-pressed={formMode === 'registration'}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                    formMode === 'registration' ? 'bg-accent text-white' : 'bg-white/5 text-gray-400'
                  }`}
                >
                  <ClipboardCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`font-display text-xl mb-1 ${formMode === 'registration' ? 'text-accent' : 'text-white'}`}>
                    ANMELDUNG
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Daten ausfüllen — wir melden uns für die offizielle Anmeldung.
                  </p>
                </div>
              </div>
            </button>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-3xl blur-2xl" />

            <div className="relative bg-secondary-light rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/50 border border-white/10">
              {formMode === 'inquiry' ? (
                <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className={labelClass}>Name *</label>
                      <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className={inputClass} placeholder="Dein Name" />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClass}>E-Mail *</label>
                      <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className={inputClass} placeholder="deine@email.de" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className={labelClass}>Telefon</label>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="0171 1234567" />
                    </div>
                    <div>
                      <label htmlFor="subject" className={labelClass}>Betreff</label>
                      <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} className={inputClass} placeholder="Worum geht es?" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClass}>Nachricht *</label>
                    <textarea id="message" name="message" required rows={5} value={formData.message} onChange={handleChange} className={`${inputClass} resize-none`} placeholder="Deine Nachricht an uns..." />
                  </div>

                  <div className="text-center pt-4">
                    <button type="submit" className="inline-flex items-center gap-3 btn-primary text-secondary px-10 py-5 rounded-2xl font-bold text-lg group">
                      <Send className="w-5 h-5" />
                      Nachricht senden
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleRegSubmit} className="space-y-6 animate-fade-in">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-accent/10 border border-accent/20">
                    <ClipboardCheck className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300 text-sm">
                      Das ist eine <strong className="text-white">unverbindliche Voranmeldung</strong>.
                      Wir melden uns nach Eingang deiner Daten persönlich bei dir, um die offizielle Anmeldung abzuschließen.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-display text-lg text-primary tracking-wider mb-4 pb-2 border-b border-white/10">
                      PERSÖNLICHE DATEN
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className={labelClass}>Vorname *</label>
                        <input type="text" id="firstName" name="firstName" required value={regData.firstName} onChange={handleRegChange} className={inputClass} placeholder="Max" />
                      </div>
                      <div>
                        <label htmlFor="lastName" className={labelClass}>Nachname *</label>
                        <input type="text" id="lastName" name="lastName" required value={regData.lastName} onChange={handleRegChange} className={inputClass} placeholder="Mustermann" />
                      </div>
                      <div>
                        <label htmlFor="birthDate" className={labelClass}>Geburtsdatum *</label>
                        <input type="date" id="birthDate" name="birthDate" required value={regData.birthDate} onChange={handleRegChange} className={inputClass} />
                      </div>
                      <div>
                        <label htmlFor="birthPlace" className={labelClass}>Geburtsort *</label>
                        <input type="text" id="birthPlace" name="birthPlace" required value={regData.birthPlace} onChange={handleRegChange} className={inputClass} placeholder="Ludwigsburg" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-display text-lg text-primary tracking-wider mb-4 pb-2 border-b border-white/10">
                      ADRESSE
                    </h4>
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label htmlFor="street" className={labelClass}>Straße & Hausnummer *</label>
                        <input type="text" id="street" name="street" required value={regData.street} onChange={handleRegChange} className={inputClass} placeholder="Musterstraße 12" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-1">
                          <label htmlFor="zip" className={labelClass}>PLZ *</label>
                          <input type="text" id="zip" name="zip" required pattern="[0-9]{5}" value={regData.zip} onChange={handleRegChange} className={inputClass} placeholder="71634" />
                        </div>
                        <div className="md:col-span-2">
                          <label htmlFor="city" className={labelClass}>Ort *</label>
                          <input type="text" id="city" name="city" required value={regData.city} onChange={handleRegChange} className={inputClass} placeholder="Ludwigsburg" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-display text-lg text-primary tracking-wider mb-4 pb-2 border-b border-white/10">
                      KONTAKT
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="regPhone" className={labelClass}>Telefon *</label>
                        <input type="tel" id="regPhone" name="phone" required value={regData.phone} onChange={handleRegChange} className={inputClass} placeholder="0171 1234567" />
                      </div>
                      <div>
                        <label htmlFor="regEmail" className={labelClass}>E-Mail *</label>
                        <input type="email" id="regEmail" name="email" required value={regData.email} onChange={handleRegChange} className={inputClass} placeholder="deine@email.de" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-display text-lg text-primary tracking-wider mb-4 pb-2 border-b border-white/10">
                      AUSBILDUNG
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="regLicenseClass" className={labelClass}>Gewünschte Klasse *</label>
                        <select id="regLicenseClass" name="licenseClass" required value={regData.licenseClass} onChange={handleRegChange} className={selectClass}>
                          <option value="">Bitte wählen</option>
                          <option value="B">Klasse B (PKW)</option>
                          <option value="BE">Klasse BE (PKW + Anhänger)</option>
                          <option value="B96">Klasse B96</option>
                          <option value="A">Klasse A (Motorrad)</option>
                          <option value="A2">Klasse A2</option>
                          <option value="A1">Klasse A1</option>
                          <option value="AM">Klasse AM (Moped)</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="regLocation" className={labelClass}>Bevorzugter Standort *</label>
                        <select id="regLocation" name="location" required value={regData.location} onChange={handleRegChange} className={selectClass}>
                          <option value="">Bitte wählen</option>
                          <option value="Eglosheim">Eglosheim</option>
                          <option value="Grünbühl">Grünbühl</option>
                          <option value="Egal">Egal</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-6">
                      <label className={labelClass}>Hast du bereits einen Führerschein? *</label>
                      <div className="flex gap-3 flex-wrap">
                        {[
                          { value: 'nein', label: 'Nein' },
                          { value: 'ja', label: 'Ja' },
                        ].map((opt) => (
                          <label
                            key={opt.value}
                            className={`flex-1 min-w-[120px] cursor-pointer rounded-xl border-2 px-5 py-3 text-center font-semibold transition-all ${
                              regData.hasLicense === opt.value
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-white/10 bg-secondary text-gray-400 hover:border-white/20'
                            }`}
                          >
                            <input
                              type="radio"
                              name="hasLicense"
                              value={opt.value}
                              checked={regData.hasLicense === opt.value}
                              onChange={handleRegChange}
                              className="sr-only"
                            />
                            {opt.label}
                          </label>
                        ))}
                      </div>
                    </div>

                    {regData.hasLicense === 'ja' && (
                      <div className="mt-6 animate-fade-in">
                        <label htmlFor="existingLicense" className={labelClass}>Welche Klasse(n) hast du bereits?</label>
                        <input type="text" id="existingLicense" name="existingLicense" value={regData.existingLicense} onChange={handleRegChange} className={inputClass} placeholder="z.B. AM, A1" />
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="notes" className={labelClass}>Bemerkung</label>
                    <textarea id="notes" name="notes" rows={4} value={regData.notes} onChange={handleRegChange} className={`${inputClass} resize-none`} placeholder="Weitere Infos, Wünsche oder Fragen..." />
                  </div>

                  <div className="text-center pt-4">
                    <button type="submit" className="inline-flex items-center gap-3 btn-accent text-white px-10 py-5 rounded-2xl font-bold text-lg group">
                      <ClipboardCheck className="w-5 h-5" />
                      Anmeldung absenden
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-gray-500 text-xs mt-4">
                      * Pflichtfeld · Unverbindlich · Wir melden uns persönlich bei dir
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Direct Contact */}
          <div className="mt-12 text-center">
            <p className="text-gray-300 mb-6 text-lg">
              Oder kontaktiere uns direkt:
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href={`mailto:${generalInfo.email}`}
                className="inline-flex items-center gap-3 text-white font-semibold hover:text-accent transition-colors group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                {generalInfo.email}
              </a>
              <a
                href="tel:017138580010"
                className="inline-flex items-center gap-3 text-white font-semibold hover:text-accent transition-colors group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                0171 / 38 58 010
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-24 bg-secondary relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="display-lg text-white mb-4">
              UNSERE <span className="gradient-text">STANDORTE</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {locations.map((location, index) => {
              const mapQuery = location.mapQuery ?? `${location.address}, ${location.city}`;
              return (
                <div
                  key={location.id}
                  className="group relative"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                  <div className="relative bg-secondary-light rounded-3xl shadow-xl shadow-black/40 h-full card-hover border border-white/10 overflow-hidden flex flex-col">
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
                              href={`tel:${location.phone.replace(/\s/g, '')}`}
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
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Map embed — sits flush to the bottom of the card as a visual anchor */}
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
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
