// Copyright (c) 2020 Amirhossein Movahedi (@qolzam)
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export interface IOperators extends IBaseOperators {
    /**
     * The set operator replaces the value of a field with the specified value.
     * @param values Replace with field value
     */
    set(values: Record<string, unknown>): IOperators;
    /**
     * The in operator selects the documents where the value of a field equals any value in the specified array.
     * @param field The field of document
     * @param valueList List of value in the specified array to search
     */
    in(field: string, valueList: (string | number)[]): IOperators;
    /**
     * Performs a text search on the content of the fields indexed.
     * @param text
     */
    search(text: string): IOperators;
    /**
     * The or operator performs a logical OR operation on an array of two or more <expressions> and selects the documents that satisfy at least one of the <expressions>
     * @param expressionList The list of expression to satisfy the query
     */
    or(expressionList: Record<string, unknown>[]): IOperators;
    /**
     * This operator handle plain object
     * @param data The data plain object
     */
    plain(data: Record<string, unknown>): IOperators;
    /**
     * Clear operation
     */
    clear(): IOperators;
}

export interface IBaseOperators {
    /**
     * Get applied operation to inject in database
     */
    getOperation(): unknown;
    /**
     * Get applied operation to inject in database in T type
     */
    getOperation<T>(): T;
}
