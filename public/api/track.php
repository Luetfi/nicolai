<?php
/**
 * Zähl-Endpoint für Kontaktklicks (Telefon, WhatsApp, E-Mail).
 *
 * Wird vom Frontend per navigator.sendBeacon aufgerufen und addiert lediglich
 * +1 auf einen anonymen Monatszähler (siehe stats.php). Es werden weder IP,
 * User-Agent noch Cookies gespeichert; die Antwort ist immer leer (204).
 */

declare(strict_types=1);

require_once __DIR__ . '/stats.php';

const TRACK_MAX_BODY_BYTES = 1024;

const TRACK_KINDS = [
    'phone'    => 'click_phone',
    'whatsapp' => 'click_whatsapp',
    'email'    => 'click_email',
];

header('Cache-Control: no-store');

/** Antwortet ohne Inhalt. sendBeacon wertet den Body nicht aus. */
function trackDone(int $status = 204): void {
    http_response_code($status);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    trackDone(405);
}

// Nur Aufrufe von der eigenen Domain zählen (einfacher Missbrauchsschutz).
// HTTP_HOST kann einen Port enthalten ("beispiel.de:8080"), parse_url() nicht —
// daher vor dem Vergleich abschneiden.
$host = strtolower((string) ($_SERVER['HTTP_HOST'] ?? ''));
$host = (string) preg_replace('/:\d+$/', '', $host);
$originHeader = (string) ($_SERVER['HTTP_ORIGIN'] ?? $_SERVER['HTTP_REFERER'] ?? '');
if ($originHeader !== '' && $host !== '') {
    $originHost = strtolower((string) (parse_url($originHeader, PHP_URL_HOST) ?? ''));
    if ($originHost !== '' && $originHost !== $host) {
        trackDone(403);
    }
}

$raw = file_get_contents('php://input');
if ($raw === false || $raw === '' || strlen($raw) > TRACK_MAX_BODY_BYTES) {
    trackDone(400);
}

$data = json_decode($raw, true);
if (!is_array($data)) {
    trackDone(400);
}

$kind = is_string($data['kind'] ?? null) ? trim($data['kind']) : '';
if (!isset(TRACK_KINDS[$kind])) {
    trackDone(400);
}

statsRecord(TRACK_KINDS[$kind]);

trackDone();
