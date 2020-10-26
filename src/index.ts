import config, { CoreConfig } from './config';

function init(coreConfig: CoreConfig): void {
    console.log('[INFO] Initializing telar core config ', coreConfig);
    config.setConfig(coreConfig);
    console.log('[INFO] Telar core config is initilized');
}

export default {
    init,
};
