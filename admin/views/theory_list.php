<?php
/** @var array $theory */
/** @var array $upcoming */
/** @var array $past */
$locationLabels = [
    'eglosheim' => 'Eglosheim',
    'gruenbuehl' => 'Grünbühl',
];

function formatTheoryDate(string $date): string {
    $weekdays = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
    $ts = strtotime($date);
    if ($ts === false) return $date;
    return $weekdays[(int)date('w', $ts)] . ', ' . date('d.m.Y', $ts);
}

layoutHeader('Theorie-Termine', 'theory');
?>
<section class="admin-section">
    <div class="admin-section__head admin-section__head--row">
        <div>
            <a class="admin-back" href="<?= e(adminUrl('dashboard')) ?>">← Übersicht</a>
            <h1 class="admin-h1">Theorie-Termine</h1>
            <p class="admin-section__lead">
                <?= count($upcoming) ?> kommende, <?= count($past) ?> vergangene Termine
            </p>
        </div>
        <a href="<?= e(adminUrl('theory_new')) ?>" class="admin-btn admin-btn--primary">+ Neuer Termin</a>
    </div>

    <?php if (empty($upcoming) && empty($past)): ?>
        <div class="admin-empty">
            <h2>Noch keine Termine</h2>
            <p>Lege den ersten Theorietermin an.</p>
            <a href="<?= e(adminUrl('theory_new')) ?>" class="admin-btn admin-btn--primary">+ Termin hinzufügen</a>
        </div>
    <?php else: ?>
        <?php if (!empty($upcoming)): ?>
            <h2 class="admin-section__lead" style="margin-top: 24px; font-family: var(--font-display); font-size: 22px; letter-spacing: 0.04em; color: var(--color-text); text-transform: uppercase;">Kommende Termine</h2>
            <div class="admin-list" style="margin-top: 12px;">
                <?php foreach ($upcoming as $t):
                    $locId = $t['locationId'] ?? 'eglosheim';
                    $chipClass = $locId === 'gruenbuehl' ? 'admin-chip--info' : 'admin-chip--neutral';
                ?>
                    <article class="admin-list__row admin-list__row--news">
                        <div class="admin-list__body admin-list__body--news">
                            <div class="admin-list__chips">
                                <span class="admin-chip admin-chip--neutral">
                                    <?= e(formatTheoryDate($t['date'] ?? '')) ?>
                                </span>
                                <span class="admin-chip admin-chip--neutral">
                                    <?= e(($t['startTime'] ?? '') . ' – ' . ($t['endTime'] ?? '')) ?>
                                </span>
                                <span class="admin-chip <?= $chipClass ?>">
                                    <?= e($locationLabels[$locId] ?? $locId) ?>
                                </span>
                            </div>
                            <h3 class="admin-list__title"><?= e($t['topic'] ?? 'Theorieunterricht') ?></h3>
                            <?php if (!empty($t['notes'])): ?>
                                <p class="admin-list__desc"><?= e($t['notes']) ?></p>
                            <?php endif; ?>
                        </div>
                        <div class="admin-list__actions">
                            <a href="<?= e(adminUrl('theory_edit', ['id' => $t['id']])) ?>" class="admin-btn admin-btn--ghost">Bearbeiten</a>
                            <form method="post" action="<?= e(adminUrl('theory_delete')) ?>" data-confirm="Termin am <?= e(formatTheoryDate($t['date'] ?? '')) ?> löschen?">
                                <?= csrfField() ?>
                                <input type="hidden" name="id" value="<?= e($t['id']) ?>">
                                <button type="submit" class="admin-btn admin-btn--danger">Löschen</button>
                            </form>
                        </div>
                    </article>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>

        <?php if (!empty($past)): ?>
            <details style="margin-top: 32px;">
                <summary style="cursor: pointer; padding: 12px 16px; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-size: 13px; font-weight: 600; color: var(--color-text-secondary); text-transform: uppercase; letter-spacing: 0.08em;">
                    Vergangene Termine anzeigen (<?= count($past) ?>)
                </summary>
                <div class="admin-list" style="margin-top: 12px; opacity: 0.7;">
                    <?php foreach ($past as $t):
                        $locId = $t['locationId'] ?? 'eglosheim';
                    ?>
                        <article class="admin-list__row admin-list__row--news">
                            <div class="admin-list__body admin-list__body--news">
                                <div class="admin-list__chips">
                                    <span class="admin-chip admin-chip--neutral">
                                        <?= e(formatTheoryDate($t['date'] ?? '')) ?>
                                    </span>
                                    <span class="admin-chip admin-chip--neutral">
                                        <?= e(($t['startTime'] ?? '') . ' – ' . ($t['endTime'] ?? '')) ?>
                                    </span>
                                    <span class="admin-chip admin-chip--neutral">
                                        <?= e($locationLabels[$locId] ?? $locId) ?>
                                    </span>
                                </div>
                                <h3 class="admin-list__title"><?= e($t['topic'] ?? 'Theorieunterricht') ?></h3>
                            </div>
                            <div class="admin-list__actions">
                                <form method="post" action="<?= e(adminUrl('theory_delete')) ?>" data-confirm="Vergangenen Termin endgültig löschen?">
                                    <?= csrfField() ?>
                                    <input type="hidden" name="id" value="<?= e($t['id']) ?>">
                                    <button type="submit" class="admin-btn admin-btn--danger">Löschen</button>
                                </form>
                            </div>
                        </article>
                    <?php endforeach; ?>
                </div>
            </details>
        <?php endif; ?>
    <?php endif; ?>
</section>
<?php layoutFooter(); ?>
