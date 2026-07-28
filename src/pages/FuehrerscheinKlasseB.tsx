import { Link } from 'react-router-dom';
import {
  Car,
  Bike,
  Route,
  FileText,
  Users,
  ArrowRight,
  Moon,
  TrafficCone,
  Gauge,
  ShieldCheck,
} from 'lucide-react';
import { PageHero, FaqSection } from '../components/common';
import {
  TopicSection,
  Prose,
  FactPanel,
  StepTimeline,
  CheckGrid,
  LocationBand,
  TopicCta,
} from '../components/topic';
import type { Fact, Step, CheckGroup } from '../components/topic';
import type { FaqItem } from '../seo/schema/faq';
import { Seo } from '../seo/Seo';
import { breadcrumbsSchema, faqSchema, howToSchema, pageServiceSchema } from '../seo/schema';

const PATH = '/fuehrerschein-klasse-b-ludwigsburg';

const INTRO = [
  'Die Klasse B ist der Führerschein, mit dem die meisten anfangen: PKW bis 3,5 Tonnen, ab 18 Jahren allein unterwegs — oder ab 17 mit Begleitperson. Bei der Fahrschule Nicolai in Ludwigsburg machst du ihn an einem von zwei Standorten im Stadtgebiet — familiengeführt seit 1969 und mit persönlicher Betreuung von der Anmeldung bis zur Prüfung.',
  'Der Autoführerschein ist auch der Führerschein mit den meisten Pflichtbausteinen: 14 Doppelstunden Theorie, 12 Sonderfahrten, zwei Prüfungen. Auf dieser Seite steht genau, was davon auf dich zukommt, in welcher Reihenfolge — und was du mit der Klasse B am Ende alles fahren darfst.',
  'Geübt wird dort, wo geprüft wird: im Ludwigsburger Stadtverkehr mit seinen Kreisverkehren und Einbahnstraßen, auf den Landstraßen Richtung Asperg und Möglingen und auf der A81. Wer hier sicher fährt, fährt überall sicher.',
];

const FACTS: Fact[] = [
  {
    label: 'Mindestalter',
    value: '18 Jahre — mit begleitetem Fahren (BF17) bereits ab 17',
  },
  {
    label: 'Fahrzeuge',
    value: 'Kraftfahrzeuge bis 3.500 kg zulässige Gesamtmasse, höchstens 8 Sitzplätze außer dem Fahrersitz',
  },
  {
    label: 'Anhänger',
    value: 'Bis 750 kg zulässige Gesamtmasse',
    hint: 'Schwerere Anhänger nur, solange die gesamte Kombination 3.500 kg nicht überschreitet — sonst brauchst du B96 oder BE.',
  },
  {
    label: 'Eingeschlossen',
    value: 'Klassen AM und L',
    hint: 'Mit Klasse B darfst du also auch Roller bis 45 km/h fahren — für 125er brauchst du A1 oder die Schlüsselzahl B196.',
  },
  {
    label: 'Theorieunterricht',
    value: '14 Doppelstunden: 12 Grundstoff + 2 klassenspezifisch',
    hint: 'Beim Ersterwerb. Erweiterst du eine bestehende Fahrerlaubnis, sind es 6 Doppelstunden Grundstoff.',
  },
  {
    label: 'Sonderfahrten',
    value: '12 Pflichtfahrten: 5 Überland, 4 Autobahn, 3 bei Dunkelheit',
  },
  {
    label: 'Theorieprüfung',
    value: '30 Fragen, höchstens 10 Fehlerpunkte',
    hint: 'Zwei falsch beantwortete Fragen mit je 5 Fehlerpunkten bedeuten trotzdem „nicht bestanden".',
  },
  {
    label: 'Praktische Prüfung',
    value: 'Mindestens 55 Minuten Fahrzeit',
  },
  {
    label: 'Probezeit',
    value: '2 Jahre ab Erteilung der Fahrerlaubnis',
    hint: 'Bei BF17 beginnt sie schon mit der Prüfbescheinigung — ein Teil läuft also während des begleiteten Jahres ab.',
  },
];

