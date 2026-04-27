import { Mail, Phone, Printer, Smartphone, MapPin, Building2, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/common';

export function Impressum() {
  return (
    <>
      <PageHero
        crumb="Impressum"
        title={<span className="gradient-text">IMPRESSUM</span>}
        subtitle="Angaben gemäß § 5 DDG"
      />

      <section className="py-24 bg-secondary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent/5 to-transparent rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Anbieter */}
          <div className="bg-secondary-light rounded-3xl p-8 md:p-10 shadow-xl shadow-black/40 border border-white/10 mb-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                <Building2 className="w-7 h-7 text-secondary" />
              </div>
              <h2 className="display-md text-white">ANBIETER</h2>
            </div>

            <div className="space-y-2 text-lg">
              <p className="font-display text-2xl text-primary">Fahrschule Nicolai</p>
              <p className="text-gray-300">Inhaber: Ralf Nicolai</p>
              <p className="text-gray-300">Hecklestraße 16</p>
              <p className="text-gray-300">71634 Ludwigsburg</p>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="tel:0714137 8955"
                className="flex items-center gap-3 text-gray-300 hover:text-primary transition-colors group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Telefon</p>
                  <p className="font-semibold">07141 - 37 89 55</p>
                </div>
              </a>

              <a
                href="tel:01702138547"
                className="flex items-center gap-3 text-gray-300 hover:text-primary transition-colors group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Mobil</p>
                  <p className="font-semibold">0170 - 21 38 547</p>
                </div>
              </a>

              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Printer className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Telefax</p>
                  <p className="font-semibold">07141 - 50 54 745</p>
                </div>
              </div>

              <a
                href="mailto:fahrschule-ralf-nicolai@web.de"
                className="flex items-center gap-3 text-gray-300 hover:text-primary transition-colors group sm:col-span-2"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">E-Mail</p>
                  <p className="font-semibold">fahrschule-ralf-nicolai@web.de</p>
                </div>
              </a>
            </div>
          </div>

          {/* USt-ID */}
          <div className="bg-secondary-light rounded-3xl p-8 md:p-10 shadow-xl shadow-black/40 border border-white/10 mb-8">
            <h3 className="font-display text-xl text-primary tracking-wider mb-4">
              UMSATZSTEUERIDENTIFIKATIONSNUMMER
            </h3>
            <p className="text-gray-300">DE …folgt noch…</p>
          </div>

          {/* Aufsichtsbehörde */}
          <div className="bg-secondary-light rounded-3xl p-8 md:p-10 shadow-xl shadow-black/40 border border-white/10 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display text-2xl text-white">Zuständige Aufsichtsbehörde</h3>
            </div>

            <div className="flex items-start gap-3 text-gray-300">
              <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-white">Landratsamt Ludwigsburg</p>
                <p>Hindenburgstr. 40</p>
                <p>71638 Ludwigsburg</p>
              </div>
            </div>
          </div>

          {/* Verantwortlich für Inhalt */}
          <div className="bg-secondary-light rounded-3xl p-8 md:p-10 shadow-xl shadow-black/40 border border-white/10 mb-8">
            <h3 className="font-display text-xl text-primary tracking-wider mb-4">
              VERANTWORTLICH FÜR DEN INHALT (§ 18 ABS. 2 MSTV)
            </h3>
            <p className="text-gray-300">Ralf Nicolai (Anschrift wie oben)</p>

            <div className="mt-6 pt-6 border-t border-white/10">
              <h4 className="font-semibold text-white mb-2">Textgestaltung</h4>
              <p className="text-gray-300">Ralf Nicolai</p>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <h4 className="font-semibold text-white mb-2">Bildnachweise</h4>
              <p className="text-gray-300">
                Fahrschule Nicolai sowie Shutterstock (
                <a
                  href="https://www.shutterstock.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-dark transition-colors"
                >
                  www.shutterstock.de
                </a>
                )
              </p>
            </div>
          </div>

          {/* Haftungsausschluss */}
          <div className="bg-secondary-light rounded-3xl p-8 md:p-10 shadow-xl shadow-black/40 border border-white/10 mb-8">
            <h2 className="display-sm text-white mb-8">HAFTUNGSAUSSCHLUSS</h2>

            <div className="space-y-8">
              <div>
                <h3 className="font-display text-xl text-primary tracking-wider mb-3">
                  HAFTUNG FÜR INHALTE
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
                  Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                  Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten
                  nach den allgemeinen Gesetzen verantwortlich. Nach §§ 7 bis 10 DDG sind wir als
                  Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
                  Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
                  rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der
                  Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
                  Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer
                  konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
                  Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl text-primary tracking-wider mb-3">
                  HAFTUNG FÜR LINKS
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir
                  keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine
                  Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
                  Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden
                  zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige
                  Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente
                  inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte
                  einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen
                  werden wir derartige Links umgehend entfernen.
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl text-primary tracking-wider mb-3">
                  URHEBERRECHT
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
                  unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
                  Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
                  bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                  Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen
                  Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber
                  erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden
                  Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine
                  Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden
                  Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte
                  umgehend entfernen.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
                <p className="text-gray-300 leading-relaxed">
                  Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten
                  durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und
                  Informationsmaterialien wird hiermit ausdrücklich widersprochen. Die Betreiber
                  der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten
                  Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.
                </p>
              </div>
            </div>
          </div>

          {/* Datenschutz Verweis */}
          <div className="text-center">
            <p className="text-gray-400 mb-4">Informationen zum Umgang mit Ihren Daten finden Sie in unserer</p>
            <Link
              to="/datenschutz"
              className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-4 transition-all"
            >
              <Shield className="w-5 h-5" />
              Datenschutzerklärung
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
