import { Link } from 'react-router-dom';
import {
  Car,
  Bike,
  AlertTriangle,
  Route,
  CalendarClock,
  ListChecks,
  FileText,
  Compass,
} from 'lucide-react';
import { PageHero, FaqSection } from '../components/common';
import {
  TopicSection,
  Prose,
  FactPanel,
  StepTimeline,
  CheckGrid,
  LocationBand,
  TopicLinkCards,
  TopicCta,
} from '../components/topic';
import type { Fact, Step, CheckGroup, TopicLink } from '../components/topic';
import type { FaqItem } from '../seo/schema/faq';
import { Seo } from '../seo/Seo';
import { breadcrumbsSchema, faqSchema, howToSchema, pageServiceSchema } from '../seo/schema';

const PATH = '/fuehrerschein-ludwigsburg';

const INTRO = [
  'Du willst in Ludwigsburg den Führerschein machen und fragst dich, wie der Ablauf aussieht, wie lange das dauert und was auf dich zukommt? Auf dieser Seite findest du den kompletten Weg von der Anmeldung bis zur bestandenen Prüfung — Schritt für Schritt, mit allen Pflichtstunden, Fristen und Unterlagen.',
  'Die Fahrschule Nicolai bildet in Ludwigsburg seit 1969 aus und ist bis heute familiengeführt. Inhaber Ralf Nicolai und sein Team unterrichten an zwei Standorten im Stadtgebiet: in Eglosheim in der Monreposstraße 2 und in Grünbühl in der Netzestraße 31. Ausgebildet wird in allen PKW- und Motorradklassen — vom Roller mit 15 bis zum unbeschränkten Motorrad.',
  'Was das in der Praxis bedeutet: Du lernst dort fahren, wo du später auch geprüft wirst. Im Ludwigsburger Stadtverkehr, auf den Landstraßen rund um Monrepos und Asperg und auf der Autobahn Richtung Stuttgart. Kein anonymer Großbetrieb, sondern feste Fahrlehrer, die dich von der ersten Theoriestunde bis zur Prüfung begleiten.',
];

const FACTS: Fact[] = [
  {
    label: 'Standorte',
    value: 'Eglosheim, Monreposstraße 2 · Grünbühl, Netzestraße 31',
    hint: 'Beide Unterrichtsräume liegen im Stadtgebiet Ludwigsburg.',
  },
  {
    label: 'Klassen',
    value: 'B, BF17, B196, B96, BE sowie AM, A1, A2 und A',
    hint: 'Dazu ASF-Aufbauseminare und Sicherheitstraining für Zweiradfahrer.',
  },
  {
    label: 'Mindestalter',
    value: '17 Jahre beim begleiteten Fahren (BF17), 18 Jahre für Klasse B',
  },
  {
    label: 'Theorieunterricht',
    value: '14 Doppelstunden beim Ersterwerb der Klasse B',
    hint: '12 Doppelstunden Grundstoff plus 2 Doppelstunden klassenspezifischer Stoff.',
  },
  {
    label: 'Pflichtfahrten',
    value: '12 Sonderfahrten: 5 Überland, 4 Autobahn, 3 bei Dunkelheit',
    hint: 'Zusätzliche Übungsstunden richten sich nach deinem Können — eine gesetzliche Mindestzahl gibt es dafür nicht.',
  },
  {
    label: 'Theorieprüfung',
    value: '30 Fragen, höchstens 10 Fehlerpunkte (Ersterwerb Klasse B)',
  },
  {
    label: 'Praktische Prüfung',
    value: 'Mindestens 55 Minuten Fahrzeit bei Klasse B',
  },
  {
    label: 'Dauer insgesamt',
    value: 'In der Regel 3 bis 6 Monate von der Anmeldung bis zur Fahrprüfung',
    hint: 'Entscheidend sind Bearbeitungszeit der Behörde, Prüfungstermine und wie oft du Fahrstunden nimmst.',
  },
  {
    label: 'Anmeldung',
    value: 'Vor Ort ab 18:00 Uhr, telefonisch unter 0170 / 21 38 547 oder online',
  },
];