const ALLOWED = [
  {
    icon: Car,
    title: 'PKW bis 3,5 Tonnen',
    body: 'Kraftfahrzeuge mit einer zulässigen Gesamtmasse von höchstens 3.500 kg und maximal 8 Sitzplätzen außer dem Fahrersitz. Das deckt praktisch jeden normalen PKW und die meisten Transporter ab.',
  },
  {
    icon: TrafficCone,
    title: 'Anhänger bis 750 kg',
    body: 'Anhänger mit bis zu 750 kg zulässiger Gesamtmasse darfst du immer ziehen. Schwerere Anhänger nur, wenn die Kombination insgesamt unter 3.500 kg bleibt.',
  },
  {
    icon: Bike,
    title: 'Roller und Zugmaschinen',
    body: 'Die Klasse B schließt AM (Kleinkrafträder bis 45 km/h) und L (land- und forstwirtschaftliche Zugmaschinen bis 40 km/h) mit ein — ohne zusätzliche Prüfung.',
  },
];

const STEPS: Step[] = [
  {
    title: 'Anmelden und Unterlagen besorgen',
    body: 'Melde dich bei uns in Eglosheim oder Grünbühl an — vor Ort ab 18:00 Uhr, telefonisch oder online. Parallel machst du Sehtest und Erste-Hilfe-Kurs und besorgst ein biometrisches Passbild. Danach geht der Antrag an die Fahrerlaubnisbehörde.',
    note: 'Antrag früh stellen: Die Behörde braucht oft mehrere Wochen, und ohne Bescheid gibt es keinen Prüfungstermin.',
  },
  {
    title: '14 Doppelstunden Theorie besuchen',
    body: 'Zwölf Doppelstunden Grundstoff, der für alle Klassen gilt, plus zwei Doppelstunden speziell zur Klasse B. In Eglosheim montags und donnerstags, in Grünbühl dienstags und donnerstags, jeweils 19:00 bis 20:30 Uhr.',
  },
  {
    title: 'Theoretische Prüfung bestehen',
    body: '30 Fragen am Computer, höchstens 10 Fehlerpunkte. Wir melden dich an, sobald du alle Pflichtstunden hast und im Fragentraining sicher bist — nicht vorher. Denn ein Fehlversuch wirft dich um mindestens zwei Wochen zurück: Erst danach ist eine Wiederholungsprüfung möglich.',
  },
  {
    title: 'Fahren üben',
    body: 'Erst Fahrzeugbedienung und Grundfahraufgaben auf ruhigen Strecken, dann Stadtverkehr, Vorfahrt und Kreisverkehre in Ludwigsburg. Wie viele Übungsstunden du brauchst, ist gesetzlich nicht festgelegt — dein Fahrlehrer sagt dir ehrlich, wo du stehst.',
  },
  {
    title: 'Die 12 Sonderfahrten absolvieren',
    body: 'Fünf Überlandfahrten, vier Autobahnfahrten und drei Fahrten bei Dunkelheit. Diese Fahrten sind Pflicht, unabhängig davon, wie gut du schon fährst — sie decken Situationen ab, die im Stadtverkehr nicht vorkommen.',
  },
  {
    title: 'Praktische Prüfung fahren',
    body: 'Mindestens 55 Minuten mit dem amtlichen Prüfer auf dem Rücksitz und deinem Fahrlehrer daneben. Gefahren wird in dem Gebiet, in dem du geübt hast. Nach dem Bestehen bekommst du den Führerschein — und damit beginnt die zweijährige Probezeit.',
  },
];

