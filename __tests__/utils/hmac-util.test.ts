import hmacUtil from '../../src/utils/hmac-util';

describe('Error utility', () => {
    test('Should verify the data', async () => {
        const secret = 'kjsdnfksdjfn';
        const data = { body: 'data to sign' };
        const signedData = hmacUtil.sign(JSON.stringify(data), secret);
        const verifiedData = await hmacUtil.validate(JSON.stringify(data), secret, signedData);
        expect(verifiedData).toStrictEqual(true);
    });
    test('Should not verify the data', async () => {
        const secret = 'kjsdnfksdjfn';
        const data = { body: 'data to sign' };
        const wrongData = { body: 'wrong data to sign' };
        const signedData = hmacUtil.sign(JSON.stringify(data), secret);
        const verifiedData = await hmacUtil.validate(JSON.stringify(wrongData), secret, signedData);
        expect(verifiedData).not.toStrictEqual(true);
    });
});
