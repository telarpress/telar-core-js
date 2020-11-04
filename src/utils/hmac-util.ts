/**
 * Adapted from https://github.com/cabrerabywaters/faas-node-gatekeeper/blob/master/index.js
 */

import * as crypto from 'crypto';

const sign = (data: string, sharedSecret: string) => {
    const hash = crypto.createHmac('sha1', sharedSecret).update(data, 'utf8').digest('hex');

    return `sha1=${hash}`;
};

/**
 * Removes 'sha1=' from hash string
 * @param {String} hash
 */
const getHashedMessage = (hash: string) => {
    if (!hash) {
        throw new Error('We could not get the HASH from your message. Did you sign it? (--sign)');
    }
    let parsedHash = hash;
    if (parsedHash.includes('sha1=')) {
        parsedHash = parsedHash.replace('sha1=', '');
    }
    return parsedHash;
};

/**
 * Verifies that the message was hashed with
 * the proper shared key
 *
 * @param {String} hashedMessage
 * @param {String} sharedSecret
 * @param {String} message
 */
const verify = (hashedMessage: string, sharedSecret: string, message: string) => {
    const expectedHash = crypto.createHmac('sha1', sharedSecret).update(message, 'utf8').digest('hex');
    return hashedMessage === expectedHash;
};

/**
 *  Pulls the Hash and Secret and verifies the message
 *
 * @param {String} message Original message, without hashing
 * @param {String} secret Name of the secret to  generate
 *                        the Hash
 */
const validate = async (message: string, secret: string, hash: string) => {
    const hashedMessage = getHashedMessage(hash);
    return verify(hashedMessage, secret, message);
};

export const HMACUtil = Object.freeze({
    validate,
    verify,
    sign,
});
export default HMACUtil;
