import * as express from 'express';

function getIPAddress(request: express.Request): string {
    let ip =
        request.headers['x-forwarded-for'] ||
        request.connection.remoteAddress ||
        request.socket.remoteAddress ||
        (request.connection as any).socket.remoteAddress;
    [ip] = ip.split(',');
    ip = ip.split(':').slice(-1); // in case the ip returned in a format: "::ffff:146.xxx.xxx.xxx"
    return ip;
}

/**
 * Http status codes
 * Thanks to https://msdn.microsoft.com/en-us/library/ee434093.aspx
 */
export const StatusCode = {
    Accepted: 202,
    Ambiguous: 300,
    BadGateway: 502,
    BadRequest: 400,
    Conflict: 409,
    Continue: 100,
    Created: 201,
    ExpectationFailed: 417,
    Forbidden: 403,
    Found: 302,
    GatewayTimeout: 504,
    Gone: 410,
    HttpVersionNotSupported: 505,
    InternalServerError: 500,
    LengthRequired: 411,
    MethodNotAllowed: 405,
    Moved: 301,
    MovedPermanently: 301,
    MultipleChoices: 300,
    NoContent: 204,
    NonAuthoritativeInformation: 203,
    NotAcceptable: 406,
    NotFound: 404,
    NotImplemented: 501,
    NotModified: 304,
    OK: 200,
    PartialContent: 206,
    PaymentRequired: 402,
    PreconditionFailed: 412,
    ProxyAuthenticationRequired: 407,
    Redirect: 302,
    RedirectKeepVerb: 307,
    RedirectMethod: 303,
    RequestedRangeNotSatisfiable: 416,
    RequestEntityTooLarge: 413,
    RequestTimeout: 408,
    RequestUriTooLong: 414,
    ResetContent: 205,
    SeeOther: 303,
    ControllerUnavailable: 503,
    SwitchingProtocols: 101,
    TemporaryRedirect: 307,
    Unauthorized: 401,
    UnsupportedMediaType: 415,
    Unused: 306,
    UpgradeRequired: 426,
    UseProxy: 305,
};

export default {
    getIPAddress,
};
