<?php
declare(strict_types=1);

/**
 * Einmal-Setup: Passwort und APP_SECRET in config.php schreiben.
 *
 * NACH ERFOLGREICHER EINRICHTUNG: Diese Datei BITTE LÖSCHEN.
 * Solange config.php bereits ein Passwort und einen APP_SECRET enthält,
 * wird dieses Skript verweigern, etwas zu überschreiben.
 */

ini_set('display_errors', '1');
error_reporting(E_ALL);

$configFile = __DIR__ . '/includes/config.php';
$exampleFile = __DIR__ . '/includes/config.example.php';

// If config.php exists and is fully populated, refuse.
$alreadyConfigured = false;
if (is_file($configFile)) {
    $contents = (string)file_get_contents($configFile);
    if (preg_match("/ADMIN_PASS_HASH\s*=\s*'(?!\s*'\s*;).+'\s*;/", $contents)
        && preg_match("/APP_SECRET\s*=\s*'(?!\s*'\s*;).+'\s*;/", $contents)) {
        $alreadyConfigured = true;
    }
}

$message = null;
$messageType = null;
$step = 'form';

if ($alreadyConfigured && empty($_GET['force'])) {
    $step = 'done';
}

if ($step === 'form' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $password = (string)($_POST['password'] ?? '');
    $passwordConfirm = (string)($_POST['password_confirm'] ?? '');
    $errors = [];

    if ((function_exists('mb_strlen') ? mb_strlen($password, 'UTF-8') : strlen($password)) < 12) {
        $errors[] = 'Das Passwort muss mindestens 12 Zeichen lang sein.';
    }
    if ($password !== $passwordConfirm) {
        $errors[] = 'Die beiden Passworteingaben stimmen nicht überein.';
    }
    $weakList = ['passwortpasswort', 'admin1234567', '123456789012', 'qwertzqwertz1', 'fahrschule12'];
    if (in_array(strtolower($password), $weakList, true)) {
        $errors[] = 'Bitte ein stärkeres Passwort wählen.';
    }

    if (!$errors) {
        $hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
        $secret = bin2hex(random_bytes(32));

        // Write config.php from template (or create from scratch)
        $template = is_file($exampleFile) ? (string)file_get_contents($exampleFile) : null;
        if (!$template) {
            $errors[] = 'Vorlage config.example.php nicht gefunden.';
        } else {
            $newConfig = preg_replace(
                ['/ADMIN_PASS_HASH\s*=\s*\'.*?\'\s*;/s', '/APP_SECRET\s*=\s*\'.*?\'\s*;/s'],
                ["ADMIN_PASS_HASH = '" . addslashes($hash) . "';", "APP_SECRET = '" . $secret . "';"],
                $template
            );
            if (file_put_contents($configFile, $newConfig) === false) {
                $errors[] = 'config.php konnte nicht geschrieben werden. Bitte Schreibrechte prüfen.';
            } else {
                @chmod($configFile, 0600);
                $step = 'success';
            }
        }
    }

    if ($errors) {
        $message = implode(' ', $errors);
        $messageType = 'error';
    }
}
?><!doctype html>
<html lang="de">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, nofollow">
    <title>Einrichtung · Fahrschule Nicolai Admin</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/admin.css">
</head>
<body class="admin-body admin-body--auth">
    <main class="admin-auth">
        <div class="admin-auth__card">
            <div class="admin-auth__brand">
                <span class="admin-nav__logo-mark">FN</span>
                <h1 class="admin-auth__title">Einrichtung</h1>
                <p class="admin-auth__subtitle">Initiales Admin-Passwort festlegen</p>
            </div>

            <?php if ($message): ?>
                <div class="admin-flash admin-flash--<?= htmlspecialchars($messageType, ENT_QUOTES) ?>">
                    <?= htmlspecialchars($message, ENT_QUOTES) ?>
                </div>
            <?php endif; ?>

            <?php if ($step === 'done'): ?>
                <div class="admin-flash admin-flash--info">
                    Die Einrichtung ist bereits abgeschlossen.
                    <strong>Bitte lösche jetzt die Datei <code>setup.php</code>.</strong>
                </div>
                <a href="index.php?p=login" class="admin-btn admin-btn--primary admin-btn--block">Zum Login</a>
            <?php elseif ($step === 'success'): ?>
                <div class="admin-flash admin-flash--success">
                    <strong>Einrichtung erfolgreich.</strong>
                </div>
                <ol class="admin-checklist">
                    <li>Passwort wurde sicher als Hash in <code>includes/config.php</code> gespeichert.</li>
                    <li><strong>Lösche jetzt die Datei <code>setup.php</code> per FTP.</strong> Sie wird nicht mehr benötigt und sollte aus Sicherheitsgründen nicht im Web bleiben.</li>
                    <li>Anschließend kannst du dich einloggen.</li>
                </ol>
                <a href="index.php?p=login" class="admin-btn admin-btn--primary admin-btn--block">Zum Login</a>
            <?php else: ?>
                <form method="post" class="admin-form">
                    <p class="admin-form__intro">
                        Wähle ein starkes Passwort (mindestens 12 Zeichen).
                        Es wird sicher als Hash gespeichert — wir können dir das Passwort später nicht mehr anzeigen.
                    </p>
                    <label class="admin-field">
                        <span class="admin-field__label">Passwort</span>
                        <input type="password" name="password" required minlength="12" autocomplete="new-password" class="admin-field__input">
                    </label>
                    <label class="admin-field">
                        <span class="admin-field__label">Passwort wiederholen</span>
                        <input type="password" name="password_confirm" required minlength="12" autocomplete="new-password" class="admin-field__input">
                    </label>
                    <button type="submit" class="admin-btn admin-btn--primary admin-btn--block">Passwort speichern</button>
                </form>
            <?php endif; ?>
        </div>
    </main>
</body>
</html>
