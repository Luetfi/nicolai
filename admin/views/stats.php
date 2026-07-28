<?php
/**
 * Anfragen-Auswertung: ein Monat im Vergleich zum Vormonat.
 *
 * @var string $month      angezeigter Monat (YYYY-MM)
 * @var string[] $months   auswählbare Monate (neuester zuerst)
 * @var array $stats       Zahlen des angezeigten Monats
 * @var string $prevMonth  Vormonat (YYYY-MM)
 * @var array $prevStats   Zahlen des Vormonats
 */
$labels = statsEventLabels();
$contactTotal = statsContactTotal($stats);
$contactTotalPrev = statsContactTotal($prevStats);
$totalDelta = statsDelta($contactTotal, $contactTotalPrev);

$series = statsDailySeries($stats);
$maxDay = 0;
foreach ($series as $row) {
    if ($row['total'] > $maxDay) {
        $maxDay = $row['total'];
    }
}

$isCurrentMonth = ($month === statsCurrentMonth());

layoutHeader('Anfragen', 'stats');
?>
<section class="admin-section">
    <div class="admin-section__head">
        <h1 class="admin-h1">Anfragen</h1>
        <p class="admin-section__lead">
            Wie viele Kontaktaufnahmen über die Website kommen — pro Kalendermonat gezählt,
            mit Vergleich zum Vormonat. Jeder Monat wird dauerhaft aufbewahrt.
        </p>
    </div>

    <form method="get" action="index.php" class="admin-stats__toolbar">
        <input type="hidden" name="p" value="stats">
        <label class="admin-stats__toolbar-label" for="statsMonth">Monat</label>
        <select id="statsMonth" name="m" class="admin-field__input admin-field__select admin-stats__select">
            <?php foreach ($months as $option): ?>
                <option value="<?= e($option) ?>"<?= $option === $month ? ' selected' : '' ?>>
                    <?= e(statsMonthLabel($option)) ?>
                </option>
            <?php endforeach; ?>
        </select>
        <button type="submit" class="admin-btn admin-btn--primary">Anzeigen</button>
        <span class="admin-stats__toolbar-spacer"></span>
        <a class="admin-btn admin-btn--ghost" href="<?= e(adminUrl('stats_csv', ['m' => $month])) ?>">
            CSV: <?= e(statsMonthLabel($month)) ?>
        </a>
        <a class="admin-btn admin-btn--ghost" href="<?= e(adminUrl('stats_csv', ['all' => 1])) ?>">
            CSV: alle Monate
        </a>
    </form>

    <?php if (!$stats['exists']): ?>
        <div class="admin-card admin-stats__empty">
            <h2 class="admin-stats__empty-title">Noch keine Daten für <?= e(statsMonthLabel($month)) ?></h2>
            <p>
                <?php if ($isCurrentMonth): ?>
                    In diesem Monat ist bisher keine Anfrage eingegangen und es wurde noch nicht auf
                    Telefon, WhatsApp oder E-Mail geklickt. Sobald das passiert, erscheinen die Zahlen hier.
                <?php else: ?>
                    Für diesen Monat wurde nichts aufgezeichnet.
                <?php endif; ?>
            </p>
        </div>
    <?php endif; ?>

    <div class="admin-stats__hero">
        <div class="admin-stats__hero-main">
            <span class="admin-stats__hero-eyebrow">Kontaktaufnahmen · <?= e(statsMonthLabel($month)) ?></span>
            <span class="admin-stats__hero-value"><?= $contactTotal ?></span>
            <span class="admin-stats__delta admin-stats__delta--<?= e($totalDelta['direction']) ?>">
                <?= e($totalDelta['label']) ?>
            </span>
            <span class="admin-stats__hero-note">
                Vormonat (<?= e(statsMonthLabel($prevMonth)) ?>): <?= $contactTotalPrev ?>
            </span>
        </div>
        <dl class="admin-stats__hero-side">
            <div>
                <dt>Formulare abgesendet</dt>
                <dd><?= statsFormTotal($stats) ?></dd>
            </div>
            <div>
                <dt>Erstes Ereignis</dt>
                <dd><?= e($stats['firstEvent'] ? formatGermanDate($stats['firstEvent']) : '—') ?></dd>
            </div>
            <div>
                <dt>Letztes Ereignis</dt>
                <dd><?= e($stats['lastEvent'] ? formatGermanDate($stats['lastEvent']) : '—') ?></dd>
            </div>
        </dl>
    </div>

    <div class="admin-stats__grid">
        <?php foreach ($labels as $event => $label): ?>
            <?php
            $value = (int) $stats['totals'][$event];
            $prevValue = (int) $prevStats['totals'][$event];
            $delta = statsDelta($value, $prevValue);
            $isForm = in_array($event, STATS_FORM_EVENTS, true);
            ?>
            <div class="admin-stats__card<?= $isForm ? ' admin-stats__card--form' : '' ?>">
                <span class="admin-stats__card-label"><?= e($label) ?></span>
                <span class="admin-stats__card-value"><?= $value ?></span>
                <span class="admin-stats__delta admin-stats__delta--<?= e($delta['direction']) ?>">
                    <?= e($delta['label']) ?>
                </span>
                <span class="admin-stats__card-prev">Vormonat: <?= $prevValue ?></span>
            </div>
        <?php endforeach; ?>
    </div>

    <?php if ($stats['byClass'] || $stats['byLocation']): ?>
        <div class="admin-stats__breakdown">
            <?php
            $breakdowns = [
                ['title' => 'Anmeldungen nach Klasse', 'data' => $stats['byClass']],
                ['title' => 'Anmeldungen nach Standort', 'data' => $stats['byLocation']],
            ];
            foreach ($breakdowns as $block):
                if (!$block['data']) {
                    continue;
                }
                $blockMax = max($block['data']);
                ?>
                <div class="admin-card admin-stats__panel">
                    <h2 class="admin-stats__panel-title"><?= e($block['title']) ?></h2>
                    <ul class="admin-stats__rows">
                        <?php foreach ($block['data'] as $key => $count): ?>
                            <li class="admin-stats__row">
                                <span class="admin-stats__row-key"><?= e((string) $key) ?></span>
                                <span class="admin-stats__row-track">
                                    <span class="admin-stats__row-bar" style="width: <?= $blockMax > 0 ? (int) round($count / $blockMax * 100) : 0 ?>%"></span>
                                </span>
                                <span class="admin-stats__row-value"><?= (int) $count ?></span>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>

    <?php if ($maxDay > 0): ?>
        <div class="admin-card admin-stats__panel">
            <div class="admin-stats__panel-head">
                <h2 class="admin-stats__panel-title">Tagesverlauf</h2>
                <div class="admin-stats__legend">
                    <span class="admin-stats__legend-item admin-stats__legend-item--forms">Formulare</span>
                    <span class="admin-stats__legend-item admin-stats__legend-item--clicks">Klicks</span>
                </div>
            </div>
            <ul class="admin-stats__days">
                <?php foreach ($series as $row): ?>
                    <li class="admin-stats__day<?= $row['total'] === 0 ? ' is-empty' : '' ?>"
                        title="<?= e(date('d.m.Y', (int) strtotime($row['date']))) ?>: <?= $row['forms'] ?> Formulare, <?= $row['clicks'] ?> Klicks">
                        <span class="admin-stats__day-track">
                            <?php if ($row['forms'] > 0): ?>
                                <span class="admin-stats__day-bar admin-stats__day-bar--forms"
                                      style="height: <?= (int) round($row['forms'] / $maxDay * 100) ?>%"></span>
                            <?php endif; ?>
                            <?php if ($row['clicks'] > 0): ?>
                                <span class="admin-stats__day-bar admin-stats__day-bar--clicks"
                                      style="height: <?= (int) round($row['clicks'] / $maxDay * 100) ?>%"></span>
                            <?php endif; ?>
                        </span>
                        <span class="admin-stats__day-label"><?= $row['day'] ?></span>
                    </li>
                <?php endforeach; ?>
            </ul>
        </div>
    <?php endif; ?>

    <div class="admin-card admin-stats__note">
        <h2 class="admin-stats__panel-title">Was diese Zahlen bedeuten</h2>
        <ul class="admin-stats__notes">
            <li><strong>Anfragen / Anmeldungen</strong> = tatsächlich abgesendete Formulare. Erkannter
                Spam und fehlgeschlagene Sendungen werden nicht gezählt — die Zahl entspricht also
                genau den Mails im Postfach.</li>
            <li><strong>Klicks</strong> = Klicks auf Telefonnummer, WhatsApp oder E-Mail-Adresse auf der
                Website. Ob daraus ein Telefonat wurde, lässt sich technisch nicht messen — die Zahl
                ist ein Anhaltspunkt, keine Zahl der Gespräche. Anrufe über Google Maps siehst du im
                Google-Unternehmensprofil.</li>
            <li>Gezählt wird nach deutscher Zeit. Am 1. jedes Monats beginnt die Zählung bei 0, alte
                Monate bleiben über die Auswahl oben abrufbar.</li>
            <li>Es werden ausschließlich Summen gespeichert — keine Namen, E-Mail-Adressen,
                Telefonnummern oder IP-Adressen.</li>
        </ul>
    </div>
</section>
<?php layoutFooter(); ?>
