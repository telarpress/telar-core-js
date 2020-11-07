import { ConfigStore } from './config';
import { LogUtil } from './utils';

export { setConfig, getConfig, DBType, ConfigStore, CoreConfig } from './config';
export * as utils from './utils';
export * as server from './server';
export * as data from './data';

export const log = LogUtil;

export type Initiazlizer = ConfigStore;
