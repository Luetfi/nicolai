<?php
declare(strict_types=1);

/**
 * Image-Upload mit strikter Validierung.
 *
 * Returns: relative URL (e.g. "/images/team/roland-1714382734.jpg") or null on no upload.
 * Throws RuntimeException on validation failure.
 */
function handleTeamImageUpload(string $field, string $slug): ?string {
    if (!isset($_FILES[$field]) || ($_FILES[$field]['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) {
        return null;
    }

    $file = $_FILES[$field];
    if ($file['error'] !== UPLOAD_ERR_OK) {
        throw new RuntimeException('Fehler beim Upload (Code ' . $file['error'] . ')');
    }
    if (!is_uploaded_file($file['tmp_name'])) {
        throw new RuntimeException('Verdächtige Datei abgelehnt.');
    }
    if ($file['size'] > 5 * 1024 * 1024) {
        throw new RuntimeException('Bild ist größer als 5 MB.');
    }

    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $allowedExt = ['jpg', 'jpeg', 'png', 'webp'];
    if (!in_array($ext, $allowedExt, true)) {
        throw new RuntimeException('Erlaubte Bildformate: JPG, PNG, WebP');
    }

    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mime = $finfo->file($file['tmp_name']);
    $allowedMime = ['image/jpeg', 'image/png', 'image/webp'];
    if (!in_array($mime, $allowedMime, true)) {
        throw new RuntimeException('Datei ist kein gültiges Bild (MIME: ' . $mime . ')');
    }

    $imageInfo = @getimagesize($file['tmp_name']);
    if (!$imageInfo || !isset($imageInfo[0], $imageInfo[1])) {
        throw new RuntimeException('Bild ist beschädigt oder kein echtes Bild.');
    }

    $destDir = imagesTeamDir();
    if (!is_dir($destDir)) {
        if (!mkdir($destDir, 0755, true) && !is_dir($destDir)) {
            throw new RuntimeException('Bild-Ordner konnte nicht angelegt werden.');
        }
    }

    $cleanSlug = slugify($slug !== '' ? $slug : 'team');
    $cleanExt = $ext === 'jpeg' ? 'jpg' : $ext;
    $filename = $cleanSlug . '-' . time() . '.' . $cleanExt;
    $filename = basename($filename);
    $destPath = $destDir . DIRECTORY_SEPARATOR . $filename;

    if (!move_uploaded_file($file['tmp_name'], $destPath)) {
        throw new RuntimeException('Bild konnte nicht gespeichert werden.');
    }
    @chmod($destPath, 0644);

    return imagesTeamUrl() . '/' . $filename;
}

/**
 * Delete a team image given its relative URL ("/images/team/foo.jpg").
 * Safe: only deletes inside the team images dir.
 */
function deleteTeamImage(?string $relativeUrl): void {
    if (!$relativeUrl) {
        return;
    }
    $prefix = imagesTeamUrl() . '/';
    if (strncmp($relativeUrl, $prefix, strlen($prefix)) !== 0) {
        return;
    }
    $filename = basename(substr($relativeUrl, strlen($prefix)));
    if ($filename === '' || $filename === '.' || $filename === '..') {
        return;
    }
    $path = imagesTeamDir() . DIRECTORY_SEPARATOR . $filename;
    if (is_file($path)) {
        @unlink($path);
    }
}
