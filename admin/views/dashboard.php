<?php
/** @var array $asf */
/** @var array $team */
/** @var array $news */
/** @var array $theory */
$teamCount = count($team['members'] ?? []);
$newsCount = count($news['items'] ?? []);
$today = date('Y-m-d');
$upcomingTheoryCount = 0;
foreach (($theory['items'] ?? []) as $t) {
    if (($t['date'] ?? '') >= $today) {
        $upcomingTheoryCount++;
    }
}
layoutHeader('Übersicht', 'dashboard');
?>
<section class="admin-section">
    <div class="admin-section__head">
        <h1 class="admin-h1">Übersicht</h1>
        <p class="admin-section__lead">
            Verwalte hier die drei Inhaltsbereiche, die regelmäßig aktualisiert werden.
        </p>
    </div>

    <div class="admin-tiles">
        <a class="admin-tile" href="<?= e(adminUrl('asf')) ?>">
            <div class="admin-tile__head">
                <span class="admin-tile__eyebrow">Aufbauseminar</span>
                <span class="admin-tile__pill"><?= e($asf['type'] ?? 'ASF-Kurs') ?></span>
            </div>
            <h2 class="admin-tile__title"><?= e($asf['title'] ?? 'Aufbauseminar') ?></h2>
            <dl class="admin-tile__meta">
                <div><dt>Datum</dt><dd><?= e($asf['startDate'] ?? '—') ?></dd></div>
                <div><dt>Preis</dt><dd><?= e($asf['price'] ?? '—') ?></dd></div>
                <div><dt>Status</dt><dd><?= !empty($asf['spotsAvailable']) ? 'Plätze frei' : 'ausgebucht' ?></dd></div>
            </dl>
            <div class="admin-tile__foot">
                <span class="admin-tile__time">Geändert: <?= e(formatGermanDate($asf['_updated'] ?? null)) ?></span>
                <span class="admin-tile__cta">Bearbeiten →</span>
            </div>
        </a>

        <a class="admin-tile" href="<?= e(adminUrl('team')) ?>">
            <div class="admin-tile__head">
                <span class="admin-tile__eyebrow">Team</span>
                <span class="admin-tile__pill"><?= $teamCount ?> Personen</span>
            </div>
            <h2 class="admin-tile__title">Fahrlehrer verwalten</h2>
            <p class="admin-tile__desc">
                Personen hinzufügen, bearbeiten oder entfernen — inklusive Foto-Upload.
            </p>
            <div class="admin-tile__foot">
                <span class="admin-tile__time">Geändert: <?= e(formatGermanDate($team['_updated'] ?? null)) ?></span>
                <span class="admin-tile__cta">Öffnen →</span>
            </div>
        </a>

        <a class="admin-tile" href="<?= e(adminUrl('theory')) ?>">
            <div class="admin-tile__head">
                <span class="admin-tile__eyebrow">Theorie</span>
                <span class="admin-tile__pill"><?= $upcomingTheoryCount ?> kommende</span>
            </div>
            <h2 class="admin-tile__title">Theorietermine pflegen</h2>
            <p class="admin-tile__desc">
                Konkrete Termine mit Datum, Uhrzeit, Standort und Thema verwalten.
            </p>
            <div class="admin-tile__foot">
                <span class="admin-tile__time">Geändert: <?= e(formatGermanDate($theory['_updated'] ?? null)) ?></span>
                <span class="admin-tile__cta">Öffnen →</span>
            </div>
        </a>

        <a class="admin-tile" href="<?= e(adminUrl('news')) ?>">
            <div class="admin-tile__head">
                <span class="admin-tile__eyebrow">Neuigkeiten</span>
                <span class="admin-tile__pill"><?= $newsCount ?> Einträge</span>
            </div>
            <h2 class="admin-tile__title">Neuigkeiten pflegen</h2>
            <p class="admin-tile__desc">
                Neue Mitteilungen anlegen, bestehende bearbeiten oder löschen.
            </p>
            <div class="admin-tile__foot">
                <span class="admin-tile__time">Geändert: <?= e(formatGermanDate($news['_updated'] ?? null)) ?></span>
                <span class="admin-tile__cta">Öffnen →</span>
            </div>
        </a>
    </div>
</section>
<?php layoutFooter(); ?>
