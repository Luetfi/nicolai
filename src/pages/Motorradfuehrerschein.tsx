import { Link } from 'react-router-dom';
import {
  Bike,
  Route,
  Layers,
  Gauge,
  Moon,
  ShieldCheck,
  Key,
  ArrowRight,
  Info,
} from 'lucide-react';
import { PageHero, FaqSection } from '../components/common';
import {
  TopicSection,
  Prose,
  FactPanel,
  ClassTable,
  StageLadder,
  CheckGrid,
  LocationBand,
  TopicCta,
} from '../components/topic';
import type { Fact, ClassTableRow, LadderStage, CheckGroup } from '../components/topic';
import type { FaqItem } from '../seo/schema/faq';
import { Seo } from '../seo/Seo';
import { breadcrumbsSchema, faqSchema, pageServiceSchema } from '../seo/schema';

const PATH = '/motorradfuehrerschein-ludwigsburg';

const INTRO = [
  'Ob Roller mit 15, 125er mit 16 oder das unbeschränkte Motorrad — die Fahrschule Nicolai bildet in Ludwigsburg in allen Motorradklassen aus: AM, A1, A2 und A. Dazu kommt das Sicherheitstraining für Zweiradfahrer, das sich auch an Wiedereinsteiger nach längerer Pause richtet.',
  'Die vier Klassen AM, A1, A2 und A unterscheiden sich in Mindestalter, Motorleistung und Aufstiegsmöglichkeiten. Wer die Systematik einmal verstanden hat, erkennt schnell, welcher Weg zu ihm passt — und dass man sich mit der ersten Klasse nicht für immer festlegt.',
  'Geübt wird im Ludwigsburger Umland: kurvige Landstraßen rund um Monrepos und den Neckar, Stadtverkehr mit Kreisverkehren und Schienen, dazu Autobahnetappen auf der A81. Die Grundfahraufgaben trainieren wir vorher auf dem Übungsplatz, bis Slalom, Ausweichen und Gefahrenbremsung sitzen.',
];

const FACTS: Fact[] = [
  {
    label: 'Klassen',
    value: 'AM, A1, A2 und A — dazu die Schlüsselzahl B196 für 125er',
  },
  {
    label: 'Mindestalter',
    value: 'AM ab 15, A1 ab 16, A2 ab 18, A ab 24 Jahren',
    hint: 'Klasse A schon ab 20, wenn du seit mindestens zwei Jahren die Klasse A2 besitzt.',
  },
  {
    label: 'Theorieunterricht',
    value: '16 Doppelstunden beim Ersterwerb (12 Grundstoff + 4 klassenspezifisch)',
    hint: 'Hast du schon einen Führerschein, sind es 10 Doppelstunden: 6 Grundstoff + 4 klassenspezifisch.',
  },
  {
    label: 'Sonderfahrten',
    value: '12 Pflichtfahrten bei A1, A2 und A: 5 Überland, 4 Autobahn, 3 bei Dunkelheit',
    hint: 'Für die Klasse AM sind keine Pflichtfahrstunden vorgeschrieben.',
  },
  {
    label: 'Praktische Prüfung',
    value: 'Mindestens 70 Minuten bei A, A2 und A1',
    hint: 'Dazu kommen die Grundfahraufgaben auf dem Übungsplatz.',
  },
  {
    label: 'Stufenaufstieg',
    value: 'A1 → A2 → A jeweils nach 2 Jahren, nur mit praktischer Prüfung',
    hint: 'Kein Theorieunterricht und keine Theorieprüfung mehr nötig.',
  },
  {
    label: 'Standorte',
    value: 'Eglosheim, Monreposstraße 2 · Grünbühl, Netzestraße 31',
  },
];

