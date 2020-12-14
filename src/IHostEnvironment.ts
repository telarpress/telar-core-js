/**
 * Provides information about the hosting environment an application is running in.
 */
export abstract class IHostEnvironment {
    /**
     * Gets or sets the name of the application.
     */
    abstract applicationName: string;

    /**
     * Gets or sets the name of the environment. The host automatically sets this property
     * to the value of the of the "environment" key as specified in configuration.
     */
    abstract environmentName: string;
}
