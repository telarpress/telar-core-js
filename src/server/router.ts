import config from '../config';
import server, { FunctionHandler, FunctionHandlerWR, RouteProtection } from './server';
import * as expressCore from 'express-serve-static-core';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

export class ServerRouter {
    private app: expressCore.Express;
    private constructor(_app: expressCore.Express) {
        this.app = _app;
    }
    /**
     * Create new server router
     * @param app Express object
     */
    public static NewServerRouter(app: expressCore.Express): ServerRouter {
        return new ServerRouter(app);
    }

    configure(): void {
        this.app.use(cookieParser());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.raw());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.text({ type: 'text/*' }));
        this.app.disable('x-powered-by');
    }

    get(path: expressCore.PathParams, handle: FunctionHandler, protection: RouteProtection): void {
        this.app.get(path, server.onReq(handle, protection));
    }

    head(path: expressCore.PathParams, handle: FunctionHandler, protection: RouteProtection): void {
        this.app.head(path, server.onReq(handle, protection));
    }

    post(path: expressCore.PathParams, handle: FunctionHandler, protection: RouteProtection): void {
        this.app.post(path, server.onReq(handle, protection));
    }

    put(path: expressCore.PathParams, handle: FunctionHandler, protection: RouteProtection): void {
        this.app.put(path, server.onReq(handle, protection));
    }

    patch(path: expressCore.PathParams, handle: FunctionHandler, protection: RouteProtection): void {
        this.app.patch(path, server.onReq(handle, protection));
    }

    deleteMethod(path: expressCore.PathParams, handle: FunctionHandler, protection: RouteProtection): void {
        this.app.delete(path, server.onReq(handle, protection));
    }

    getWR(path: expressCore.PathParams, handle: FunctionHandlerWR, protection: RouteProtection): void {
        this.app.get(path, server.reqWR(handle, protection));
    }

    headWR(path: expressCore.PathParams, handle: FunctionHandlerWR, protection: RouteProtection): void {
        this.app.head(path, server.reqWR(handle, protection));
    }

    postWR(path: expressCore.PathParams, handle: FunctionHandlerWR, protection: RouteProtection): void {
        this.app.post(path, server.reqWR(handle, protection));
    }

    putWR(path: expressCore.PathParams, handle: FunctionHandlerWR, protection: RouteProtection): void {
        this.app.put(path, server.reqWR(handle, protection));
    }

    patchWR(path: expressCore.PathParams, handle: FunctionHandlerWR, protection: RouteProtection): void {
        this.app.patch(path, server.reqWR(handle, protection));
    }

    deleteWR(path: expressCore.PathParams, handle: FunctionHandlerWR, protection: RouteProtection): void {
        this.app.delete(path, server.reqWR(handle, protection));
    }

    postFile(path: expressCore.PathParams, handle: FunctionHandlerWR, protection: RouteProtection): void {
        this.app.post(path, server.reqFileWR(handle, protection));
    }

    serveHTTP(w: expressCore.Response): void {
        const { appConfig } = config.getConfig();
        w.set('Access-Control-Allow-Credentials', 'true');
        w.set('Content-Type', 'application/json');
        w.set('Access-Control-Allow-Origin', appConfig.origin);
        w.set(
            'Access-Control-Allow-Headers',
            "'X-Requested-With, X-HTTP-Method-Override, Accept, Content-Type,access-control-allow-origin, access-control-allow-headers",
        );
    }
}
