// Copyright (c) 2020 Amirhossein Movahedi (@qolzam)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import * as handlebars from 'handlebars';
import * as fs from 'fs';

const readHTMLFile = function readHTMLFile(path: string, callback: (err: Error | null, html?: string | null) => void) {
    fs.readFile(path, { encoding: 'utf-8' }, (err, html) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, html);
        }
    });
};

export function getParsedHtml(htmlPath: string, data: Record<string, unknown>): Promise<string> {
    return new Promise((resolve, reject) => {
        readHTMLFile(htmlPath, (err, html) => {
            if (err) {
                reject(err);
            }
            const template = handlebars.compile(html);
            const parsedHtml = template(data);
            resolve(parsedHtml);
        });
    });
}

export default {
    getParsedHtml,
};
