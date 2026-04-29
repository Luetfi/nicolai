<?php
declare(strict_types=1);

/**
 * Atomic JSON read/write with file locking and rotating backups.
 */

function jsonStorePath(string $name): string {
    if (!preg_match('/^[a-z0-9\-]+$/i', $name)) {
        throw new InvalidArgumentException('Invalid store name');
    }
    return dataDir() . DIRECTORY_SEPARATOR . $name . '.json';
}

function jsonStoreBackupDir(): string {
    return dataDir() . DIRECTORY_SEPARATOR . '.backups';
}

function readJson(string $name): array {
    $path = jsonStorePath($name);
    if (!is_file($path)) {
        return [];
    }
    $fp = fopen($path, 'r');
    if (!$fp) {
        throw new RuntimeException('Cannot open ' . $name);
    }
    $contents = '';
    if (flock($fp, LOCK_SH)) {
        while (!feof($fp)) {
            $chunk = fread($fp, 8192);
            if ($chunk === false) {
                break;
            }
            $contents .= $chunk;
        }
        flock($fp, LOCK_UN);
    }
    fclose($fp);
    $data = json_decode($contents, true);
    if (!is_array($data)) {
        return [];
    }
    return $data;
}

function writeJson(string $name, array $data): void {
    $dir = dataDir();
    if (!is_dir($dir)) {
        if (!mkdir($dir, 0755, true) && !is_dir($dir)) {
            throw new RuntimeException('Cannot create data dir');
        }
    }
    $path = jsonStorePath($name);

    // Backup current file
    if (is_file($path)) {
        $backupDir = jsonStoreBackupDir();
        if (!is_dir($backupDir)) {
            mkdir($backupDir, 0755, true);
        }
        $backupPath = $backupDir . DIRECTORY_SEPARATOR . $name . '-' . date('Ymd-His') . '.json.bak';
        @copy($path, $backupPath);
        rotateBackups($backupDir, $name, 20);
    }

    // Always stamp _updated
    $data['_updated'] = isoNow();

    $tmp = $path . '.tmp.' . bin2hex(random_bytes(4));
    $json = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    if ($json === false) {
        throw new RuntimeException('JSON encode failed');
    }

    $fp = fopen($tmp, 'w');
    if (!$fp) {
        throw new RuntimeException('Cannot open temp file');
    }
    if (!flock($fp, LOCK_EX)) {
        fclose($fp);
        @unlink($tmp);
        throw new RuntimeException('Cannot lock temp file');
    }
    fwrite($fp, $json);
    fflush($fp);
    flock($fp, LOCK_UN);
    fclose($fp);

    if (!rename($tmp, $path)) {
        @unlink($tmp);
        throw new RuntimeException('Cannot move temp file into place');
    }
    @chmod($path, 0644);
}

function rotateBackups(string $dir, string $name, int $keep): void {
    $files = glob($dir . DIRECTORY_SEPARATOR . $name . '-*.json.bak');
    if (!is_array($files) || count($files) <= $keep) {
        return;
    }
    sort($files); // alphabetical = chronological because of YYYYMMDD-HHMMSS
    $excess = array_slice($files, 0, count($files) - $keep);
    foreach ($excess as $oldFile) {
        @unlink($oldFile);
    }
}
