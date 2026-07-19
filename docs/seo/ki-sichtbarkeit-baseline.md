# KI-Sichtbarkeits-Baseline — Fahrschule Nicolai

**Zweck:** Dokumentieren, was KI-Dienste über Fahrschulen in Ludwigsburg antworten — als Beweis-Baseline für den Garantie-Check (Monat 6, laut Angebot) und zum monatlichen Nachsteuern in der Betreuungsphase.

## Methode

Jede Abfrage in einem **frischen Chat ohne Login-Kontext** stellen (bzw. Inkognito), Antwort als Screenshot + Notiz festhalten:

1. „Welche Fahrschule in Ludwigsburg ist empfehlenswert?"
2. „Fahrschule in Ludwigsburg-Eglosheim"
3. „Wo kann ich in Ludwigsburg den Motorradführerschein machen?"
4. „Führerschein machen Ludwigsburg — welche Fahrschule?"

Plattformen: **ChatGPT** (mit Websuche), **Perplexity**, **Google AI Overview** (Google-Suche), **Copilot/Bing**.

Pro Antwort erfassen: Wird Fahrschule Nicolai genannt? (ja/nein) · An welcher Position? · Welche Quellen zitiert die KI? (GBP/Maps, Website, werkenntdenbesten, Yelp …) · Welche Wettbewerber werden genannt?

## Baseline (Datum: ____.____.2026 — auszufüllen)

| Abfrage | ChatGPT | Perplexity | Google AI | Copilot | Nicolai genannt? |
|---|---|---|---|---|---|
| Empfehlenswerte Fahrschule LB | | | | | |
| Fahrschule Eglosheim | | | | | |
| Motorradführerschein LB | | | | | |
| Führerschein machen LB | | | | | |

**Screenshots ablegen unter:** `docs/seo/ki-checks/<jahr-monat>/`

## Technische Voraussetzungen (Status Juli 2026 — erledigt ✅)

- robots.txt erlaubt GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended ✅
- llms.txt mit Standorten + Landingpage-Links ✅
- llms-full.txt (kompletter Seitentext) wird bei jedem Build generiert ✅
- FAQPage-Schema + statisch prerendertes HTML (KI-Crawler lesen ohne JS) ✅
- DrivingSchool-Schema mit Geo, Öffnungszeiten, areaServed pro Standort ✅

## Wiederholung

Monatlich in der Betreuungsphase (Aug/Sep/Okt 2026), dann beim Garantie-Check (ca. Januar 2027). Die wichtigsten Hebel, wenn Nicolai nicht genannt wird: mehr echte Google-Bewertungen, Verzeichniseinträge (siehe `branchenverzeichnisse.md`), konsistente NAP-Daten.
