// Copyright (c) 2020 Amirhossein Movahedi (@qolzam)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export default class LogUtil {
    static log(message?: unknown, ...optionalParams: unknown[]): void {
        // eslint-disable-next-line no-console
        console.log(message, ...optionalParams);
    }
    static info(message?: unknown, ...optionalParams: unknown[]): void {
        // eslint-disable-next-line no-console
        console.log('[INFO] ', message, ...optionalParams);
    }
    static warn(message?: unknown, ...optionalParams: unknown[]): void {
        // eslint-disable-next-line no-console
        console.warn('[WARN] ', message, ...optionalParams);
    }
    static error(message?: unknown, ...optionalParams: unknown[]): void {
        // eslint-disable-next-line no-console
        console.error('[ERROR] ', message, ...optionalParams);
    }
}
