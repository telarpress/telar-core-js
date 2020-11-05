// Copyright (c) 2020 Amirhossein Movahedi (@qolzam)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import fetch, { Response } from 'node-fetch';
import { getConfig } from '../config';

export function call(url: string, data: unknown): Promise<Response> {
    const { global } = getConfig();
    return fetch(`${global.gateway}/${url}`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    });
}
export default {
    call,
};
