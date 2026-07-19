<?php
/**
 * Kontaktformular-Endpoint für die Fahrschule-Nicolai-Website.
 *
 * Erwartet einen POST-Request mit JSON-Body. Akzeptiert zwei Formulartypen:
 *   - "inquiry"      → allgemeine Anfrage   → Betreff [ANFRAGE]
 *   - "registration" → Anmeldung            → Betreff [ANMELDUNG]
 *
 * Versendet die Mail per PHP mail() an RECIPIENT_EMAIL. Reply-To wird auf
 * die Absenderadresse aus dem Formular gesetzt, sodass im Posteingang
 * direkt geantwortet werden kann.
 */

declare(strict_types=1);

// -------------------------------------------------------------
// Konfiguration  →  ggf. an die tatsächlichen STRATO-Mailboxen anpassen
// -------------------------------------------------------------
const RECIPIENT_EMAIL = 'fahrschule-ralf-nicolai@web.de';

// FROM_EMAIL ist nur die *technische* Absender-Adresse für SPF/DMARC.
// Sie muss eine bei STRATO existierende Mailbox auf der Domain sein, damit
// web.de die Mail akzeptiert — aber das Postfach muss NICHT aktiv genutzt
// werden. Antworten landen via Reply-To direkt beim Formular-Absender,
// die Mail selbst kommt im Posteingang von RECIPIENT_EMAIL an.
const FROM_EMAIL = 'info@fahrschule-nicolai.de';
const FROM_NAME  = 'Fahrschule Nicolai · Webformular';

const MAX_BODY_BYTES = 50 * 1024;   // 50 KB
const MIN_FILL_SECONDS = 2;          // Bots submitten meist sofort

// -------------------------------------------------------------
// Header & Method-Guard
// -------------------------------------------------------------
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    echo json_encode(['ok' => false, 'error' => 'Methode nicht erlaubt']);
    exit;
}

$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
if (stripos($contentType, 'application/json') === false) {
    http_response_code(415);
    echo json_encode(['ok' => false, 'error' => 'Content-Type muss application/json sein']);
    exit;
}

// -------------------------------------------------------------
// Body lesen & validieren
// -------------------------------------------------------------
$raw = file_get_contents('php://input');
if ($raw === false || strlen($raw) === 0) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Leerer Request-Body']);
    exit;
}
if (strlen($raw) > MAX_BODY_BYTES) {
    http_response_code(413);
    echo json_encode(['ok' => false, 'error' => 'Anfrage zu groß']);
    exit;
}

$data = json_decode($raw, true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Ungültiges JSON']);
    exit;
}

// -------------------------------------------------------------
// Spam-Schutz: Honeypot (still success, kein Mail-Versand) & Mindest-Fülldauer
// -------------------------------------------------------------
$honeypot = isset($data['website']) ? trim((string) $data['website']) : '';
if ($honeypot !== '') {
    // Bot zufrieden, aber keine Mail rausschicken
    echo json_encode(['ok' => true]);
    exit;
}

$mountedAt = isset($data['t']) ? (int) $data['t'] : 0;
if ($mountedAt > 0) {
    $elapsedSeconds = (int) floor((microtime(true) * 1000 - $mountedAt) / 1000);
    if ($elapsedSeconds < MIN_FILL_SECONDS) {
        echo json_encode(['ok' => true]);
        exit;
    }
}

// -------------------------------------------------------------
// Helper
// -------------------------------------------------------------
function val(array $data, string $key, int $maxLen = 1000): string {
    $v = $data[$key] ?? '';
    if (!is_string($v)) {
        return '';
    }
    $v = trim($v);
    // Header-Injection-Schutz: keine CR/LF in Einzelfeldern
    $v = str_replace(["\r", "\n", "\0"], [' ', ' ', ''], $v);
    if (mb_strlen($v) > $maxLen) {
        $v = mb_substr($v, 0, $maxLen);
    }
    return $v;
}

