// Copyright (c) 2020 Amirhossein Movahedi (@qolzam)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import config, { CoreConfig } from '../config';
import httpUtils, { StatusCode } from '../utils/http-util';
import secretUtils from '../utils/secret-util';
import hmacUtils from '../utils/hmac-util';
import logger from '../utils/log-util';
import stringUtils from '../utils/string-util';
import securityUtils from '../utils/security-util';
import * as expressCore from 'express-serve-static-core';
import * as qs from 'qs';
import * as http from 'http';

export enum RouteProtection {
    RouteProtectionHMAC = 0,
    RouteProtectionAdmin = 1,
    RouteProtectionCookie = 2,
    RouteProtectionPublic = 3,
}

export interface Cookies {
    header: string;
    payload: string;
    sign: string;
}

export interface Claims {
    role: string;
    uid: string;
    email: string;
    avatar: string;
    displayName: string;
}

export const XCloudSignature = 'X-Cloud-Signature';

export type Handler = (r: expressCore.Request, w: expressCore.Response) => void;
export type FunctionHandler = (req: Request) => [Response, Error, null];
export type FunctionHandlerWR = (
    w: expressCore.Response,
    r: expressCore.Request,
    req: Request,
) => [Response, Error, null];

export class Response {
    // Body the body will be written back
    body: unknown | undefined;

    // StatusCode needs to be populated with value such as http.StatusOK
    statusCode: number | undefined;

    // Header is optional and contains any additional headers the function response should set
    header: http.IncomingHttpHeaders | undefined;

    constructor(
        _body: unknown | undefined,
        _statusCode: number | undefined,
        _header: http.IncomingHttpHeaders | undefined,
    ) {
        this.body = _body;
        this.statusCode = _statusCode || 0;
        this.header = _header;
    }
}

export class Request {
    public body: unknown;
    public header: http.IncomingHttpHeaders;
    public queryString: qs.ParsedQs;
    public params: expressCore.ParamsDictionary;
    public method: string;
    public ipAddress: string;
    public userID?: string;
    public username?: string;
    public avatar?: string;
    public displayName?: string;
    public systemRole?: string;
    public cookieMap?: string;

    constructor(
        _body: unknown,
        _header: http.IncomingHttpHeaders,
        _queryString: qs.ParsedQs,
        _params: expressCore.ParamsDictionary,
        _method: string,
        _ipAddress: string,
        _userID?: string,
        _username?: string,
        _avatar?: string,
        _displayName?: string,
        _systemRole?: string,
        _cookieMap?: string,
    ) {
        this.body = _body;
        this.header = _header;
        this.queryString = _queryString;
        this.params = _params || [];
        this.method = _method;
        this.ipAddress = _ipAddress;
        this.userID = _userID;
        this.username = _username;
        this.avatar = _avatar;
        this.displayName = _displayName;
        this.systemRole = _systemRole;
        this.cookieMap = _cookieMap;
    }

    /**
     * Get parameter by name
     * @param name Parameter name
     */
    getParamByName(name: string): string {
        return this.params[name] || '';
    }

    get(key: string): string | undefined | string[] {
        return this.header[key];
    }
}
function handleParseRequest(r: expressCore.Request) {
    return new Request(r.body, r.headers, r.query, r.params, r.method, httpUtils.getIPAddress(r));
}

// handleParseFileRequest parse the request to openfaas handler.request
function handleParseFileRequest(r: expressCore.Request) {
    return new Request(null, r.headers, r.query, r.params, r.method, httpUtils.getIPAddress(r));
}

function writeError(err: string, logErr?: Error) {
    // eslint-disable-next-line no-console
    console.log(err);
    if (logErr) {
        logger.error(logErr);
    }
}

function parseClaim(req: Request, claims: Claims, protection: RouteProtection) {
    const { role } = claims;
    if (!stringUtils.isEmpty(role)) {
        req.systemRole = role;
    }

    if (protection === RouteProtection.RouteProtectionAdmin && role !== 'admin') {
        return new Error('adminAccessRole');
    }
    const userId = claims.uid;
    logger.info('UserID from claims ', userId);
    if (!stringUtils.isEmpty(userId)) {
        req.userID = userId;
    }
    const username = claims.email;
    if (!stringUtils.isEmpty(username)) {
        req.username = username;
    }
    const { avatar } = claims;
    if (stringUtils.isEmpty(avatar)) {
        req.avatar = avatar;
    }
    const { displayName } = claims;
    if (stringUtils.isEmpty(displayName)) {
        req.displayName = displayName;
    }

    return null;
}

