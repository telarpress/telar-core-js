import Router from '@koa/router';
import * as Koa from 'koa';
import { RouterMiddleware } from './application';

export interface IEndpointRouteBuilder<StateT = any, CustomT = {}> {
    /**
     * Use given middleware.
     *
     * Middleware run in the order they are defined by `.use()`. They are invoked
     * sequentially, requests start at the first middleware and work their way
     * "down" the middleware stack.
     */
    use(...middleware: Array<RouterMiddleware<StateT, CustomT>>): Router<StateT, CustomT>;
    use(
        path: string | string[] | RegExp,
        ...middleware: Array<RouterMiddleware<StateT, CustomT>>
    ): Router<StateT, CustomT>;

    /**
     * HTTP get method
     */
    get(
        name: string,
        path: string | RegExp,
        ...middleware: Array<RouterMiddleware<StateT, CustomT>>
    ): Router<StateT, CustomT>;
    get(
        path: string | RegExp | Array<string | RegExp>,
        ...middleware: Array<RouterMiddleware<StateT, CustomT>>
    ): Router<StateT, CustomT>;
    get<T, U>(
        name: string,
        path: string | RegExp,
        middleware: Koa.Middleware<T, U>,
        routeHandler: RouterMiddleware<StateT & T, CustomT & U>,
    ): Router<StateT & T, CustomT & U>;
    get<T, U>(
        path: string | RegExp | Array<string | RegExp>,
        middleware: Koa.Middleware<T, U>,
        routeHandler: RouterMiddleware<StateT & T, CustomT & U>,
    ): Router<StateT & T, CustomT & U>;

    /**
     * HTTP post method
     */
    post(
        name: string,
        path: string | RegExp,
        ...middleware: Array<RouterMiddleware<StateT, CustomT>>
    ): Router<StateT, CustomT>;
    post(
        path: string | RegExp | Array<string | RegExp>,
        ...middleware: Array<RouterMiddleware<StateT, CustomT>>
    ): Router<StateT, CustomT>;
    post<T, U>(
        name: string,
        path: string | RegExp,
        middleware: Koa.Middleware<T, U>,
        routeHandler: RouterMiddleware<StateT & T, CustomT & U>,
    ): Router<StateT & T, CustomT & U>;
    post<T, U>(
        path: string | RegExp | Array<string | RegExp>,
        middleware: Koa.Middleware<T, U>,
        routeHandler: RouterMiddleware<StateT & T, CustomT & U>,
    ): Router<StateT & T, CustomT & U>;

    /**
     * HTTP put method
     */
    put(
        name: string,
        path: string | RegExp,
        ...middleware: Array<RouterMiddleware<StateT, CustomT>>
    ): Router<StateT, CustomT>;
    put(
        path: string | RegExp | Array<string | RegExp>,
        ...middleware: Array<RouterMiddleware<StateT, CustomT>>
    ): Router<StateT, CustomT>;
    put<T, U>(
        name: string,
        path: string | RegExp,
        middleware: Koa.Middleware<T, U>,
        routeHandler: RouterMiddleware<StateT & T, CustomT & U>,
    ): Router<StateT & T, CustomT & U>;
    put<T, U>(
        path: string | RegExp | Array<string | RegExp>,
        middleware: Koa.Middleware<T, U>,
        routeHandler: RouterMiddleware<StateT & T, CustomT & U>,
    ): Router<StateT & T, CustomT & U>;

    /**
     * HTTP link method
     */
    link(
        name: string,
        path: string | RegExp,
        ...middleware: Array<RouterMiddleware<StateT, CustomT>>
    ): Router<StateT, CustomT>;
    link(
        path: string | RegExp | Array<string | RegExp>,
        ...middleware: Array<RouterMiddleware<StateT, CustomT>>
    ): Router<StateT, CustomT>;
    link<T, U>(
        name: string,
        path: string | RegExp,
        middleware: Koa.Middleware<T, U>,
        routeHandler: RouterMiddleware<StateT & T, CustomT & U>,
    ): Router<StateT & T, CustomT & U>;
    link<T, U>(
        path: string | RegExp | Array<string | RegExp>,
        middleware: Koa.Middleware<T, U>,
        routeHandler: RouterMiddleware<StateT & T, CustomT & U>,
    ): Router<StateT & T, CustomT & U>;

