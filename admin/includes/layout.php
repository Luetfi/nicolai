<?php
declare(strict_types=1);

/**
 * Render the branded admin shell.
 * Usage:
 *   layoutHeader('Dashboard');           // renders nav + opens main
 *   // ... page content ...
 *   layoutFooter();                       // closes main + footer
 *
 * For the login page (no nav), use layoutBare* variants.
 */

function layoutHeader(string $title, string $route = ''): void {
    $flash = flashGet();
    ?><!doctype html>
<html lang="de">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta name="robots" content="noindex, nofollow">
    <title><?= e($title) ?> · Fahrschule Nicolai Admin</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/admin.css">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
</head>
<body class="admin-body">
    <header class="admin-nav">
        <div class="admin-nav__inner">
            <a href="<?= e(adminUrl('dashboard')) ?>" class="admin-nav__brand">
                <span class="admin-nav__logo-mark">FN</span>
                <span class="admin-nav__brand-text">
                    <span class="admin-nav__brand-title">Fahrschule Nicolai</span>
                    <span class="admin-nav__brand-sub">Admin · Inhalte verwalten</span>
                </span>
            </a>
            <nav class="admin-nav__links">
                <a href="<?= e(adminUrl('dashboard')) ?>" class="admin-nav__link<?= $route === 'dashboard' ? ' is-active' : '' ?>">Übersicht</a>
                <a href="<?= e(adminUrl('asf')) ?>" class="admin-nav__link<?= $route === 'asf' ? ' is-active' : '' ?>">Aufbauseminar</a>
                <a href="<?= e(adminUrl('team')) ?>" class="admin-nav__link<?= str_starts_with($route, 'team') ? ' is-active' : '' ?>">Team</a>
                <a href="<?= e(adminUrl('theory')) ?>" class="admin-nav__link<?= str_starts_with($route, 'theory') ? ' is-active' : '' ?>">Theorie</a>
                <a href="<?= e(adminUrl('news')) ?>" class="admin-nav__link<?= str_starts_with($route, 'news') ? ' is-active' : '' ?>">Neuigkeiten</a>
            </nav>
            <form method="post" action="<?= e(adminUrl('logout')) ?>" class="admin-nav__logout">
                <?= csrfField() ?>
                <button type="submit" class="admin-btn admin-btn--ghost">Abmelden</button>
            </form>
        </div>
    </header>

    <main class="admin-main">
        <?php if ($flash): ?>
            <div class="admin-flash admin-flash--<?= e($flash['type']) ?>" role="status">
                <?= e($flash['message']) ?>
            </div>
        <?php endif; ?>
<?php
}

function layoutFooter(): void {
    ?>
    </main>
    <footer class="admin-footer">
        <span>Fahrschule Nicolai · Admin · <?= date('Y') ?></span>
        <span class="admin-footer__divider">·</span>
        <span>Eingeloggt seit <?= e(formatGermanDate(gmdate('c', $_SESSION['login_ts'] ?? time()))) ?></span>
    </footer>
    <script src="assets/admin.js" defer></script>
</body>
</html>
<?php
}

function layoutBareHeader(string $title): void {
    $flash = flashGet();
    ?><!doctype html>
<html lang="de">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta name="robots" content="noindex, nofollow">
    <title><?= e($title) ?> · Fahrschule Nicolai Admin</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/admin.css">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
</head>
<body class="admin-body admin-body--auth">
    <main class="admin-auth">
        <?php if ($flash): ?>
            <div class="admin-flash admin-flash--<?= e($flash['type']) ?>" role="status">
                <?= e($flash['message']) ?>
            </div>
        <?php endif; ?>
<?php
}

function layoutBareFooter(): void {
    ?>
    </main>
</body>
</html>
<?php
}
