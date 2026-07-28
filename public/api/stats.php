<?php
/**
 * Anonymer Anfrage-Zähler für die Fahrschule-Nicolai-Website.
 *
 * Gemeinsamer Schreiber für contact.php (Formular) und track.php (Kontaktklicks).
 *
 * Speicherort:  <webroot>/data/.stats/YYYY-MM.json  — eine Datei pro Kalendermonat
 * (Europe/Berlin). Die Datei entsteht beim ersten Ereignis des Monats, dadurch
 * beginnt jeder Monat automatisch bei 0 und alte Monate bleiben unverändert
 * abrufbar. /data ist im Deploy ausgeschlossen, die Historie übersteht Updates.
 *
 * DSGVO: Es werden ausschließlich Summen gespeichert — keine Namen, E-Mails,
 * Telefonnummern, IP-Adressen oder User-Agents. Kein Personenbezug, keine
 * Cookies, kein Zugriff auf Endgeräte-Speicher.
 */

declare(strict_types=1);

const STATS_EVENTS = ['inquiry', 'registration', 'click_phone', 'click_whatsapp', 'click_email'];

// Muss zu den Auswahlfeldern in src/pages/Kontakt.tsx passen.
const STATS_CLASSES   = ['B', 'B196', 'BE', 'B96', 'A', 'A2', 'A1', 'AM'];
const STATS_LOCATIONS = ['Eglosheim', 'Grünbühl', 'Egal'];

const STATS_OTHER = 'sonstige';

function statsDir(): string {
    return __DIR__ . '/../data/.stats';
}

/**
 * Legt das Statistik-Verzeichnis an und schützt es gegen direkten Web-Zugriff.
 * Zweite Verteidigungslinie zur RewriteRule in /.htaccess.
 */
function statsEnsureDir(): string {
    $dir = statsDir();
    if (!is_dir($dir)) {
        if (!@mkdir($dir, 0755, true) && !is_dir($dir)) {
            throw new RuntimeException('Statistik-Verzeichnis konnte nicht angelegt werden');
        }
    }

    $htaccess = $dir . '/.htaccess';
    if (!is_file($htaccess)) {
        @file_put_contents($htaccess, implode("\n", [
            '# Kein Web-Zugriff auf die Statistikdateien.',
            '<IfModule mod_authz_core.c>',
            '    Require all denied',
            '</IfModule>',
            '<IfModule !mod_authz_core.c>',
            '    Order allow,deny',
            '    Deny from all',
            '</IfModule>',
            '',
        ]));
    }

    $index = $dir . '/index.html';
    if (!is_file($index)) {
        @file_put_contents($index, '');
    }

    return $dir;
}

function statsEmptyMonth(string $month, string $now): array {
    $totals = [];
    foreach (STATS_EVENTS as $event) {
        $totals[$event] = 0;
    }

    return [
        'month'      => $month,
        'totals'     => $totals,
        'byClass'    => [],
        'byLocation' => [],
        'byDay'      => [],
        'firstEvent' => $now,
        'lastEvent'  => $now,
    ];
}

function statsNormalizeDimension(string $value, array $allowed): string {
    $value = trim($value);
    if ($value === '') {
        return STATS_OTHER;
    }
    return in_array($value, $allowed, true) ? $value : STATS_OTHER;
}

/**
 * Zählt ein Ereignis im laufenden Monat.
 *
 * Schreibt read-modify-write unter einem einzigen exklusiven Lock, damit
 * gleichzeitige Zugriffe keine Increments verlieren.
 *
 * Wirft NIE eine Exception nach außen — ein Statistik-Fehler darf niemals das
 * Formular oder den Mailversand beeinträchtigen.
 *
 * @param array{class?: string, location?: string} $dims
 */
function statsRecord(string $event, array $dims = []): void {
    try {
        if (!in_array($event, STATS_EVENTS, true)) {
            return;
        }

        date_default_timezone_set('Europe/Berlin');
        $month = date('Y-m');
        $day   = date('Y-m-d');
        $now   = date('c');

        $dir  = statsEnsureDir();
        $path = $dir . '/' . $month . '.json';

        $fp = @fopen($path, 'c+');
        if ($fp === false) {
            throw new RuntimeException('Statistikdatei nicht schreibbar');
        }

        try {
            if (!flock($fp, LOCK_EX)) {
                throw new RuntimeException('Statistikdatei nicht sperrbar');
            }

            $contents = '';
            while (!feof($fp)) {
                $chunk = fread($fp, 8192);
                if ($chunk === false) {
                    break;
                }
                $contents .= $chunk;
            }

            $data = json_decode($contents, true);
            if (!is_array($data) || !isset($data['totals']) || !is_array($data['totals'])) {
                $data = statsEmptyMonth($month, $now);
            }

            // Fehlende Schlüssel ergänzen (z.B. nach Erweiterung von STATS_EVENTS)
            foreach (STATS_EVENTS as $known) {
                if (!isset($data['totals'][$known]) || !is_int($data['totals'][$known])) {
                    $data['totals'][$known] = (int) ($data['totals'][$known] ?? 0);
                }
            }
            foreach (['byClass', 'byLocation', 'byDay'] as $bucket) {
                if (!isset($data[$bucket]) || !is_array($data[$bucket])) {
                    $data[$bucket] = [];
                }
            }

            $data['month'] = $month;
            $data['totals'][$event]++;

            if (!isset($data['byDay'][$day]) || !is_array($data['byDay'][$day])) {
                $data['byDay'][$day] = [];
            }
            $data['byDay'][$day][$event] = (int) ($data['byDay'][$day][$event] ?? 0) + 1;
            ksort($data['byDay']);

            if ($event === 'registration') {
                $class = statsNormalizeDimension((string) ($dims['class'] ?? ''), STATS_CLASSES);
                $data['byClass'][$class] = (int) ($data['byClass'][$class] ?? 0) + 1;

                $location = statsNormalizeDimension((string) ($dims['location'] ?? ''), STATS_LOCATIONS);
                $data['byLocation'][$location] = (int) ($data['byLocation'][$location] ?? 0) + 1;
            }

            if (empty($data['firstEvent'])) {
                $data['firstEvent'] = $now;
            }
            $data['lastEvent'] = $now;

            $json = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
            if ($json === false) {
                throw new RuntimeException('Statistik-JSON konnte nicht kodiert werden');
            }

            rewind($fp);
            ftruncate($fp, 0);
            fwrite($fp, $json);
            fflush($fp);
        } finally {
            @flock($fp, LOCK_UN);
            @fclose($fp);
        }
    } catch (Throwable $e) {
        error_log('[stats.php] ' . $e->getMessage());
    }
}
