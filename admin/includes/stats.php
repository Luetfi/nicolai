<?php
declare(strict_types=1);

/**
 * Lesezugriff auf die anonymen Monatsstatistiken, die von /api/stats.php
 * geschrieben werden (eine JSON-Datei pro Kalendermonat unter /data/.stats).
 *
 * Rein lesend — der Admin-Bereich verändert die Zähler nie.
 */

const STATS_ADMIN_EVENTS = ['inquiry', 'registration', 'click_phone', 'click_whatsapp', 'click_email'];

const STATS_FORM_EVENTS  = ['inquiry', 'registration'];
const STATS_CLICK_EVENTS = ['click_phone', 'click_whatsapp', 'click_email'];

/** @return array<string,string> Ereignis => Anzeigename */
function statsEventLabels(): array {
    return [
        'inquiry'         => 'Anfragen',
        'registration'    => 'Anmeldungen',
        'click_phone'     => 'Telefon-Klicks',
        'click_whatsapp'  => 'WhatsApp-Klicks',
        'click_email'     => 'E-Mail-Klicks',
    ];
}

function statsAdminDir(): string {
    return dataDir() . DIRECTORY_SEPARATOR . '.stats';
}

function statsIsValidMonth(string $month): bool {
    return (bool) preg_match('/^\d{4}-(0[1-9]|1[0-2])$/', $month);
}

/** Aktueller Monat in deutscher Zeitzone. */
function statsCurrentMonth(): string {
    return date('Y-m');
}

function statsPrevMonth(string $month): string {
    $ts = strtotime($month . '-01 12:00:00');
    if ($ts === false) {
        return $month;
    }
    return date('Y-m', strtotime('-1 month', $ts));
}

/**
 * Alle Monate mit Daten, neuester zuerst.
 *
 * @return string[]
 */
function statsAvailableMonths(): array {
    $files = glob(statsAdminDir() . DIRECTORY_SEPARATOR . '*.json');
    if (!is_array($files)) {
        return [];
    }
    $months = [];
    foreach ($files as $file) {
        $month = basename($file, '.json');
        if (statsIsValidMonth($month)) {
            $months[] = $month;
        }
    }
    rsort($months);
    return $months;
}

/**
 * Liest einen Monat und füllt fehlende Schlüssel mit Nullen auf, damit die
 * Ansicht sich nie um leere Werte kümmern muss.
 */
function statsReadMonth(string $month): array {
    $totals = [];
    foreach (STATS_ADMIN_EVENTS as $event) {
        $totals[$event] = 0;
    }
    $result = [
        'month'      => $month,
        'exists'     => false,
        'totals'     => $totals,
        'byClass'    => [],
        'byLocation' => [],
        'byDay'      => [],
        'firstEvent' => null,
        'lastEvent'  => null,
    ];

    if (!statsIsValidMonth($month)) {
        return $result;
    }

    $path = statsAdminDir() . DIRECTORY_SEPARATOR . $month . '.json';
    if (!is_file($path)) {
        return $result;
    }

    $raw = @file_get_contents($path);
    if ($raw === false) {
        return $result;
    }
    $data = json_decode($raw, true);
    if (!is_array($data)) {
        return $result;
    }

    $result['exists'] = true;

    foreach (STATS_ADMIN_EVENTS as $event) {
        $result['totals'][$event] = (int) ($data['totals'][$event] ?? 0);
    }

    foreach (['byClass', 'byLocation'] as $bucket) {
        if (isset($data[$bucket]) && is_array($data[$bucket])) {
            $clean = [];
            foreach ($data[$bucket] as $key => $value) {
                $clean[(string) $key] = (int) $value;
            }
            arsort($clean);
            $result[$bucket] = $clean;
        }
    }

    if (isset($data['byDay']) && is_array($data['byDay'])) {
        $byDay = [];
        foreach ($data['byDay'] as $day => $events) {
            if (!is_string($day) || !is_array($events)) {
                continue;
            }
            $row = [];
            foreach (STATS_ADMIN_EVENTS as $event) {
                $row[$event] = (int) ($events[$event] ?? 0);
            }
            $byDay[$day] = $row;
        }
        ksort($byDay);
        $result['byDay'] = $byDay;
    }

    $result['firstEvent'] = is_string($data['firstEvent'] ?? null) ? $data['firstEvent'] : null;
    $result['lastEvent']  = is_string($data['lastEvent'] ?? null) ? $data['lastEvent'] : null;

    return $result;
}

