import * as jwt from 'jsonwebtoken';

function signJWT(
    privateKey: string,
    payload: string,
    expiresIn: string | number | undefined,
): [string | null, Error | null] {
    try {
        const token = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn });
        return [token, null];
    } catch (error) {
        return [null, error];
    }
}

function verifyJWT(token: string, secret: string): [string | unknown | null, Error | null] {
    try {
        const decoded = jwt.verify(token, secret);
        return [decoded, null];
    } catch (error) {
        return [null, error];
    }
}

export default {
    signJWT,
    verifyJWT,
};
