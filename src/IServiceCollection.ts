import { BaseContainer } from './BaseContainer';

export abstract class IServiceCollection extends BaseContainer {
    /**
     * Gets a key/value collection that can be used to share data between middleware.
     */
    abstract properties: Record<string, any>;
}
