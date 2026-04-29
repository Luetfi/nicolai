<?php
/** @var array $course */
/** @var array<string,string> $errors */
layoutHeader('Aufbauseminar', 'asf');
?>
<section class="admin-section">
    <div class="admin-section__head">
        <a class="admin-back" href="<?= e(adminUrl('dashboard')) ?>">← Übersicht</a>
        <h1 class="admin-h1">Aufbauseminar bearbeiten</h1>
        <p class="admin-section__lead">
            Diese Felder erscheinen direkt auf der Startseite im Block „Nächster Kurs".
        </p>
    </div>

    <form method="post" action="<?= e(adminUrl('asf')) ?>" class="admin-card admin-form">
        <?= csrfField() ?>

        <div class="admin-grid admin-grid--2">
            <label class="admin-field">
                <span class="admin-field__label">Titel</span>
                <input type="text" name="title" required value="<?= e($_POST['title'] ?? $course['title'] ?? 'Aufbauseminar') ?>" class="admin-field__input">
                <?php if (!empty($errors['title'])): ?><span class="admin-field__error"><?= e($errors['title']) ?></span><?php endif; ?>
            </label>

            <label class="admin-field">
                <span class="admin-field__label">Kursart</span>
                <input type="text" name="type" required value="<?= e($_POST['type'] ?? $course['type'] ?? 'ASF-Kurs') ?>" class="admin-field__input">
                <?php if (!empty($errors['type'])): ?><span class="admin-field__error"><?= e($errors['type']) ?></span><?php endif; ?>
            </label>

            <label class="admin-field">
                <span class="admin-field__label">Startdatum</span>
                <input type="date" name="startDate" required value="<?= e($_POST['startDate'] ?? $course['startDate'] ?? '') ?>" class="admin-field__input">
                <?php if (!empty($errors['startDate'])): ?><span class="admin-field__error"><?= e($errors['startDate']) ?></span><?php endif; ?>
            </label>

            <label class="admin-field">
                <span class="admin-field__label">Preis</span>
                <input type="text" name="price" required value="<?= e($_POST['price'] ?? $course['price'] ?? '') ?>" placeholder="z.B. 330,- Euro" class="admin-field__input">
                <?php if (!empty($errors['price'])): ?><span class="admin-field__error"><?= e($errors['price']) ?></span><?php endif; ?>
            </label>

            <label class="admin-field">
                <span class="admin-field__label">Telefon (Kontakt)</span>
                <input type="text" name="contactPhone" required value="<?= e($_POST['contactPhone'] ?? $course['contactPhone'] ?? '') ?>" class="admin-field__input">
                <?php if (!empty($errors['contactPhone'])): ?><span class="admin-field__error"><?= e($errors['contactPhone']) ?></span><?php endif; ?>
            </label>

            <label class="admin-field">
                <span class="admin-field__label">E-Mail (Kontakt)</span>
                <input type="email" name="contactEmail" required value="<?= e($_POST['contactEmail'] ?? $course['contactEmail'] ?? '') ?>" class="admin-field__input">
                <?php if (!empty($errors['contactEmail'])): ?><span class="admin-field__error"><?= e($errors['contactEmail']) ?></span><?php endif; ?>
            </label>
        </div>

        <label class="admin-toggle">
            <?php
            $spotsChecked = isset($_POST['spotsAvailable'])
                ? !empty($_POST['spotsAvailable'])
                : !empty($course['spotsAvailable']);
            ?>
            <input type="checkbox" name="spotsAvailable" value="1" <?= $spotsChecked ? 'checked' : '' ?>>
            <span class="admin-toggle__track"></span>
            <span class="admin-toggle__label">Plätze frei (zeigt das grüne „Plätze frei"-Label auf der Webseite)</span>
        </label>

        <div class="admin-form__actions">
            <button type="submit" class="admin-btn admin-btn--primary">Speichern</button>
            <a href="<?= e(adminUrl('dashboard')) ?>" class="admin-btn admin-btn--ghost">Abbrechen</a>
        </div>
    </form>
</section>
<?php layoutFooter(); ?>
