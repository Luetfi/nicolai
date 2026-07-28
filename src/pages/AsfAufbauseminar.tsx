import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  Route,
  Info,
  ShieldAlert,
  CalendarClock,
  Users,
  CheckCircle,
  XCircle,
  Phone,
} from 'lucide-react';
import { PageHero, FaqSection } from '../components/common';
import {
  TopicSection,
  Prose,
  FactPanel,
  StepTimeline,
  LocationBand,
} from '../components/topic';
import type { Fact, Step } from '../components/topic';
import type { UpcomingCourse } from '../data/services';
import { primaryPhoneDisplay, primaryPhoneTel } from '../data/contact';
import { useJsonData } from '../hooks/useJsonData';
import type { FaqItem } from '../seo/schema/faq';
import { Seo } from '../seo/Seo';
import { asfSeminarSchema, breadcrumbsSchema, faqSchema, howToSchema, pageServiceSchema } from '../seo/schema';

const PATH = '/asf-aufbauseminar-ludwigsburg';

const INTRO = [
  'Ein Brief von der Fahrerlaubnisbehörde, in dem ein Aufbauseminar angeordnet wird, ist erst mal ein Schreck — aber kein Grund zur Panik. Das ASF ist keine Prüfung: Du kannst nicht durchfallen. Wer teilnimmt und die Bescheinigung einreicht, behält seinen Führerschein.',
  'Die Fahrschule Nicolai führt Aufbauseminare für Fahranfänger (ASF) in Ludwigsburg durch. Das Seminar besteht aus vier Sitzungen zu je 135 Minuten und einer Beobachtungsfahrt von mindestens 30 Minuten. Geleitet wird es von einem dafür besonders qualifizierten Seminarleiter, in einer Gruppe von sechs bis zwölf Teilnehmern.',
  'Wichtig ist nur eines: die Frist. Die Behörde setzt dir einen Termin, bis zu dem die Teilnahmebescheinigung vorliegen muss. Wird sie nicht rechtzeitig eingereicht, wird die Fahrerlaubnis entzogen — unabhängig davon, wie geringfügig der Verstoß war. Melde dich deshalb früh an, damit du nicht auf den nächsten freien Kurs warten musst.',
];

const FACTS: Fact[] = [
  {
    label: 'Rechtsgrundlage',
    value: 'Aufbauseminar für Fahranfänger nach § 2b Straßenverkehrsgesetz',
  },
  {
    label: 'Anlass',
    value: 'Ein schwerwiegender (A-)Verstoß oder zwei weniger schwerwiegende (B-)Verstöße in der Probezeit',
  },
  {
    label: 'Umfang',
    value: '4 Sitzungen à 135 Minuten',
    hint: 'Verteilt über mehrere Wochen, in der Regel eine Sitzung pro Woche.',
  },
  {
    label: 'Beobachtungsfahrt',
    value: 'Einmalig, mindestens 30 Minuten',
    hint: 'Findet zwischen der ersten und der zweiten Sitzung statt.',
  },
  {
    label: 'Gruppengröße',
    value: '6 bis 12 Teilnehmer',
  },
  {
    label: 'Prüfung',
    value: 'Keine — es gibt keinen Test und kein Durchfallen',
    hint: 'Erforderlich ist die vollständige, aktive Teilnahme an allen Sitzungen.',
  },
  {
    label: 'Punkte in Flensburg',
    value: 'Werden durch das Aufbauseminar nicht abgebaut',
  },
  {
    label: 'Probezeit',
    value: 'Verlängert sich um 2 Jahre auf insgesamt 4 Jahre',
  },
  {
    label: 'Anmeldung',
    value: `Telefonisch unter ${primaryPhoneDisplay} oder direkt vor Ort`,
  },
];

const A_VERSTOESSE = [
  'Rotlichtverstoß',
  'Mehr als 20 km/h zu schnell',
  'Zu geringer Abstand',
  'Fahren unter Alkohol- oder Drogeneinfluss',
  'Handynutzung am Steuer',
  'Vorfahrt missachtet',
  'Unerlaubtes Entfernen vom Unfallort',
  'Falsches Verhalten am Bahnübergang',
];

const B_VERSTOESSE = [
  'Abgefahrene Reifen',
  'Hauptuntersuchung deutlich überzogen',
  'Parken auf Autobahn oder Kraftfahrstraße',
  'Verstoß gegen die Umweltzonen-Regelung',
];

