import { Middleware } from './application';
import { IApplicationBuilder } from './IApplicationBuilder';
import { IServiceProvider } from './IServiceProvider';
import * as Koa from 'koa';
export class ApplicationBuilder<StateT, CustomT> extends IApplicationBuilder<StateT, CustomT> {
    /**
     * Gets or sets the System.IServiceProvider that provides access to the application's
     * service container.
     */
    applicationServices: IServiceProvider;

    /**
     * Gets a key/value collection that can be used to share data between middleware.
     */
    properties: Record<string, unknown>;

    constructor(properties: Record<string, unknown>, applicationServices: IServiceProvider) {
        super();
        this.properties = properties;
        this.applicationServices = applicationServices;
    }

    /**
     * Adds a middleware delegate to the application's request pipeline.
     */
    use(...middleware: Array<Middleware<StateT, CustomT>>): IApplicationBuilder<StateT, CustomT> {
        const { context } = this.properties as { context: Koa };
        middleware.forEach((item) => {
            context.use(item);
        });
        return this;
    }
}
