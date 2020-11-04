// Copyright (c) 2020 Amirhossein Movahedi (@qolzam)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import fetch from 'node-fetch';

export class Recaptcha {
    secret: string;
    private constructor(_secret: string) {
        this.secret = _secret;
    }

    /**
     * Init allows the webserver or code evaluating the reCaptcha form input to set the
     * reCaptcha private key (string) value, which will be different for every domain.
     * @param secretKey Secret key
     */
    static NewRecaptcha(secretKey: string): Recaptcha {
        return new Recaptcha(secretKey);
    }

    /**
     * Verify recaptcha
     * @param recaptchaResponse Recaptcha validate response
     * @param remoteIpAddress Request source IP address
     */
    async verifyCaptch(recaptchaResponse: string, remoteIpAddress: string): Promise<unknown> {
        const result = await confirm(remoteIpAddress, recaptchaResponse, this.secret);
        return result;
    }
}

const recaptchaServerName = 'https://www.google.com/recaptcha/api/siteverify';

// check uses the client ip address, the challenge code from the reCaptcha form,
// and the client's response input to that challenge to determine whether or not
// the client answered the reCaptcha input question correctly.
// It returns a boolean value indicating whether or not the client answered correctly.
async function check(remoteip: string, response: string, secretKey: string) {
    const resCap = await fetch(`${recaptchaServerName}?secret=${secretKey}&response=${response}&remoteip=${remoteip}`, {
        method: 'POST',
    });
    const parsedRecap = await resCap.json();
    // eslint-disable-next-line no-console
    console.log('[INFO] parsedRecap ', parsedRecap);
    if (parsedRecap.success !== undefined && !parsedRecap.success) {
        // eslint-disable-next-line no-console
        console.log('[ERROR] Captha/responseError', resCap);
        // eslint-disable-next-line no-console
        console.log('[ERROR] Captha/responseError', parsedRecap);
        throw new Error('ServerError/ResponseCaptchaError ' + 'Failed captcha verification');
    }
    return parsedRecap;
}

// Confirm is the public interface function.
// It calls check, which the client ip address, the challenge code from the reCaptcha form,
// and the client's response input to that challenge to determine whether or not
// the client answered the reCaptcha input question correctly.
// It returns a boolean value indicating whether or not the client answered correctly.
async function confirm(remoteip: string, response: string, secretKey: string) {
    const result = await check(remoteip, response, secretKey);
    return result.success;
}