// validateRequest
function validateRequest(req: Request) {
    let payloadSecret = null;
    try {
        payloadSecret = secretUtils.readSecret('payload-secret');
    } catch (err) {
        return new Error(`couldn't get payload-secret: ${err}`);
    }

    const xCloudSignature = req.get(XCloudSignature);

    logger.info('xCloudSignature:  ', xCloudSignature);
    try {
        if (
            xCloudSignature &&
            typeof xCloudSignature === 'string' &&
            hmacUtils.validate(String(req.body), payloadSecret, xCloudSignature)
        ) {
            return null;
        }
        throw new Error('HMAC is not valid!');
    } catch (error) {
        return error;
    }
}

// checkHmacPresent check whether hmac header presented
function checkHmacPresent(req: Request) {
    const xCloudSignature = req.get(XCloudSignature);

    if (xCloudSignature && typeof xCloudSignature === 'string' && !stringUtils.isEmpty(xCloudSignature)) {
        const validErr = validateRequest(req);
        if (validErr != null) {
            // eslint-disable-next-line no-console
            console.log('[ERROR] Core: HMAC Error %s', validErr.Error());

            return [true, validErr];
        }
        const userID = req.get('uid');
        if (userID && typeof userID === 'string' && stringUtils.isEmpty(userID)) {
            req.userID = userID;
        }
        if (userID && typeof userID === 'string' && stringUtils.isEmpty(userID)) {
            req.userID = userID;
        }
        const username = req.get('email');
        if (username && typeof username === 'string' && stringUtils.isEmpty(username)) {
            req.username = username;
        }
        const avatar = req.get('avatar');
        if (avatar && typeof avatar === 'string' && stringUtils.isEmpty(avatar)) {
            req.avatar = avatar;
        }
        const displayName = req.get('displayName');
        if (displayName && typeof displayName === 'string' && stringUtils.isEmpty(displayName)) {
            req.displayName = displayName;
        }
        const systemRole = req.get('role');
        if (systemRole && typeof systemRole === 'string' && stringUtils.isEmpty(systemRole)) {
            req.systemRole = systemRole;
        }
        return [true, null];
    }

    // eslint-disable-next-line no-console
    console.log('[INFO] Core: HMAC is not presented.');
    return [false, null];
}

// readCookie read cookies in a map
function readCookie(
    w: expressCore.Response,
    r: expressCore.Request,
    appConfig: CoreConfig,
): [Cookies | null, Error | null] {
    const cookieHeader = r.cookies[appConfig.headerCookieName];
    if (stringUtils.isEmpty(cookieHeader)) {
        writeError('Cookie Header not found.');
        return [null, new Error('Cookie Header not found.')];
    }

    const cookiePayload = r.cookies[appConfig.payloadCookieName];
    if (stringUtils.isEmpty(cookiePayload)) {
        writeError('Cookie Payload not found.');
        return [null, new Error('Cookie Payload not found.')];
    }

    const cookieSignature = r.cookies[appConfig.signatureCookieName];
    if (stringUtils.isEmpty(cookieSignature)) {
        writeError('Cookie Signature not found.');
        return [null, new Error('Cookie Signature not found.')];
    }

    const cookies: Cookies = {
        header: cookieHeader,
        payload: cookiePayload,
        sign: cookieSignature,
    };

    return [cookies, null];
}

// parseCookie
function parseCookie(
    w: expressCore.Response,
    cookieMap: Cookies,
    appConfig: CoreConfig,
): [Claims | null, Error | null] {
    const keydata = appConfig.publicKey;
    const cookie = `${cookieMap.header}.${cookieMap.payload}.${cookieMap.sign}`;
    const [parsed, parseErr] = securityUtils.verifyJWT(cookie, keydata);

    if (parseErr != null) {
        // eslint-disable-next-line no-console
        console.log(parseErr, cookie);
        writeError('Unable to decode cookie, please clear your cookies and sign-in again', parseErr);
        return [null, parseErr];
    }
    return [parsed, null];
}