const SONDERFAHRTEN = [
  {
    count: '5',
    icon: Route,
    title: 'Überlandfahrten',
    body: 'Landstraßen außerhalb geschlossener Ortschaften: Überholen, Gegenverkehr, wechselnde Geschwindigkeiten, unübersichtliche Kurven.',
  },
  {
    count: '4',
    icon: Gauge,
    title: 'Autobahnfahrten',
    body: 'Auffahren und Einordnen, Abstand bei hoher Geschwindigkeit, Spurwechsel, Verlassen der Autobahn — bei uns meist auf der A81.',
  },
  {
    count: '3',
    icon: Moon,
    title: 'Fahrten bei Dunkelheit',
    body: 'Fahren bei Dämmerung oder Nacht: Lichteinstellung, Blendung durch Gegenverkehr, veränderte Entfernungseinschätzung.',
  },
];

const REQUIREMENT_GROUPS: CheckGroup[] = [
  {
    title: 'Voraussetzungen',
    tone: 'primary',
    items: [
      'Mindestalter 18 Jahre (17 Jahre bei BF17)',
      'Sehtest von Optiker oder Augenarzt, bei Antragstellung max. 2 Jahre alt',
      'Bescheinigung über eine Erste-Hilfe-Schulung',
      'Biometrisches Passbild',
      'Personalausweis oder Pass',
      'Wohnsitz in Deutschland',
    ],
  },
  {
    title: 'Im Ausbildungsumfang enthalten',
    tone: 'primary',
    items: [
      '14 Doppelstunden Theorieunterricht an zwei Standorten',
      'Praktische Ausbildung im Ludwigsburger Verkehrsraum',
      'Die 12 gesetzlich vorgeschriebenen Sonderfahrten',
      'Anmeldung zu beiden Prüfungen und Begleitung am Prüfungstag',
      'Prüfungsfahrzeug',
    ],
  },
];

const EXTENSIONS = [
  {
    badge: 'BF17',
    title: 'Begleitetes Fahren mit 17',
    body: 'Ein Jahr früher starten, ein Jahr Erfahrung sammeln — mit eingetragener Begleitperson. Statistisch die unfallärmste Art, ins Autofahren einzusteigen.',
    to: '#bf17',
    internal: false,
  },
  {
    badge: 'B196',
    title: '125er fahren ohne Motorradprüfung',
    body: 'Wer mindestens 25 ist und seit fünf Jahren Klasse B hat, kann per Schulung die Schlüsselzahl B196 erwerben — ohne zusätzliche Prüfung.',
    to: '/motorradfuehrerschein-ludwigsburg#b196',
    internal: true,
  },
  {
    badge: 'B96 / BE',
    title: 'Mit Anhänger unterwegs',
    body: 'B96 erweitert die Kombination auf 4.250 kg und braucht nur eine Schulung. BE geht darüber hinaus und schließt mit einer praktischen Prüfung ab.',
    to: '/leistungen#pkw',
    internal: true,
  },
];

