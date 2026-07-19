# Bewertungskarte (QR) — Anleitung

Druckfertige A6-Vorlage: `bewertungskarte.html` (eine Karte pro Standort).
**Es fehlen noch die Review-Links** — sobald sie da sind, dauert der Rest 2 Minuten.

## 1. Review-Links aus den GBP-Profilen holen

Google Business Profile → Profil auswählen → **„Nach Rezensionen fragen"** → Kurzlink kopieren.
(Alternativ Place-ID über https://developers.google.com/maps/documentation/places/web-service/place-id ermitteln und Link bauen: `https://search.google.com/local/writereview?placeid=<PLACE_ID>`)

## 2. QR-Codes generieren (offline, ohne Drittanbieter-Dienst)

```powershell
cd docs/seo/bewertungskarte
npx qrcode -t svg -o qr-eglosheim.svg  "<REVIEW_LINK_EGLOSHEIM>"
npx qrcode -t svg -o qr-gruenbuehl.svg "<REVIEW_LINK_GRUENBUEHL>"
```

## 3. QR in die Vorlage einsetzen

In `bewertungskarte.html` die beiden Platzhalter-Divs durch die `<img src="qr-….svg">`-Zeile ersetzen (Kommentar steht direkt darüber).

## 4. Drucken

Datei im Browser öffnen → Drucken → **Ränder: Keine · Hintergrundgrafiken: AN · Skalierung: 100 %**.
Empfehlung: auf 250–300 g/m² Karton drucken lassen (z. B. Copyshop), 50–100 Stück pro Standort.

## 5. Nicht vergessen

Dieselben Review-Links auch in `src/data/contact.ts` eintragen (`googleReviewUrl` je Standort) — damit erscheinen automatisch „Bewerte uns auf Google"-Buttons auf den Standortseiten und im Footer. Danach neu builden + deployen.
