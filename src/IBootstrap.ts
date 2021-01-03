import { IApplicationBuilder } from './IApplicationBuilder';
import { IConfiguration } from './IConfiguration';
import { IServiceCollection } from './IServiceCollection';
import { IWebHostEnvironment } from './IWebHostEnvironment';

export abstract class IBootstrap {
    abstract readonly configuration: IConfiguration;
    abstract configureServices(services: IServiceCollection): Promise<void>;
    abstract configure(app: IApplicationBuilder<any, {}>, env: IWebHostEnvironment): void;
}

declare module 'koa' {
    interface Request {
        body?: any;
        rawBody: string;
    }
}
