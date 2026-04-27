import { Shield, Cookie, BarChart3, Share2, UserCheck, Lock, Mail, FileWarning, Link2, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/common';

export function Datenschutz() {
  const sections = [
    { id: 'verantwortlicher', label: '1. Verantwortlicher' },
    { id: 'erhebung', label: '2. Datenerhebung' },
    { id: 'weitergabe', label: '3. Weitergabe von Daten' },
    { id: 'cookies', label: '4. Cookies' },
    { id: 'analyse', label: '5. Analyse-Tools' },
    { id: 'social', label: '6. Social Media Plug-Ins' },
    { id: 'rechte', label: '7. Betroffenenrechte' },
    { id: 'widerspruch', label: '8. Widerspruchsrecht' },
    { id: 'sicherheit', label: '9. Datensicherheit' },
    { id: 'kommunikation', label: '10. Internet-Kommunikation' },
    { id: 'links', label: '11. Links' },
    { id: 'aktualitaet', label: '12. Aktualität' },
  ];

  return (
    <>
      <PageHero
        crumb="Datenschutz"
        title={<span className="gradient-text">DATENSCHUTZ</span>}
        subtitle="Der Schutz Ihrer Privatsphäre und Ihrer persönlichen Daten ist uns wichtig."
      />

      <section className="py-24 bg-secondary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent/5 to-transparent rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Intro */}
          <div className="bg-secondary-light rounded-3xl p-8 md:p-10 shadow-xl shadow-black/40 border border-white/10 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                <Shield className="w-7 h-7 text-secondary" />
              </div>
              <h2 className="display-md text-white">DATENSCHUTZERKLÄRUNG</h2>
            </div>
            <p className="text-gray-300 leading-relaxed text-lg">
              Der Schutz Ihrer Privatsphäre und Ihre persönlichen Daten bei der Nutzung unserer
              Websites sind uns wichtig. Daher halten wir uns strikt an die Regeln der
              Datenschutzgesetze. Im Folgenden erläutern wir, welche Informationen wir während
              Ihres Besuches auf unseren Websites erfassen und wie diese Informationen genutzt werden.
            </p>
          </div>

          {/* Inhaltsverzeichnis */}
          <nav className="bg-secondary-light rounded-3xl p-8 shadow-xl shadow-black/40 border border-white/10 mb-12">
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
          <article id="verantwortlicher" className="bg-secondary-light rounded-3xl p-8 md:p-10 shadow-xl shadow-black/40 border border-white/10 mb-8 scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-accent" />
              </div>
              <h2 className="display-sm text-white">1. Name und Kontaktdaten des Verantwortlichen</h2>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Diese Datenschutz-Information gilt für die Datenverarbeitung durch:
            </p>
            <div className="p-6 rounded-2xl bg-secondary border border-white/10">
              <p className="font-display text-xl text-primary mb-2">Fahrschule Nicolai</p>
              <p className="text-gray-300">Ralf Nicolai</p>
              <p className="text-gray-300">
                E-Mail:{' '}
                <a
                  href="mailto:fahrschule-ralf-nicolai@web.de"
                  className="text-accent hover:text-accent-dark transition-colors"
                >
                  fahrschule-ralf-nicolai@web.de
                </a>
              </p>
              <p className="text-gray-300">Telefon: +49 (0)170 2138547</p>
            </div>
          </article>

          {/* 2. Erhebung */}
          <article id="erhebung" className="bg-secondary-light rounded-3xl p-8 md:p-10 shadow-xl shadow-black/40 border border-white/10 mb-8 scroll-mt-24">
            <h2 className="display-sm text-white mb-6">
              2. Erhebung und Speicherung personenbezogener Daten sowie Art und Zweck von deren Verwendung
            </h2>

            <h3 className="font-display text-xl text-primary tracking-wider mb-3 mt-6">
              A) BEIM BESUCH DER WEBSITE
            </h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Beim Aufrufen unserer Website werden durch den auf Ihrem Endgerät zum Einsatz kommenden
              Browser automatisch Informationen an den Server unserer Website gesendet. Diese
              Informationen werden temporär in einem sog. Logfile gespeichert. Folgende Informationen
              werden dabei ohne Ihr Zutun erfasst und bis zur automatisierten Löschung gespeichert:
            </p>
            <ul className="space-y-2 mb-6 ml-4">
              {[
                'IP-Adresse des anfragenden Rechners',
                'Datum und Uhrzeit des Zugriffs',
                'Name und URL der abgerufenen Datei',
                'Website, von der aus der Zugriff erfolgt (Referrer-URL)',
                'verwendeter Browser und ggf. das Betriebssystem Ihres Rechners sowie der Name Ihres Access-Providers',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-gray-300 mb-3 leading-relaxed">
              Die genannten Daten werden durch uns zu folgenden Zwecken verarbeitet:
            </p>
            <ul className="space-y-2 mb-6 ml-4">
              {[
                'Gewährleistung eines reibungslosen Verbindungsaufbaus der Website',
                'Gewährleistung einer komfortablen Nutzung unserer Website',
                'Auswertung der Systemsicherheit und -stabilität',
                'weitere administrative Zwecke',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-gray-300 leading-relaxed">
              Die Rechtsgrundlage für die Datenverarbeitung ist Art. 6 Abs. 1 S. 1 lit. f DSGVO.
              Unser berechtigtes Interesse folgt aus oben aufgelisteten Zwecken zur Datenerhebung.
              In keinem Fall verwenden wir die erhobenen Daten zu dem Zweck, Rückschlüsse auf Ihre
              Person zu ziehen. Darüber hinaus setzen wir beim Besuch unserer Website Cookies sowie
              Analysedienste ein. Nähere Erläuterungen dazu erhalten Sie unter den Ziff. 4 und 5
              dieser Datenschutzerklärung.
            </p>

            <h3 className="font-display text-xl text-primary tracking-wider mb-3 mt-8">
              B) BEI NUTZUNG UNSERES KONTAKTFORMULARS
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Bei Fragen jeglicher Art bieten wir Ihnen die Möglichkeit, mit uns über ein auf der
              Website bereitgestelltes Formular Kontakt aufzunehmen. Dabei ist die Angabe einer
              gültigen E-Mail-Adresse, Name und Ort erforderlich, damit wir wissen, von wem die
              Anfrage stammt und um diese beantworten zu können. Weitere Angaben können freiwillig
              getätigt werden. Die Datenverarbeitung zum Zwecke der Kontaktaufnahme mit uns erfolgt
              nach Art. 6 Abs. 1 S. 1 lit. a DSGVO auf Grundlage Ihrer freiwillig erteilten
              Einwilligung. Die für die Benutzung des Kontaktformulars von uns erhobenen
              personenbezogenen Daten werden nach Erledigung der von Ihnen gestellten Anfrage
              automatisch gelöscht.
            </p>
          </article>

          {/* 3. Weitergabe */}
          <article id="weitergabe" className="bg-secondary-light rounded-3xl p-8 md:p-10 shadow-xl shadow-black/40 border border-white/10 mb-8 scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center">
                <Share2 className="w-6 h-6 text-accent" />
              </div>
              <h2 className="display-sm text-white">3. Weitergabe von Daten</h2>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Eine Übermittlung Ihrer persönlichen Daten an Dritte zu anderen als den im Folgenden
              aufgeführten Zwecken findet nicht statt.
            </p>
            <p className="text-gray-300 mb-3 leading-relaxed">
              Wir geben Ihre persönlichen Daten nur an Dritte weiter, wenn:
            </p>
            <ul className="space-y-2 ml-4">
              {[
                'Sie Ihre nach Art. 6 Abs. 1 S. 1 lit. a DSGVO ausdrückliche Einwilligung dazu erteilt haben,',
                'die Weitergabe nach Art. 6 Abs. 1 S. 1 lit. f DSGVO zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen erforderlich ist und kein Grund zur Annahme besteht, dass Sie ein überwiegendes schutzwürdiges Interesse an der Nichtweitergabe Ihrer Daten haben,',
                'für den Fall, dass für die Weitergabe nach Art. 6 Abs. 1 S. 1 lit. c DSGVO eine gesetzliche Verpflichtung besteht, sowie',
                'dies gesetzlich zulässig und nach Art. 6 Abs. 1 S. 1 lit. b DSGVO für die Abwicklung von Vertragsverhältnissen mit Ihnen erforderlich ist.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* 4. Cookies */}
          <article id="cookies" className="bg-secondary-light rounded-3xl p-8 md:p-10 shadow-xl shadow-black/40 border border-white/10 mb-8 scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center">
                <Cookie className="w-6 h-6 text-accent" />
              </div>
              <h2 className="display-sm text-white">4. Cookies</h2>
            </div>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Wir setzen auf unserer Seite Cookies ein. Hierbei handelt es sich um kleine Dateien,
                die Ihr Browser automatisch erstellt und die auf Ihrem Endgerät (Laptop, Tablet,
                Smartphone o.&nbsp;ä.) gespeichert werden, wenn Sie unsere Seite besuchen. Cookies
                richten auf Ihrem Endgerät keinen Schaden an, enthalten keine Viren, Trojaner oder
                sonstige Schadsoftware.
              </p>
              <p>
                In dem Cookie werden Informationen abgelegt, die sich jeweils im Zusammenhang mit
                dem spezifisch eingesetzten Endgerät ergeben. Dies bedeutet jedoch nicht, dass wir
                dadurch unmittelbar Kenntnis von Ihrer Identität erhalten.
              </p>
              <p>
                Der Einsatz von Cookies dient einerseits dazu, die Nutzung unseres Angebots für Sie
                angenehmer zu gestalten. So setzen wir sogenannte Session-Cookies ein, um zu
                erkennen, dass Sie einzelne Seiten unserer Website bereits besucht haben. Diese
                werden nach Verlassen unserer Seite automatisch gelöscht.
              </p>
              <p>
                Darüber hinaus setzen wir ebenfalls zur Optimierung der Benutzerfreundlichkeit
                temporäre Cookies ein, die für einen bestimmten festgelegten Zeitraum auf Ihrem
                Endgerät gespeichert werden. Besuchen Sie unsere Seite erneut, um unsere Dienste in
                Anspruch zu nehmen, wird automatisch erkannt, dass Sie bereits bei uns waren und
                welche Eingaben und Einstellungen sie getätigt haben, um diese nicht noch einmal
                eingeben zu müssen.
              </p>
              <p>
                Zum anderen setzen wir Cookies ein, um die Nutzung unserer Website statistisch zu
                erfassen und zum Zwecke der Optimierung unseres Angebotes für Sie auszuwerten
                (siehe Ziff.&nbsp;5). Diese Cookies ermöglichen es uns, bei einem erneuten Besuch
                unserer Seite automatisch zu erkennen, dass Sie bereits bei uns waren. Diese Cookies
                werden nach einer jeweils definierten Zeit automatisch gelöscht.
              </p>
              <p>
                Die durch Cookies verarbeiteten Daten sind für die genannten Zwecke zur Wahrung
                unserer berechtigten Interessen sowie der Dritter nach Art. 6 Abs. 1 S. 1 lit. f
                DSGVO erforderlich.
              </p>
              <p>
                Die meisten Browser akzeptieren Cookies automatisch. Sie können Ihren Browser jedoch
                so konfigurieren, dass keine Cookies auf Ihrem Computer gespeichert werden oder stets
                ein Hinweis erscheint, bevor ein neuer Cookie angelegt wird. Die vollständige
                Deaktivierung von Cookies kann jedoch dazu führen, dass Sie nicht alle Funktionen
                unserer Website nutzen können.
              </p>
            </div>
          </article>

          {/* 5. Analyse-Tools */}
          <article id="analyse" className="bg-secondary-light rounded-3xl p-8 md:p-10 shadow-xl shadow-black/40 border border-white/10 mb-8 scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-accent" />
              </div>
              <h2 className="display-sm text-white">5. Analyse-Tools</h2>
            </div>

            <h3 className="font-display text-xl text-primary tracking-wider mb-3">
              A) TRACKING-TOOLS
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Die im Folgenden aufgeführten und von uns eingesetzten Tracking-Maßnahmen werden auf
              Grundlage des Art. 6 Abs. 1 S. 1 lit. f DSGVO durchgeführt. Mit den zum Einsatz
              kommenden Tracking-Maßnahmen wollen wir eine bedarfsgerechte Gestaltung und die
              fortlaufende Optimierung unserer Webseite sicherstellen. Zum anderen setzen wir die
              Tracking-Maßnahmen ein, um die Nutzung unserer Webseite statistisch zu erfassen und
              zum Zwecke der Optimierung unseres Angebotes für Sie auszuwerten. Diese Interessen
              sind als berechtigt im Sinne der vorgenannten Vorschrift anzusehen. Die jeweiligen
              Datenverarbeitungszwecke und Datenkategorien sind aus den entsprechenden
              Tracking-Tools zu entnehmen.
            </p>

            {/* Google Analytics */}
            <div className="p-6 rounded-2xl bg-secondary border border-white/10 mb-6">
              <h4 className="font-display text-lg text-white mb-3">1) Google Analytics</h4>
              <div className="space-y-3 text-gray-300 leading-relaxed text-sm">
                <p>
                  Zum Zwecke der bedarfsgerechten Gestaltung und fortlaufenden Optimierung unserer
                  Seiten nutzen wir Google Analytics, ein Webanalysedienst der Google Inc.
                  (1600 Amphitheatre Parkway, Mountain View, CA 94043, USA; im Folgenden „Google").
                  In diesem Zusammenhang werden pseudonymisierte Nutzungsprofile erstellt und
                  Cookies (siehe unter Ziff.&nbsp;4) verwendet. Die durch den Cookie erzeugten
                  Informationen über Ihre Benutzung dieser Website wie
                </p>
                <ul className="ml-4 space-y-1">
                  {['Browser-Typ/-Version', 'verwendetes Betriebssystem', 'Referrer-URL (die zuvor besuchte Seite)', 'Hostname des zugreifenden Rechners (IP-Adresse)', 'Uhrzeit der Serveranfrage'].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  werden an einen Server von Google in den USA übertragen und dort gespeichert.
                  Die Informationen werden verwendet, um die Nutzung der Website auszuwerten, um
                  Reports über die Websiteaktivitäten zusammenzustellen und um weitere mit der
                  Websitenutzung und der Internetnutzung verbundene Dienstleistungen zu Zwecken der
                  Marktforschung und bedarfsgerechten Gestaltung dieser Internetseiten zu erbringen.
                  Auch werden diese Informationen gegebenenfalls an Dritte übertragen, sofern dies
                  gesetzlich vorgeschrieben ist oder soweit Dritte diese Daten im Auftrag verarbeiten.
                  Es wird in keinem Fall Ihre IP-Adresse mit anderen Daten von Google zusammengeführt.
                  Die IP-Adressen werden anonymisiert, so dass eine Zuordnung nicht möglich ist
                  (IP-Masking).
                </p>
                <p>
                  Sie können die Installation der Cookies durch eine entsprechende Einstellung der
                  Browser-Software verhindern; wir weisen jedoch darauf hin, dass in diesem Fall
                  gegebenenfalls nicht sämtliche Funktionen dieser Website vollumfänglich genutzt
                  werden können. Sie können darüber hinaus die Erfassung der durch das Cookie
                  erzeugten und auf Ihre Nutzung der Website bezogenen Daten (inkl. Ihrer IP-Adresse)
                  sowie die Verarbeitung dieser Daten durch Google verhindern, indem Sie ein
                  Browser-Add-on{' '}
                  <a
                    href="https://tools.google.com/dlpage/gaoptout?hl=de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-dark transition-colors"
                  >
                    herunterladen und installieren
                  </a>
                  .
                </p>
                <p>
                  Weitere Informationen zum Datenschutz im Zusammenhang mit Google Analytics finden
                  Sie etwa in der{' '}
                  <a
                    href="https://support.google.com/analytics/answer/6004245?hl=de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-dark transition-colors"
                  >
                    Google Analytics-Hilfe
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* Google Ads */}
            <div className="p-6 rounded-2xl bg-secondary border border-white/10 mb-6">
              <h4 className="font-display text-lg text-white mb-3">2) Google Ads Conversion Tracking</h4>
              <div className="space-y-3 text-gray-300 leading-relaxed text-sm">
                <p>
                  Um die Nutzung unserer Webseite statistisch zu erfassen und auszuwerten sowie zur
                  Optimierung unserer Website, nutzen wir ferner das Google Conversion Tracking.
                  Dabei wird von Google Ads ein Cookie (siehe Ziffer&nbsp;4) auf Ihrem Rechner
                  gesetzt, sofern Sie über eine Google-Anzeige auf unsere Webseite gelangt sind.
                </p>
                <p>
                  Diese Cookies verlieren nach 30 Tagen ihre Gültigkeit und dienen nicht der
                  persönlichen Identifizierung. Besucht der Nutzer bestimmte Seiten der Webseite
                  des Ads-Kunden und das Cookie ist noch nicht abgelaufen, können Google und der
                  Kunde erkennen, dass der Nutzer auf die Anzeige geklickt hat und zu dieser Seite
                  weitergeleitet wurde.
                </p>
                <p>
                  Jeder Ads-Kunde erhält ein anderes Cookie. Cookies können somit nicht über die
                  Webseiten von Ads-Kunden nachverfolgt werden. Die mithilfe des Conversion-Cookies
                  eingeholten Informationen dienen dazu, Conversion-Statistiken für Ads-Kunden zu
                  erstellen, die sich für Conversion-Tracking entschieden haben. Die Ads-Kunden
                  erfahren die Gesamtanzahl der Nutzer, die auf ihre Anzeige geklickt haben und zu
                  einer mit einem Conversion-Tracking-Tag versehenen Seite weitergeleitet wurden.
                  Sie erhalten jedoch keine Informationen, mit denen sich Nutzer persönlich
                  identifizieren lassen.
                </p>
                <p>
                  Wenn Sie nicht an dem Tracking-Verfahren teilnehmen möchten, können Sie auch das
                  hierfür erforderliche Setzen eines Cookies ablehnen — etwa per Browser-Einstellung,
                  die das automatische Setzen von Cookies generell deaktiviert. Sie können Cookies
                  für Conversion-Tracking auch deaktivieren, indem Sie Ihren Browser so einstellen,
                  dass Cookies von der Domain „www.googleadservices.com" blockiert werden.
                </p>
              </div>
            </div>

            {/* Google Maps */}
            <div className="p-6 rounded-2xl bg-secondary border border-white/10">
              <h4 className="font-display text-lg text-white mb-3">3) Google Maps</h4>
              <div className="space-y-3 text-gray-300 leading-relaxed text-sm">
                <p>
                  Diese Website verwendet die „Google Maps und Routenplaner"-Funktion der Google Inc.,
                  1600 Amphitheatre Parkway, Mountain View, CA 94043, United States („Google") um
                  geographische Informationen und Anfahrtsrouten darzustellen bzw. zu berechnen.
                  Durch Google Maps können Daten über Ihre Nutzung dieser Website an Google
                  übertragen, erhoben und von Google genutzt werden. Sie können eine solche
                  Datenübertragung verhindern, wenn Sie in Ihrem Browser „Javascript" deaktivieren.
                  In dem Fall können aber keine Karten angezeigt werden. Durch die Nutzung dieser
                  Website und die Nichtaktivierung von „Javascript" erklären Sie Ihr Einverständnis,
                  dass Sie mit der Bearbeitung Ihrer Daten durch Google zum obigen Zwecke
                  einverstanden sind. Weitere Informationen finden Sie unter:{' '}
                  <a
                    href="https://www.google.com/intl/de_de/help/terms_maps.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-dark transition-colors break-all"
                  >
                    google.com/intl/de_de/help/terms_maps.html
                  </a>
                  .
                </p>
              </div>
            </div>
          </article>

          {/* 6. Social Media */}
          <article id="social" className="bg-secondary-light rounded-3xl p-8 md:p-10 shadow-xl shadow-black/40 border border-white/10 mb-8 scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center">
                <Share2 className="w-6 h-6 text-accent" />
              </div>
              <h2 className="display-sm text-white">6. Social Media Plug-Ins</h2>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Wir setzen auf unserer Website auf Grundlage des Art. 6 Abs. 1 S. 1 lit. f DSGVO
              Social Plug-ins der sozialen Netzwerke Facebook und Instagram ein, um uns hierüber
              bekannter zu machen. Der dahinterstehende werbliche Zweck ist als berechtigtes
              Interesse im Sinne der DSGVO anzusehen. Die Verantwortung für den datenschutzkonformen
              Betrieb ist durch deren jeweiligen Anbieter zu gewährleisten. Die Einbindung dieser
              Plug-ins durch uns erfolgt im Wege der sogenannten Zwei-Klick-Methode, um Besucher
              unserer Webseite bestmöglich zu schützen.
            </p>

            <div className="p-6 rounded-2xl bg-secondary border border-white/10 mb-6">
              <h4 className="font-display text-lg text-white mb-3">A) Facebook</h4>
              <div className="space-y-3 text-gray-300 leading-relaxed text-sm">
                <p>
                  Auf unserer Website kommen Social-Media-Plugins von Facebook zum Einsatz, um deren
                  Nutzung persönlicher zu gestalten. Hierfür nutzen wir den „LIKE"- oder
                  „TEILEN"-Button. Es handelt sich dabei um ein Angebot von Facebook.
                </p>
                <p>
                  Wenn Sie eine Seite unseres Webauftritts aufrufen, die ein solches Plugin enthält,
                  baut Ihr Browser eine direkte Verbindung mit den Servern von Facebook auf. Der
                  Inhalt des Plugins wird von Facebook direkt an Ihren Browser übermittelt und von
                  diesem in die Webseite eingebunden.
                </p>
                <p>
                  Durch die Einbindung der Plugins erhält Facebook die Information, dass Ihr Browser
                  die entsprechende Seite unseres Webauftritts aufgerufen hat, auch wenn Sie kein
                  Facebook-Konto besitzen oder gerade nicht bei Facebook eingeloggt sind. Diese
                  Information (einschließlich Ihrer IP-Adresse) wird von Ihrem Browser direkt an
                  einen Server von Facebook in den USA übermittelt und dort gespeichert.
                </p>
                <p>
                  Sind Sie bei Facebook eingeloggt, kann Facebook den Besuch unserer Website Ihrem
                  Facebook-Konto direkt zuordnen. Wenn Sie mit den Plugins interagieren, zum
                  Beispiel den „LIKE"- oder „TEILEN"-Button betätigen, wird die entsprechende
                  Information ebenfalls direkt an einen Server von Facebook übermittelt und dort
                  gespeichert.
                </p>
                <p>
                  Wenn Sie nicht möchten, dass Facebook die über unseren Webauftritt gesammelten
                  Daten Ihrem Facebook-Konto zuordnet, müssen Sie sich vor Ihrem Besuch unserer
                  Website bei Facebook ausloggen. Zweck und Umfang der Datenerhebung entnehmen Sie
                  bitte den{' '}
                  <a
                    href="https://www.facebook.com/about/privacy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-dark transition-colors"
                  >
                    Datenschutzhinweisen von Facebook
                  </a>
                  .
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-secondary border border-white/10">
              <h4 className="font-display text-lg text-white mb-3">B) Instagram</h4>
              <div className="space-y-3 text-gray-300 leading-relaxed text-sm">
                <p>
                  Auf unseren Seiten können Funktionen des Dienstes Instagram eingebunden sein.
                  Diese Funktionen werden angeboten durch die Meta Platforms Ireland Ltd., Merrion
                  Road, Dublin 4, D04 X2K5, Irland.
                </p>
                <p>
                  Wenn Sie in Ihrem Instagram-Account eingeloggt sind, können Sie durch Anklicken
                  des Instagram-Buttons die Inhalte unserer Seiten mit Ihrem Instagram-Profil
                  verlinken. Dadurch kann Instagram den Besuch unserer Seiten Ihrem Benutzerkonto
                  zuordnen. Wir weisen darauf hin, dass wir als Anbieter der Seiten keine Kenntnis
                  vom Inhalt der übermittelten Daten sowie deren Nutzung durch Instagram erhalten.
                </p>
                <p>
                  Weitere Informationen finden Sie in der{' '}
                  <a
                    href="https://privacycenter.instagram.com/policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-dark transition-colors"
                  >
                    Datenschutzerklärung von Instagram
                  </a>
                  .
                </p>
              </div>
            </div>
          </article>

          {/* 7. Betroffenenrechte */}
          <article id="rechte" className="bg-secondary-light rounded-3xl p-8 md:p-10 shadow-xl shadow-black/40 border border-white/10 mb-8 scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-accent" />
              </div>
              <h2 className="display-sm text-white">7. Betroffenenrechte</h2>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">Sie haben das Recht:</p>
            <ul className="space-y-3 ml-4">
              {[
                'gemäß Art. 15 DSGVO Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten zu verlangen. Insbesondere können Sie Auskunft über die Verarbeitungszwecke, die Kategorie der personenbezogenen Daten, die Kategorien von Empfängern, gegenüber denen Ihre Daten offengelegt wurden oder werden, die geplante Speicherdauer, das Bestehen eines Rechts auf Berichtigung, Löschung, Einschränkung der Verarbeitung oder Widerspruch, das Bestehen eines Beschwerderechts, die Herkunft Ihrer Daten, sofern diese nicht bei uns erhoben wurden, sowie über das Bestehen einer automatisierten Entscheidungsfindung einschließlich Profiling und ggf. aussagekräftigen Informationen zu deren Einzelheiten verlangen;',
                'gemäß Art. 16 DSGVO unverzüglich die Berichtigung unrichtiger oder Vervollständigung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen;',
                'gemäß Art. 17 DSGVO die Löschung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen, soweit nicht die Verarbeitung zur Ausübung des Rechts auf freie Meinungsäußerung und Information, zur Erfüllung einer rechtlichen Verpflichtung, aus Gründen des öffentlichen Interesses oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen erforderlich ist;',
                'gemäß Art. 18 DSGVO die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen, soweit die Richtigkeit der Daten von Ihnen bestritten wird, die Verarbeitung unrechtmäßig ist, Sie aber deren Löschung ablehnen und wir die Daten nicht mehr benötigen, Sie jedoch diese zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen benötigen oder Sie gemäß Art. 21 DSGVO Widerspruch gegen die Verarbeitung eingelegt haben;',
                'gemäß Art. 20 DSGVO Ihre personenbezogenen Daten, die Sie uns bereitgestellt haben, in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten oder die Übermittlung an einen anderen Verantwortlichen zu verlangen;',
                'gemäß Art. 7 Abs. 3 DSGVO Ihre einmal erteilte Einwilligung jederzeit gegenüber uns zu widerrufen. Dies hat zur Folge, dass wir die Datenverarbeitung, die auf dieser Einwilligung beruhte, für die Zukunft nicht mehr fortführen dürfen;',
                'gemäß Art. 77 DSGVO sich bei einer Aufsichtsbehörde zu beschweren. In der Regel können Sie sich hierfür an die Aufsichtsbehörde Ihres üblichen Aufenthaltsortes oder Arbeitsplatzes oder unseres Betriebssitzes wenden.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* 8. Widerspruchsrecht */}
          <article id="widerspruch" className="bg-secondary-light rounded-3xl p-8 md:p-10 shadow-xl shadow-black/40 border border-white/10 mb-8 scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center">
                <FileWarning className="w-6 h-6 text-accent" />
              </div>
              <h2 className="display-sm text-white">8. Widerspruchsrecht</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              Sofern Ihre personenbezogenen Daten auf Grundlage von berechtigten Interessen gemäß
              Art. 6 Abs. 1 S. 1 lit. f DSGVO verarbeitet werden, haben Sie das Recht, gemäß Art. 21
              DSGVO Widerspruch gegen die Verarbeitung Ihrer personenbezogenen Daten einzulegen,
              soweit dafür Gründe vorliegen, die sich aus Ihrer besonderen Situation ergeben oder
              sich der Widerspruch gegen Direktwerbung richtet. Im letzteren Fall haben Sie ein
              generelles Widerspruchsrecht, das ohne Angabe einer besonderen Situation von uns
              umgesetzt wird.
            </p>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
              <Mail className="w-5 h-5 text-primary flex-shrink-0" />
              <p className="text-gray-300">
                Möchten Sie von Ihrem Widerrufs- oder Widerspruchsrecht Gebrauch machen, genügt eine
                E-Mail an{' '}
                <a
                  href="mailto:fahrschule-ralf-nicolai@web.de"
                  className="text-accent hover:text-accent-dark transition-colors font-semibold"
                >
                  fahrschule-ralf-nicolai@web.de
                </a>
                .
              </p>
            </div>
          </article>

          {/* 9. Datensicherheit */}
          <article id="sicherheit" className="bg-secondary-light rounded-3xl p-8 md:p-10 shadow-xl shadow-black/40 border border-white/10 mb-8 scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center">
                <Lock className="w-6 h-6 text-accent" />
              </div>
              <h2 className="display-sm text-white">9. Datensicherheit</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Wir bedienen uns im Übrigen geeigneter technischer und organisatorischer
              Sicherheitsmaßnahmen, um Ihre Daten gegen zufällige oder vorsätzliche Manipulationen,
              teilweisen oder vollständigen Verlust, Zerstörung oder gegen den unbefugten Zugriff
              Dritter zu schützen. Unsere Sicherheitsmaßnahmen werden entsprechend der
              technologischen Entwicklung fortlaufend verbessert.
            </p>
          </article>

          {/* 10. Internet-Kommunikation */}
          <article id="kommunikation" className="bg-secondary-light rounded-3xl p-8 md:p-10 shadow-xl shadow-black/40 border border-white/10 mb-8 scroll-mt-24">
            <h2 className="display-sm text-white mb-4">
              10. Hinweis auf mangelnde Vertraulichkeit bei Internet-Kommunikation
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Bitte beachten Sie, dass bei einer Kommunikation über das Internet (z.&nbsp;B. per
              E-Mail) keine vollständige Vertraulichkeit und Datensicherheit gewährleistet ist. Wir
              empfehlen daher bei vertraulichen Informationen den Postweg.
            </p>
          </article>

          {/* 11. Links */}
          <article id="links" className="bg-secondary-light rounded-3xl p-8 md:p-10 shadow-xl shadow-black/40 border border-white/10 mb-8 scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center">
                <Link2 className="w-6 h-6 text-accent" />
              </div>
              <h2 className="display-sm text-white">11. Links</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Diese Website verfügt über Links zu externen Seiten. Wenn Sie diese Links anklicken,
              muss Ihnen klar sein, dass die IP-Adresse in den meisten Fällen ebenfalls im Protokoll
              dieser Websites auftaucht. Diese Datenschutzerklärung gilt nur für diese Website und
              nicht für Websites Dritter.
            </p>
          </article>

          {/* 12. Aktualität */}
          <article id="aktualitaet" className="bg-secondary-light rounded-3xl p-8 md:p-10 shadow-xl shadow-black/40 border border-white/10 mb-8 scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-accent" />
              </div>
              <h2 className="display-sm text-white">12. Aktualität und Änderung dieser Datenschutzerklärung</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Diese Datenschutzerklärung ist aktuell gültig und hat den Stand April 2026. Durch die
              Weiterentwicklung unserer Website und Angebote darüber oder aufgrund geänderter
              gesetzlicher beziehungsweise behördlicher Vorgaben kann es notwendig werden, diese
              Datenschutzerklärung zu ändern. Die jeweils aktuelle Datenschutzerklärung kann
              jederzeit auf der Website abgerufen und ausgedruckt werden.
            </p>
          </article>

          {/* Impressum Verweis */}
          <div className="text-center mt-12">
            <p className="text-gray-400 mb-4">Anbieterkennzeichnung gemäß § 5 DDG finden Sie im</p>
            <Link
              to="/impressum"
              className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-4 transition-all"
            >
              <Shield className="w-5 h-5" />
              Impressum
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
