================================================================
FAHRSCHULE NICOLAI · ADMIN-BEREICH · ANLEITUNG FÜR DEN INHABER
================================================================

Diese Anleitung beschreibt die Bedienung des Admin-Bereichs zum
Pflegen der Inhalte auf fahrschule-nicolai.de (oder deiner Domain).

Du findest den Admin-Bereich unter:
   https://<deine-domain>/admin/


----------------------------------------------------------------
1. ERSTE EINRICHTUNG (NUR EINMAL)
----------------------------------------------------------------

Nach dem ersten Hochladen aller Dateien:

  a) Öffne im Browser:
        https://<deine-domain>/admin/setup.php

  b) Wähle ein starkes Passwort (mindestens 12 Zeichen) und
     gib es zweimal ein. KLICK "Passwort speichern".

  c) Du bekommst eine Erfolgsmeldung. Schließe den Browser.

  d) WICHTIG: Verbinde dich per FTP zum Strato-Webspace und
     LÖSCHE die Datei /admin/setup.php
     (Sie wird nicht mehr benötigt — und darf nicht im Web bleiben.)

  e) Optional, falls du SFTP-Zugang hast: Setze die Rechte der
     Datei /admin/includes/config.php auf 600 (nur lesbar/schreibbar
     für den Eigentümer). Über das Strato-Panel oder FileZilla
     "Dateirechte > 600".

Fertig. Ab jetzt kannst du dich unter /admin/ einloggen.


----------------------------------------------------------------
2. EINLOGGEN
----------------------------------------------------------------

  - URL:      https://<deine-domain>/admin/
  - Passwort: das in Schritt 1 gewählte Passwort

Du wirst nach erfolgreichem Login auf das Dashboard geleitet.

Wenn du dein Passwort vergisst, kann es nicht wiederhergestellt
werden (es ist nur als Hash gespeichert). Wende dich an deinen
Webentwickler — er kann setup.php erneut deployen, sodass du
ein neues Passwort vergeben kannst.


----------------------------------------------------------------
3. WAS DU PFLEGEN KANNST
----------------------------------------------------------------

A) AUFBAUSEMINAR (Startseite)

   Klick auf die Kachel "Aufbauseminar" auf dem Dashboard.
   Hier kannst du anpassen:
   - Titel (Standard: "Aufbauseminar")
   - Kursart (Standard: "ASF-Kurs")
   - Startdatum
   - Preis (z.B. "330,- Euro")
   - Telefon-Kontakt
   - E-Mail-Kontakt
   - "Plätze frei" Schalter (zeigt das grüne Label auf der Webseite)

   Speichern → die Webseite zeigt die Änderungen sofort.


B) TEAM (Fahrlehrer)

   Klick auf die Kachel "Team".
   Du siehst die Liste aller aktuellen Fahrlehrer.

   - "+ Neuer Fahrlehrer": neuen Eintrag anlegen
   - "Bearbeiten": vorhandenen Eintrag ändern
   - "Löschen": Eintrag entfernen (Foto wird mitgelöscht)

   Pro Fahrlehrer kannst du eingeben:
   - Name
   - Funktion (z.B. "Fahrlehrer der Klassen B/BE")
   - Beschreibung (Erfahrung, Ausbildungen, etc.)
   - Telefon (optional)
   - Foto (JPG, PNG oder WebP, max. 5 MB)

   Tipp: Quadratische Fotos sehen am besten aus. Das System
   schneidet automatisch zentriert zu.


C) NEUIGKEITEN

   Klick auf die Kachel "Neuigkeiten".
   Du siehst alle bisherigen Einträge, sortiert nach Datum (neueste oben).

   - "+ Neuer Eintrag": neue Meldung anlegen
   - "Bearbeiten": ändern
   - "Löschen": entfernen

   Pro Eintrag:
   - Titel
   - Datum
   - Kategorie: "Neuigkeit", "Kurs" oder "Information"
     (entscheidet die Farbe des Badges auf der Seite)
   - Inhalt (max. 2000 Zeichen)


----------------------------------------------------------------
4. SICHERHEIT
----------------------------------------------------------------

- Logge dich aus, wenn du fertig bist (Button oben rechts).
- Teile dein Passwort nicht.
- Nach 60 Minuten Inaktivität wirst du automatisch abgemeldet.
- Nach 5 falschen Login-Versuchen wird dein Zugang für 15 Minuten
  gesperrt (Schutz vor Hackerangriffen).


----------------------------------------------------------------
5. BACKUPS
----------------------------------------------------------------

Vor jeder Speicherung legt das System automatisch ein Backup an.
Diese liegen auf dem Server unter /data/.backups/. Die letzten
20 Versionen werden aufbewahrt.

Falls etwas schiefgeht: Kontaktiere deinen Webentwickler — er
kann ein Backup einspielen.


----------------------------------------------------------------
6. WAS PASSIERT BEI EINEM WEBSEITEN-UPDATE
----------------------------------------------------------------

Wenn dein Webentwickler an der Webseite arbeitet (z.B. neues
Design, neue Seite), wird er nur den Frontend-Code aktualisieren.
Deine Inhalte (ASF, Team, Neuigkeiten, Fotos) bleiben unverändert.

Das Deploy-Skript ist bewusst so gebaut, dass es niemals deine
gepflegten Inhalte überschreibt.


----------------------------------------------------------------
KONTAKT BEI PROBLEMEN
----------------------------------------------------------------

Wenn du in den Admin-Bereich nicht reinkommst, eine Fehlermeldung
siehst, oder etwas verschwunden ist, melde dich bei deinem
Webentwickler. Beschreibe genau:
  - Was hast du gemacht?
  - Welche Meldung hast du gesehen?
  - Welche Seite war geöffnet?

Je mehr Details, desto schneller ist das Problem gelöst.

================================================================
