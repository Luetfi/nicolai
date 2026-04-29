<?php
declare(strict_types=1);

/**
 * Fahrschule Nicolai · Admin Front-Controller
 */

// Strikte Fehlerbehandlung in Production: keine Anzeige, nur Logging
ini_set('display_errors', '0');
error_reporting(E_ALL);

$configFile = __DIR__ . '/includes/config.php';
if (!is_file($configFile)) {
    http_response_code(500);
    echo '<h1>Konfiguration fehlt</h1><p>Bitte zuerst <code>setup.php</code> aufrufen.</p>';
    exit;
}

require_once $configFile;
require_once __DIR__ . '/includes/helpers.php';
require_once __DIR__ . '/includes/csrf.php';
require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/json_store.php';
require_once __DIR__ . '/includes/upload.php';
require_once __DIR__ . '/includes/layout.php';

if (ADMIN_PASS_HASH === '' || APP_SECRET === '') {
    http_response_code(500);
    echo '<h1>Konfiguration unvollständig</h1><p>Bitte <code>setup.php</code> ausführen, um Passwort und APP_SECRET zu setzen.</p>';
    exit;
}

startSession();

// Security headers
header('X-Frame-Options: DENY');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: same-origin');
header('Strict-Transport-Security: max-age=31536000; includeSubDomains');

$route = $_GET['p'] ?? 'dashboard';
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

// ----- Login (public) -----
if ($route === 'login') {
    if (isAuthenticated()) {
        redirect(adminUrl('dashboard'));
    }
    $error = null;
    if ($method === 'POST') {
        csrfVerify();
        if (rateLimitBlocked()) {
            $error = 'Zu viele Fehlversuche. Bitte ' . ceil(rateLimitSecondsRemaining() / 60) . ' Minuten warten.';
        } else {
            $password = (string)($_POST['password'] ?? '');
            if (login($password)) {
                redirect(adminUrl('dashboard'));
            }
            $error = 'Falsches Passwort.';
        }
    }
    require __DIR__ . '/views/login.php';
    exit;
}

// ----- Logout -----
if ($route === 'logout') {
    if ($method === 'POST') {
        csrfVerify();
    }
    logout();
    redirect(adminUrl('login'));
}

// ----- Auth required from here on -----
requireAuth();

