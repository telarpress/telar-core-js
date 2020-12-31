import * as Koa from 'koa';
import Router from '@koa/router';
import { IServiceProvider } from './IServiceProvider';
import { IncomingMessage, ServerResponse } from 'http';
import { Http2ServerRequest, Http2ServerResponse } from 'http2';

export interface EndpointRouterProps {
    /**
     * Gets or sets the IServiceProvider that provides access to the request's service container.
     */
    requestServices: IServiceProvider;
}

export type Middleware<StateT = any, CustomT = {}> = Koa.Middleware<StateT, CustomT & EndpointRouterProps>;
export type RouterMiddleware<StateT = any, CustomT = {}> = Router.Middleware<StateT, CustomT & EndpointRouterProps>;

export type HostHandler = (
    req: IncomingMessage | Http2ServerRequest,
    res: ServerResponse | Http2ServerResponse,
) => void;

export const CoreMetaTypes = {
    DataRepository: Symbol.for('DataRepository'),
};
