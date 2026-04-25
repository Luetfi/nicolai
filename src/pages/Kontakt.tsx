import { Phone, Mail, Clock, MapPin, Send, Sparkles, ArrowRight } from 'lucide-react';
import { locations, generalInfo } from '../data/contact';
import { useState } from 'react';

export function Kontakt() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    licenseClass: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:${generalInfo.email}?subject=Anfrage von ${formData.name}&body=${encodeURIComponent(
      `Name: ${formData.name}\nE-Mail: ${formData.email}\nTelefon: ${formData.phone}\nGewünschte Führerscheinklasse: ${formData.licenseClass}\n\nNachricht:\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-secondary overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="absolute inset-0 diagonal-stripes opacity-30" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium text-sm">Wir freuen uns auf dich</span>
            </div>
            <h1 className="display-xl text-white mb-6">
              <span className="gradient-text">KONTAKT</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Hast du Fragen oder möchtest dich anmelden? Wir sind für dich da!
            </p>
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
            {locations.map((location, index) => (
              <div
                key={location.id}
                className="group relative"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

                <div className="relative bg-secondary-light rounded-3xl p-10 shadow-xl shadow-black/40 h-full card-hover border border-white/10">
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

                  <div className="mt-8 pt-6 border-t border-white/10">
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(`${location.address}, ${location.city}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-4 transition-all"
                    >
                      <MapPin className="w-5 h-5" />
                      In Google Maps öffnen
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 bg-secondary-light relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="display-lg text-white mb-4">SCHREIB UNS</h2>
            <p className="text-gray-300 text-lg">
              Fülle das Formular aus und wir melden uns bei dir.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-3xl blur-2xl" />

            <div className="relative bg-secondary rounded-3xl p-10 shadow-2xl shadow-black/50 border border-white/10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border-2 border-white/10 focus:border-primary focus:ring-0 outline-none transition-all bg-secondary-light focus:bg-secondary text-white placeholder:text-gray-500"
                      placeholder="Dein Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                      E-Mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border-2 border-white/10 focus:border-primary focus:ring-0 outline-none transition-all bg-secondary-light focus:bg-secondary text-white placeholder:text-gray-500"
                      placeholder="deine@email.de"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-white mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border-2 border-white/10 focus:border-primary focus:ring-0 outline-none transition-all bg-secondary-light focus:bg-secondary text-white placeholder:text-gray-500"
                      placeholder="0171 1234567"
                    />
                  </div>
                  <div>
                    <label htmlFor="licenseClass" className="block text-sm font-semibold text-white mb-2">
                      Gewünschte Führerscheinklasse
                    </label>
                    <select
                      id="licenseClass"
                      name="licenseClass"
                      value={formData.licenseClass}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border-2 border-white/10 focus:border-primary focus:ring-0 outline-none transition-all bg-secondary-light focus:bg-secondary text-white appearance-none cursor-pointer"
                    >
                      <option value="">Bitte wählen</option>
                      <option value="B">Klasse B (PKW)</option>
                      <option value="BE">Klasse BE (PKW + Anhänger)</option>
                      <option value="B96">Klasse B96</option>
                      <option value="A">Klasse A (Motorrad)</option>
                      <option value="A2">Klasse A2</option>
                      <option value="A1">Klasse A1</option>
                      <option value="AM">Klasse AM (Moped)</option>
                      <option value="ASF">Aufbauseminar (ASF)</option>
                      <option value="Sonstiges">Sonstiges</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">
                    Nachricht *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl border-2 border-white/10 focus:border-primary focus:ring-0 outline-none transition-all bg-secondary-light focus:bg-secondary text-white placeholder:text-gray-500 resize-none"
                    placeholder="Deine Nachricht an uns..."
                  />
                </div>

                <div className="text-center pt-4">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-3 btn-primary text-secondary px-10 py-5 rounded-2xl font-bold text-lg group"
                  >
                    <Send className="w-5 h-5" />
                    Nachricht senden
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
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
    </>
  );
}
