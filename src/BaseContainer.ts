import { AsyncContainerModule, Container, ContainerModule, interfaces, MetadataReader } from 'inversify';

export abstract class BaseContainer {
    abstract bind<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): interfaces.BindingToSyntax<T>;
    abstract rebind<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): interfaces.BindingToSyntax<T>;
    abstract unbind(serviceIdentifier: interfaces.ServiceIdentifier<any>): void;
    abstract unbindAll(): void;
    abstract isBound(serviceIdentifier: interfaces.ServiceIdentifier<any>): boolean;
    abstract isBoundNamed(
        serviceIdentifier: interfaces.ServiceIdentifier<any>,
        named: string | number | symbol,
    ): boolean;
    abstract isBoundTagged(
        serviceIdentifier: interfaces.ServiceIdentifier<any>,
        key: string | number | symbol,
        value: any,
    ): boolean;
    abstract get<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): T;
    abstract getNamed<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>, named: string | number | symbol): T;
    abstract getTagged<T>(
        serviceIdentifier: interfaces.ServiceIdentifier<T>,
        key: string | number | symbol,
        value: any,
    ): T;
    abstract getAll<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>): T[];
    abstract getAllTagged<T>(
        serviceIdentifier: interfaces.ServiceIdentifier<T>,
        key: string | number | symbol,
        value: any,
    ): T[];
    abstract getAllNamed<T>(serviceIdentifier: interfaces.ServiceIdentifier<T>, named: string | number | symbol): T[];
    abstract resolve<T>(constructorFunction: interfaces.Newable<T>): T;
    abstract load(...modules: ContainerModule[]): void;
    abstract loadAsync(...modules: AsyncContainerModule[]): Promise<void>;
    abstract unload(...modules: ContainerModule[]): void;
    abstract applyCustomMetadataReader(metadataReader: MetadataReader): void;
    abstract applyMiddleware(...middleware: interfaces.Middleware[]): void;
    abstract snapshot(): void;
    abstract restore(): void;
    abstract createChild(): Container;
}