const STEPS: Step[] = [
  {
    title: 'Anordnung der Behörde erhalten',
    body: 'Die Fahrerlaubnisbehörde teilt dir schriftlich mit, dass du an einem Aufbauseminar teilnehmen musst, und setzt eine Frist, bis zu der die Teilnahmebescheinigung vorliegen muss. Lies dieses Schreiben genau — die Frist ist der einzige Teil, der wirklich kritisch ist.',
    note: 'Frist im Blick behalten: Wird sie versäumt, folgt der Entzug der Fahrerlaubnis.',
  },
  {
    title: 'Platz im Seminar sichern',
    body: `Ruf uns unter ${primaryPhoneDisplay} an oder komm zu einem Unterrichtsabend vorbei. Wir sagen dir, wann der nächste Kurs startet und ob noch Plätze frei sind. Da ein Seminar mindestens sechs Teilnehmer braucht, lohnt sich eine frühe Anmeldung doppelt.`,
  },
  {
    title: 'Erste Sitzung: Bestandsaufnahme',
    body: 'In der ersten Sitzung geht es um die Verstöße der Teilnehmer und die Situationen, in denen sie passiert sind. Kein Belehrungstermin, sondern ein Gruppengespräch: Woran hat es gelegen, welche Rolle spielten Zeitdruck, Gewohnheit oder Selbstüberschätzung?',
  },
  {
    title: 'Beobachtungsfahrt',
    body: 'Zwischen erster und zweiter Sitzung fährst du mindestens 30 Minuten mit dem Seminarleiter — in deinem gewohnten Fahrstil, ohne Bewertung und ohne Prüfungscharakter. Der Seminarleiter notiert, was ihm auffällt, und bringt seine Beobachtungen in die Gruppe zurück.',
  },
  {
    title: 'Sitzungen zwei bis vier',
    body: 'Die Beobachtungen aus den Fahrten werden gemeinsam ausgewertet. Dazu kommen Themen wie Risikoeinschätzung, Gruppendruck, Alkohol und Geschwindigkeit. Ziel ist nicht, dir das Fahren neu zu erklären, sondern die Muster zu erkennen, die zum Verstoß geführt haben.',
  },
  {
    title: 'Bescheinigung einreichen',
    body: 'Nach der vierten Sitzung erhältst du die Teilnahmebescheinigung. Die reichst du bei der Fahrerlaubnisbehörde ein — damit ist die Anordnung erfüllt und die Sache für dich erledigt.',
  },
];

const FAQS: FaqItem[] = [
  {
    question: 'Wann muss ich ein ASF-Aufbauseminar machen?',
    answer:
      'Ein Aufbauseminar für Fahranfänger wird angeordnet, wenn du innerhalb der zweijährigen Probezeit einen schwerwiegenden Verstoß (A-Verstoß) oder zwei weniger schwerwiegende Verstöße (B-Verstöße) begangen hast. Zu den A-Verstößen gehören unter anderem Rotlichtverstöße, mehr als 20 km/h zu schnell fahren, zu geringer Abstand, Handynutzung am Steuer sowie Fahren unter Alkohol- oder Drogeneinfluss. Die Anordnung kommt schriftlich von der Fahrerlaubnisbehörde.',
  },
  {
    question: 'Wie läuft das ASF-Aufbauseminar ab?',
    answer:
      'Das Aufbauseminar besteht aus vier Sitzungen zu je 135 Minuten sowie einer Beobachtungsfahrt von mindestens 30 Minuten, die zwischen der ersten und der zweiten Sitzung stattfindet. Gearbeitet wird in einer Gruppe von sechs bis zwölf Teilnehmern unter Leitung eines besonders qualifizierten Seminarleiters. Insgesamt zieht sich das Seminar meist über etwa vier Wochen.',
  },
  {
    question: 'Kann man beim Aufbauseminar durchfallen?',
    answer:
      'Nein. Das ASF ist keine Prüfung und enthält keinen Test — du kannst nicht durchfallen. Voraussetzung für die Teilnahmebescheinigung ist, dass du an allen vier Sitzungen und der Beobachtungsfahrt vollständig teilnimmst und dich aktiv beteiligst. Wer eine Sitzung versäumt, muss sie nachholen.',
  },
  {
    question: 'Werden durch das ASF Punkte in Flensburg abgebaut?',
    answer:
      'Nein, das Aufbauseminar für Fahranfänger baut keine Punkte im Fahreignungsregister ab. Es erfüllt ausschließlich die Anordnung der Fahrerlaubnisbehörde und verhindert damit den Entzug der Fahrerlaubnis. Die Punkte aus dem Verstoß bleiben bestehen und werden nach den üblichen Fristen getilgt.',
  },
  {
    question: 'Was passiert, wenn ich nicht am Aufbauseminar teilnehme?',
    answer:
      'Wenn die Teilnahmebescheinigung nicht innerhalb der von der Behörde gesetzten Frist vorliegt, wird die Fahrerlaubnis entzogen. Das gilt unabhängig davon, wie geringfügig der ursprüngliche Verstoß war. Melde dich deshalb frühzeitig zu einem Kurs an — kurz vor Fristende ist nicht immer ein Platz frei.',
  },
  {
    question: 'Verlängert sich meine Probezeit durch den Verstoß?',
    answer:
      'Ja. Mit der Anordnung des Aufbauseminars verlängert sich die Probezeit um zwei Jahre, also auf insgesamt vier Jahre. In dieser Zeit gelten weiterhin die besonderen Regeln für Fahranfänger, insbesondere das absolute Alkoholverbot von 0,0 Promille.',
  },
  {
    question: 'Wo findet das Aufbauseminar in Ludwigsburg statt?',
    answer:
      'Die Fahrschule Nicolai führt die Aufbauseminare in ihren Unterrichtsräumen in Ludwigsburg durch: in Eglosheim in der Monreposstraße 2 und in Grünbühl in der Netzestraße 31. Wo der jeweils nächste Kurs stattfindet, sagen wir dir bei der Anmeldung.',
  },
];

