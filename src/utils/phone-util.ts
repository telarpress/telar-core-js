// Copyright (c) 2020 Amirhossein Movahedi (@qolzam)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import plivo from 'plivo';
import log from './log-util';

export class PhoneClient {
    private client: plivo.PlivoClient;
    private sourceNumber: string;
    private constructor(_client: plivo.PlivoClient, _sourceNumber: string) {
        this.client = _client;
        this.sourceNumber = _sourceNumber;
    }

    /**
     * Create a new phone client
     * @param authId Phone client authId
     * @param authToken Phone client authToken
     * @param sourceNumber Phone source number
     */
    NewPhone(authId: string, authToken: string, sourceNumber: string): PhoneClient {
        log.info('Start Phone client initializing...');
        const client = new plivo.Client(authId, authToken);

        log.info('Phone client initialized.');
        return new PhoneClient(client, sourceNumber);
    }
    async sendSms(phoneNumber: string, message: string): Promise<unknown> {
        log.info('Start sending message...');
        const smsResult = await this.client.messages.create(this.sourceNumber, phoneNumber, message);
        return smsResult;
    }
}