// ----- Route dispatch -----
switch ($route) {
    case 'dashboard':
        $asf = readJson('asf-course');
        $team = readJson('team');
        $news = readJson('news');
        $theory = readJson('theory-schedule');
        require __DIR__ . '/views/dashboard.php';
        break;

    case 'asf':
        if ($method === 'POST') {
            csrfVerify();
            $errors = handleAsfSave();
            if (empty($errors)) {
                flashSet('success', 'Aufbauseminar gespeichert.');
                redirect(adminUrl('asf'));
            }
        } else {
            $errors = [];
        }
        $course = readJson('asf-course');
        require __DIR__ . '/views/asf.php';
        break;

    case 'team':
        $team = readJson('team');
        $members = $team['members'] ?? [];
        require __DIR__ . '/views/team_list.php';
        break;

    case 'team_new':
    case 'team_edit':
        $editing = ($route === 'team_edit');
        $member = ['id' => '', 'name' => '', 'role' => '', 'description' => '', 'phone' => '', 'image' => ''];
        if ($editing) {
            $id = (string)($_GET['id'] ?? '');
            $team = readJson('team');
            foreach (($team['members'] ?? []) as $m) {
                if (($m['id'] ?? '') === $id) {
                    $member = $m + $member;
                    break;
                }
            }
            if ($member['id'] === '') {
                flashSet('error', 'Fahrlehrer nicht gefunden.');
                redirect(adminUrl('team'));
            }
        }
        $errors = [];
        if ($method === 'POST') {
            csrfVerify();
            $errors = handleTeamSave($editing);
            if (empty($errors)) {
                flashSet('success', $editing ? 'Fahrlehrer aktualisiert.' : 'Fahrlehrer hinzugefügt.');
                redirect(adminUrl('team'));
            }
            // Repopulate form on error
            $member = [
                'id' => (string)($_POST['id'] ?? ''),
                'name' => (string)($_POST['name'] ?? ''),
                'role' => (string)($_POST['role'] ?? ''),
                'description' => (string)($_POST['description'] ?? ''),
                'phone' => (string)($_POST['phone'] ?? ''),
                'image' => $member['image'] ?? '',
            ];
        }
        require __DIR__ . '/views/team_form.php';
        break;

    case 'team_delete':
        if ($method !== 'POST') {
            redirect(adminUrl('team'));
        }
        csrfVerify();
        $id = (string)($_POST['id'] ?? '');
        $team = readJson('team');
        $newMembers = [];
        $deletedImage = null;
        foreach (($team['members'] ?? []) as $m) {
            if (($m['id'] ?? '') === $id) {
                $deletedImage = $m['image'] ?? null;
                continue;
            }
            $newMembers[] = $m;
        }
        $team['members'] = $newMembers;
        writeJson('team', $team);
        deleteTeamImage($deletedImage);
        flashSet('success', 'Fahrlehrer gelöscht.');
        redirect(adminUrl('team'));

    case 'news':
        $news = readJson('news');
        $items = $news['items'] ?? [];
        // Sort by date desc for the list
        usort($items, function($a, $b) {
            return strcmp($b['date'] ?? '', $a['date'] ?? '');
        });
        require __DIR__ . '/views/news_list.php';
        break;

    case 'news_new':
    case 'news_edit':
        $editing = ($route === 'news_edit');
        $item = ['id' => '', 'title' => '', 'date' => date('Y-m-d'), 'summary' => '', 'category' => 'news'];
        if ($editing) {
            $id = (string)($_GET['id'] ?? '');
            $news = readJson('news');
            foreach (($news['items'] ?? []) as $n) {
                if (($n['id'] ?? '') === $id) {
                    $item = $n + $item;
                    break;
                }
            }
            if ($item['id'] === '') {
                flashSet('error', 'Neuigkeit nicht gefunden.');
                redirect(adminUrl('news'));
            }
        }
        $errors = [];
        if ($method === 'POST') {
            csrfVerify();
            $errors = handleNewsSave($editing);
            if (empty($errors)) {
                flashSet('success', $editing ? 'Eintrag aktualisiert.' : 'Eintrag hinzugefügt.');
                redirect(adminUrl('news'));
            }
            $item = [
                'id' => (string)($_POST['id'] ?? ''),
                'title' => (string)($_POST['title'] ?? ''),
                'date' => (string)($_POST['date'] ?? date('Y-m-d')),
                'summary' => (string)($_POST['summary'] ?? ''),
                'category' => (string)($_POST['category'] ?? 'news'),
            ];
        }
        require __DIR__ . '/views/news_form.php';
        break;

    case 'news_delete':
        if ($method !== 'POST') {
            redirect(adminUrl('news'));
        }
        csrfVerify();
        $id = (string)($_POST['id'] ?? '');
        $news = readJson('news');
        $newItems = [];
        foreach (($news['items'] ?? []) as $n) {
            if (($n['id'] ?? '') === $id) {
                continue;
            }
            $newItems[] = $n;
        }
        $news['items'] = $newItems;
        writeJson('news', $news);
        flashSet('success', 'Eintrag gelöscht.');
        redirect(adminUrl('news'));

    case 'theory':
        $theory = readJson('theory-schedule');
        $items = $theory['items'] ?? [];
        // Sort: upcoming first (asc by date+time), then past (desc)
        $today = date('Y-m-d');
        $upcoming = [];
        $past = [];
        foreach ($items as $it) {
            if (($it['date'] ?? '') >= $today) {
                $upcoming[] = $it;
            } else {
                $past[] = $it;
            }
        }
        usort($upcoming, function ($a, $b) {
            $cmp = strcmp($a['date'] ?? '', $b['date'] ?? '');
            return $cmp !== 0 ? $cmp : strcmp($a['startTime'] ?? '', $b['startTime'] ?? '');
        });
        usort($past, function ($a, $b) {
            $cmp = strcmp($b['date'] ?? '', $a['date'] ?? '');
            return $cmp !== 0 ? $cmp : strcmp($b['startTime'] ?? '', $a['startTime'] ?? '');
        });
        require __DIR__ . '/views/theory_list.php';
        break;

    case 'theory_new':
    case 'theory_edit':
        $editing = ($route === 'theory_edit');
        $lesson = [
            'id' => '',
            'date' => date('Y-m-d'),
            'startTime' => '18:30',
            'endTime' => '20:00',
            'locationId' => 'eglosheim',
            'topic' => '',
            'notes' => '',
        ];
        if ($editing) {
            $id = (string)($_GET['id'] ?? '');
            $theory = readJson('theory-schedule');
            foreach (($theory['items'] ?? []) as $t) {
                if (($t['id'] ?? '') === $id) {
                    $lesson = $t + $lesson;
                    break;
                }
            }
            if ($lesson['id'] === '') {
                flashSet('error', 'Termin nicht gefunden.');
                redirect(adminUrl('theory'));
            }
        }
        $errors = [];
        if ($method === 'POST') {
            csrfVerify();
            $errors = handleTheorySave($editing);
            if (empty($errors)) {
                flashSet('success', $editing ? 'Termin aktualisiert.' : 'Termin angelegt.');
                redirect(adminUrl('theory'));
            }
            $lesson = [
                'id' => (string)($_POST['id'] ?? ''),
                'date' => (string)($_POST['date'] ?? date('Y-m-d')),
                'startTime' => (string)($_POST['startTime'] ?? '18:30'),
                'endTime' => (string)($_POST['endTime'] ?? '20:00'),
                'locationId' => (string)($_POST['locationId'] ?? 'eglosheim'),
                'topic' => (string)($_POST['topic'] ?? ''),
                'notes' => (string)($_POST['notes'] ?? ''),
            ];
        }
        require __DIR__ . '/views/theory_form.php';
        break;

    case 'theory_delete':
        if ($method !== 'POST') {
            redirect(adminUrl('theory'));
        }
        csrfVerify();
        $id = (string)($_POST['id'] ?? '');
        $theory = readJson('theory-schedule');
        $newItems = [];
        foreach (($theory['items'] ?? []) as $t) {
            if (($t['id'] ?? '') === $id) {
                continue;
            }
            $newItems[] = $t;
        }
        $theory['items'] = $newItems;
        writeJson('theory-schedule', $theory);
        flashSet('success', 'Termin gelöscht.');
        redirect(adminUrl('theory'));

    default:
        http_response_code(404);
        layoutHeader('Nicht gefunden');
        echo '<div class="admin-empty"><h1>Seite nicht gefunden</h1><p>Diese Admin-Seite existiert nicht.</p></div>';
        layoutFooter();
        break;
}

