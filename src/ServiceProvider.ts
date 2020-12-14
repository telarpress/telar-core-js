import { IServiceProvider } from './IServiceProvider';
import { Container } from 'inversify';

export class ServiceProvider implements IServiceProvider {
    private container: Container;
    constructor(container: Container) {
        this.container = container;
    }

    GetService<T>(serviceType: new (...args: any[]) => T): T {
        return this.container.resolve<T>(serviceType);
    }
}
