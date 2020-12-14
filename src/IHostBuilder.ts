import { HostHandler } from './application';

export abstract class IHostBuilder {
    /**
     * A central location for sharing state between components during the host building process.
     */
    abstract readonly properties: Record<string, unknown>;

    /**
     * Run middlware server
     */
    abstract run(): HostHandler;
}
