// Copyright (c) 2020 Amirhossein Movahedi (@qolzam)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as jwt from 'jsonwebtoken';

export function signJWT(
    cert: string,
    payload: string | object | Buffer,
    expiresIn: string | number | undefined,
    options?: jwt.SignOptions,
): string {
    return jwt.sign(payload, cert, { algorithm: 'RS256', expiresIn, ...options });
}

export function verifyJWT(token: string, secret: string): { [key: string]: any } {
    return jwt.verify(token, secret) as { [key: string]: any };
}
export default {
    signJWT,
    verifyJWT,
};
