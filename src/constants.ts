export const TYPE = {
    AuthProvider: Symbol.for('AuthProvider'),
    Controller: Symbol.for('Controller'),
    HttpContext: Symbol.for('HttpContext'),
};

export const METADATA_KEY = {
    controller: 'telar-core:controller',
    controllerMethod: 'telar-core:controller-method',
    controllerParameter: 'telar-core:controller-parameter',
    httpContext: 'telar-core:httpcontext',
};

export const COMMON = {
    routerRegisterd: 'routerRegisterd',
    router: 'router',
    container: 'container',
};
