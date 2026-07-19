---
name: create-angebot
description: Use when someone asks to create a proposal, write an Angebot, Angebotserstellung, or generate a quote for a website project. This skill is specifically for web design and web development proposals — use it whenever the user mentions Angebot, Kostenvoranschlag, or quote in the context of websites, Webseiten, Webentwicklung, Webdesign, Homepage, Landing Page, Online-Shop, or Relaunch. Do NOT use for proposals unrelated to web development.
argument-hint: Projektname oder Kundenname
---

## Was dieser Skill macht

Erstellt ein professionelles, gebrandetes Angebot (HTML + PDF) für Webseiten-Projekte (Design, Entwicklung, Hosting, Wartung). Das Angebot folgt dem WEBIFY-Branding und arbeitet ausschließlich mit Festpreisen — keine Stundensätze.

## Schritt 1: Projektinformationen sammeln

Frage den User mit AskUserQuestion nach folgenden Informationen (sofern nicht bereits bekannt). Stelle die Fragen in maximal 2 Runden:

**Runde 1 — Projekt & Kunde:**
- Kundenname / Firma
- Projekttitel (z.B. "Webseite Relaunch für Mustermann GmbH", "Online-Shop Erstellung", "Corporate Website")
- Projekt-Untertitel (optional, z.B. "Modernes Redesign mit CMS-Integration")
- Schlagworte / Tags (optional, z.B. "Webdesign | Entwicklung | CMS | Responsive")
- Datum und Version

**Runde 2 — Inhalt & Kalkulation:**
- Einleitung / Zielsetzung (Kurzbeschreibung des Webprojekts)
- Art der Webseite (z.B. Corporate Website, Landing Page, Online-Shop, Portfolio, Blog, Web-App)
- Leistungsbeschreibung — kundenorientiert formuliert, aufgeteilt in typische Webprojekt-Bereiche wie:
  - Konzept & Beratung (Anforderungsanalyse, Seitenstruktur, Wireframes)
  - Webdesign (UI/UX-Design, Responsive Design, Design-Entwürfe)
  - Entwicklung (Frontend, Backend, CMS-Integration, Funktionen)
  - Content-Einpflege (Texte, Bilder, erste Inhalte)
  - Testing & Go-Live (Browser-Tests, Performance, Launch)
  - Schulung (CMS-Einweisung für den Kunden)
- Leistungspakete mit Festpreisen: Für jedes Paket: Nr, Name, Beschreibung, Festpreis in EUR netto. Es gibt keinen Stundensatz — jedes Paket hat einen festen Betrag.
- Optionale Zusatzleistungen mit Festpreisen (z.B. SEO-Optimierung, Mehrsprachigkeit, Cookie-Banner, Wartungsvertrag, Hosting)
- Rabatt (optional, z.B. "Paketrabatt: -500,00 EUR")
- Zeitrahmen / Projektplanung (Wochen + Phasen)
- Voraussetzungen & Rahmenbedingungen (z.B. "Kunde liefert Texte und Bildmaterial", "Bestehende Domain wird übernommen")
- Hosting & Wartung (optional, monatliche/jährliche Festpreise)
- Gültigkeitsdatum des Angebots

## Schritt 2: HTML generieren mit Frontend-Design Skill

Nutze den **`/frontend-design`** Skill, um eine hochwertige, gebrandete HTML-Seite fuer das Angebot zu generieren. Uebergib dem Skill folgende Anforderungen als Prompt:

**Design-Briefing fuer den Frontend-Design Skill:**

