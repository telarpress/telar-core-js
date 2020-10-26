import { MongoClient } from './context';
import * as mongo from 'mongodb';

export class DataRepositoryMongo {
    client: MongoClient;
    private constructor(_client: MongoClient) {
        this.client = _client;
    }
    /**
     * Create a new data repository for mongoDB
     * @param _client MongoDB client
     */
    static NewDataRepositoryMongo(_client: MongoClient): DataRepositoryMongo {
        return new DataRepositoryMongo(_client);
    }

    /**
     * Creates multiple indexes in the collection, this method is only supported for
MongoDB 2.6 or higher.
     * @param {*} collectionName Collection name
     * @param {*} indexes Collection indexes
     * @example createIndex("MyCollection",
        [
            {name: 'field1', key: {field1: 1}},
            {name: 'field2_field3', key: {field2: 1, field3: 1}}
        ]
        )
    */
    createIndex(collectionName: string, indexes: mongo.IndexSpecification[]): Promise<any> {
        const collection = this.client.getCollection(collectionName);
        return collection.createIndexes(indexes);
    }

    /**
     * Inserts a single document into MongoDB
     * @param collectionName Collection name
     * @param data Document to insert
     */
    save<T>(collectionName: string, data: T): Promise<mongo.InsertOneWriteOpResult<mongo.WithId<unknown>>> {
        const collection = this.client.getCollection(collectionName);
        return collection.insertOne(data);
    }

    /**
     * Inserts an array of documents into MongoDB
     * @param collectionName Collection name
     * @param data Documents to save
     */
    saveMany<T>(collectionName: string, data: T[]): Promise<mongo.InsertWriteOpResult<mongo.WithId<unknown>>> {
        const collection = this.client.getCollection(collectionName);
        const insterOptions = { ordered: false };
        return collection.insertMany(data, insterOptions);
    }

    /**
     * Creates a cursor for a query that can be used to iterate over results from MongoDB
     * @param collectionName Collection name
     * @param filter The cursor query object
     * @param limit Sets the limit of documents returned in the query
     * @param skip Set to skip N documents ahead in your query (useful for pagination)
     * @param sort Set to sort the documents coming back from the query. Array of indexes, [['a', 1]] etc
     */
    find<T>(
        collectionName: string,
        filter: mongo.FilterQuery<T>,
        limit?: number,
        skip?: number,
        sort?: Array<[string, number]> | mongo.SortOptionObject<T>,
    ): mongo.Cursor<T> {
        const collection = this.client.getCollection(collectionName);
        let findOptions = {};
        if (sort && sort > 0) {
            findOptions = { ...findOptions, sort };
        }
        if (skip && skip > 0) {
            findOptions = { ...findOptions, skip };
        }
        if (limit && limit > 0) {
            findOptions = { ...findOptions, limit };
        }
        return collection.find(filter, findOptions);
    }

    /**
     * Fetches the first document that matches the query
     * @param collectionName Collection name
     * @param filter The cursor query object
     */
    findOne<T>(collectionName: string, filter: mongo.FilterQuery<T>): Promise<T | null> {
        const collection = this.client.getCollection(collectionName);

        return collection.findOne(filter);
    }

    /**
     * Update a single document in a collection
     * @param collectionName Collection name
     * @param filter The cursor query object
     * @param data The update operations to be applied to the document
     * @param opts Optional settings
     */
    update<T>(
        collectionName: string,
        filter: mongo.FilterQuery<T>,
        data: mongo.UpdateQuery<T> | Partial<T>,
        opts?: mongo.UpdateOneOptions,
    ): Promise<mongo.UpdateWriteOpResult> {
        const collection = this.client.getCollection(collectionName);

        return collection.updateOne(filter, data, opts);
    }

    /**
     * Update multiple documents in a collection
     * @param collectionName Collection name
     * @param filter The cursor query object
     * @param data TThe update operations to be applied to the documents
     * @param opts Optional settings
     */
    updateMany<T>(
        collectionName: string,
        filter: mongo.FilterQuery<T>,
        data: mongo.UpdateQuery<T> | Partial<T>,
        opts?: mongo.UpdateManyOptions,
    ): Promise<mongo.UpdateWriteOpResult> {
        const collection = this.client.getCollection(collectionName);

        return collection.updateMany(filter, data, opts);
    }

    /**
     * Perform a bulkWrite update operation without a fluent API
     * @param collectionName Collection name
     * @param bulkData Bulk update operations to perform
     */
    bulkUpdateOne<T>(
        collectionName: string,
        bulkData: mongo.BulkWriteUpdateOperation<T>[],
    ): Promise<mongo.BulkWriteOpResultObject> {
        const collection = this.client.getCollection(collectionName);
        const bulkOptions = { ordered: false };
        const operations: mongo.BulkWriteOperation<unknown>[] = [];
        for (let bullIndex = 0; bullIndex < bulkData.length; bullIndex += 1) {
            const operation = bulkData[bullIndex];
            // { updateOne: { filter: {a:2}, update: {$set: {a:2}}, upsert:true } }
            operations.push({ updateOne: operation });
        }
        return collection.bulkWrite(operations, bulkOptions);
    }

    /**
     * Delete one/many document/s from a collection
     * @param collectionName Collection name
     * @param filter The Filter used to select the document/s to remove
     * @param justOne Remove only one document
     */
    deleteMongo<T>(
        collectionName: string,
        filter: mongo.FilterQuery<T>,
        justOne: boolean,
    ): Promise<mongo.DeleteWriteOpResultObject> {
        const collection = this.client.getCollection(collectionName);

        if (justOne) {
            return collection.deleteOne(filter);
        }
        return collection.deleteMany(filter);
    }
}
