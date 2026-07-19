import type { FaqItem } from '../seo/schema/faq';

export interface LocationPageContent {
  /** Muss der id in src/data/contact.ts locations entsprechen. */
  locationId: string;
  path: string;
  metaTitle: string;
  metaDescription: string;
  crumb: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  /** Einleitende Absätze — pro Standort eigenständig formuliert (kein Duplicate Content). */
  intro: string[];
  anfahrtTitle: string;
  /** Anfahrts-/Lage-Beschreibung — pro Standort eigenständig formuliert. */
  anfahrt: string[];
  /** Stadtteile/Orte, aus denen Fahrschüler zu diesem Standort kommen. */
  nearbyAreas: string[];
  faqs: FaqItem[];
}

export const locationPages: LocationPageContent[] = [
  {
    locationId: 'eglosheim',
    path: '/fahrschule-ludwigsburg-eglosheim',
    metaTitle: 'Fahrschule Ludwigsburg-Eglosheim – Monreposstraße 2 | Nicolai',
    metaDescription:
      'Deine Fahrschule in Ludwigsburg-Eglosheim: Monreposstraße 2. Theorie Mo & Do 19:00–20:30 Uhr, PKW- & Motorrad-Führerschein. Familiengeführt seit 1969. ☎ 0170 / 21 38 547',
    crumb: 'Standort Eglosheim',
    heroEyebrow: 'Standort Eglosheim',
    heroTitle: 'FAHRSCHULE IN LUDWIGSBURG-EGLOSHEIM',
    heroSubtitle:
      'Monreposstraße 2 — dein Führerschein direkt im Stadtteil, mit Theorieunterricht montags und donnerstags.',
    intro: [
      'Mitten in Eglosheim, in der Monreposstraße 2, findest du unseren Unterrichtsraum — seit Jahrzehnten die erste Adresse für den Führerschein im Ludwigsburger Norden. Hier lernst du in familiärer Atmosphäre: Inhaber Ralf Nicolai und sein Team begleiten dich persönlich von der Anmeldung bis zur bestandenen Prüfung, so wie es die Fahrschule Nicolai seit 1969 macht.',
      'Ob PKW-Führerschein der Klasse B, begleitetes Fahren mit 17, Motorradklassen von AM bis A oder die B196-Erweiterung für 125er — am Standort Eglosheim bekommst du die komplette Ausbildung aus einer Hand. Die Fahrstunden starten direkt vor Ort, sodass du das Fahren dort lernst, wo später auch geprüft wird: im echten Ludwigsburger Stadtverkehr, auf Landstraßen rund um das Schloss Monrepos und auf der Autobahn.',
    ],
    anfahrtTitle: 'So findest du uns in Eglosheim',
    anfahrt: [
      'Die Monreposstraße 2 liegt zentral in Eglosheim, nur wenige Gehminuten von der Haltestelle Eglosheim entfernt und mit dem Auto bequem über die B27 erreichbar. Parkplätze findest du direkt an der Straße und in den umliegenden Wohnstraßen.',
      'Auch aus Asperg, Möglingen, Tamm und Hoheneck bist du in wenigen Minuten bei uns — viele unserer Fahrschüler kommen aus den Nachbargemeinden im Norden von Ludwigsburg.',
    ],
    nearbyAreas: ['Eglosheim', 'Asperg', 'Möglingen', 'Tamm', 'Hoheneck', 'Pflugfelden'],
    faqs: [
      {
        question: 'Wann ist Theorieunterricht in der Fahrschule in Eglosheim?',
        answer:
          'Der Theorieunterricht am Standort Eglosheim (Monreposstraße 2) findet montags und donnerstags von 19:00 bis 20:30 Uhr statt. Für Auskunft und Anmeldung sind wir an diesen Tagen bereits ab 18:00 Uhr vor Ort.',
      },
      {
        question: 'Welche Führerscheinklassen kann ich in Eglosheim machen?',
        answer:
          'Am Standort Eglosheim bilden wir in allen PKW-Klassen (B, BE, B96, B196, begleitetes Fahren mit 17) und allen Motorradklassen (AM, A1, A2, A) aus. Dazu bieten wir Aufbauseminare (ASF) und Sicherheitstrainings für Zweiradfahrer an.',
      },
      {
        question: 'Wie melde ich mich in der Fahrschule Eglosheim an?',
        answer:
          'Am einfachsten kommst du montags oder donnerstags zwischen 18:00 und 19:00 Uhr direkt in der Monreposstraße 2 vorbei. Alternativ erreichst du uns telefonisch unter 0170 / 21 38 547 oder über das Anmeldeformular auf unserer Webseite.',
      },
      {
        question: 'Wo kann ich an der Monreposstraße parken?',
        answer:
          'Direkt an der Monreposstraße und in den angrenzenden Wohnstraßen gibt es kostenlose Parkplätze. Mit dem Bus erreichst du uns über die Haltestellen in Eglosheim in wenigen Gehminuten.',
      },
      {
        question: 'Ich wohne in Asperg oder Möglingen — lohnt sich der Standort Eglosheim für mich?',
        answer:
          'Ja — Eglosheim ist unser Standort im Ludwigsburger Norden und von Asperg, Möglingen, Tamm und Hoheneck aus in wenigen Minuten erreichbar. Viele unserer Fahrschüler kommen aus genau diesen Orten.',
      },
    ],
  },
  {
    locationId: 'gruenbuehl',
    path: '/fahrschule-ludwigsburg-gruenbuehl',
    metaTitle: 'Fahrschule Ludwigsburg-Grünbühl – Netzestraße 31 | Nicolai',
    metaDescription:
      'Deine Fahrschule in Ludwigsburg-Grünbühl: Netzestraße 31. Theorie Di & Do 19:00–20:30 Uhr, alle PKW- & Motorradklassen. Familiengeführt seit 1969. ☎ 0170 / 21 38 547',
    crumb: 'Standort Grünbühl',
    heroEyebrow: 'Standort Grünbühl',
    heroTitle: 'FAHRSCHULE IN LUDWIGSBURG-GRÜNBÜHL',
    heroSubtitle:
      'Netzestraße 31 — Führerschein-Ausbildung im Ludwigsburger Süden, mit Theorieunterricht dienstags und donnerstags.',
    intro: [
      'Im Süden von Ludwigsburg, in der Netzestraße 31, liegt unser zweiter Standort — deine Fahrschule für Grünbühl, Sonnenberg und die Karlshöhe. Als familiengeführte Fahrschule mit über 55 Jahren Erfahrung setzen wir auch hier auf das, was uns ausmacht: persönliche Betreuung, geduldige Fahrlehrer und eine Ausbildung, die dich sicher durch die Prüfung bringt.',
      'Vom ersten Theorieabend bis zur praktischen Prüfung: In Grünbühl machst du jede Führerscheinklasse, die wir anbieten — vom Rollerführerschein AM über A1, A2 und A bis zu den PKW-Klassen B, BE und B96 sowie der B196-Erweiterung. Die Lage am südlichen Stadtrand ist ideal, um sowohl den dichten Stadtverkehr von Ludwigsburg als auch die Strecken Richtung Kornwestheim und Stuttgart zu üben.',
    ],
    anfahrtTitle: 'So findest du uns in Grünbühl',
    anfahrt: [
      'Die Netzestraße 31 erreichst du mit dem Bus über die Haltestellen in Grünbühl — von dort sind es nur wenige Schritte. Mit dem Auto kommst du über die Karlsruher Straße bzw. aus Richtung Kornwestheim schnell zu uns; Parkplätze gibt es direkt im Wohngebiet.',
      'Der Standort ist die erste Wahl für alle aus Grünbühl-Sonnenberg, von der Karlshöhe, aus Oßweil und aus Kornwestheim — der Ludwigsburger Süden ist bei uns zu Hause.',
    ],
    nearbyAreas: ['Grünbühl', 'Sonnenberg', 'Karlshöhe', 'Oßweil', 'Kornwestheim'],
    faqs: [
      {
        question: 'Wann ist Theorieunterricht in der Fahrschule in Grünbühl?',
        answer:
          'Am Standort Grünbühl (Netzestraße 31) findet der Theorieunterricht dienstags und donnerstags von 19:00 bis 20:30 Uhr statt. Auskunft und Anmeldung sind an den Unterrichtstagen ab 18:00 Uhr möglich.',
      },
      {
        question: 'Kann ich in Grünbühl auch den Motorradführerschein machen?',
        answer:
          'Ja — in Grünbühl bilden wir in allen Motorradklassen aus: AM (Roller), A1 (125er), A2 und A (unbeschränkt). Natürlich gibt es auch alle PKW-Klassen inklusive begleitetem Fahren mit 17 und der B196-Erweiterung.',
      },
      {
        question: 'Wie komme ich aus Kornwestheim zur Fahrschule in Grünbühl?',
        answer:
          'Die Netzestraße 31 liegt am südlichen Stadtrand von Ludwigsburg und ist aus Kornwestheim mit dem Auto in wenigen Minuten erreichbar. Auch mit dem Bus bist du schnell bei uns — viele unserer Fahrschüler kommen aus Kornwestheim.',
      },
      {
        question: 'Warum ist der Dienstag-Termin in Grünbühl praktisch?',
        answer:
          'Mit Theorie dienstags und donnerstags in Grünbühl sowie montags und donnerstags in Eglosheim kannst du bei uns an vier Abenden pro Woche Theorieunterricht besuchen. Du darfst die Termine beider Standorte frei kombinieren und kommst so schneller durch die Pflichtstunden.',
      },
      {
        question: 'Wie melde ich mich am Standort Grünbühl an?',
        answer:
          'Komm dienstags oder donnerstags zwischen 18:00 und 19:00 Uhr in der Netzestraße 31 vorbei — wir nehmen uns Zeit für dich. Oder ruf uns unter 0170 / 21 38 547 an bzw. nutze das Online-Anmeldeformular auf der Kontaktseite.',
      },
    ],
  },
];