const FAQS: FaqItem[] = [
  {
    question: 'Was darf ich mit dem Führerschein Klasse B fahren?',
    answer:
      'Mit der Klasse B darfst du Kraftfahrzeuge mit einer zulässigen Gesamtmasse von höchstens 3.500 kg und maximal 8 Sitzplätzen außer dem Fahrersitz fahren. Anhänger sind bis 750 kg zulässige Gesamtmasse erlaubt, schwerere nur, wenn die gesamte Kombination unter 3.500 kg bleibt. Eingeschlossen sind außerdem die Klassen AM (Roller bis 45 km/h) und L (land- und forstwirtschaftliche Zugmaschinen bis 40 km/h).',
  },
  {
    question: 'Wie viele Fahrstunden brauche ich für den Führerschein Klasse B?',
    answer:
      'Gesetzlich vorgeschrieben sind 12 Sonderfahrten: 5 Überlandfahrten, 4 Autobahnfahrten und 3 Fahrten bei Dunkelheit. Für die Übungsstunden davor gibt es keine gesetzliche Mindestzahl — wie viele du brauchst, hängt von Vorerfahrung, Alter und Übungsrhythmus ab. Die Fahrlehrer der Fahrschule Nicolai sagen dir offen, wann du prüfungsreif bist.',
  },
  {
    question: 'Wie viele Fehler darf ich in der Theorieprüfung Klasse B machen?',
    answer:
      'Beim Ersterwerb der Klasse B bekommst du 30 Fragen und darfst höchstens 10 Fehlerpunkte sammeln. Wichtig: Beantwortest du zwei Fragen mit je 5 Fehlerpunkten falsch, hast du die Prüfung nicht bestanden — auch wenn du damit die 10 Punkte nicht überschreitest. Erweiterst du eine bestehende Fahrerlaubnis, sind es 20 Fragen und höchstens 6 Fehlerpunkte.',
  },
  {
    question: 'Wie lange dauert die praktische Prüfung bei Klasse B?',
    answer:
      'Für die praktische Prüfung der Klasse B sind mindestens 55 Minuten reine Fahrzeit vorgesehen. Dazu kommen Zeit für Fahrzeugkontrolle, Aufgabenstellung und die Auswertung am Ende. Der amtliche Prüfer sitzt hinten, dein Fahrlehrer vorn auf dem Beifahrersitz.',
  },
  {
    question: 'Was ist BF17 und wer darf Begleitperson sein?',
    answer:
      'Beim begleiteten Fahren ab 17 (BF17) machst du die komplette Ausbildung und beide Prüfungen wie bei Klasse B, darfst danach aber bis zum 18. Geburtstag nur mit einer eingetragenen Begleitperson fahren. Eine Begleitperson muss mindestens 30 Jahre alt sein, seit mindestens fünf Jahren die Klasse B besitzen und darf höchstens einen Punkt im Fahreignungsregister haben. Es können mehrere Begleitpersonen eingetragen werden.',
  },
  {
    question: 'Darf ich mit Klasse B Motorrad fahren?',
    answer:
      'Mit der Klasse B darfst du Kleinkrafträder der Klasse AM fahren, also Roller und Mopeds bis 50 cm³ und 45 km/h. Für 125er (bis 125 cm³ und 11 kW) brauchst du entweder die Klasse A1 oder die Schlüsselzahl B196 — letztere setzt voraus, dass du mindestens 25 Jahre alt bist und seit fünf Jahren die Klasse B besitzt, und kommt ohne zusätzliche Prüfung aus.',
  },
  {
    question: 'Wie lange dauert der Führerschein Klasse B insgesamt?',
    answer:
      'Von der Anmeldung bis zur praktischen Prüfung dauert es in der Regel drei bis sechs Monate. Bremsfaktoren sind meist die Bearbeitungszeit der Fahrerlaubnisbehörde und die Verfügbarkeit von Prüfungsterminen, nicht die Ausbildung selbst. Wer den Antrag früh stellt und regelmäßig Fahrstunden nimmt, ist am schnellsten fertig.',
  },
];