// ----- POST handlers -----

/** @return string[] field-keyed error messages, empty on success */
function handleAsfSave(): array {
    $errors = [];
    $title = trim((string)($_POST['title'] ?? ''));
    $type = trim((string)($_POST['type'] ?? ''));
    $startDate = trim((string)($_POST['startDate'] ?? ''));
    $price = trim((string)($_POST['price'] ?? ''));
    $spotsAvailable = !empty($_POST['spotsAvailable']);
    $contactPhone = trim((string)($_POST['contactPhone'] ?? ''));
    $contactEmail = trim((string)($_POST['contactEmail'] ?? ''));

    if ($title === '') $errors['title'] = 'Titel ist erforderlich.';
    if ($type === '') $errors['type'] = 'Kursart ist erforderlich.';
    if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $startDate)) $errors['startDate'] = 'Datum im Format JJJJ-MM-TT.';
    if ($price === '') $errors['price'] = 'Preis ist erforderlich.';
    if ($contactPhone === '') $errors['contactPhone'] = 'Telefonnummer ist erforderlich.';
    if (!filter_var($contactEmail, FILTER_VALIDATE_EMAIL)) $errors['contactEmail'] = 'Gültige E-Mail-Adresse erforderlich.';

    if ($errors) return $errors;

    $data = [
        'id' => 'asf-next',
        'title' => $title,
        'type' => $type,
        'startDate' => $startDate,
        'price' => $price,
        'spotsAvailable' => $spotsAvailable,
        'contactPhone' => $contactPhone,
        'contactEmail' => $contactEmail,
    ];
    writeJson('asf-course', $data);
    return [];
}