const TABLE_ROWS: ClassTableRow[] = [
  {
    klasse: 'AM',
    cells: [
      'ab 15 Jahren',
      'Kleinkrafträder, Roller und Mopeds bis 50 cm³',
      'max. 4 kW, bauartbedingt höchstens 45 km/h',
      'In der Klasse B automatisch enthalten',
    ],
  },
  {
    klasse: 'A1',
    cells: [
      'ab 16 Jahren',
      'Leichtkrafträder bis 125 cm³',
      'max. 11 kW, Leistungsgewicht höchstens 0,1 kW/kg',
      'Aufstieg auf A2 nach 2 Jahren ohne neue Theorieprüfung',
    ],
  },
  {
    klasse: 'A2',
    highlight: true,
    cells: [
      'ab 18 Jahren',
      'Krafträder mittlerer Leistung',
      'max. 35 kW, Leistungsgewicht höchstens 0,2 kW/kg',
      'Der häufigste Einstieg für Erwachsene',
    ],
  },
  {
    klasse: 'A',
    cells: [
      'ab 24 Jahren — ab 20 mit 2 Jahren A2',
      'Krafträder ohne Leistungsbegrenzung',
      'unbeschränkt',
      'Direkteinstieg ab 24 möglich, dann mit vollem Prüfungsumfang',
    ],
  },
];

const LADDER: LadderStage[] = [
  {
    klasse: 'AM',
    age: 'ab 15',
    label: 'Roller und Mopeds bis 45 km/h. Der Einstieg in die eigene Mobilität.',
    step: 'ab 16 mit eigener Prüfung',
  },
  {
    klasse: 'A1',
    age: 'ab 16',
    label: '125er bis 11 kW. Reicht für Stadt, Landstraße und den Weg zur Arbeit.',
    step: 'nach 2 Jahren, nur praktische Prüfung',
  },
  {
    klasse: 'A2',
    age: 'ab 18',
    label: 'Motorräder bis 35 kW. Landstraßen- und autobahntauglich.',
    step: 'nach 2 Jahren, nur praktische Prüfung',
  },
  {
    klasse: 'A',
    age: 'ab 20 / 24',
    label: 'Ohne Leistungsbegrenzung. Über den Stufenweg ab 20, direkt ab 24.',
  },
];

const SONDERFAHRTEN = [
  { count: '5', icon: Route, title: 'Überland', body: 'Landstraßen mit Kurven, Überholen und Gegenverkehr — der Kern des Motorradfahrens.' },
  { count: '4', icon: Gauge, title: 'Autobahn', body: 'Auffahren, hohe Geschwindigkeiten, Seitenwind und Abstand auf der A81.' },
  { count: '3', icon: Moon, title: 'Dunkelheit', body: 'Sehen und gesehen werden: Licht, Blendung, Entfernungen bei Nacht.' },
];

const B196_GROUPS: CheckGroup[] = [
  {
    title: 'Voraussetzungen für B196',
    tone: 'accent',
    items: [
      'Mindestalter 25 Jahre',
      'Klasse B seit mindestens 5 Jahren im Besitz',
      'Keine zusätzliche theoretische oder praktische Prüfung',
    ],
  },
  {
    title: 'Umfang der Schulung',
    tone: 'accent',
    items: [
      '4 Einheiten Theorie à 90 Minuten',
      '5 Einheiten praktische Fahrausbildung à 90 Minuten',
      'Eintrag der Schlüsselzahl 196 in den Führerschein',
      'Berechtigt zum Fahren von Leichtkrafträdern bis 125 cm³ und 11 kW',
    ],
  },
];

