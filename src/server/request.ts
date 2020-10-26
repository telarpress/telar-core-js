import fetch, { Response } from 'node-fetch';
import config from '../config';

function call(url: string, data: any): Promise<Response> {
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