export function FuehrerscheinKlasseB() {
  return (
    <>
      <Seo
        title="Führerschein Klasse B in Ludwigsburg — Autoführerschein bei Nicolai"
        description="Autoführerschein Klasse B in Ludwigsburg: Voraussetzungen, 14 Doppelstunden Theorie, 12 Sonderfahrten, Prüfungen und BF17. Fahrschule Nicolai, zwei Standorte. ☎ 0170 / 21 38 547"
        jsonLd={[
          breadcrumbsSchema([
            { name: 'Startseite', url: '/' },
            { name: 'Führerschein Ludwigsburg', url: '/fuehrerschein-ludwigsburg' },
            { name: 'Klasse B', url: PATH },
          ]),
          pageServiceSchema({
            slug: 'klasse-b',
            path: PATH,
            name: 'Führerschein Klasse B in Ludwigsburg',
            description:
              'Ausbildung zum PKW-Führerschein der Klasse B in Ludwigsburg: 14 Doppelstunden Theorie, praktische Ausbildung, 12 Sonderfahrten und Prüfungsbegleitung. Auch als begleitetes Fahren ab 17 (BF17).',
            serviceType: 'PKW-Führerschein Klasse B',
            audienceType: 'Mindestalter 18 Jahre, mit BF17 ab 17 Jahren',
            alsoServed: ['Eglosheim', 'Grünbühl', 'Asperg', 'Möglingen', 'Kornwestheim', 'Tamm'],
          }),
          howToSchema({
            name: 'Führerschein Klasse B machen — Ablauf in 6 Schritten',
            description:
              'Von der Anmeldung über Theorieunterricht und Sonderfahrten bis zur praktischen Prüfung der Klasse B.',
            path: PATH,
            steps: STEPS.map((step) => ({ name: step.title, text: step.body })),
          }),
          faqSchema(FAQS, PATH),
        ]}
      />

      <PageHero
        crumb="Klasse B"
        eyebrow="PKW-Führerschein"
        eyebrowIcon={Car}
        title={
          <>
            {'AUTO­FÜHRERSCHEIN'}{' '}
            <span className="gradient-text whitespace-nowrap">KLASSE B</span> IN LUDWIGSBURG
          </>
        }
        subtitle="Ab 18 allein, ab 17 mit Begleitung. Alles zu Voraussetzungen, Pflichtstunden und Prüfungen."
      />

      <TopicSection glow="primary">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_24rem] gap-12 items-start">
          <div>
            <h2 className="display-lg text-white mb-6">
              DER <span className="gradient-text">KLASSIKER</span> — UND WORAUF ES ANKOMMT
            </h2>
            <Prose paragraphs={INTRO} />
          </div>
          <FactPanel facts={FACTS} />
        </div>
      </TopicSection>

      {/* Was darf ich fahren */}
      <TopicSection
        id="fahrzeuge"
        tone="alt"
        eyebrow="Fahrerlaubnis-Umfang"
        eyebrowIcon={ShieldCheck}
        title="Was du mit Klasse B fahren darfst"
        lead="Die Klasse B deckt mehr ab, als viele denken — und weniger, als manche annehmen. Der häufigste Irrtum betrifft Anhänger und 125er."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ALLOWED.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-secondary-light rounded-3xl border border-white/10 p-7 card-hover"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg mb-5">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display text-2xl text-white mb-3 tracking-wide">
                  {item.title.toUpperCase()}
                </h3>
                <p className="text-gray-300 leading-relaxed">{item.body}</p>
              </div>
            );
          })}
        </div>
      </TopicSection>

      {/* Ablauf */}
      <TopicSection
        id="ablauf"
        eyebrow="Schritt für Schritt"
        eyebrowIcon={Route}
        title="So läuft die Ausbildung zur Klasse B"
      >
        <div className="max-w-3xl">
          <StepTimeline steps={STEPS} />
        </div>
      </TopicSection>

      {/* Sonderfahrten */}
      <TopicSection
        id="sonderfahrten"
        tone="alt"
        eyebrow="Pflichtprogramm"
        eyebrowIcon={Gauge}
        title="Die 12 Sonderfahrten"
        lead="Diese Fahrten sind gesetzlich vorgeschrieben und lassen sich nicht abkürzen — unabhängig davon, wie sicher du im Stadtverkehr schon unterwegs bist."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SONDERFAHRTEN.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="relative bg-secondary-light rounded-3xl border border-white/10 p-8 overflow-hidden"
              >
                <div className="flex items-start justify-between mb-5">
                  <span className="font-display text-6xl leading-none gradient-text select-none">
                    {item.count}
                  </span>
                  <Icon className="w-6 h-6 text-gray-500 mt-2" />
                </div>
                <h3 className="font-display text-2xl text-white mb-3 tracking-wide">
                  {item.title.toUpperCase()}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">{item.body}</p>
              </div>
            );
          })}
        </div>
      </TopicSection>

      {/* Voraussetzungen */}
      <TopicSection
        id="voraussetzungen"
        eyebrow="Vorbereitung"
        eyebrowIcon={FileText}
        title="Voraussetzungen und Umfang"
      >
        <CheckGrid groups={REQUIREMENT_GROUPS} />
      </TopicSection>

      {/* BF17 */}
      <TopicSection id="bf17" tone="alt" glow="accent">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-5">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium text-sm">Ab 17 Jahren</span>
            </div>
            <h2 className="display-lg text-white mb-6">
              BEGLEITETES FAHREN MIT <span className="gradient-text">17</span>
            </h2>
            <Prose
              paragraphs={[
                'Beim begleiteten Fahren machst du die komplette Ausbildung und beide Prüfungen wie bei Klasse B — nur ein Jahr früher. Bis zu deinem 18. Geburtstag fährst du dann ausschließlich mit einer eingetragenen Begleitperson.',
                'Der eigentliche Gewinn ist nicht das früher Fahren, sondern das Jahr Erfahrung unter Aufsicht: Fahranfänger, die mit BF17 gestartet sind, verursachen im ersten Jahr danach messbar weniger Unfälle. Praktischer Nebeneffekt: Die zweijährige Probezeit beginnt bereits mit der Prüfbescheinigung und läuft damit teilweise während des begleiteten Jahres ab.',
              ]}
            />
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-accent/15 rounded-3xl blur-xl opacity-70"
            />
            <div className="relative bg-secondary-light rounded-3xl border border-white/10 p-8">
              <h3 className="font-display text-2xl text-white mb-6 tracking-wide">
                WER DARF BEGLEITPERSON SEIN?
              </h3>
              <ul className="space-y-4">
                {[
                  'Mindestens 30 Jahre alt',
                  'Seit mindestens 5 Jahren im Besitz der Klasse B',
                  'Höchstens 1 Punkt im Fahreignungsregister',
                  'Namentlich in der Prüfbescheinigung eingetragen',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                    <span className="text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-400 text-sm mt-6 pt-6 border-t border-white/10">
                Mehrere Begleitpersonen sind möglich — Eltern, Großeltern, Geschwister oder Bekannte,
                solange sie die Bedingungen erfüllen. Für dich gilt in dieser Zeit wie in der ganzen
                Probezeit: 0,0 Promille.
              </p>
            </div>
          </div>
        </div>
      </TopicSection>

      {/* Erweiterungen */}
      <TopicSection
        id="erweiterungen"
        eyebrow="Danach möglich"
        eyebrowIcon={ArrowRight}
        title="Erweiterungen zur Klasse B"
        lead="Ist die Klasse B da, lässt sie sich mit wenig Aufwand ausbauen — zwei von drei Erweiterungen kommen ganz ohne Prüfung aus."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EXTENSIONS.map((ext) => {
            const inner = (
              <>
                <span className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 font-display text-2xl text-white shadow-lg mb-5">
                  {ext.badge}
                </span>
                <h3 className="font-display text-xl text-white mb-3 tracking-wide">
                  {ext.title.toUpperCase()}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">{ext.body}</p>
              </>
            );

            return ext.internal ? (
              <Link
                key={ext.badge}
                to={ext.to}
                className="group bg-secondary-light rounded-3xl border border-white/10 p-7 card-hover block"
              >
                {inner}
                <span className="mt-5 inline-flex items-center gap-2 text-blue-300 font-semibold text-sm">
                  Mehr erfahren
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ) : (
              <a
                key={ext.badge}
                href={ext.to}
                className="group bg-secondary-light rounded-3xl border border-white/10 p-7 card-hover block"
              >
                {inner}
                <span className="mt-5 inline-flex items-center gap-2 text-blue-300 font-semibold text-sm">
                  Auf dieser Seite nachlesen
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            );
          })}
        </div>
      </TopicSection>

      <TopicSection tone="alt">
        <LocationBand intro="Theorieunterricht und Fahrstunden für die Klasse B gibt es an beiden Standorten — du wählst, was besser erreichbar ist." />
      </TopicSection>

      <FaqSection title="KLASSE B — HÄUFIGE FRAGEN" items={FAQS} />

      <TopicCta
        title="Klasse B in Ludwigsburg starten"
        subtitle="Wir sagen dir, wann der nächste Theoriekurs beginnt und was du für die Anmeldung brauchst."
        signupTo="/kontakt?klasse=B#anmeldung"
        signupLabel="Für Klasse B anmelden"
      />
    </>
  );
}
