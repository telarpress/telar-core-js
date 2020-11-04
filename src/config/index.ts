// Copyright (c) 2020 Amirhossein Movahedi (@qolzam)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export interface CoreConfig {
    server: string;
    gateway: string;
    mongoDBHost: string;
    mongoPassword: string;
    database: string;
    publicKey: string;
    recaptchaKey: string;
    recaptchaSiteKey: string;
    headerCookieName: string;
    payloadCookieName: string;
    signatureCookieName: string;
    smtpEmail: string;
    refEmail: string;
    refEmailPass: string;
    origin: string;
    privateKey: string;
    appName: string;
    phoneSourceNumber: string;
    phoneAuthToken: string;
    phoneAuthId: string;
    orgName: string;
    orgAvatar: string;
    webDomain: string;
    dBType: string;
    queryPrettyURL: boolean;
}
let config: CoreConfig;

export function getConfig(): { appConfig: CoreConfig } {
    return { appConfig: { ...config } };
}
export function setConfig(_config: CoreConfig): void {
    config = _config;
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
