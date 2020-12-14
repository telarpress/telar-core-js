import config, { ConfigStore } from '../../src/config';

describe('Configuration', () => {
    test('Should set the config', () => {
        const configStore: ConfigStore = {
            global: {
                dbHost: 'dbhost://db',
                dbPassword: 'password',
                database: 'test',
            },
        };
        config.setConfig(configStore);
        const configResult = config.getConfig();
        expect(configResult).toEqual(configStore);
    });
});
