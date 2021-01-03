import { ConfigStore } from './config';
export { setConfig, getConfig, DBType, ConfigStore, CoreConfig } from './config';
export * as server from './server';
export * from './server';
export * as data from './data';
export * from './data';

export type Initiazlizer = ConfigStore;

export { EndpointRouterProps, Middleware, RouterMiddleware, HostHandler } from './application';
export { COMMON, TYPE, METADATA_KEY } from './constants';
