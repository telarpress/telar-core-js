import * as path from 'path';
import * as fs from 'fs';

function readSecret(key: string): string {
    let basePath = '/var/openfaas/secrets';
    if (process.env.secret_mount_path) {
        basePath = process.env.secret_mount_path;
    }
    const readPath = path.join(basePath, key);
    const secretData = fs.readFileSync(readPath, 'utf8');
    return secretData.trim();
}

export default {
    readSecret,
};