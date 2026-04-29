<?php
declare(strict_types=1);

/**
 * Initialise a hardened session.
 */
function startSession(): void {
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }
    $secure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => $secure,
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
    session_name(SESSION_NAME);
    session_start();
}

function isAuthenticated(): bool {
    if (empty($_SESSION['auth']) || empty($_SESSION['login_ts'])) {
        return false;
    }
    if (time() - (int)$_SESSION['login_ts'] > SESSION_IDLE_TIMEOUT) {
        logout();
        return false;
    }
    $_SESSION['login_ts'] = time();
    return true;
}

function requireAuth(): void {
    if (!isAuthenticated()) {
        redirect(adminUrl('login'));
    }
}

function login(string $password): bool {
    if (rateLimitBlocked()) {
        return false;
    }
    if (ADMIN_PASS_HASH === '' || !password_verify($password, ADMIN_PASS_HASH)) {
        rateLimitRecord(false);
        return false;
    }
    rateLimitRecord(true);
    session_regenerate_id(true);
    $_SESSION['auth'] = true;
    $_SESSION['login_ts'] = time();
    return true;
}

function logout(): void {
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'] ?? '', $params['secure'], $params['httponly']);
    }
    session_destroy();
}

/**
 * File-based login rate limiting. Per IP. Stores in /admin/data/.login-attempts.json.
 */
function rateLimitFile(): string {
    $dir = __DIR__ . '/../data';
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    return $dir . '/.login-attempts.json';
}

function rateLimitClientIp(): string {
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    return is_string($ip) ? $ip : 'unknown';
}

function rateLimitRead(): array {
    $file = rateLimitFile();
    if (!is_file($file)) {
        return [];
    }
    $raw = @file_get_contents($file);
    if ($raw === false || $raw === '') {
        return [];
    }
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function rateLimitWrite(array $data): void {
    $file = rateLimitFile();
    $fp = fopen($file, 'c+');
    if (!$fp) {
        return;
    }
    if (flock($fp, LOCK_EX)) {
        ftruncate($fp, 0);
        rewind($fp);
        fwrite($fp, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
        fflush($fp);
        flock($fp, LOCK_UN);
    }
    fclose($fp);
}

function rateLimitBlocked(): bool {
    $ip = rateLimitClientIp();
    $data = rateLimitRead();
    $entry = $data[$ip] ?? null;
    if (!$entry) {
        return false;
    }
    if (($entry['locked_until'] ?? 0) > time()) {
        return true;
    }
    return false;
}

function rateLimitRecord(bool $success): void {
    $ip = rateLimitClientIp();
    $data = rateLimitRead();
    $now = time();
    if ($success) {
        unset($data[$ip]);
        rateLimitWrite($data);
        return;
    }
    if (!isset($data[$ip]) || ($data[$ip]['window_start'] ?? 0) < $now - LOGIN_LOCKOUT_SECONDS) {
        $data[$ip] = ['count' => 1, 'window_start' => $now, 'locked_until' => 0];
    } else {
        $data[$ip]['count'] = ($data[$ip]['count'] ?? 0) + 1;
    }
    if (($data[$ip]['count'] ?? 0) >= LOGIN_MAX_ATTEMPTS) {
        $data[$ip]['locked_until'] = $now + LOGIN_LOCKOUT_SECONDS;
    }
    // Garbage-collect entries older than 1 day
    foreach ($data as $k => $v) {
        if (($v['locked_until'] ?? 0) < $now && ($v['window_start'] ?? 0) < $now - 86400) {
            unset($data[$k]);
        }
    }
    rateLimitWrite($data);
}

function rateLimitSecondsRemaining(): int {
    $ip = rateLimitClientIp();
    $data = rateLimitRead();
    $until = $data[$ip]['locked_until'] ?? 0;
    return max(0, $until - time());
}