/** Kurstermin nur zeigen, wenn er noch in der Zukunft liegt — ein abgelaufener Termin schadet mehr als er hilft. */
function useUpcomingCourse() {
  const { data } = useJsonData<UpcomingCourse>('/data/asf-course.json');

  return useMemo(() => {
    if (!data?.startDate) return null;
    const start = new Date(`${data.startDate}T00:00:00`);
    if (Number.isNaN(start.getTime())) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return start >= today ? data : null;
  }, [data]);
}

export function AsfAufbauseminar() {
  const upcoming = useUpcomingCourse();

  return (
    <>
      <Seo
        title="ASF-Aufbauseminar in Ludwigsburg — Probezeit & Verstoß"
        description="Aufbauseminar für Fahranfänger (ASF) in Ludwigsburg: 4 Sitzungen à 135 Minuten plus Beobachtungsfahrt, keine Prüfung. Fahrschule Nicolai — jetzt Platz sichern. ☎ 0170 / 21 38 547"
        jsonLd={[
          breadcrumbsSchema([
            { name: 'Startseite', url: '/' },
            { name: 'Führerschein Ludwigsburg', url: '/fuehrerschein-ludwigsburg' },
            { name: 'ASF-Aufbauseminar', url: PATH },
          ]),
          pageServiceSchema({
            slug: 'asf',
            path: PATH,
            name: 'ASF-Aufbauseminar in Ludwigsburg',
            description:
              'Aufbauseminar für Fahranfänger nach § 2b StVG in Ludwigsburg: vier Sitzungen à 135 Minuten und eine Beobachtungsfahrt von mindestens 30 Minuten, in Gruppen von sechs bis zwölf Teilnehmern.',
            serviceType: 'Aufbauseminar für Fahranfänger (ASF)',
            audienceType: 'Fahranfänger in der Probezeit mit angeordnetem Aufbauseminar',
            alsoServed: ['Eglosheim', 'Grünbühl', 'Asperg', 'Möglingen', 'Kornwestheim', 'Tamm'],
          }),
          asfSeminarSchema({
            path: PATH,
            instance: upcoming ? { startDate: upcoming.startDate } : undefined,
          }),
          howToSchema({
            name: 'ASF-Aufbauseminar absolvieren — Ablauf in 6 Schritten',
            description:
              'Von der Anordnung der Fahrerlaubnisbehörde über Beobachtungsfahrt und Sitzungen bis zur Teilnahmebescheinigung.',
            path: PATH,
            steps: STEPS.map((step) => ({ name: step.title, text: step.body })),
          }),
          faqSchema(FAQS, PATH),
        ]}
      />

      <PageHero
        crumb="ASF-Aufbauseminar"
        eyebrow="Verstoß in der Probezeit"
        eyebrowIcon={AlertTriangle}
        title={
          <>
            ASF-AUFBAUSEMINAR IN <span className="gradient-text">LUDWIGSBURG</span>
          </>
        }
        subtitle="Vier Sitzungen, eine Beobachtungsfahrt, keine Prüfung — und dein Führerschein bleibt, wo er ist."
      />

      <TopicSection glow="primary">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_24rem] gap-12 items-start">
          <div>
            <h2 className="display-lg text-white mb-6">
              KEIN TEST — <span className="gradient-text">EINE TEILNAHME</span>
            </h2>
            <Prose paragraphs={INTRO} />

            <div className="mt-8 rounded-3xl border border-primary/25 bg-primary/[0.06] p-6">
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold mb-1">Frist läuft schon?</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Ruf direkt an, dann klären wir sofort, ob der nächste Kurs für deine Frist noch
                    passt:{' '}
                    <a
                      href={`tel:${primaryPhoneTel}`}
                      className="text-primary font-semibold hover:text-primary-dark transition-colors"
                    >
                      {primaryPhoneDisplay}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <FactPanel facts={FACTS} />
        </div>
      </TopicSection>

      {/* Nächster Kurstermin — bewusst ohne Preisangabe, nur Datum und Verfügbarkeit */}
      {upcoming && (
        <TopicSection tone="alt" width="narrow">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 rounded-3xl blur-2xl opacity-70"
            />
            <div className="relative bg-gradient-to-br from-secondary-light to-secondary rounded-3xl border border-primary/30 p-8 sm:p-10 shadow-2xl shadow-black/50">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 text-primary text-sm font-bold uppercase tracking-wide">
                  <CalendarClock className="w-4 h-4" />
                  Nächster Kurs
                </span>
                {upcoming.spotsAvailable && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/15 text-green-400 text-sm font-semibold">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Es sind noch Plätze frei
                  </span>
                )}
              </div>

              <h2 className="display-md text-white mb-4">AUFBAUSEMINAR (ASF)</h2>
              <p className="text-xl text-gray-100 mb-8">
                Start am{' '}
                <span className="text-primary font-bold">
                  {new Date(`${upcoming.startDate}T00:00:00`).toLocaleDateString('de-DE', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </p>

              <div className="border-t border-white/10 pt-6">
                <p className="text-gray-300 mb-5">
                  Sichere dir deinen Platz — ein Seminar startet erst ab sechs Teilnehmern, deshalb
                  lohnt sich eine frühe Anmeldung.
                </p>
                <a
                  href={`tel:${primaryPhoneTel}`}
                  className="inline-flex items-center gap-3 btn-accent text-white px-6 py-3 rounded-xl font-bold"
                >
                  <Phone className="w-5 h-5" />
                  {primaryPhoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </TopicSection>
      )}

      {/* Wer muss teilnehmen */}
      <TopicSection
        id="anlass"
        tone={upcoming ? 'base' : 'alt'}
        eyebrow="Wer teilnehmen muss"
        eyebrowIcon={ShieldAlert}
        title="A-Verstoß oder zwei B-Verstöße"
        lead="Die Fahrerlaubnisbehörde ordnet das Aufbauseminar an, wenn du in der Probezeit auffällig geworden bist. Unterschieden wird zwischen schwerwiegenden und weniger schwerwiegenden Verstößen."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-secondary-light rounded-3xl border border-accent/25 p-7">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-dark font-display text-2xl text-white">
                A
              </span>
              <h3 className="font-display text-2xl text-white tracking-wide">
                SCHWERWIEGEND
              </h3>
            </div>
            <p className="text-gray-400 text-sm mb-5">
              Ein einziger A-Verstoß führt zur Anordnung des Aufbauseminars.
            </p>
            <ul className="space-y-2.5">
              {A_VERSTOESSE.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                  <span className="text-gray-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-secondary-light rounded-3xl border border-white/10 p-7">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 border border-white/15 font-display text-2xl text-white">
                B
              </span>
              <h3 className="font-display text-2xl text-white tracking-wide">
                WENIGER SCHWERWIEGEND
              </h3>
            </div>
            <p className="text-gray-400 text-sm mb-5">
              Erst der zweite B-Verstoß in der Probezeit löst das Seminar aus.
            </p>
            <ul className="space-y-2.5">
              {B_VERSTOESSE.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-gray-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 max-w-3xl rounded-3xl border border-white/10 bg-secondary-light p-7">
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-display text-xl text-white mb-2 tracking-wide">
                SONDERFALL ALKOHOL
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Für Fahranfänger in der Probezeit und für alle unter 21 Jahren gilt ein absolutes
                Alkoholverbot — also 0,0 Promille. Ein Verstoß dagegen führt neben Bußgeld und einem
                Punkt im Fahreignungsregister ebenfalls zur Anordnung eines Aufbauseminars und zur
                Verlängerung der Probezeit.
              </p>
            </div>
          </div>
        </div>
      </TopicSection>

      {/* Ablauf */}
      <TopicSection
        id="ablauf"
        tone={upcoming ? 'alt' : 'base'}
        eyebrow="Schritt für Schritt"
        eyebrowIcon={Route}
        title="So läuft das Aufbauseminar ab"
        lead="Insgesamt zieht sich das Seminar über etwa vier Wochen — meist eine Sitzung pro Woche, dazwischen die Beobachtungsfahrt."
      >
        <div className="max-w-3xl">
          <StepTimeline steps={STEPS} />
        </div>
      </TopicSection>

      {/* Was das ASF ist und was nicht */}
      <TopicSection
        id="klarstellung"
        tone={upcoming ? 'base' : 'alt'}
        eyebrow="Klar gesagt"
        eyebrowIcon={Users}
        title="Was das ASF ist — und was nicht"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          <div className="bg-secondary-light rounded-3xl border border-green-500/25 p-7">
            <h3 className="font-display text-2xl text-white mb-5 tracking-wide">DAS IST ES</h3>
            <ul className="space-y-3">
              {[
                'Eine Gruppenarbeit über eigenes Fahrverhalten',
                'Vier Sitzungen à 135 Minuten plus eine Beobachtungsfahrt',
                'Der Weg, die Anordnung der Behörde zu erfüllen',
                'Voraussetzung dafür, den Führerschein zu behalten',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-secondary-light rounded-3xl border border-white/10 p-7">
            <h3 className="font-display text-2xl text-white mb-5 tracking-wide">DAS IST ES NICHT</h3>
            <ul className="space-y-3">
              {[
                'Keine Prüfung — du kannst nicht durchfallen',
                'Kein Punkteabbau in Flensburg',
                'Keine neue Fahrausbildung und kein Nachhilfeunterricht',
                'Kein Ersatz für ein Fahreignungsseminar oder ein Gutachten (MPU)',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-8 text-gray-400 text-sm max-w-3xl">
          Hinweis: Diese Seite erklärt den üblichen Ablauf und ersetzt keine Rechtsberatung.
          Verbindlich ist immer das Schreiben deiner Fahrerlaubnisbehörde — bring es am besten zur
          Anmeldung mit, dann sehen wir gemeinsam nach, was genau angeordnet wurde.
        </p>
      </TopicSection>

      <TopicSection tone={upcoming ? 'alt' : 'base'}>
        <LocationBand
          headline="Wo das Seminar stattfindet"
          intro="Die Aufbauseminare laufen in unseren Unterrichtsräumen in Ludwigsburg. Welcher Standort für den nächsten Kurs vorgesehen ist, sagen wir dir bei der Anmeldung."
        />
      </TopicSection>

      <FaqSection title="ASF-AUFBAUSEMINAR — HÄUFIGE FRAGEN" items={FAQS} />

      <section className="relative overflow-hidden py-20 bg-gradient-to-r from-primary to-primary-dark">
        <div aria-hidden="true" className="absolute inset-0 diagonal-stripes opacity-20" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-5">
            <CalendarClock className="w-10 h-10 text-secondary" />
          </div>
          <h2 className="display-md text-secondary mb-4">FRIST IM NACKEN?</h2>
          <p className="text-secondary/80 text-lg mb-8">
            Je früher du dich meldest, desto sicherer passt der Kurstermin in deine Frist. Ein Anruf
            reicht — wir sagen dir sofort, wann der nächste Termin ist.
          </p>
          <a
            href={`tel:${primaryPhoneTel}`}
            className="inline-flex items-center gap-3 bg-secondary text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-secondary-light transition-colors"
          >
            <Phone className="w-5 h-5" />
            {primaryPhoneDisplay}
          </a>
          <p className="mt-6 text-secondary/70 text-sm">
            Oder{' '}
            <Link to="/kontakt" className="underline font-semibold hover:text-secondary">
              schreib uns über das Kontaktformular
            </Link>
            {' '}— bring zur Anmeldung am besten das Schreiben der Behörde mit.
          </p>
        </div>
      </section>
    </>
  );
}
