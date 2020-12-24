import { interfaces, ContainerModule, AsyncContainerModule, MetadataReader, Container } from 'inversify';
import { IServiceCollection } from './IServiceCollection';

export class ServiceCollection extends IServiceCollection {
    properties: Record<string, any>;
    private container: Container;
    constructor(properties: Record<string, any>, container: Container) {
        super();
        this.container = container;
        this.properties = properties;
    }

    bind<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): interfaces.BindingToSyntax<T> {
        return this.container.bind(serviceIdentifier);
    }
    rebind<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): interfaces.BindingToSyntax<T> {
        return this.container.bind(serviceIdentifier);
    }
    unbind(serviceIdentifier: interfaces.ServiceIdentifier<any>): void {
        this.container.unbind(serviceIdentifier);
    }
    unbindAll(): void {
        this.container.unbindAll();
    }
    isBound(serviceIdentifier: interfaces.ServiceIdentifier<any>): boolean {
        return this.container.isBound(serviceIdentifier);
    }
    isBoundNamed(serviceIdentifier: interfaces.ServiceIdentifier<any>, named: string | number | symbol): boolean {
        return this.container.isBoundNamed(serviceIdentifier, named);
    }
    isBoundTagged(
        serviceIdentifier: interfaces.ServiceIdentifier<any>,
        key: string | number | symbol,
        value: any,
    ): boolean {
        return this.container.isBoundTagged(serviceIdentifier, key, value);
    }
    get<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): T {
        return this.container.get(serviceIdentifier);
    }
    getNamed<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>, named: string | number | symbol): T {
        return this.container.getNamed(serviceIdentifier, named);
    }
    getTagged<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>, key: string | number | symbol, value: any): T {
        return this.container.getTagged(serviceIdentifier, key, value);
    }
    getAll<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): T[] {
        return this.container.getAll(serviceIdentifier);
    }
    getAllTagged<T>(
        serviceIdentifier: interfaces.ServiceIdentifier<T>,
        key: string | number | symbol,
        value: any,
    ): T[] {
        return this.container.getAllTagged(serviceIdentifier, key, value);
    }
    getAllNamed<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>, named: string | number | symbol): T[] {
        return this.container.getAllNamed(serviceIdentifier, named);
    }
    resolve<T>(constructorFunction: interfaces.Newable<T>): T {
        return this.container.resolve(constructorFunction);
    }
    load(...modules: ContainerModule[]): void {
        return this.container.load(...modules);
    }
    loadAsync(...modules: AsyncContainerModule[]): Promise<void> {
        return this.container.loadAsync(...modules);
    }
    unload(...modules: ContainerModule[]): void {
        return this.container.unload(...modules);
    }
    applyCustomMetadataReader(metadataReader: MetadataReader): void {
        return this.container.applyCustomMetadataReader(metadataReader);
    }
    applyMiddleware(...middleware: interfaces.Middleware[]): void {
        return this.container.applyMiddleware(...middleware);
    }
    snapshot(): void {
        this.container.snapshot();
    }
    restore(): void {
        this.container.restore();
    }
    createChild(): Container {
        return this.container.createChild();
    }
}
