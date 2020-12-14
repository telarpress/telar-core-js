import { Middleware } from './application';
import { IServiceProvider } from './IServiceProvider';

/**
 * Defines a class that provides the mechanisms to configure an application's request pipeline.
 */
export abstract class IApplicationBuilder<StateT, CustomT> {
    /**
     * Gets or sets the System.IServiceProvider that provides access to the application's
     * service container.
     */
    abstract applicationServices: IServiceProvider;

    /**
     * Gets a key/value collection that can be used to share data between middleware.
     */
    abstract properties: Record<string, any>;

    /**
     * Adds a middleware delegate to the application's request pipeline.
     */
    abstract use(...middleware: Array<Middleware<StateT, CustomT>>): IApplicationBuilder<StateT, CustomT>;
}