const STEPS: Step[] = [
  {
    title: 'Beratung und Anmeldung',
    body: 'Komm zu einem Unterrichtsabend in Eglosheim oder Grünbühl vorbei — ab 18:00 Uhr ist jemand für Auskunft und Anmeldung da. Wir klären gemeinsam, welche Klasse zu dir passt, was du dafür brauchst und wann der nächste Theoriekurs startet. Telefonisch und über das Online-Formular geht das genauso.',
  },
  {
    title: 'Unterlagen zusammenstellen',
    body: 'Für den Antrag brauchst du einen Sehtest von Optiker oder Augenarzt, die Bescheinigung über eine Erste-Hilfe-Schulung, ein biometrisches Passbild und deinen Personalausweis oder Pass. Den Sehtest solltest du nicht zu früh machen: Bei Antragstellung darf er nicht älter als zwei Jahre sein.',
  },
  {
    title: 'Antrag bei der Fahrerlaubnisbehörde stellen',
    body: 'Der Antrag auf Erteilung der Fahrerlaubnis läuft über die für deinen Wohnort zuständige Fahrerlaubnisbehörde. Wir geben dir bei der Anmeldung die vollständige Unterlagenliste mit und sagen dir, in welcher Reihenfolge du was erledigst.',
    note: 'Die Bearbeitung kann mehrere Wochen dauern — stell den Antrag deshalb möglichst früh, am besten parallel zum Theoriebeginn.',
  },
  {
    title: 'Theorieunterricht besuchen',
    body: 'Beim Ersterwerb der Klasse B sind 14 Doppelstunden vorgeschrieben: 12 Doppelstunden Grundstoff, der für alle Klassen gilt, und 2 Doppelstunden klassenspezifischer Stoff. In Eglosheim unterrichten wir montags und donnerstags, in Grünbühl dienstags und donnerstags, jeweils von 19:00 bis 20:30 Uhr.',
  },
  {
    title: 'Theoretische Prüfung ablegen',
    body: 'Die Theorieprüfung machst du am Computer bei der Prüforganisation. Beim Ersterwerb der Klasse B bekommst du 30 Fragen und darfst höchstens 10 Fehlerpunkte sammeln — zwei Fragen mit je 5 Fehlerpunkten falsch zu beantworten, führt allerdings schon zum Nichtbestehen.',
    note: 'Erweiterst du eine bestehende Fahrerlaubnis, sind es nur 20 Fragen und höchstens 6 Fehlerpunkte.',
  },
  {
    title: 'Fahrstunden und Sonderfahrten',
    body: 'Parallel zur Theorie beginnt die praktische Ausbildung. Zuerst Übungsstunden, in denen du Fahrzeugbedienung, Grundfahraufgaben und den Stadtverkehr lernst. Verpflichtend sind danach die 12 Sonderfahrten: 5 Überlandfahrten, 4 Fahrten auf der Autobahn und 3 Fahrten bei Dunkelheit.',
  },
  {
    title: 'Praktische Prüfung und Führerschein',
    body: 'Bei der Fahrprüfung sitzt der amtliche Prüfer hinten, dein Fahrlehrer vorn. Für Klasse B sind mindestens 55 Minuten Fahrzeit vorgesehen. Liegt dein Kartenführerschein zum Prüfungstermin schon vor, bekommst du ihn direkt nach dem Bestehen ausgehändigt — andernfalls holst du ihn bei der Behörde ab.',
  },
];

const DOCUMENT_GROUPS: CheckGroup[] = [
  {
    title: 'Das brauchst du',
    tone: 'primary',
    items: [
      'Sehtest von Optiker oder Augenarzt (bei Antragstellung max. 2 Jahre alt)',
      'Bescheinigung über eine Erste-Hilfe-Schulung',
      'Biometrisches Passbild',
      'Personalausweis oder Pass',
      'Bei BF17: Angaben zu den Begleitpersonen',
    ],
  },
  {
    title: 'Das übernehmen wir',
    tone: 'primary',
    items: [
      'Beratung zur passenden Klasse und zum Ausbildungsumfang',
      'Vollständige Unterlagenliste für die Behörde',
      'Anmeldung zur theoretischen und praktischen Prüfung',
      'Lernmaterial und Zugang zum Fragenkatalog',
      'Prüfungsfahrzeug und Begleitung am Prüfungstag',
    ],
  },
];

