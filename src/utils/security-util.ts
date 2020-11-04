// Copyright (c) 2020 Amirhossein Movahedi (@qolzam)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as jwt from 'jsonwebtoken';
import { Claims } from '../server/server';

export function signJWT(
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

export function verifyJWT(token: string, secret: string): [Claims | null, Error | null] {
    try {
        const decoded = jwt.verify(token, secret);
        return [decoded as Claims, null];
    } catch (error) {
        return [null, error];
    }
}
export default {
    signJWT,
    verifyJWT,
};
