export function shouldUpdateScroll({
    routerProps,
    prevRouterProps
}) {
    return routerProps.location.pathname !== prevRouterProps.location.pathname;
}
