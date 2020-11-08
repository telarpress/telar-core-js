// Copyright (c) 2020 Amirhossein Movahedi (@qolzam)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export interface CoreConfig {
    server?: string;
    gateway?: string;
    dbHost?: string;
    dbPassword?: string;
    database?: string;
    publicKey?: string;
    recaptchaKey?: string;
    recaptchaSiteKey?: string;
    headerCookieName?: string;
    payloadCookieName?: string;
    signatureCookieName?: string;
    smtpEmail?: string;
    refEmail?: string;
    refEmailPass?: string;
    origin?: string;
    privateKey?: string;
    appName?: string;
    phoneSourceNumber?: string;
    phoneAuthToken?: string;
    phoneAuthId?: string;
    orgName?: string;
    orgAvatar?: string;
    webDomain?: string;
    dBType?: string;
    queryPrettyURL?: boolean;
}

export interface ConfigStore {
    global?: CoreConfig;
    app?: unknown;
}

let configStore: ConfigStore;

/**
 * Get configuration
 */
export function getConfig(): ConfigStore {
    return configStore;
}
/**
 * Set configuration
 * @param conf
 */
export function setConfig(conf: ConfigStore): void {
    configStore = conf;
}

export enum DBType {
    DB_INMEMORY = 'inmemory',
    DB_MONGO = 'mongo',
    DB_SQLITE = 'sqlite',
    DB_MYSQL = 'mysql',
}

export default {
    getConfig,
    setConfig,
};
