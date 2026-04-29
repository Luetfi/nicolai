<?php
/** @var array $news */
/** @var array $items */
$categoryLabels = [
    'news' => 'Neuigkeit',
    'course' => 'Kurs',
    'info' => 'Information',
];
layoutHeader('Neuigkeiten', 'news');
?>
<section class="admin-section">
    <div class="admin-section__head admin-section__head--row">
        <div>
            <a class="admin-back" href="<?= e(adminUrl('dashboard')) ?>">← Übersicht</a>
            <h1 class="admin-h1">Neuigkeiten</h1>
            <p class="admin-section__lead"><?= count($items) ?> Einträge insgesamt</p>
        </div>
        <a href="<?= e(adminUrl('news_new')) ?>" class="admin-btn admin-btn--primary">+ Neuer Eintrag</a>
    </div>

    <?php if (empty($items)): ?>
        <div class="admin-empty">
            <h2>Noch keine Neuigkeiten</h2>
            <p>Lege den ersten Eintrag an.</p>
            <a href="<?= e(adminUrl('news_new')) ?>" class="admin-btn admin-btn--primary">+ Eintrag hinzufügen</a>
        </div>
    <?php else: ?>
        <div class="admin-list">
            <?php foreach ($items as $item): ?>
                <article class="admin-list__row admin-list__row--news">
                    <div class="admin-list__body admin-list__body--news">
                        <div class="admin-list__chips">
                            <span class="admin-chip admin-chip--<?= e($item['category'] ?? 'news') ?>">
                                <?= e($categoryLabels[$item['category'] ?? 'news'] ?? 'Neuigkeit') ?>
                            </span>
                            <span class="admin-chip admin-chip--neutral">
                                <?= e(date('d.m.Y', strtotime($item['date'] ?? 'now'))) ?>
                            </span>
                        </div>
                        <h3 class="admin-list__title"><?= e($item['title'] ?? '') ?></h3>
                        <p class="admin-list__desc"><?= e($item['summary'] ?? '') ?></p>
                    </div>
                    <div class="admin-list__actions">
                        <a href="<?= e(adminUrl('news_edit', ['id' => $item['id']])) ?>" class="admin-btn admin-btn--ghost">Bearbeiten</a>
                        <form method="post" action="<?= e(adminUrl('news_delete')) ?>" data-confirm="Eintrag <?= e($item['title'] ?? '') ?> löschen?">
                            <?= csrfField() ?>
                            <input type="hidden" name="id" value="<?= e($item['id']) ?>">
                            <button type="submit" class="admin-btn admin-btn--danger">Löschen</button>
                        </form>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</section>
<?php layoutFooter(); ?>