// checkProtection check protection
function checkProtection(
    w: expressCore.Response,
    r: expressCore.Request,
    req: Request,
    appConfig: CoreConfig,
    protection: RouteProtection,
) {
    if (protection === RouteProtection.RouteProtectionHMAC) {
        const [presented, hmacErr] = checkHmacPresent(req);
        if (hmacErr != null) {
            // eslint-disable-next-line no-console
            console.log('[ERROR]invalid HMAC digest!', hmacErr);
            return new Error(`invalid HMAC digest! ${hmacErr}`);
        }
        if (!presented) {
            // eslint-disable-next-line no-console
            console.log('[ERROR] HMAC is not presented!');
            return new Error('HMAC is not presented!');
        }
    } else if (
        protection === RouteProtection.RouteProtectionCookie ||
        protection === RouteProtection.RouteProtectionAdmin
    ) {
        const [presented, hmacErr] = checkHmacPresent(req);
        if (hmacErr != null) {
            // eslint-disable-next-line no-console
            console.log('[ERROR] Invalid HMAC digest!  ', hmacErr);
            return new Error(`Invalid HMAC digest: ${hmacErr}`);
        }
        if (!presented) {
            // Read cookie
            const [cookieMap, cookieErr] = readCookie(w, r, appConfig);
            if (cookieErr != null || cookieMap === null) {
                writeError(
                    'Internal Error happened in reading cookie!',
                    Error(`Unable to read cookies : ${cookieErr}`),
                );
                return new Error(`Unable to read cookies : ${cookieErr}`);
            }

            // Parse cookie to claim
            const [claims, parseCookieErr] = parseCookie(w, cookieMap, appConfig);
            if (parseCookieErr != null) {
                writeError('Error in reading cookie error: ', parseCookieErr);
                return new Error(`Error in reading cookie error: ${parseCookieErr}`);
            }

            if (!claims) {
                writeError('Claims is null!');
                return new Error(`Claims is null!`);
            }
            // Parse claim to request
            const parseErr = parseClaim(req, claims, protection);
            if (parseErr != null) {
                writeError('Can not parse claim ', parseErr);
                return new Error(`Can not parse claim ${parseErr}`);
            }
        }
    }
    return null;
}

function parseHeader(w: expressCore.Response, r: expressCore.Request, result: Response, resultErr: Error) {
    if (result.header) {
        const headerKeys = Object.keys(result.header);
        for (let index = 0; index < headerKeys.length; index += 1) {
            const key = headerKeys[index];
            const value = result.header[key];
            w.set(key, value);
        }
    }

    if (resultErr !== null) {
        // eslint-disable-next-line no-console
        console.log(resultErr);
        w.status(StatusCode.InternalServerError);
    } else if (result.statusCode === 0) {
        w.status(StatusCode.OK);
    } else if (result.statusCode) {
        w.status(result.statusCode);
    }
}

//  requestHandler
function requestHandler(
    w: expressCore.Response,
    r: expressCore.Request,
    funcHandler: FunctionHandler,
    req: Request,
    protection: RouteProtection,
): void {
    const { appConfig } = config.getConfig();

    // Reading cookie in protected request
    if (protection !== RouteProtection.RouteProtectionPublic) {
        const err = checkProtection(w, r, req, appConfig, protection);
        if (err !== null) {
            w.status(StatusCode.Unauthorized);
            w.send(err);
            return;
        }
    }
    const [result, resultErr] = funcHandler(req);
    parseHeader(w, r, result, resultErr);

    w.send(result.body);
}

export function reqWR(funcHandler: FunctionHandlerWR, protection: RouteProtection): Handler {
    const { appConfig } = config.getConfig();
    return function handler(r, w) {
        // eslint-disable-next-line no-console
        console.log(JSON.stringify(r.headers));
        const req = handleParseRequest(r);
        // Reading cookie in protected request
        if (protection !== RouteProtection.RouteProtectionPublic) {
            checkProtection(w, r, req, appConfig, protection);
        }
        const [result, resultErr] = funcHandler(w, r, req);
        parseHeader(w, r, result, resultErr);
        w.send(result.body);
    };
}

// ReqFileWR request file handler with http.ResponseWriter and http.Request
export function reqFileWR(funcHandler: FunctionHandlerWR, protection: RouteProtection): Handler {
    const { appConfig } = config.getConfig();
    return function handler(r: expressCore.Request, w: expressCore.Response) {
        const req = handleParseFileRequest(r);

        // Reading cookie in protected request
        if (protection !== RouteProtection.RouteProtectionPublic) {
            checkProtection(w, r, req, appConfig, protection);
        }
        const [result, resultErr] = funcHandler(w, r, req);
        parseHeader(w, r, result, resultErr);
        w.send(result.body);
    };
}

// OnReq request handler
export function onReq(funcHandler: FunctionHandler, protection: RouteProtection): Handler {
    return function handler(r: expressCore.Request, w: expressCore.Response): void {
        const req = handleParseRequest(r);
        requestHandler(w, r, funcHandler, req, protection);
    };
}

export default {
    reqWR,
    reqFileWR,
    onReq,
};