function multiline(array $data, string $key, int $maxLen = 5000): string {
    $v = $data[$key] ?? '';
    if (!is_string($v)) {
        return '';
    }
    $v = trim($v);
    // CR-Zeichen entfernen, LF behalten
    $v = str_replace(["\r", "\0"], '', $v);
    if (mb_strlen($v) > $maxLen) {
        $v = mb_substr($v, 0, $maxLen);
    }
    return $v;
}

function encodeSubject(string $s): string {
    if (function_exists('mb_encode_mimeheader')) {
        return mb_encode_mimeheader($s, 'UTF-8', 'B');
    }
    return '=?UTF-8?B?' . base64_encode($s) . '?=';
}

function encodeAddress(string $name, string $email): string {
    $name = trim($name);
    if ($name === '') {
        return $email;
    }
    return encodeSubject($name) . ' <' . $email . '>';
}

function maskIp(string $ip): string {
    if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4)) {
        $parts = explode('.', $ip);
        $parts[3] = 'x';
        return implode('.', $parts);
    }
    if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV6)) {
        $parts = explode(':', $ip);
        return implode(':', array_slice($parts, 0, 4)) . '::x';
    }
    return 'unbekannt';
}

// -------------------------------------------------------------
// Form-Type-Branching
// -------------------------------------------------------------
$formType = val($data, 'formType', 32);
if ($formType !== 'inquiry' && $formType !== 'registration') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Ungültiger Formulartyp']);
    exit;
}

date_default_timezone_set('Europe/Berlin');
$timestamp = date('d.m.Y H:i') . ' Uhr';
$ipMasked = maskIp($_SERVER['REMOTE_ADDR'] ?? '');

$divider     = str_repeat('=', 52);
$subDivider  = '── ';
$subEnd      = ' ──';

// -------------------------------------------------------------
// Variante: Allgemeine Anfrage
// -------------------------------------------------------------
if ($formType === 'inquiry') {
    $name    = val($data, 'name', 200);
    $email   = val($data, 'email', 200);
    $phone   = val($data, 'phone', 60);
    $subject = val($data, 'subject', 200);
    $message = multiline($data, 'message', 5000);

    if ($name === '' || $email === '' || $message === '') {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Bitte Name, E-Mail und Nachricht ausfüllen.']);
        exit;
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Ungültige E-Mail-Adresse.']);
        exit;
    }

    $effectiveSubject = $subject !== '' ? $subject : ('Anfrage von ' . $name);
    $mailSubject = '[ANFRAGE] ' . $effectiveSubject;

    $body = $divider . "\n";
    $body .= "  NEUE ANFRAGE über das Kontaktformular\n";
    $body .= $divider . "\n\n";

    $body .= $subDivider . 'Kontaktdaten' . $subEnd . "\n";
    $body .= 'Name:    ' . $name . "\n";
    $body .= 'E-Mail:  ' . $email . "\n";
    $body .= 'Telefon: ' . ($phone !== '' ? $phone : '–') . "\n\n";

    $body .= $subDivider . 'Nachricht' . $subEnd . "\n";
    $body .= 'Betreff: ' . ($subject !== '' ? $subject : '–') . "\n\n";
    $body .= $message . "\n\n";

    $body .= $subDivider . 'Meta' . $subEnd . "\n";
    $body .= 'Gesendet:    ' . $timestamp . " (Europe/Berlin)\n";
    $body .= 'IP (gekürzt): ' . $ipMasked . "\n";

    $replyTo = encodeAddress($name, $email);
}

