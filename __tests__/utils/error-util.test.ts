import errorUtil from '../../src/utils/error-util';

describe('Error utility', () => {
    test('Will return marshal error', () => {
        const errorCode = 'errorCode';
        const errorMessage = 'Error test message!';
        const parsedError = errorUtil.marshalError(errorCode, errorMessage);
        expect(parsedError).toStrictEqual({ code: errorCode, message: errorMessage });
    });
});