/** "2026-07" => "Juli 2026" */
function statsMonthLabel(string $month): string {
    static $names = [
        '01' => 'Januar', '02' => 'Februar', '03' => 'März', '04' => 'April',
        '05' => 'Mai', '06' => 'Juni', '07' => 'Juli', '08' => 'August',
        '09' => 'September', '10' => 'Oktober', '11' => 'November', '12' => 'Dezember',
    ];
    if (!statsIsValidMonth($month)) {
        return $month;
    }
    [$year, $mm] = explode('-', $month);
    return $names[$mm] . ' ' . $year;
}

/** Summe der abgesendeten Formulare (Anfragen + Anmeldungen). */
function statsFormTotal(array $stats): int {
    $sum = 0;
    foreach (STATS_FORM_EVENTS as $event) {
        $sum += (int) ($stats['totals'][$event] ?? 0);
    }
    return $sum;
}

/** Summe aller Kontaktaufnahmen (Formulare + Klicks). */
function statsContactTotal(array $stats): int {
    $sum = 0;
    foreach (STATS_ADMIN_EVENTS as $event) {
        $sum += (int) ($stats['totals'][$event] ?? 0);
    }
    return $sum;
}

/**
 * Vergleich zweier Zahlen.
 *
 * @return array{diff:int, percent:?int, direction:string, label:string}
 */
function statsDelta(int $current, int $previous): array {
    $diff = $current - $previous;
    $direction = $diff > 0 ? 'up' : ($diff < 0 ? 'down' : 'flat');

    $percent = null;
    if ($previous > 0) {
        $percent = (int) round($diff / $previous * 100);
    }

    if ($previous === 0 && $current === 0) {
        $label = 'wie im Vormonat';
    } elseif ($previous === 0) {
        $label = 'neu (Vormonat 0)';
    } elseif ($diff === 0) {
        $label = 'wie im Vormonat';
    } else {
        $label = ($diff > 0 ? '+' : '−') . abs($diff) . ' (' . ($percent > 0 ? '+' : '−') . abs((int) $percent) . ' %)';
    }

    return [
        'diff'      => $diff,
        'percent'   => $percent,
        'direction' => $direction,
        'label'     => $label,
    ];
}

/**
 * Tagesreihe für den kompletten Monat — auch Tage ohne Ereignisse, damit der
 * Verlauf keine Lücken hat.
 *
 * @return array<int, array{date:string, day:int, total:int, forms:int, clicks:int}>
 */
function statsDailySeries(array $stats): array {
    $month = (string) ($stats['month'] ?? '');
    if (!statsIsValidMonth($month)) {
        return [];
    }

    $daysInMonth = (int) date('t', (int) strtotime($month . '-01 12:00:00'));
    $series = [];

    for ($day = 1; $day <= $daysInMonth; $day++) {
        $date = sprintf('%s-%02d', $month, $day);
        $row = $stats['byDay'][$date] ?? [];

        $forms = 0;
        foreach (STATS_FORM_EVENTS as $event) {
            $forms += (int) ($row[$event] ?? 0);
        }
        $clicks = 0;
        foreach (STATS_CLICK_EVENTS as $event) {
            $clicks += (int) ($row[$event] ?? 0);
        }

        $series[] = [
            'date'   => $date,
            'day'    => $day,
            'total'  => $forms + $clicks,
            'forms'  => $forms,
            'clicks' => $clicks,
        ];
    }

    return $series;
}
