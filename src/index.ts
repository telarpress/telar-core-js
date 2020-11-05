import { ConfigStore } from './config';

export { setConfig, getConfig, DBType, ConfigStore, CoreConfig } from './config';
export * as utils from './utils';
export * as server from './server';
export * as data from './data';

export type Initiazlizer = ConfigStore;
