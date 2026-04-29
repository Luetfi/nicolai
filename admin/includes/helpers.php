<?php
declare(strict_types=1);

/**
 * Escape output for HTML context.
 */
function e(?string $value): string {
    if ($value === null) {
        return '';
    }
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

/**
 * URL-safe slug from a string. Falls back to a random hash if empty.
 */
function slugify(string $text): string {
    $text = strtolower(trim($text));
    $text = str_replace(
        ['ä', 'ö', 'ü', 'ß', 'á', 'é', 'í', 'ó', 'ú', 'à', 'è', 'ì', 'ò', 'ù'],
        ['ae', 'oe', 'ue', 'ss', 'a', 'e', 'i', 'o', 'u', 'a', 'e', 'i', 'o', 'u'],
        $text
    );
    $text = preg_replace('/[^a-z0-9]+/', '-', $text);
    $text = trim((string)$text, '-');
    if ($text === '') {
        return bin2hex(random_bytes(4));
    }
    return $text;
}

/**
 * Redirect and exit. Use absolute path within the admin (e.g. "?p=dashboard").
 */
function redirect(string $target): void {
    header('Location: ' . $target);
    exit;
}

/**
 * Generate a fresh-looking ISO 8601 timestamp in UTC.
 */
function isoNow(): string {
    return gmdate('Y-m-d\TH:i:s\Z');
}

/**
 * Set a one-shot flash message stored in session.
 */
function flashSet(string $type, string $message): void {
    $_SESSION['flash'] = ['type' => $type, 'message' => $message];
}

function flashGet(): ?array {
    if (!isset($_SESSION['flash'])) {
        return null;
    }
    $flash = $_SESSION['flash'];
    unset($_SESSION['flash']);
    return $flash;
}

/**
 * Build an admin URL. Always rooted at the admin index.
 */
function adminUrl(string $route, array $params = []): string {
    $params = ['p' => $route] + $params;
    return 'index.php?' . http_build_query($params);
}

/**
 * Resolve project paths.
 */
function dataDir(): string {
    return realpath(__DIR__ . '/../..') . DIRECTORY_SEPARATOR . 'data';
}

function imagesTeamDir(): string {
    return realpath(__DIR__ . '/../..') . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'team';
}

function imagesTeamUrl(): string {
    return '/images/team';
}

/**
 * UTF-8-aware string length with fallback if mbstring is unavailable.
 */
function strLength(string $s): int {
    return function_exists('mb_strlen') ? mb_strlen($s, 'UTF-8') : strlen($s);
}

/**
 * Format an ISO date for display.
 */
function formatGermanDate(?string $isoDate): string {
    if (!$isoDate) {
        return '—';
    }
    $ts = strtotime($isoDate);
    if ($ts === false) {
        return $isoDate;
    }
    return date('d.m.Y H:i', $ts);
}