    /**
     * HTTP unlink method
     */
    unlink(
        name: string,
        path: string | RegExp,
        ...middleware: Array<RouterMiddleware<StateT, CustomT>>
    ): Router<StateT, CustomT>;
    unlink(
        path: string | RegExp | Array<string | RegExp>,
        ...middleware: Array<RouterMiddleware<StateT, CustomT>>
    ): Router<StateT, CustomT>;
    unlink<T, U>(
        name: string,
        path: string | RegExp,
        middleware: Koa.Middleware<T, U>,
        routeHandler: RouterMiddleware<StateT & T, CustomT & U>,
    ): Router<StateT & T, CustomT & U>;
    unlink<T, U>(
        path: string | RegExp | Array<string | RegExp>,
        middleware: Koa.Middleware<T, U>,
        routeHandler: RouterMiddleware<StateT & T, CustomT & U>,
    ): Router<StateT & T, CustomT & U>;

    /**
     * HTTP delete method
     */
    delete(
        name: string,
        path: string | RegExp,
        ...middleware: Array<RouterMiddleware<StateT, CustomT>>
    ): Router<StateT, CustomT>;
    delete(
        path: string | RegExp | Array<string | RegExp>,
        ...middleware: Array<RouterMiddleware<StateT, CustomT>>
    ): Router<StateT, CustomT>;
    delete<T, U>(
        name: string,
        path: string | RegExp,
        middleware: Koa.Middleware<T, U>,
        routeHandler: RouterMiddleware<StateT & T, CustomT & U>,
    ): Router<StateT & T, CustomT & U>;
    delete<T, U>(
        path: string | RegExp | Array<string | RegExp>,
        middleware: Koa.Middleware<T, U>,
        routeHandler: RouterMiddleware<StateT & T, CustomT & U>,
    ): Router<StateT & T, CustomT & U>;

    /**
     * Alias for `router.delete()` because delete is a reserved word
     */
    del(
        name: string,
        path: string | RegExp,
        ...middleware: Array<RouterMiddleware<StateT, CustomT>>
    ): Router<StateT, CustomT>;
    del(
        path: string | RegExp | Array<string | RegExp>,
        ...middleware: Array<RouterMiddleware<StateT, CustomT>>
    ): Router<StateT, CustomT>;
    del<T, U>(
        name: string,
        path: string | RegExp,
        middleware: Koa.Middleware<T, U>,
        routeHandler: RouterMiddleware<StateT & T, CustomT & U>,
    ): Router<StateT & T, CustomT & U>;
    del<T, U>(
        path: string | RegExp | Array<string | RegExp>,
        middleware: Koa.Middleware<T, U>,
        routeHandler: RouterMiddleware<StateT & T, CustomT & U>,
    ): Router<StateT & T, CustomT & U>;

    /**
     * HTTP head method
     */
    head(
        name: string,
        path: string | RegExp,
        ...middleware: Array<RouterMiddleware<StateT, CustomT>>
    ): Router<StateT, CustomT>;
    head(
        path: string | RegExp | Array<string | RegExp>,
        ...middleware: Array<RouterMiddleware<StateT, CustomT>>
    ): Router<StateT, CustomT>;
    head<T, U>(
        name: string,
        path: string | RegExp,
        middleware: Koa.Middleware<T, U>,
        routeHandler: RouterMiddleware<StateT & T, CustomT & U>,
    ): Router<StateT & T, CustomT & U>;
    head<T, U>(
        path: string | RegExp | Array<string | RegExp>,
        middleware: Koa.Middleware<T, U>,
        routeHandler: RouterMiddleware<StateT & T, CustomT & U>,
    ): Router<StateT & T, CustomT & U>;

    /**
     * HTTP options method
     */
    options(
        name: string,
        path: string | RegExp,
        ...middleware: Array<RouterMiddleware<StateT, CustomT>>
    ): Router<StateT, CustomT>;
    options(
        path: string | RegExp | Array<string | RegExp>,
        ...middleware: Array<RouterMiddleware<StateT, CustomT>>
    ): Router<StateT, CustomT>;
    options<T, U>(
        name: string,
        path: string | RegExp,
        middleware: Koa.Middleware<T, U>,
        routeHandler: RouterMiddleware<StateT & T, CustomT & U>,
    ): Router<StateT & T, CustomT & U>;
    options<T, U>(
        path: string | RegExp | Array<string | RegExp>,
        middleware: Koa.Middleware<T, U>,
        routeHandler: RouterMiddleware<StateT & T, CustomT & U>,
    ): Router<StateT & T, CustomT & U>;

