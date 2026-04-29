import {
  Shield,
  BookOpen,
  Server,
  Mail,
  Cookie,
  Type,
  MapPin,
  Lock,
  UserCheck,
  RefreshCw,
  Scale,
  Link2,
  CalendarClock,
  Settings,
  ExternalLink,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/common';
import { useConsent } from '../hooks/useConsent';

const STAND = 'April 2026';

const sections = [
  { id: 'verantwortlicher', label: '1. Verantwortlicher', icon: UserCheck },
  { id: 'allgemeines', label: '2. Allgemeines & Begriffe', icon: BookOpen },
  { id: 'server-logs', label: '3. Server-Logs & Hosting', icon: Server },
  { id: 'kontakt', label: '4. Kontaktaufnahme', icon: Mail },
  { id: 'cookies', label: '5. Cookies & lokale Speicherung', icon: Cookie },
  { id: 'schriftarten', label: '6. Schriftarten', icon: Type },
  { id: 'maps', label: '7. Google Maps', icon: MapPin },
  { id: 'ssl', label: '8. SSL/TLS-Verschlüsselung', icon: Lock },
  { id: 'rechte', label: '9. Ihre Rechte', icon: Shield },
  { id: 'widerruf', label: '10. Widerruf der Einwilligung', icon: RefreshCw },
  { id: 'beschwerde', label: '11. Beschwerderecht', icon: Scale },
  { id: 'links', label: '12. Externe Links', icon: Link2 },
  { id: 'aktualitaet', label: '13. Aktualität', icon: CalendarClock },
];

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-gray-300">
      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
      <span>{children}</span>
    </li>
  );
}

function SectionCard({
  id,
  icon: Icon,
  title,
  children,
}: {
  id: string;
  icon: typeof UserCheck;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article
      id={id}
      className="bg-secondary-light rounded-3xl p-8 md:p-10 shadow-xl shadow-black/40 border border-white/10 mb-8 scroll-mt-24"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-accent" />
        </div>
        <h2 className="font-display text-2xl md:text-3xl text-white tracking-wide uppercase leading-tight">
          {title}
        </h2>
      </div>
      <div className="space-y-4 text-gray-300 leading-relaxed">{children}</div>
    </article>
  );
}

