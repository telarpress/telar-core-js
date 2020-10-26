function marshalError(
    code: string,
    message: string,
): {
    code: string;
    message: string;
} {
    return { code, message };
}

export default {
    marshalError,
};
