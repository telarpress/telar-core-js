import EventBus from './EventBus';
import { HostBuilder } from './HostBuilder';
import { IHostBuilder } from './IHostBuilder';

export interface IHostConfig {
    appsettings: any;
    coresettings: {
        router: {
            prefix: string;
        };
    };
}

/**
 * Default core settings
 */
const defaultCoreSettings = {
    router: {
        prefix: '/',
    },
};

export class Host {
    /**
     * Initializes a new instance of the HostBuilder class
     * with pre-configured defaults.
     */
    public static createDefaultConfig(
        config: IHostConfig = { appsettings: {}, coresettings: defaultCoreSettings },
        evnentBus?: EventBus,
    ): IHostBuilder {
        return new HostBuilder({ config, evnentBus });
    }
}
