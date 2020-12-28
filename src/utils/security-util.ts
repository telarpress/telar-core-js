// Copyright (c) 2020 Amirhossein Movahedi (@qolzam)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as jwt from 'jsonwebtoken';
import { Claims } from '../server/server';

export function signJWT(
    privateKey: string,
    payload: string | object | Buffer,
    expiresIn: string | number | undefined,
): string {
    return jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn });
}

export function verifyJWT(token: string, secret: string): { claim: Claims; [key: string]: any } {
    return jwt.verify(token, secret) as { claim: Claims; [key: string]: any };
}
export default {
    signJWT,
    verifyJWT,
};
