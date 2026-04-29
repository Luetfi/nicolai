<?php
/**
 * config.example.php — Vorlage für config.php
 *
 * 1. Kopiere diese Datei zu config.php
 * 2. ÖFFNE setup.php im Browser, setze ein Passwort und kopiere den ausgegebenen Hash hierhin
 * 3. Generiere einen zufälligen APP_SECRET (32 Bytes hex) — z.B. mit setup.php
 * 4. Lösche setup.php
 *
 * config.php darf NICHT ins Git committet werden (siehe .gitignore).
 */
declare(strict_types=1);

// Wird von setup.php nach erfolgreichem Setup ersetzt:
const ADMIN_PASS_HASH = '';

// 32 Bytes hex, einmal generieren und nie wieder ändern (sonst werden Sessions ungültig)
const APP_SECRET = '';

// Session-Cookie-Name
const SESSION_NAME = 'nic_admin';

// Idle-Timeout in Sekunden (60 min)
const SESSION_IDLE_TIMEOUT = 3600;

// Login-Rate-Limiting
const LOGIN_MAX_ATTEMPTS = 5;
const LOGIN_LOCKOUT_SECONDS = 900; // 15 min
