<?php
/** @var array $team */
/** @var array $members */
layoutHeader('Team', 'team');
?>
<section class="admin-section">
    <div class="admin-section__head admin-section__head--row">
        <div>
            <a class="admin-back" href="<?= e(adminUrl('dashboard')) ?>">← Übersicht</a>
            <h1 class="admin-h1">Fahrlehrer</h1>
            <p class="admin-section__lead"><?= count($members) ?> Personen im Team</p>
        </div>
        <a href="<?= e(adminUrl('team_new')) ?>" class="admin-btn admin-btn--primary">+ Neuer Fahrlehrer</a>
    </div>

    <?php if (empty($members)): ?>
        <div class="admin-empty">
            <h2>Noch keine Fahrlehrer</h2>
            <p>Lege den ersten Fahrlehrer an.</p>
            <a href="<?= e(adminUrl('team_new')) ?>" class="admin-btn admin-btn--primary">+ Fahrlehrer hinzufügen</a>
        </div>
    <?php else: ?>
        <div class="admin-list">
            <?php foreach ($members as $m): ?>
                <article class="admin-list__row">
                    <div class="admin-list__media">
                        <?php if (!empty($m['image'])): ?>
                            <img src="<?= e($m['image']) ?>" alt="<?= e($m['name']) ?>">
                        <?php else: ?>
                            <span class="admin-list__media-placeholder">Foto folgt</span>
                        <?php endif; ?>
                    </div>
                    <div class="admin-list__body">
                        <h3 class="admin-list__title"><?= e($m['name'] ?? '') ?></h3>
                        <p class="admin-list__meta"><?= e($m['role'] ?? '') ?></p>
                        <?php if (!empty($m['description'])): ?>
                            <p class="admin-list__desc"><?= e($m['description']) ?></p>
                        <?php endif; ?>
                        <?php if (!empty($m['phone'])): ?>
                            <p class="admin-list__phone"><?= e($m['phone']) ?></p>
                        <?php endif; ?>
                    </div>
                    <div class="admin-list__actions">
                        <a href="<?= e(adminUrl('team_edit', ['id' => $m['id']])) ?>" class="admin-btn admin-btn--ghost">Bearbeiten</a>
                        <form method="post" action="<?= e(adminUrl('team_delete')) ?>" data-confirm="<?= e($m['name'] ?? '') ?> wirklich löschen?">
                            <?= csrfField() ?>
                            <input type="hidden" name="id" value="<?= e($m['id']) ?>">
                            <button type="submit" class="admin-btn admin-btn--danger">Löschen</button>
                        </form>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</section>
<?php layoutFooter(); ?>
