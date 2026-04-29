<?php
/** @var bool $editing */
/** @var array $member */
/** @var array<string,string> $errors */
layoutHeader($editing ? 'Fahrlehrer bearbeiten' : 'Fahrlehrer hinzufügen', 'team');
?>
<section class="admin-section">
    <div class="admin-section__head">
        <a class="admin-back" href="<?= e(adminUrl('team')) ?>">← Team</a>
        <h1 class="admin-h1"><?= $editing ? 'Fahrlehrer bearbeiten' : 'Neuer Fahrlehrer' ?></h1>
    </div>

    <form method="post" enctype="multipart/form-data" action="<?= e(adminUrl($editing ? 'team_edit' : 'team_new', $editing ? ['id' => $member['id']] : [])) ?>" class="admin-card admin-form">
        <?= csrfField() ?>
        <?php if ($editing): ?>
            <input type="hidden" name="id" value="<?= e($member['id']) ?>">
        <?php endif; ?>

        <div class="admin-grid admin-grid--2">
            <label class="admin-field">
                <span class="admin-field__label">Name</span>
                <input type="text" name="name" required value="<?= e($member['name']) ?>" class="admin-field__input">
                <?php if (!empty($errors['name'])): ?><span class="admin-field__error"><?= e($errors['name']) ?></span><?php endif; ?>
            </label>

            <label class="admin-field">
                <span class="admin-field__label">Funktion / Rolle</span>
                <input type="text" name="role" required value="<?= e($member['role']) ?>" placeholder="z.B. Fahrlehrer der Klassen B/BE" class="admin-field__input">
                <?php if (!empty($errors['role'])): ?><span class="admin-field__error"><?= e($errors['role']) ?></span><?php endif; ?>
            </label>

            <label class="admin-field admin-field--full">
                <span class="admin-field__label">Beschreibung</span>
                <textarea name="description" rows="4" class="admin-field__input" placeholder="z.B. „Seit 1999 in der Fahrausbildung tätig. Moderatorin ASF und FES."><?= e($member['description']) ?></textarea>
            </label>

            <label class="admin-field">
                <span class="admin-field__label">Telefon (optional)</span>
                <input type="text" name="phone" value="<?= e($member['phone']) ?>" placeholder="z.B. 0170 / 21 38 547" class="admin-field__input">
            </label>
        </div>

        <div class="admin-uploader">
            <span class="admin-field__label">Foto</span>
            <?php if (!empty($member['image'])): ?>
                <div class="admin-uploader__current">
                    <img src="<?= e($member['image']) ?>" alt="Aktuelles Foto" class="admin-uploader__preview" data-current>
                    <label class="admin-uploader__delete">
                        <input type="checkbox" name="delete_image" value="1">
                        <span>Aktuelles Foto entfernen</span>
                    </label>
                </div>
            <?php endif; ?>
            <label class="admin-uploader__drop">
                <input type="file" name="image" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" data-image-input>
                <span class="admin-uploader__drop-label">
                    <strong>Bild auswählen</strong>
                    <span>JPG, PNG oder WebP · max. 5 MB</span>
                </span>
            </label>
            <img alt="Vorschau" class="admin-uploader__preview admin-uploader__preview--new" data-image-preview hidden>
            <?php if (!empty($errors['image'])): ?>
                <span class="admin-field__error"><?= e($errors['image']) ?></span>
            <?php endif; ?>
        </div>

        <div class="admin-form__actions">
            <button type="submit" class="admin-btn admin-btn--primary"><?= $editing ? 'Änderungen speichern' : 'Fahrlehrer anlegen' ?></button>
            <a href="<?= e(adminUrl('team')) ?>" class="admin-btn admin-btn--ghost">Abbrechen</a>
        </div>
    </form>
</section>
<?php layoutFooter(); ?>