> Erstelle ein professionelles, mehrseitiges Angebot als einzelne HTML-Datei (fuer PDF-Export via Playwright, NICHT fuer den Browser). Das Design soll hochwertig, modern und kreativ sein — kein generisches Template-Look.
>
> **Brand-Vorgaben:**
> - Firmenname: "WEBIFY"
> - Logo: Globus-Icon mit Cyan-Blau-Gradient + 3D-metallischer "WEBIFY" Text
> - Logo-Datei: `C:\Users\luetf\Downloads\3D transparent background 1.png` (fuer Cover und Content-Seiten verwenden, als base64 einbetten)
> - Primaerfarbe Cyan hell: #00C6FF
> - Primaerfarbe Blau mittel: #0072FF
> - Dunkles Navy/Hintergrund: #0A1628
> - Sekundaer Dunkelblau: #1A3A5C
> - Metallisches Silber/Grau: #A8B8C8
> - Neutral Grau: #8899AA
> - Fonts: Quicksand (Body & Headings) — oder systemnahe Sans-Serif als Fallback
> - Linke Seitenkante: Gradient-Bar (Cyan #00C6FF → Blau #0072FF)
>
> **Technische Anforderungen:**
> - Jede Seite ist ein `<div class="page">` mit exakt 210mm x 297mm (A4)
> - `@page { size: A4; margin: 0; }` und `page-break-after: always`
> - Content pro Seite max ~260mm Nutzhoehe (overflow: hidden)
> - `-webkit-print-color-adjust: exact; print-color-adjust: exact`
> - Cover-Seite: dunkler Hintergrund (#0A1628), WEBIFY-Logo, Projekttitel, Kunde, Datum
> - Content-Seiten: weisser Hintergrund, WEBIFY-Logo im Header (ggf. verkleinert), Footer mit Seitenzahl
> - Logo als base64-encoded PNG `<img>` Tag einbetten (NICHT als SVG) — gleiches Logo fuer Cover und Content
>
> **Inhalt des Angebots:**
> [Hier alle gesammelten Projektinformationen aus Schritt 1 einsetzen]
>
> **Struktur-Hinweise:**
> - Leistungsbeschreibung kundenorientiert formulieren — der Kunde soll verstehen was er bekommt, nicht wie es technisch umgesetzt wird
> - Leistungspakete immer mit Festpreisen darstellen (KEINE Stundensätze, KEINE Stundenangaben)
> - Kalkulations-Tabelle: Spalten sind Nr, Leistungspaket, Beschreibung, Festpreis (EUR netto) — NICHT Stunden x Stundensatz
> - Optionale Zusatzleistungen separat auflisten mit eigenen Festpreisen

**Vor dem Aufruf des Frontend-Design Skills:**
1. Lese die Logo-Datei und konvertiere sie zu base64:
   - Logo: `C:\Users\luetf\Downloads\3D transparent background 1.png` (transparenter Hintergrund, fuer Cover und Content-Seiten verwendbar)
2. Lese das bestehende Template als Referenz: `create-angebot/template/angebot-template.html`
   - Dieses Template dient als **Mindest-Referenz** fuer Struktur und CSS-Variablen
   - Der Frontend-Design Skill soll das Design aber **kreativ weiterentwickeln**, nicht 1:1 kopieren
3. Falls vorhanden, lese vorherige Angebote im `ai-workspace/angebote/` Ordner als Referenzbeispiel

**Nach dem Frontend-Design Skill:**
- Stelle sicher, dass alle Festpreise und Summen korrekt berechnet sind (Einzelpreise, Gesamtsumme, ggf. Rabatt abziehen)
- Pruefe, dass KEINE Stundensätze oder Stundenangaben im Angebot vorkommen — nur Festpreise
- Pruefe, dass die base64-Logos korrekt eingebettet sind
- Pruefe, dass der Firmenname ueberall korrekt "WEBIFY" ist

Speichere die HTML-Datei unter:
`ai-workspace/angebote/[kunde]-[projekt-kurz].html`

Erstelle den Ordner `ai-workspace/angebote/` falls er nicht existiert.

## Schritt 3: PDF erzeugen

Führe das PDF-Konvertierungsscript aus:

```bash
source .venv/bin/activate && python3 .claude/skills/create-angebot/scripts/html-to-pdf.py "ai-workspace/angebote/[dateiname].html"
```

Das Script erzeugt automatisch eine PDF-Datei im selben Ordner mit gleichem Namen.

## Schritt 4: Ergebnis melden

Teile dem User mit:
- Pfad zur HTML-Datei
- Pfad zur PDF-Datei
- Hinweis: "HTML kann bei Bedarf angepasst und erneut als PDF exportiert werden."

## Hinweise

- Alle Preise sind NETTO (zzgl. MwSt.) — immer angeben
- Dieser Skill ist ausschließlich für Webseiten-Projekte gedacht (Corporate Websites, Landing Pages, Online-Shops, Web-Apps, Relaunches etc.)
- Es wird IMMER mit Festpreisen gearbeitet — NIEMALS Stundensätze oder Stundenkalkulationen verwenden
- Berechne Summen korrekt: Festpreise der einzelnen Pakete addieren, Gesamtsumme, ggf. Rabatt abziehen
- Kalkulations-Tabelle hat die Spalten: Nr | Leistungspaket | Beschreibung | Festpreis (EUR netto)
- Leistungsbeschreibung kundenorientiert formulieren — was bekommt der Kunde, nicht wie wird es technisch umgesetzt
- Typische Leistungspakete bei Webprojekten: Konzept & Beratung, Webdesign (UI/UX), Entwicklung (Frontend/Backend), Content-Einpflege, Testing & Go-Live, CMS-Schulung
- Typische optionale Zusatzleistungen: SEO-Grundoptimierung, Mehrsprachigkeit, Cookie-Consent-Lösung, Wartungsvertrag (monatlich/jährlich), Hosting, SSL-Zertifikat, E-Mail-Einrichtung
- Erfinde KEINE Inhalte — frage nach wenn Informationen fehlen
- Halte die Sprache professionell, klar und auf Deutsch
- Der Frontend-Design Skill sorgt fuer ein hochwertiges, kreatives Design — nutze seine Staerken
- Das bestehende Template unter `template/angebot-template.html` dient nur als Referenz fuer Brand-Werte und Struktur