const TOPIC_LINKS: TopicLink[] = [
  {
    to: '/fuehrerschein-klasse-b-ludwigsburg',
    badge: 'B',
    title: 'Autoführerschein Klasse B',
    description:
      'Ablauf, Voraussetzungen, Sonderfahrten und begleitetes Fahren mit 17 — alles zum PKW-Führerschein in Ludwigsburg.',
    icon: Car,
    tone: 'pkw',
  },
  {
    to: '/motorradfuehrerschein-ludwigsburg',
    badge: 'A',
    title: 'Motorradführerschein',
    description:
      'AM, A1, A2 und A im Vergleich, der Stufenaufstieg und was die B196-Erweiterung für 125er bringt.',
    icon: Bike,
    tone: 'motorrad',
  },
  {
    to: '/asf-aufbauseminar-ludwigsburg',
    badge: 'ASF',
    title: 'ASF-Aufbauseminar',
    description:
      'Verstoß in der Probezeit? Ablauf des Aufbauseminars, Fristen und was passiert, wenn du nicht teilnimmst.',
    icon: AlertTriangle,
    tone: 'extra',
  },
];

const FAQS: FaqItem[] = [
  {
    question: 'Wo kann ich in Ludwigsburg den Führerschein machen?',
    answer:
      'Die Fahrschule Nicolai bildet an zwei Standorten in Ludwigsburg aus: in Eglosheim in der Monreposstraße 2 (71634 Ludwigsburg) und in Grünbühl in der Netzestraße 31 (71638 Ludwigsburg). Beide Standorte bieten die komplette Ausbildung in allen PKW- und Motorradklassen an.',
  },
  {
    question: 'Wie lange dauert es, in Ludwigsburg den Führerschein zu machen?',
    answer:
      'Von der Anmeldung bis zur praktischen Prüfung dauert es in der Regel drei bis sechs Monate. Die Dauer hängt vor allem an drei Dingen: der Bearbeitungszeit der Fahrerlaubnisbehörde, der Verfügbarkeit von Prüfungsterminen und daran, wie regelmäßig du Theorieunterricht und Fahrstunden nimmst. Wer zügig durchzieht, schafft es schneller — planen solltest du aber mit einem halben Jahr.',
  },
  {
    question: 'Welche Unterlagen brauche ich für die Anmeldung in der Fahrschule?',
    answer:
      'Für den Antrag auf die Fahrerlaubnis brauchst du einen Sehtest von Optiker oder Augenarzt, die Bescheinigung über eine Erste-Hilfe-Schulung, ein biometrisches Passbild sowie Personalausweis oder Pass. Der Sehtest darf bei Antragstellung nicht älter als zwei Jahre sein. Beim begleiteten Fahren mit 17 kommen die Angaben zu den Begleitpersonen dazu.',
  },
  {
    question: 'Ab welchem Alter kann ich mich für den Führerschein anmelden?',
    answer:
      'Klasse B ist ab 18 Jahren möglich, beim begleiteten Fahren (BF17) ab 17 Jahren. Den Antrag bei der Fahrerlaubnisbehörde kannst du bis zu sechs Monate vor Erreichen des Mindestalters stellen. Die theoretische Prüfung ist frühestens drei Monate, die praktische Prüfung frühestens einen Monat vor dem entsprechenden Geburtstag möglich. Beim Roller (Klasse AM) liegt das Mindestalter bei 15 Jahren.',
  },
  {
    question: 'Wie viele Fahrstunden brauche ich für den Führerschein?',
    answer:
      'Gesetzlich vorgeschrieben sind bei Klasse B die 12 Sonderfahrten: 5 Überlandfahrten, 4 Autobahnfahrten und 3 Fahrten bei Dunkelheit. Für die Übungsstunden davor gibt es keine Mindestzahl — sie richten sich danach, wie sicher du unterwegs bist. Dein Fahrlehrer sagt dir offen, wann du prüfungsreif bist, statt Stunden auf Vorrat zu verkaufen.',
  },
  {
    question: 'Wann ist Theorieunterricht bei der Fahrschule Nicolai?',
    answer:
      'Am Standort Eglosheim (Monreposstraße 2) findet der Theorieunterricht montags und donnerstags von 19:00 bis 20:30 Uhr statt, am Standort Grünbühl (Netzestraße 31) dienstags und donnerstags zur selben Zeit. Für Auskunft und Anmeldung sind wir an diesen Tagen bereits ab 18:00 Uhr vor Ort.',
  },
  {
    question: 'Kann ich den Führerschein in Ludwigsburg auch für Motorrad machen?',
    answer:
      'Ja. Die Fahrschule Nicolai bildet in allen Motorradklassen aus: AM (Roller ab 15 Jahren), A1 (125 ccm ab 16), A2 (bis 35 kW ab 18) und A (unbeschränkt ab 24 beziehungsweise ab 20 nach zwei Jahren A2). Wer bereits mindestens fünf Jahre die Klasse B besitzt und über 25 ist, kann außerdem die Schlüsselzahl B196 für 125er ohne Prüfung erwerben.',
  },
];