// -------------------------------------------------------------
// Variante: Anmeldung
// -------------------------------------------------------------
else {
    $firstName       = val($data, 'firstName', 100);
    $lastName        = val($data, 'lastName', 100);
    $birthDate       = val($data, 'birthDate', 20);
    $birthPlace      = val($data, 'birthPlace', 100);
    $street          = val($data, 'street', 200);
    $zip             = val($data, 'zip', 10);
    $city            = val($data, 'city', 100);
    $phone           = val($data, 'phone', 60);
    $email           = val($data, 'email', 200);
    $licenseClass    = val($data, 'licenseClass', 20);
    $location        = val($data, 'location', 100);
    $hasLicense      = val($data, 'hasLicense', 5);
    $existingLicense = val($data, 'existingLicense', 100);
    $notes           = multiline($data, 'notes', 3000);

    if ($firstName === '' || $lastName === '' || $email === '' || $licenseClass === '') {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Bitte Vorname, Nachname, E-Mail und Klasse ausfüllen.']);
        exit;
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Ungültige E-Mail-Adresse.']);
        exit;
    }

    $fullName = trim($firstName . ' ' . $lastName);
    $mailSubject = '[ANMELDUNG] ' . $fullName . ' – Klasse ' . $licenseClass;

    $body = $divider . "\n";
    $body .= "  NEUE ANMELDUNG über das Kontaktformular\n";
    $body .= $divider . "\n\n";

    $body .= $subDivider . 'Persönliche Daten' . $subEnd . "\n";
    $body .= 'Vorname:      ' . $firstName . "\n";
    $body .= 'Nachname:     ' . $lastName . "\n";
    $body .= 'Geburtsdatum: ' . ($birthDate !== '' ? $birthDate : '–') . "\n";
    $body .= 'Geburtsort:   ' . ($birthPlace !== '' ? $birthPlace : '–') . "\n\n";

    $body .= $subDivider . 'Adresse' . $subEnd . "\n";
    $body .= 'Straße:    ' . ($street !== '' ? $street : '–') . "\n";
    $body .= 'PLZ / Ort: ' . trim($zip . ' ' . $city) . "\n\n";

    $body .= $subDivider . 'Kontakt' . $subEnd . "\n";
    $body .= 'Telefon: ' . ($phone !== '' ? $phone : '–') . "\n";
    $body .= 'E-Mail:  ' . $email . "\n\n";

    $body .= $subDivider . 'Führerschein' . $subEnd . "\n";
    $body .= 'Gewünschte Klasse:        ' . $licenseClass . "\n";
    $body .= 'Bevorzugter Standort:     ' . ($location !== '' ? $location : '–') . "\n";
    $hasLicenseLabel = ($hasLicense === 'ja') ? 'Ja' : 'Nein';
    if ($hasLicense === 'ja' && $existingLicense !== '') {
        $hasLicenseLabel .= ' (Klasse: ' . $existingLicense . ')';
    }
    $body .= 'Bestehender Führerschein: ' . $hasLicenseLabel . "\n\n";

    $body .= $subDivider . 'Bemerkung' . $subEnd . "\n";
    $body .= ($notes !== '' ? $notes : '–') . "\n\n";

    $body .= $subDivider . 'Meta' . $subEnd . "\n";
    $body .= 'Gesendet:    ' . $timestamp . " (Europe/Berlin)\n";
    $body .= 'IP (gekürzt): ' . $ipMasked . "\n";

    $replyTo = encodeAddress($fullName, $email);
}

// -------------------------------------------------------------
// Mail versenden
// -------------------------------------------------------------
$headers = [
    'From: ' . encodeAddress(FROM_NAME, FROM_EMAIL),
    'Reply-To: ' . $replyTo,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: Fahrschule-Nicolai-Webform',
];

$ok = @mail(
    RECIPIENT_EMAIL,
    encodeSubject($mailSubject),
    $body,
    implode("\r\n", $headers),
    '-f' . FROM_EMAIL
);

if (!$ok) {
    http_response_code(500);
    error_log('[contact.php] mail() lieferte false zurück. To=' . RECIPIENT_EMAIL . ' From=' . FROM_EMAIL);
    echo json_encode([
        'ok' => false,
        'error' => 'E-Mail konnte nicht versendet werden. Bitte später erneut versuchen oder direkt anrufen.',
    ]);
    exit;
}

echo json_encode(['ok' => true]);
