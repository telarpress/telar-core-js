declare module 'plivo' {
    export interface PlivoClient {
        messages: PlivoMessages;
    }

    export interface PlivoMessages {
        create: (sourceNember: string, targetPhoneNumber: string, message: string) => Promise<unknown>;
    }

    export class Client implements PlivoClient {
        constructor(authId: string, authToken: string);
        messages: PlivoMessages;
    }
}
