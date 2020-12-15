import { ConfigStore } from './config';
import { LogUtil } from './utils';

export { setConfig, getConfig, DBType, ConfigStore, CoreConfig } from './config';
export * as utils from './utils';
export * from './utils';
export * as server from './server';
export * from './server';
export * as data from './data';
export * from './data';

export const log = LogUtil;

export type Initiazlizer = ConfigStore;

export { EndpointRouterProps, Middleware, RouterMiddleware, HostHandler } from './application';
export { COMMON, TYPE, METADATA_KEY } from './constants';