    /**
     * HTTP patch method
     */
    patch(
        name: string,
        path: string | RegExp,
        ...middleware: Array<RouterMiddleware<StateT, CustomT>>
    ): Router<StateT, CustomT>;
    patch(
        path: string | RegExp | Array<string | RegExp>,
        ...middleware: Array<RouterMiddleware<StateT, CustomT>>
    ): Router<StateT, CustomT>;
    patch<T, U>(
        name: string,
        path: string | RegExp,
        middleware: Koa.Middleware<T, U>,
        routeHandler: RouterMiddleware<StateT & T, CustomT & U>,
    ): Router<StateT & T, CustomT & U>;
    patch<T, U>(
        path: string | RegExp | Array<string | RegExp>,
        middleware: Koa.Middleware<T, U>,
        routeHandler: RouterMiddleware<StateT & T, CustomT & U>,
    ): Router<StateT & T, CustomT & U>;

    /**
     * Register route with all methods.
     */
    all(
        name: string,
        path: string | RegExp,
        ...middleware: Array<RouterMiddleware<StateT, CustomT>>
    ): Router<StateT, CustomT>;
    all(
        path: string | RegExp | Array<string | RegExp>,
        ...middleware: Array<RouterMiddleware<StateT, CustomT>>
    ): Router<StateT, CustomT>;
    all<T, U>(
        name: string,
        path: string | RegExp,
        middleware: Koa.Middleware<T, U>,
        routeHandler: RouterMiddleware<StateT & T, CustomT & U>,
    ): Router<StateT & T, CustomT & U>;
    all<T, U>(
        path: string | RegExp | Array<string | RegExp>,
        middleware: Koa.Middleware<T, U>,
        routeHandler: RouterMiddleware<StateT & T, CustomT & U>,
    ): Router<StateT & T, CustomT & U>;

    /**
     * Set the path prefix for a Router instance that was already initialized.
     */
    prefix(prefix: string): Router<StateT, CustomT>;

    /**
     * Returns router middleware which dispatches a route matching the request.
     */
    routes(): RouterMiddleware<StateT, CustomT>;

    /**
     * Returns router middleware which dispatches a route matching the request.
     */
    middleware(): RouterMiddleware<StateT, CustomT>;

    /**
     * Returns separate middleware for responding to `OPTIONS` requests with
     * an `Allow` header containing the allowed methods, as well as responding
     * with `405 Method Not Allowed` and `501 Not Implemented` as appropriate.
     */
    allowedMethods(options?: Router.RouterAllowedMethodsOptions): RouterMiddleware<StateT, CustomT>;

    /**
     * Redirect `source` to `destination` URL with optional 30x status `code`.
     *
     * Both `source` and `destination` can be route names.
     */
    redirect(source: string, destination: string, code?: number): Router<StateT, CustomT>;

    /**
     * Create and register a route.
     */
    register(
        path: string | RegExp,
        methods: string[],
        middleware: RouterMiddleware<StateT, CustomT> | Array<RouterMiddleware<StateT, CustomT>>,
        opts?: Router.LayerOptions,
    ): Router.Layer;

    /**
     * Lookup route with given `name`.
     */
    route(name: string): Router.Layer;
    route(name: string): boolean;

    /**
     * Generate URL for route. Takes either map of named `params` or series of
     * arguments (for regular expression routes)
     *
     * router = new Router();
     * router.get('user', "/users/:id", ...
     *
     * router.url('user', { id: 3 });
     * // => "/users/3"
     *
     * Query can be generated from third argument:
     *
     * router.url('user', { id: 3 }, { query: { limit: 1 } });
     * // => "/users/3?limit=1"
     *
     * router.url('user', { id: 3 }, { query: "limit=1" });
     * // => "/users/3?limit=1"
     *
     */
    url(name: string, params?: any, options?: Router.UrlOptionsQuery): string;
    url(name: string, params?: any, options?: Router.UrlOptionsQuery): Error;

    /**
     * Generate URL from url pattern and given `params`.
     */
    url(path: string | RegExp, params: object): string;

    /**
     * Match given `path` and return corresponding routes.
     */
    match(path: string, method: string): Router.RoutesMatch;

    /**
     * Run middleware for named route parameters. Useful for auto-loading or validation.
     */
    param(param: string, middleware: Router.ParamMiddleware): Router<StateT, CustomT>;
}