const FAQS: FaqItem[] = [
  {
    question: 'Welchen Führerschein brauche ich für ein Motorrad mit 125 ccm?',
    answer:
      'Für Leichtkrafträder bis 125 cm³ und 11 kW brauchst du die Klasse A1, die ab 16 Jahren möglich ist. Alternativ kommt die Schlüsselzahl B196 in Frage: Wenn du mindestens 25 Jahre alt bist und seit fünf Jahren die Klasse B besitzt, reicht eine Schulung ohne Prüfung. B196 gilt allerdings nur in Deutschland, die Klasse A1 europaweit.',
  },
  {
    question: 'Ab welchem Alter kann ich den Motorradführerschein machen?',
    answer:
      'Die Klasse AM für Roller und Mopeds bis 45 km/h ist ab 15 Jahren möglich, die Klasse A1 für 125er ab 16 Jahren, die Klasse A2 für Motorräder bis 35 kW ab 18 Jahren. Die unbeschränkte Klasse A gibt es ab 24 Jahren im Direkteinstieg — oder bereits ab 20 Jahren, wenn du seit mindestens zwei Jahren die Klasse A2 besitzt.',
  },
  {
    question: 'Wie funktioniert der Stufenführerschein beim Motorrad?',
    answer:
      'Der Stufenaufstieg führt von A1 über A2 zur Klasse A. Nach jeweils zwei Jahren Besitz der niedrigeren Klasse reicht für den Aufstieg eine praktische Prüfung — Theorieunterricht und Theorieprüfung entfallen, ebenso die Sonderfahrten. Wer mit 16 mit A1 einsteigt, kann so mit 18 auf A2 und mit 20 auf die unbeschränkte Klasse A aufsteigen.',
  },
  {
    question: 'Wie viele Sonderfahrten brauche ich beim Motorradführerschein?',
    answer:
      'Für die Klassen A1, A2 und A sind zwölf Sonderfahrten vorgeschrieben: fünf Überlandfahrten, vier Autobahnfahrten und drei Fahrten bei Dunkelheit. Für die Klasse AM gibt es keine vorgeschriebenen Pflichtfahrstunden. Beim Stufenaufstieg von A1 auf A2 oder von A2 auf A entfallen die Sonderfahrten komplett.',
  },
  {
    question: 'Wie lange dauert die praktische Motorradprüfung?',
    answer:
      'Für die Klassen A, A2 und A1 sind mindestens 70 Minuten Prüfungszeit vorgesehen. Dazu kommen die Grundfahraufgaben, die du vorher auf dem Übungsplatz zeigst — dazu gehören Slalom, Ausweichen vor einem Hindernis, Bremsen aus höherer Geschwindigkeit und langsames Fahren. Der Prüfer folgt dir im Auto und gibt Anweisungen über Funk.',
  },
  {
    question: 'Wie viel Theorieunterricht brauche ich für den Motorradführerschein?',
    answer:
      'Beim Ersterwerb sind 16 Doppelstunden vorgeschrieben: 12 Doppelstunden Grundstoff und 4 Doppelstunden klassenspezifischer Stoff für Motorradklassen. Hast du bereits eine Fahrerlaubnis, etwa die Klasse B, reduziert sich der Grundstoff auf 6 Doppelstunden — insgesamt also 10 Doppelstunden. Unterricht ist in Eglosheim montags und donnerstags, in Grünbühl dienstags und donnerstags, jeweils 19:00 bis 20:30 Uhr.',
  },
  {
    question: 'Darf ich ein gedrosseltes Motorrad für die Klasse A2 fahren?',
    answer:
      'Ja, ein auf 35 kW gedrosseltes Motorrad ist für die Klasse A2 erlaubt — allerdings nur, wenn die ungedrosselte Ursprungsversion höchstens 70 kW hat. Außerdem muss das Leistungsgewicht auch nach der Drosselung unter 0,2 kW/kg bleiben. Die Drosselung muss fachgerecht durchgeführt und in den Fahrzeugpapieren eingetragen sein.',
  },
  {
    question: 'Welche Schutzkleidung brauche ich für die Motorradausbildung?',
    answer:
      'Gesetzlich vorgeschrieben ist ein geeigneter Schutzhelm. Sinnvoll und in der Ausbildung üblich sind zusätzlich Motorradhandschuhe, feste Stiefel über den Knöchel sowie Jacke und Hose mit Protektoren. Das Ausbildungsmotorrad stellt die Fahrschule Nicolai. Wenn du bei der Ausstattung unsicher bist, sprich uns vor der ersten Fahrstunde an — wir sagen dir, was wirklich nötig ist.',
  },
];