/** @return string[] field-keyed error messages, empty on success */
function handleTeamSave(bool $editing): array {
    $errors = [];
    $id = trim((string)($_POST['id'] ?? ''));
    $name = trim((string)($_POST['name'] ?? ''));
    $role = trim((string)($_POST['role'] ?? ''));
    $description = trim((string)($_POST['description'] ?? ''));
    $phone = trim((string)($_POST['phone'] ?? ''));
    $deleteImage = !empty($_POST['delete_image']);

    if ($name === '') $errors['name'] = 'Name ist erforderlich.';
    if ($role === '') $errors['role'] = 'Funktion ist erforderlich.';

    $team = readJson('team');
    $members = $team['members'] ?? [];

    if (!$editing) {
        $baseId = slugify($name);
        $id = $baseId;
        $i = 2;
        $existing = array_column($members, 'id');
        while (in_array($id, $existing, true)) {
            $id = $baseId . '-' . $i++;
        }
    } else {
        if ($id === '' || !preg_match('/^[a-z0-9\-]+$/i', $id)) {
            $errors['id'] = 'Ungültige ID.';
        }
    }

    if ($errors) return $errors;

    // Find existing member to preserve image if no new upload
    $existingImage = null;
    if ($editing) {
        foreach ($members as $m) {
            if (($m['id'] ?? '') === $id) {
                $existingImage = $m['image'] ?? null;
                break;
            }
        }
    }

    $newImage = null;
    try {
        $newImage = handleTeamImageUpload('image', $name);
    } catch (RuntimeException $e) {
        $errors['image'] = $e->getMessage();
        return $errors;
    }

    $finalImage = $existingImage;
    if ($newImage !== null) {
        if ($existingImage) {
            deleteTeamImage($existingImage);
        }
        $finalImage = $newImage;
    } elseif ($deleteImage && $existingImage) {
        deleteTeamImage($existingImage);
        $finalImage = null;
    }

    $record = [
        'id' => $id,
        'name' => $name,
        'role' => $role,
        'description' => $description,
    ];
    if ($phone !== '') $record['phone'] = $phone;
    if ($finalImage) $record['image'] = $finalImage;

    if ($editing) {
        $found = false;
        foreach ($members as &$m) {
            if (($m['id'] ?? '') === $id) {
                $m = $record;
                $found = true;
                break;
            }
        }
        unset($m);
        if (!$found) {
            $errors['id'] = 'Fahrlehrer existiert nicht mehr.';
            return $errors;
        }
    } else {
        $members[] = $record;
    }

    $team['members'] = array_values($members);
    writeJson('team', $team);
    return [];
}

