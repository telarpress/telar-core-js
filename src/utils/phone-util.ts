import plivo from 'plivo';

export class PhoneClient {
    private client: any;
    private sourceNumber: string;
    private constructor(_client: any, _sourceNumber: string) {
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
        console.log('[INFO] Start Phone client initializing...');
        const client = new plivo.Client(authId, authToken);
        console.log('[INFO] Phone client initialized.');
        return new PhoneClient(client, sourceNumber);
    }
    async sendSms(phoneNumber: string, message: string) {
        console.log('[INFO] Start sending message...');
        const smsResult = await this.client.messages.create(this.sourceNumber, phoneNumber, message);
        return smsResult;
    }
}
