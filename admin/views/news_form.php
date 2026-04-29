<?php
/** @var bool $editing */
/** @var array $item */
/** @var array<string,string> $errors */
layoutHeader($editing ? 'Eintrag bearbeiten' : 'Neuer Eintrag', 'news');
?>
<section class="admin-section">
    <div class="admin-section__head">
        <a class="admin-back" href="<?= e(adminUrl('news')) ?>">← Neuigkeiten</a>
        <h1 class="admin-h1"><?= $editing ? 'Eintrag bearbeiten' : 'Neuer Eintrag' ?></h1>
    </div>

    <form method="post" action="<?= e(adminUrl($editing ? 'news_edit' : 'news_new', $editing ? ['id' => $item['id']] : [])) ?>" class="admin-card admin-form">
        <?= csrfField() ?>
        <?php if ($editing): ?>
            <input type="hidden" name="id" value="<?= e($item['id']) ?>">
        <?php endif; ?>

        <div class="admin-grid admin-grid--2">
            <label class="admin-field admin-field--full">
                <span class="admin-field__label">Titel</span>
                <input type="text" name="title" required value="<?= e($item['title']) ?>" class="admin-field__input">
                <?php if (!empty($errors['title'])): ?><span class="admin-field__error"><?= e($errors['title']) ?></span><?php endif; ?>
            </label>

            <label class="admin-field">
                <span class="admin-field__label">Datum</span>
                <input type="date" name="date" required value="<?= e($item['date']) ?>" class="admin-field__input">
                <?php if (!empty($errors['date'])): ?><span class="admin-field__error"><?= e($errors['date']) ?></span><?php endif; ?>
            </label>

            <label class="admin-field">
                <span class="admin-field__label">Kategorie</span>
                <select name="category" required class="admin-field__input admin-field__select">
                    <?php foreach (['news' => 'Neuigkeit', 'course' => 'Kurs', 'info' => 'Information'] as $val => $label): ?>
                        <option value="<?= e($val) ?>" <?= ($item['category'] ?? 'news') === $val ? 'selected' : '' ?>><?= e($label) ?></option>
                    <?php endforeach; ?>
                </select>
                <?php if (!empty($errors['category'])): ?><span class="admin-field__error"><?= e($errors['category']) ?></span><?php endif; ?>
            </label>

            <label class="admin-field admin-field--full">
                <span class="admin-field__label">Inhalt</span>
                <textarea name="summary" rows="6" required maxlength="2000" class="admin-field__input"><?= e($item['summary']) ?></textarea>
                <?php if (!empty($errors['summary'])): ?><span class="admin-field__error"><?= e($errors['summary']) ?></span><?php endif; ?>
            </label>
        </div>

        <div class="admin-form__actions">
            <button type="submit" class="admin-btn admin-btn--primary"><?= $editing ? 'Änderungen speichern' : 'Eintrag anlegen' ?></button>
            <a href="<?= e(adminUrl('news')) ?>" class="admin-btn admin-btn--ghost">Abbrechen</a>
        </div>
    </form>
</section>
<?php layoutFooter(); ?>