export function Motorradfuehrerschein() {
  return (
    <>
      <Seo
        title="Motorradführerschein in Ludwigsburg — Klasse A, A2, A1 & AM"
        description="Motorradführerschein in Ludwigsburg: Klassen AM, A1, A2 und A im Vergleich, Stufenaufstieg, Sonderfahrten und B196 für 125er. Fahrschule Nicolai, zwei Standorte. ☎ 0170 / 21 38 547"
        jsonLd={[
          breadcrumbsSchema([
            { name: 'Startseite', url: '/' },
            { name: 'Führerschein Ludwigsburg', url: '/fuehrerschein-ludwigsburg' },
            { name: 'Motorradführerschein', url: PATH },
          ]),
          pageServiceSchema({
            slug: 'motorrad',
            path: PATH,
            name: 'Motorradführerschein in Ludwigsburg (Klassen AM, A1, A2, A)',
            description:
              'Ausbildung in allen Motorradklassen in Ludwigsburg: AM ab 15, A1 ab 16, A2 ab 18 und A ab 24 Jahren. Inklusive Grundfahraufgaben, Sonderfahrten und Stufenaufstieg sowie der Schlüsselzahl B196 für Leichtkrafträder.',
            serviceType: 'Motorrad-Führerschein',
            audienceType: 'Mindestalter 15 Jahre (Klasse AM) bis 24 Jahre (Klasse A)',
            alsoServed: ['Eglosheim', 'Grünbühl', 'Asperg', 'Möglingen', 'Kornwestheim', 'Tamm'],
          }),
          faqSchema(FAQS, PATH),
        ]}
      />

      <PageHero
        crumb="Motorradführerschein"
        eyebrow="Zwei Räder"
        eyebrowIcon={Bike}
        title={
          <>
            {/* Weiche Trennstelle: bricht auf schmalen Displays zu MOTORRAD-/FÜHRERSCHEIN,
                bleibt auf großen Schirmen ein Wort. */}
            {'MOTORRAD­FÜHRERSCHEIN'} IN{' '}
            <span className="gradient-text">LUDWIGSBURG</span>
          </>
        }
        subtitle="AM, A1, A2 und A — welche Klasse zu dir passt, wie der Stufenaufstieg funktioniert und was B196 bringt."
      />

      <TopicSection glow="accent">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_24rem] gap-12 items-start">
          <div>
            <h2 className="display-lg text-white mb-6">
              VOM ROLLER BIS ZUM <span className="gradient-text">UNBESCHRÄNKTEN</span> MOTORRAD
            </h2>
            <Prose paragraphs={INTRO} />
          </div>
          <FactPanel facts={FACTS} />
        </div>
      </TopicSection>

      {/* Klassen-Vergleich */}
      <TopicSection
        id="klassen"
        tone="alt"
        eyebrow="Im Vergleich"
        eyebrowIcon={Layers}
        title="Die Motorradklassen im Überblick"
        lead="Vier Klassen, vier Mindestalter, vier Leistungsgrenzen. Die Tabelle zeigt, was du mit welcher Klasse fahren darfst."
      >
        <ClassTable
          caption="Vergleich der Motorradklassen AM, A1, A2 und A: Mindestalter, zulässige Fahrzeuge, Leistungsgrenzen und Besonderheiten"
          columns={['Mindestalter', 'Fahrzeuge', 'Leistungsgrenze', 'Besonderheit']}
          rows={TABLE_ROWS}
        />
      </TopicSection>

      {/* Stufenführerschein */}
      <TopicSection
        id="stufen"
        eyebrow="Stufenführerschein"
        eyebrowIcon={ArrowRight}
        title="So funktioniert der Aufstieg"
        lead="Du legst dich mit der ersten Klasse nicht fest. Nach jeweils zwei Jahren reicht für die nächste Stufe eine praktische Prüfung — ohne Theorie, ohne Sonderfahrten."
      >
        <StageLadder stages={LADDER} />

        <div className="mt-10 max-w-3xl rounded-3xl border border-accent/25 bg-accent/[0.06] p-7">
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display text-xl text-white mb-2 tracking-wide">
                FRÜH EINSTEIGEN BRINGT DICH FRÜHER AUFS MOTORRAD
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Wer mit 16 mit der Klasse A1 anfängt, kann mit 18 auf A2 und mit 20 auf die
                unbeschränkte Klasse A aufsteigen — jeweils nur mit praktischer Prüfung, ohne Theorie
                und ohne Sonderfahrten. Im Direkteinstieg ist die Klasse A dagegen erst ab 24 Jahren
                möglich, dann aber mit vollem Ausbildungs- und Prüfungsumfang. Welcher Weg in deinem
                Fall der sinnvollere ist, klären wir im Beratungsgespräch.
              </p>
            </div>
          </div>
        </div>
      </TopicSection>

      {/* Sonderfahrten */}
      <TopicSection
        id="sonderfahrten"
        tone="alt"
        eyebrow="Pflichtprogramm"
        eyebrowIcon={Gauge}
        title="Die 12 Sonderfahrten"
        lead="Vorgeschrieben für A1, A2 und A. Beim Stufenaufstieg entfallen sie — für die Klasse AM sind von Anfang an keine Pflichtfahrten vorgesehen."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SONDERFAHRTEN.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-secondary-light rounded-3xl border border-white/10 p-8"
              >
                <div className="flex items-start justify-between mb-5">
                  <span className="font-display text-6xl leading-none text-accent select-none">
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

      {/* B196 */}
      <TopicSection
        id="b196"
        eyebrow="Ohne Prüfung zur 125er"
        eyebrowIcon={Key}
        title="Schlüsselzahl B196"
        lead="Die Abkürzung für alle, die schon länger Auto fahren: Mit B196 darfst du Leichtkrafträder bis 125 cm³ fahren — ohne zusätzliche Prüfung."
        glow="accent"
      >
        <CheckGrid groups={B196_GROUPS} />

        <div className="mt-8 max-w-3xl rounded-3xl border border-white/10 bg-secondary-light p-7">
          <h3 className="font-display text-xl text-white mb-3 tracking-wide">
            EIN WICHTIGER UNTERSCHIED ZUR KLASSE A1
          </h3>
          <p className="text-gray-300 leading-relaxed">
            Die Schlüsselzahl B196 ist eine deutsche Regelung und gilt nur in Deutschland. Wer
            regelmäßig im Ausland Motorrad fahren will, ist mit der Klasse A1 besser beraten — die
            ist europaweit anerkannt. Für den Weg zur Arbeit und Touren im Inland reicht B196
            vollkommen.
          </p>
          <Link
            to="/leistungen#pkw"
            className="mt-5 inline-flex items-center gap-2 text-accent font-semibold hover:text-accent-dark transition-colors group"
          >
            B196 und alle weiteren Erweiterungen im Überblick
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </TopicSection>

      {/* Sicherheitstraining */}
      <TopicSection tone="alt">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-5">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium text-sm">Nach dem Führerschein</span>
            </div>
            <h2 className="display-lg text-white mb-6">
              SICHERHEITSTRAINING <span className="gradient-text">ZWEIRAD</span>
            </h2>
            <Prose
              paragraphs={[
                'Der Führerschein ist die Erlaubnis zu fahren — Sicherheit auf dem Motorrad kommt mit Übung in Situationen, die man im Alltag nicht freiwillig sucht. Genau die trainieren wir auf dem Übungsplatz.',
                'Das Sicherheitstraining richtet sich an Fahrer aller Klassen, auch an Wiedereinsteiger nach längerer Pause. Trainiert werden Gefahrenbremsung, der Lenkimpuls, Übungen im instabilen Bereich und Ausweichmanöver.',
              ]}
            />
            <Link
              to="/kontakt"
              className="mt-7 inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors group"
            >
              Termine für das Sicherheitstraining erfragen
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              'Gefahrenbremsung aus höherer Geschwindigkeit',
              'Übungen zum Lenkimpuls',
              'Fahren im instabilen Bereich',
              'Ausweichen vor Hindernissen',
            ].map((item) => (
              <div
                key={item}
                className="bg-secondary-light rounded-2xl border border-white/10 p-5 flex items-center"
              >
                <span className="text-gray-200 text-sm leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </TopicSection>

      <TopicSection>
        <LocationBand intro="Theorieunterricht für die Motorradklassen findet an beiden Standorten statt — die praktische Ausbildung startet direkt vor Ort." />
      </TopicSection>

      <FaqSection title="MOTORRADFÜHRERSCHEIN — HÄUFIGE FRAGEN" items={FAQS} />

      <TopicCta
        title="Aufs Motorrad in Ludwigsburg"
        subtitle="Wir sagen dir, welche Klasse in deinem Fall der passende Weg ist und wann der nächste Kurs startet."
        signupTo="/kontakt?klasse=A#anmeldung"
        signupLabel="Für Motorrad anmelden"
      />
    </>
  );
}