export function Datenschutz() {
  const { openSettings } = useConsent();

  return (
    <>
      <PageHero
        crumb="Datenschutz"
        title={<span className="gradient-text">DATENSCHUTZ</span>}
        subtitle="Transparenz statt Tracker. Hier liest du, was passiert – und was eben nicht."
      />

      <section className="py-24 bg-secondary relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent/5 to-transparent rounded-full blur-3xl"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Intro */}
          <div className="bg-secondary-light rounded-3xl p-8 md:p-10 shadow-xl shadow-black/40 border border-white/10 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                <Shield className="w-7 h-7 text-secondary" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl text-white tracking-wide uppercase leading-tight">
                Datenschutzerklärung
              </h2>
            </div>
            <p className="text-gray-300 leading-relaxed text-lg mb-4">
              Der Schutz deiner persönlichen Daten ist uns wichtig. Diese Erklärung beschreibt
              <span className="text-white font-medium"> ehrlich und nur das, was tatsächlich passiert</span>,
              wenn du unsere Webseite besuchst.
            </p>
            <p className="text-gray-400 leading-relaxed text-sm">
              Was wir <span className="text-primary font-medium">nicht</span> tun: Wir nutzen kein Google Analytics,
              keine Werbe-Pixel von Facebook oder Instagram, kein Conversion-Tracking, keine Profilbildung.
            </p>
          </div>

          {/* Inhaltsverzeichnis */}
          <nav
            aria-label="Inhaltsverzeichnis"
            className="bg-secondary-light rounded-3xl p-8 shadow-xl shadow-black/40 border border-white/10 mb-12"
          >
            <h3 className="font-display text-lg text-primary tracking-wider mb-6">INHALT</h3>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-gray-300 hover:text-primary transition-colors text-sm"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* 1. Verantwortlicher */}
          <SectionCard
            id="verantwortlicher"
            icon={UserCheck}
            title="1. Verantwortlicher im Sinne der DSGVO"
          >
            <p>
              Verantwortlich für die Datenverarbeitung auf dieser Webseite ist:
            </p>
            <div className="p-6 rounded-2xl bg-secondary border border-white/10 not-prose">
              <p className="font-display text-xl text-primary mb-2">Fahrschule Nicolai</p>
              <p>Inhaber: Ralf Nicolai</p>
              <p>Hecklestraße 16</p>
              <p>71634 Ludwigsburg</p>
              <div className="mt-4 pt-4 border-t border-white/10 space-y-1.5 text-sm">
                <p>
                  Telefon:{' '}
                  <a
                    href="tel:0714137 89 55"
                    className="text-accent hover:text-accent-dark transition-colors"
                  >
                    07141 – 37 89 55
                  </a>
                </p>
                <p>
                  Mobil:{' '}
                  <a
                    href="tel:01702138547"
                    className="text-accent hover:text-accent-dark transition-colors"
                  >
                    0170 – 21 38 547
                  </a>
                </p>
                <p>
                  E-Mail:{' '}
                  <a
                    href="mailto:fahrschule-ralf-nicolai@web.de"
                    className="text-accent hover:text-accent-dark transition-colors"
                  >
                    fahrschule-ralf-nicolai@web.de
                  </a>
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Weitere Pflichtangaben (Aufsichtsbehörde, Steuerangaben usw.) findest du im{' '}
              <Link to="/impressum" className="text-accent hover:text-accent-dark transition-colors">
                Impressum
              </Link>
              .
            </p>
          </SectionCard>

          {/* 2. Allgemeines */}
          <SectionCard id="allgemeines" icon={BookOpen} title="2. Allgemeines & Begriffe">
            <p>
              Wir verarbeiten personenbezogene Daten unserer Nutzer grundsätzlich nur, soweit dies zur
              Bereitstellung einer funktionsfähigen Webseite, unserer Inhalte und Leistungen
              erforderlich ist. Die Verarbeitung erfolgt nur auf Grundlage der Bestimmungen der
              Datenschutz-Grundverordnung (DSGVO) sowie des Bundesdatenschutzgesetzes (BDSG).
            </p>
            <p>
              <span className="text-white font-medium">Personenbezogene Daten</span> (Art. 4 Nr. 1 DSGVO)
              sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche
              Person beziehen – etwa Name, Anschrift, E-Mail-Adresse, Telefonnummer oder die IP-Adresse.
            </p>
          </SectionCard>

          {/* 3. Server-Logs & Hosting */}
          <SectionCard id="server-logs" icon={Server} title="3. Server-Logs & Hosting">
            <p>
              Diese Webseite wird auf Servern der{' '}
              <span className="text-white font-medium">Strato AG</span> (Pascalstraße 10, 10587 Berlin)
              in Deutschland gehostet. Beim Aufruf werden technisch notwendige Zugriffsdaten
              automatisch erfasst und in einem sogenannten Logfile temporär gespeichert:
            </p>
            <ul className="space-y-2">
              <Bullet>IP-Adresse des anfragenden Rechners (gekürzt durch den Hoster)</Bullet>
              <Bullet>Datum und Uhrzeit des Zugriffs</Bullet>
              <Bullet>Name und URL der abgerufenen Datei</Bullet>
              <Bullet>Übertragene Datenmenge und HTTP-Statuscode</Bullet>
              <Bullet>Verwendeter Browser und Betriebssystem</Bullet>
              <Bullet>Referrer-URL (zuvor besuchte Seite)</Bullet>
            </ul>
            <p>
              <span className="text-white font-medium">Zweck:</span> Sicherstellung eines reibungslosen
              Verbindungsaufbaus, Stabilität und Sicherheit der Webseite, Abwehr von Angriffen.
            </p>
            <p>
              <span className="text-white font-medium">Rechtsgrundlage:</span> Art. 6 Abs. 1 lit. f DSGVO
              (berechtigtes Interesse).
            </p>
            <p>
              <span className="text-white font-medium">Speicherdauer:</span> Die Daten werden nach
              wenigen Tagen automatisch gelöscht. Eine Zusammenführung mit anderen Datenquellen findet
              nicht statt.
            </p>
          </SectionCard>

          {/* 4. Kontaktaufnahme */}
          <SectionCard id="kontakt" icon={Mail} title="4. Kontaktaufnahme & Anmeldung">
            <p>
              Auf unserer{' '}
              <Link to="/kontakt" className="text-accent hover:text-accent-dark transition-colors">
                Kontaktseite
              </Link>{' '}
              findest du zwei Formulare: ein allgemeines Kontaktformular und ein Anmeldeformular für
              die Fahrschule. <span className="text-white font-medium">Wichtig:</span> Diese Formulare
              senden keine Daten an einen Server. Beim Klick auf „Absenden" wird lediglich eine
              vorausgefüllte E-Mail in deinem lokalen E-Mail-Programm geöffnet, die du{' '}
              <span className="text-white font-medium">selbst</span> an unsere E-Mail-Adresse
              versendest.
            </p>
            <p>
              Folgende Felder können dabei je nach Formular ausgefüllt werden:
            </p>
            <ul className="space-y-2">
              <Bullet>Vor- und Nachname</Bullet>
              <Bullet>Geburtsdatum und -ort (nur Anmeldung)</Bullet>
              <Bullet>Anschrift (nur Anmeldung)</Bullet>
              <Bullet>Telefonnummer und E-Mail-Adresse</Bullet>
              <Bullet>Gewünschte Führerscheinklasse, Standort, vorhandene Klassen</Bullet>
              <Bullet>Freitext / Bemerkungen</Bullet>
            </ul>
            <p>
              <span className="text-white font-medium">Empfänger:</span> Die E-Mail geht direkt an{' '}
              <a
                href="mailto:fahrschule-ralf-nicolai@web.de"
                className="text-accent hover:text-accent-dark transition-colors"
              >
                fahrschule-ralf-nicolai@web.de
              </a>{' '}
              und wird auf den Servern unseres E-Mail-Providers (web.de, 1&amp;1 Mail &amp; Media GmbH,
              Deutschland) abgerufen.
            </p>
            <p>
              <span className="text-white font-medium">Zweck:</span> Beantwortung deiner Anfrage und
              gegebenenfalls Anbahnung des Ausbildungsvertrags.
            </p>
            <p>
              <span className="text-white font-medium">Rechtsgrundlage:</span> Art. 6 Abs. 1 lit. b DSGVO
              (Vertragsanbahnung) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der
              Beantwortung deiner Anfrage).
            </p>
            <p>
              <span className="text-white font-medium">Speicherdauer:</span> Wir speichern deine
              E-Mail-Korrespondenz, solange sie für die Bearbeitung deines Anliegens erforderlich ist.
              Bei Vertragsabschluss gelten die gesetzlichen Aufbewahrungsfristen.
            </p>
          </SectionCard>

          {/* 5. Cookies & lokale Speicherung */}
          <SectionCard id="cookies" icon={Cookie} title="5. Cookies & lokale Speicherung">
            <p>
              Diese Webseite setzt keine Tracking- oder Werbe-Cookies. Wir verwenden ausschließlich
              folgende technisch notwendige Speicher­zugriffe:
            </p>
            <div className="space-y-3 not-prose">
              <div className="p-5 rounded-2xl bg-secondary border border-white/10">
                <p className="font-display text-lg text-primary tracking-wide mb-2">
                  Consent-Speicher (localStorage)
                </p>
                <p className="text-sm text-gray-300 mb-2">
                  Schlüssel:{' '}
                  <code className="px-2 py-0.5 rounded bg-secondary-light text-accent text-xs">
                    nicolai_consent_v1
                  </code>
                </p>
                <p className="text-sm text-gray-400">
                  Speichert deine Cookie-Entscheidung lokal in deinem Browser, damit der Hinweis nicht
                  bei jedem Besuch erneut erscheint. Die Daten verlassen deinen Rechner nicht.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-secondary border border-white/10">
                <p className="font-display text-lg text-primary tracking-wide mb-2">
                  Admin-Session-Cookie
                </p>
                <p className="text-sm text-gray-300 mb-2">
                  Name:{' '}
                  <code className="px-2 py-0.5 rounded bg-secondary-light text-accent text-xs">
                    nic_admin
                  </code>{' '}
                  · HttpOnly · Secure · SameSite=Strict
                </p>
                <p className="text-sm text-gray-400">
                  Wird ausschließlich gesetzt, wenn ein Mitarbeiter sich am internen Admin-Bereich
                  anmeldet, um Inhalte zu pflegen. Für normale Besucher ist dieses Cookie nicht
                  relevant und wird nicht gesetzt.
                </p>
              </div>
            </div>
            <p>
              <span className="text-white font-medium">Rechtsgrundlage:</span> § 25 Abs. 2 Nr. 2 TDDDG
              (technisch unbedingt erforderlich).
            </p>
          </SectionCard>

          {/* 6. Schriftarten */}
          <SectionCard id="schriftarten" icon={Type} title="6. Schriftarten">
            <p>
              Diese Webseite verwendet die Schriftarten <span className="text-white font-medium">Bebas Neue</span>{' '}
              und <span className="text-white font-medium">DM Sans</span>. Beide Schriften werden{' '}
              <span className="text-primary font-medium">lokal von unserem eigenen Server</span> ausgeliefert
              (self-hosted) – es findet keine Verbindung zu Google Fonts oder anderen Drittanbietern statt.
              Deine IP-Adresse wird beim Laden der Schriften nicht an Dritte übertragen.
            </p>
          </SectionCard>

          {/* 7. Google Maps */}
          <SectionCard id="maps" icon={MapPin} title="7. Eingebettete Karten von Google Maps">
            <p>
              Auf unserer Kontaktseite können wir die Standorte unserer Fahrschule auf einer Karte
              darstellen. Die Karten werden vom Dienst{' '}
              <span className="text-white font-medium">Google Maps</span> der Google Ireland Limited,
              Gordon House, Barrow Street, Dublin 4, Irland, eingebettet.
            </p>
            <p>
              <span className="text-white font-medium">Wichtig:</span> Die Karten werden{' '}
              <span className="text-primary font-medium">erst dann geladen, wenn du dem ausdrücklich zustimmst</span>
              . Bis dahin ist die Karte deaktiviert; ein Klick auf „Karte aktivieren" startet das
              Laden.
            </p>
            <p>Beim Aktivieren werden folgende Daten an Google übertragen:</p>
            <ul className="space-y-2">
              <Bullet>Deine IP-Adresse</Bullet>
              <Bullet>Die abgerufene Adresse / der Standortname</Bullet>
              <Bullet>Browser-Informationen (User-Agent)</Bullet>
              <Bullet>Referrer-URL</Bullet>
            </ul>
            <p>
              Google kann diese Daten in Server in den USA übertragen. Für Datenübermittlungen in
              Drittländer setzt Google auf die EU-Standardvertragsklauseln. Genaueres findest du in
              der{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-accent hover:text-accent-dark transition-colors"
              >
                Datenschutzerklärung von Google
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              .
            </p>
            <p>
              <span className="text-white font-medium">Rechtsgrundlage:</span> Art. 6 Abs. 1 lit. a DSGVO
              (Einwilligung). Du kannst deine Einwilligung jederzeit{' '}
              <button
                type="button"
                onClick={openSettings}
                className="inline-flex items-center gap-1 text-accent hover:text-accent-dark underline underline-offset-2 transition-colors"
              >
                <Settings className="w-3.5 h-3.5" />
                über die Cookie-Einstellungen
              </button>{' '}
              widerrufen.
            </p>
          </SectionCard>

          {/* 8. SSL */}
          <SectionCard id="ssl" icon={Lock} title="8. SSL/TLS-Verschlüsselung">
            <p>
              Diese Seite nutzt aus Gründen der Sicherheit und zum Schutz der Übertragung
              vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung
              erkennst du am „https://" in der Adresszeile deines Browsers und am Schloss-Symbol.
              Zusätzlich wird per HTTP-Strict-Transport-Security (HSTS) erzwungen, dass dein Browser
              ausschließlich verschlüsselt mit unserer Webseite kommuniziert.
            </p>
          </SectionCard>

          {/* 9. Rechte */}
          <SectionCard id="rechte" icon={Shield} title="9. Deine Rechte als betroffene Person">
            <p>Hinsichtlich der dich betreffenden Daten stehen dir folgende Rechte zu:</p>
            <ul className="space-y-2">
              <Bullet>
                <span className="text-white font-medium">Auskunft</span> über die zu deiner Person
                gespeicherten Daten (Art. 15 DSGVO).
              </Bullet>
              <Bullet>
                <span className="text-white font-medium">Berichtigung</span> unrichtiger Daten
                (Art. 16 DSGVO).
              </Bullet>
              <Bullet>
                <span className="text-white font-medium">Löschung</span> deiner Daten, soweit keine
                Aufbewahrungspflichten bestehen (Art. 17 DSGVO).
              </Bullet>
              <Bullet>
                <span className="text-white font-medium">Einschränkung</span> der Verarbeitung
                (Art. 18 DSGVO).
              </Bullet>
              <Bullet>
                <span className="text-white font-medium">Datenübertragbarkeit</span> in einem
                gängigen, maschinenlesbaren Format (Art. 20 DSGVO).
              </Bullet>
              <Bullet>
                <span className="text-white font-medium">Widerspruch</span> gegen die Verarbeitung,
                soweit diese auf Art. 6 Abs. 1 lit. e oder f DSGVO beruht (Art. 21 DSGVO).
              </Bullet>
            </ul>
            <p>
              Wende dich für die Ausübung deiner Rechte formlos per E-Mail an{' '}
              <a
                href="mailto:fahrschule-ralf-nicolai@web.de"
                className="text-accent hover:text-accent-dark transition-colors"
              >
                fahrschule-ralf-nicolai@web.de
              </a>
              .
            </p>
          </SectionCard>

          {/* 10. Widerruf */}
          <SectionCard
            id="widerruf"
            icon={RefreshCw}
            title="10. Widerruf der Einwilligung"
          >
            <p>
              Sofern du eine Einwilligung erteilt hast (z. B. zum Laden der Google-Maps-Karten),
              kannst du diese jederzeit für die Zukunft widerrufen. Die Rechtmäßigkeit der bis zum
              Widerruf erfolgten Verarbeitung bleibt davon unberührt.
            </p>
            <div className="not-prose">
              <button
                type="button"
                onClick={openSettings}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl btn-primary text-secondary text-sm font-bold tracking-wide"
              >
                <Settings className="w-4 h-4" />
                Cookie-Einstellungen öffnen
              </button>
            </div>
          </SectionCard>

          {/* 11. Beschwerde */}
          <SectionCard id="beschwerde" icon={Scale} title="11. Beschwerderecht bei der Aufsichtsbehörde">
            <p>
              Unbeschadet eines anderweitigen verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs
              steht dir das Recht auf Beschwerde bei einer Aufsichtsbehörde zu, wenn du der Ansicht
              bist, dass die Verarbeitung deiner Daten gegen die DSGVO verstößt. Für uns zuständig ist:
            </p>
            <div className="p-5 rounded-2xl bg-secondary border border-white/10 not-prose">
              <p className="font-display text-lg text-primary tracking-wide mb-2">
                Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg
              </p>
              <p className="text-sm text-gray-300">Königstraße 10a</p>
              <p className="text-sm text-gray-300">70173 Stuttgart</p>
              <p className="text-sm text-gray-300 mt-2">
                Telefon:{' '}
                <a
                  href="tel:+4971161554150"
                  className="text-accent hover:text-accent-dark transition-colors"
                >
                  0711 61 55 41 – 0
                </a>
              </p>
              <p className="text-sm text-gray-300">
                Web:{' '}
                <a
                  href="https://www.baden-wuerttemberg.datenschutz.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-accent hover:text-accent-dark transition-colors"
                >
                  www.baden-wuerttemberg.datenschutz.de
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </p>
            </div>
          </SectionCard>

          {/* 12. Externe Links */}
          <SectionCard id="links" icon={Link2} title="12. Externe Links">
            <p>
              Unsere Webseite kann Links zu externen Webseiten enthalten (z. B. zum Fahrlehrerverband
              Baden-Württemberg, Shutterstock oder Google Maps). Auf den Inhalt und die
              Datenschutzpraxis dieser fremden Webseiten haben wir keinen Einfluss. Beim Anklicken
              eines externen Links verlässt du unseren Verantwortungsbereich – ab diesem Moment gelten
              die Datenschutzbestimmungen des jeweiligen Anbieters.
            </p>
          </SectionCard>

          {/* 13. Aktualität */}
          <SectionCard id="aktualitaet" icon={CalendarClock} title="13. Aktualität & Änderungen">
            <p>
              Durch die Weiterentwicklung unseres Internetauftritts oder geänderte gesetzliche
              Vorgaben kann es notwendig werden, diese Datenschutzerklärung anzupassen. Die jeweils
              aktuelle Fassung kannst du jederzeit auf dieser Seite abrufen.
            </p>
            <p className="text-sm text-gray-400">
              <span className="text-white font-medium">Stand:</span> {STAND}
            </p>
          </SectionCard>
        </div>
      </section>
    </>
  );
}