const ON_THIS_PAGE = [
  { href: '#ablauf', label: 'Ablauf in 7 Schritten' },
  { href: '#unterlagen', label: 'Unterlagen' },
  { href: '#klassen', label: 'Führerscheinklassen' },
  { href: '#standorte', label: 'Standorte' },
  { href: '#faq', label: 'Häufige Fragen' },
];

export function FuehrerscheinLudwigsburg() {
  return (
    <>
      <Seo
        title="Führerschein machen in Ludwigsburg — Ablauf, Dauer & Anmeldung"
        description="Führerschein in Ludwigsburg machen: Ablauf in 7 Schritten, Dauer, Pflichtstunden, Unterlagen und Anmeldung. Fahrschule Nicolai, familiengeführt seit 1969, zwei Standorte. ☎ 0170 / 21 38 547"
        jsonLd={[
          breadcrumbsSchema([
            { name: 'Startseite', url: '/' },
            { name: 'Führerschein Ludwigsburg', url: PATH },
          ]),
          pageServiceSchema({
            slug: 'fahrausbildung',
            path: PATH,
            name: 'Führerscheinausbildung in Ludwigsburg',
            description:
              'Komplette Fahrausbildung in Ludwigsburg für PKW- und Motorradklassen: Theorieunterricht an zwei Standorten, praktische Ausbildung, Sonderfahrten und Prüfungsbegleitung.',
            serviceType: 'Fahrausbildung',
            audienceType: 'Fahrschüler ab 15 Jahren',
            alsoServed: ['Eglosheim', 'Grünbühl', 'Asperg', 'Möglingen', 'Kornwestheim', 'Tamm'],
          }),
          howToSchema({
            name: 'Führerschein machen in Ludwigsburg — Ablauf in 7 Schritten',
            description:
              'Von der Anmeldung in der Fahrschule über den Antrag bei der Fahrerlaubnisbehörde und den Theorieunterricht bis zur praktischen Prüfung.',
            path: PATH,
            steps: STEPS.map((step) => ({ name: step.title, text: step.body })),
            totalTime: 'P4M',
          }),
          faqSchema(FAQS, PATH),
        ]}
      />

      <PageHero
        crumb="Führerschein Ludwigsburg"
        eyebrow="Der komplette Weg"
        eyebrowIcon={Compass}
        title={
          <>
            FÜHRERSCHEIN MACHEN IN <span className="gradient-text">LUDWIGSBURG</span>
          </>
        }
        subtitle="Ablauf, Dauer und Pflichtstunden — und wie du bei uns in Eglosheim oder Grünbühl startest."
      />

      {/* Einleitung + Faktenblock */}
      <TopicSection glow="primary">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_24rem] gap-12 items-start">
          <div>
            <h2 className="display-lg text-white mb-6">
              DEIN FÜHRERSCHEIN IN <span className="gradient-text">LUDWIGSBURG</span>
            </h2>
            <Prose paragraphs={INTRO} />

            <nav aria-label="Inhalt dieser Seite" className="mt-10">
              <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-[0.15em] mb-4">
                Auf dieser Seite
              </h3>
              <ul className="flex flex-wrap gap-2">
                {ON_THIS_PAGE.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="inline-block px-4 py-2 rounded-full bg-secondary-light border border-white/10 text-gray-300 text-sm hover:border-primary/40 hover:text-primary transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <FactPanel facts={FACTS} />
        </div>
      </TopicSection>

      {/* Ablauf */}
      <TopicSection
        id="ablauf"
        tone="alt"
        eyebrow="Schritt für Schritt"
        eyebrowIcon={Route}
        title="So läuft dein Führerschein ab"
        lead="Sieben Schritte von der ersten Beratung bis zum Führerschein in der Hand. Zwei davon laufen parallel — Theorie und Fahrstunden musst du nicht nacheinander abarbeiten."
      >
        <div className="max-w-3xl">
          <StepTimeline steps={STEPS} />
        </div>
      </TopicSection>

      {/* Unterlagen */}
      <TopicSection
        id="unterlagen"
        eyebrow="Vorbereitung"
        eyebrowIcon={FileText}
        title="Unterlagen und Voraussetzungen"
        lead="Zwei Dinge kannst du sofort erledigen, noch bevor du dich anmeldest: Sehtest und Erste-Hilfe-Kurs. Damit verlierst du später keine Zeit."
      >
        <CheckGrid groups={DOCUMENT_GROUPS} />
      </TopicSection>

      {/* Persönliche Beratung */}
      <TopicSection id="beratung" tone="alt" width="narrow">
        <div className="rounded-3xl border border-primary/25 bg-primary/[0.06] p-8">
          <div className="flex items-start gap-4">
            <CalendarClock className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="font-display text-2xl text-white mb-3 tracking-wide">
                DEN REST KLÄREN WIR PERSÖNLICH
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Welche Klasse zu dir passt, wie viele Übungsstunden in deinem Fall sinnvoll sind und
                wann der nächste Theoriekurs startet — das besprechen wir am Telefon oder direkt bei
                uns im Unterrichtsraum. In Eglosheim montags und donnerstags, in Grünbühl dienstags
                und donnerstags, jeweils ab 18:00 Uhr.
              </p>
              <div className="mt-5 flex flex-wrap gap-4">
                <a
                  href="tel:+491702138547"
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors"
                >
                  0170 / 21 38 547 anrufen
                </a>
                <Link
                  to="/kontakt#anmeldung"
                  className="inline-flex items-center gap-2 text-gray-300 font-semibold hover:text-primary transition-colors"
                >
                  Online anfragen
                </Link>
              </div>
            </div>
          </div>
        </div>
      </TopicSection>

      {/* Klassen-Cluster */}
      <TopicSection
        id="klassen"
        eyebrow="Klassen im Detail"
        eyebrowIcon={ListChecks}
        title="Welchen Führerschein willst du machen?"
        lead="Jede Klasse hat eigene Mindestalter, Pflichtstunden und Prüfungen. Auf den folgenden Seiten steht, was für dich gilt."
        glow="accent"
      >
        <TopicLinkCards links={TOPIC_LINKS} />

        <div className="mt-10 text-center">
          <Link
            to="/leistungen"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors"
          >
            Alle Führerscheinklassen und Zusatzangebote im Überblick
          </Link>
        </div>
      </TopicSection>

      {/* Standorte */}
      <TopicSection id="standorte" tone="alt">
        <LocationBand intro="Beide Unterrichtsräume liegen im Stadtgebiet Ludwigsburg. Du entscheidest, welcher Standort für dich besser erreichbar ist — ausgebildet wird an beiden in allen Klassen." />
      </TopicSection>

      <div id="faq" className="scroll-mt-28">
        <FaqSection title="FÜHRERSCHEIN IN LUDWIGSBURG — HÄUFIGE FRAGEN" items={FAQS} />
      </div>

      <TopicCta
        title="Bereit für den ersten Schritt?"
        subtitle="Ruf an oder melde dich online an — wir sagen dir, wann der nächste Theoriekurs startet und was du mitbringen musst."
      />
    </>
  );
}
