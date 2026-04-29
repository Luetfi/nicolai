<?php
/** @var ?string $error */
layoutBareHeader('Anmelden');
?>
<div class="admin-auth__card">
    <div class="admin-auth__brand">
        <span class="admin-nav__logo-mark">FN</span>
        <h1 class="admin-auth__title">Anmelden</h1>
        <p class="admin-auth__subtitle">Fahrschule Nicolai · Inhaltsverwaltung</p>
    </div>

    <?php if ($error): ?>
        <div class="admin-flash admin-flash--error" role="alert"><?= e($error) ?></div>
    <?php endif; ?>

    <form method="post" action="<?= e(adminUrl('login')) ?>" class="admin-form" autocomplete="off">
        <?= csrfField() ?>
        <label class="admin-field">
            <span class="admin-field__label">Passwort</span>
            <input
                type="password"
                name="password"
                required
                autofocus
                autocomplete="current-password"
                class="admin-field__input"
            >
        </label>
        <button type="submit" class="admin-btn admin-btn--primary admin-btn--block">Einloggen</button>
    </form>
</div>
<?php layoutBareFooter(); ?>
