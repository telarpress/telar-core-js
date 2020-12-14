import { IHostConfig } from './Host';
import { IWebHostBuilder } from './IWebHostBuilder';

export class WebHostBuilder extends IWebHostBuilder {
    properties: Record<string, unknown>;

    private config: IHostConfig;
    constructor(config: IHostConfig, properties: Record<string, unknown>) {
        super();
        this.config = config;
        this.properties = properties;
    }

    getSetting(key: string): unknown {
        return this.getSettings()[key];
    }

    getSettings(): Record<string, unknown> {
        return Object.freeze(this.config.appsettings);
    }

    useSetting(key: string, value: unknown): IWebHostBuilder {
        this.config.appsettings[key] = value;
        return this;
    }
}
