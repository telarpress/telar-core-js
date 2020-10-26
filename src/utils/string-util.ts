import * as crypto from 'crypto';

async function hashPassword(password: string, salt: string): Promise<string> {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, 1000, 64, 'sha512', (err, derivedKey) => {
            if (err) return reject(err);
            return resolve(derivedKey.toString('hex'));
        });
    });
}

async function genSalt(): Promise<string> {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(32, (err, buf) => {
            if (err) return reject(err);
            return resolve(buf.toString('hex'));
        });
    });
}

function lowerFirst(input: string): string {
    return input.charAt(0).toUpperCase() + input.slice(1);
}

function isEmpty(str: string): boolean {
    return !str || str.length === 0;
}

export default {
    hashPassword,
    genSalt,
    lowerFirst,
    isEmpty,
};
