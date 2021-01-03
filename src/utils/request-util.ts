// Copyright (c) 2020 Amirhossein Movahedi (@qolzam)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import fetch, { Response } from 'node-fetch';
import HMACUtil from './hmac-util';

/**
 * Make a HTTP call
 * @param url HTTP URL
 * @param data data payload
 * @param method HTTP method
 * @param headers HTTP headers
 */
export function call(
    url: string,
    data: any,
    method = 'post',
    headers = { 'Content-Type': 'application/json' },
): Promise<Response> {
    return fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers,
    });
}

/**
 * Make a HTTP call using with HMAC header
 * @param url HTTP URL
 * @param data data payload
 * @param data data payload
 * @param method HTTP method
 * @param headers HTTP headers
 */
export function callHMAC(
    url: string,
    data: any,
    secret: string,
    method = 'post',
    headers = { 'Content-Type': 'application/json' },
): Promise<Response> {
    return fetch(url, {
        method: method,
        body: HMACUtil.sign(JSON.stringify(data), secret),
        headers,
    });
}
export default {
    call,
    callHMAC,
};
