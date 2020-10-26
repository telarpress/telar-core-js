import config from '../../config';

import * as mongo from 'mongodb';
import MongoHeartbeat from 'mongo-heartbeat';

export class MongoClient {
    private client: mongo.MongoClient;
    private constructor(_client: mongo.MongoClient) {
        this.client = _client;
    }

    /**
     * Create a new mongoDB client
     */
    static async NewMongoClient(): Promise<MongoClient> {
        const { appConfig } = config.getConfig();
        const { mongoPassword } = appConfig;
        const mongoDBHost = appConfig.mongoDBHost;
        const url = mongoDBHost.replace('%s', mongoPassword);
        console.log('[INFO] MongoDB URL ', url);

        const newClinet = new mongo.MongoClient(url, { useNewUrlParser: true });
        const client = await newClinet.connect();

        const mongoClient: MongoClient = new MongoClient(client);
        return mongoClient;
    }

    /**
     * Close the db and its underlying connections
     */
    async close(): Promise<void> {
        if (!this.client) {
            throw new Error('MongoDB client is nil, be sure you have invoked NewClient() function already!');
        }
        await this.client.close();
    }

    /**
     * Fetch a specific collection (containing the actual collection information)
     * @param collectionName Collection name
     */
    getCollection<T>(collectionName: string): mongo.Collection<T> {
        if (!this.client) {
            throw new Error('MongoDB client is nil, be sure you have invoked NewClient() function already!');
        }
        const { appConfig } = config.getConfig();

        const database = this.client.db(appConfig.database);
        const collection = database.collection(collectionName);
        return collection;
    }

    /**
     * Create a new Db instance sharing the current socket connections
     */
    getDb(): mongo.Db {
        const { appConfig } = config.getConfig();

        if (!this.client) {
            throw new Error('MongoDB client is nil, be sure you have invoked NewClient() function already!');
        }
        const database = this.client.db(appConfig.database);
        return database;
    }

    /**
     * Ping db connection
     */
    ping(): any {
        if (!this.client) {
            throw new Error('MongoDB client is nil, be sure you have invoked NewClient() function already!');
        }
        const { appConfig } = config.getConfig();
        const database = this.client.db(appConfig.database);
        const hb = MongoHeartbeat(database, {
            interval: 5000, // defaults to 5000 ms,
            timeout: 10000, // defaults to 10000 ms
            tolerance: 2, // defaults to 1 attempt
        });
        return hb;
    }
}
