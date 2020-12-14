import { IncomingMessage, ServerResponse } from 'http';
import { Http2ServerRequest, Http2ServerResponse } from 'http2';
import { IHostBuilder } from './IHostBuilder';
import Koa from 'koa';
import { COMMON } from './constants';

export class HostBuilder extends IHostBuilder {
    readonly properties: Record<string, any>;

    constructor(properties: Record<string, any>) {
        super();
        this.properties = properties;
    }

    run() {
        return (req: IncomingMessage | Http2ServerRequest, res: ServerResponse | Http2ServerResponse) => {
            console.log('All routes =>>>', this.properties[COMMON.router].routes().router.stack);
            (this.properties.context as Koa).callback()(req, res);
        };
    }
}