/** @return string[] field-keyed error messages, empty on success */
function handleNewsSave(bool $editing): array {
    $errors = [];
    $id = trim((string)($_POST['id'] ?? ''));
    $title = trim((string)($_POST['title'] ?? ''));
    $date = trim((string)($_POST['date'] ?? ''));
    $summary = trim((string)($_POST['summary'] ?? ''));
    $category = trim((string)($_POST['category'] ?? 'news'));

    $allowedCategories = ['news', 'course', 'info'];
    if (!in_array($category, $allowedCategories, true)) {
        $errors['category'] = 'Kategorie ungültig.';
    }
    if ($title === '') $errors['title'] = 'Titel ist erforderlich.';
    if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) $errors['date'] = 'Datum im Format JJJJ-MM-TT.';
    if ($summary === '') $errors['summary'] = 'Inhalt ist erforderlich.';
    if (strLength($summary) > 2000) $errors['summary'] = 'Maximal 2000 Zeichen.';

    $news = readJson('news');
    $items = $news['items'] ?? [];

    if (!$editing) {
        // Generate next numeric id
        $maxId = 0;
        foreach ($items as $it) {
            $n = (int)($it['id'] ?? 0);
            if ($n > $maxId) $maxId = $n;
        }
        $id = (string)($maxId + 1);
    } else {
        if ($id === '' || !preg_match('/^[a-z0-9\-]+$/i', $id)) {
            $errors['id'] = 'Ungültige ID.';
        }
    }

    if ($errors) return $errors;

    $record = [
        'id' => $id,
        'title' => $title,
        'date' => $date,
        'summary' => $summary,
        'category' => $category,
    ];

    if ($editing) {
        $found = false;
        foreach ($items as &$it) {
            if (($it['id'] ?? '') === $id) {
                $it = $record;
                $found = true;
                break;
            }
        }
        unset($it);
        if (!$found) {
            $errors['id'] = 'Eintrag existiert nicht mehr.';
            return $errors;
        }
    } else {
        $items[] = $record;
    }

    $news['items'] = array_values($items);
    writeJson('news', $news);
    return [];
}

/** @return string[] field-keyed error messages, empty on success */
function handleTheorySave(bool $editing): array {
    $errors = [];
    $id = trim((string)($_POST['id'] ?? ''));
    $date = trim((string)($_POST['date'] ?? ''));
    $startTime = trim((string)($_POST['startTime'] ?? ''));
    $endTime = trim((string)($_POST['endTime'] ?? ''));
    $locationId = trim((string)($_POST['locationId'] ?? ''));
    $topic = trim((string)($_POST['topic'] ?? ''));
    $notes = trim((string)($_POST['notes'] ?? ''));

    $allowedLocations = ['eglosheim', 'gruenbuehl'];
    if (!in_array($locationId, $allowedLocations, true)) {
        $errors['locationId'] = 'Standort ungültig.';
    }
    if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) {
        $errors['date'] = 'Datum im Format JJJJ-MM-TT.';
    }
    if (!preg_match('/^\d{2}:\d{2}$/', $startTime)) {
        $errors['startTime'] = 'Startzeit im Format HH:MM.';
    }
    if (!preg_match('/^\d{2}:\d{2}$/', $endTime)) {
        $errors['endTime'] = 'Endzeit im Format HH:MM.';
    }
    if (!isset($errors['startTime']) && !isset($errors['endTime']) && $endTime <= $startTime) {
        $errors['endTime'] = 'Endzeit muss nach Startzeit liegen.';
    }
    if (strLength($topic) > 200) $errors['topic'] = 'Thema maximal 200 Zeichen.';
    if (strLength($notes) > 500) $errors['notes'] = 'Notiz maximal 500 Zeichen.';

    $theory = readJson('theory-schedule');
    $items = $theory['items'] ?? [];

    if (!$editing) {
        $maxId = 0;
        foreach ($items as $it) {
            $n = (int)($it['id'] ?? 0);
            if ($n > $maxId) $maxId = $n;
        }
        $id = (string)($maxId + 1);
    } else {
        if ($id === '' || !preg_match('/^[a-z0-9\-]+$/i', $id)) {
            $errors['id'] = 'Ungültige ID.';
        }
    }

    if ($errors) return $errors;

    $record = [
        'id' => $id,
        'date' => $date,
        'startTime' => $startTime,
        'endTime' => $endTime,
        'locationId' => $locationId,
        'topic' => $topic,
        'notes' => $notes,
    ];

    if ($editing) {
        $found = false;
        foreach ($items as &$it) {
            if (($it['id'] ?? '') === $id) {
                $it = $record;
                $found = true;
                break;
            }
        }
        unset($it);
        if (!$found) {
            $errors['id'] = 'Termin existiert nicht mehr.';
            return $errors;
        }
    } else {
        $items[] = $record;
    }

    $theory['items'] = array_values($items);
    writeJson('theory-schedule', $theory);
    return [];
}
