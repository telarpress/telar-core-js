// Copyright (c) 2020 Amirhossein Movahedi (@qolzam)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import fetch, { Response } from 'node-fetch';
import config from '../config';

function call(url: string, data: unknown): Promise<Response> {
    const { appConfig } = config.getConfig();
    return fetch(`${appConfig.gateway}/${url}`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    });
}

export default {
    call,
};
