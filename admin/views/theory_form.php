<?php
/** @var bool $editing */
/** @var array $lesson */
/** @var array<string,string> $errors */
layoutHeader($editing ? 'Termin bearbeiten' : 'Neuer Termin', 'theory');
?>
<section class="admin-section">
    <div class="admin-section__head">
        <a class="admin-back" href="<?= e(adminUrl('theory')) ?>">← Theorie-Termine</a>
        <h1 class="admin-h1"><?= $editing ? 'Termin bearbeiten' : 'Neuer Termin' ?></h1>
        <p class="admin-section__lead">
            Termine erscheinen automatisch auf der Theorieunterricht-Seite, sortiert nach Datum.
            Vergangene Termine werden auf der Webseite ausgeblendet.
        </p>
    </div>

    <form method="post" action="<?= e(adminUrl($editing ? 'theory_edit' : 'theory_new', $editing ? ['id' => $lesson['id']] : [])) ?>" class="admin-card admin-form">
        <?= csrfField() ?>
        <?php if ($editing): ?>
            <input type="hidden" name="id" value="<?= e($lesson['id']) ?>">
        <?php endif; ?>

        <div class="admin-grid admin-grid--2">
            <label class="admin-field">
                <span class="admin-field__label">Datum</span>
                <input type="date" name="date" required value="<?= e($lesson['date']) ?>" class="admin-field__input">
                <?php if (!empty($errors['date'])): ?><span class="admin-field__error"><?= e($errors['date']) ?></span><?php endif; ?>
            </label>

            <label class="admin-field">
                <span class="admin-field__label">Standort</span>
                <select name="locationId" required class="admin-field__input admin-field__select">
                    <?php foreach (['eglosheim' => 'Standort Eglosheim', 'gruenbuehl' => 'Standort Grünbühl'] as $val => $label): ?>
                        <option value="<?= e($val) ?>" <?= ($lesson['locationId'] ?? 'eglosheim') === $val ? 'selected' : '' ?>><?= e($label) ?></option>
                    <?php endforeach; ?>
                </select>
                <?php if (!empty($errors['locationId'])): ?><span class="admin-field__error"><?= e($errors['locationId']) ?></span><?php endif; ?>
            </label>

            <label class="admin-field">
                <span class="admin-field__label">Startzeit</span>
                <input type="time" name="startTime" required value="<?= e($lesson['startTime']) ?>" class="admin-field__input">
                <?php if (!empty($errors['startTime'])): ?><span class="admin-field__error"><?= e($errors['startTime']) ?></span><?php endif; ?>
            </label>

            <label class="admin-field">
                <span class="admin-field__label">Endzeit</span>
                <input type="time" name="endTime" required value="<?= e($lesson['endTime']) ?>" class="admin-field__input">
                <?php if (!empty($errors['endTime'])): ?><span class="admin-field__error"><?= e($errors['endTime']) ?></span><?php endif; ?>
            </label>

            <label class="admin-field admin-field--full">
                <span class="admin-field__label">Thema (optional)</span>
                <input type="text" name="topic" maxlength="200" value="<?= e($lesson['topic']) ?>" placeholder="z.B. Modul 5 — Vorfahrt und Verkehrsregelungen" class="admin-field__input">
                <?php if (!empty($errors['topic'])): ?><span class="admin-field__error"><?= e($errors['topic']) ?></span><?php endif; ?>
            </label>

            <label class="admin-field admin-field--full">
                <span class="admin-field__label">Hinweis (optional)</span>
                <textarea name="notes" rows="3" maxlength="500" class="admin-field__input" placeholder="z.B. Klassenspezifischer Unterricht PKW im Anschluss"><?= e($lesson['notes']) ?></textarea>
                <?php if (!empty($errors['notes'])): ?><span class="admin-field__error"><?= e($errors['notes']) ?></span><?php endif; ?>
            </label>
        </div>

        <div class="admin-form__actions">
            <button type="submit" class="admin-btn admin-btn--primary"><?= $editing ? 'Änderungen speichern' : 'Termin anlegen' ?></button>
            <a href="<?= e(adminUrl('theory')) ?>" class="admin-btn admin-btn--ghost">Abbrechen</a>
        </div>
    </form>
</section>
<?php layoutFooter(); ?>
