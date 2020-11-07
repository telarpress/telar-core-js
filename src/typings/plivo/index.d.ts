declare module 'plivo' {
    export interface PlivoClient {
        messages: PlivoMessages;
    }

    export interface PlivoMessages {
        create: (sourceNember: string, targetPhoneNumber: string, message: string) => Promise<unknown>;
    }

    export class Client implements PlivoClient {
        authId: string;
        authToken: string;
        constructor(_authId: string, _authToken: string) {
            this.authId = _authId;
            this.authToken = _authToken;
        }
        messages: PlivoMessages;
    }
}
