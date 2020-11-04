// Copyright (c) 2020 Amirhossein Movahedi (@qolzam)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

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
