export abstract class IWebHostBuilder {
    /**
     * A central location for sharing state between components during the host building process.
     */
    abstract properties: Record<string, unknown>;

    /**
     * Get the setting value from the configuration.
     */
    abstract getSetting(key: string): unknown;

    /**
     * Get the all settings value from the configuration.
     */
    abstract getSettings(): Record<string, unknown>;

    /**
     * Add or replace a setting in the configuration.
     */
    abstract useSetting(key: string, value: unknown): IWebHostBuilder;
}
