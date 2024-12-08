/**
 * @author: Abigail Becher Nienhaus
 * 
 * This mess of a file implements the veryLazy helper. This is designed to make lazily importing route modules cleaner and easier.
 * Depending on what the imported module contains (it either does or does not contain query-fied loaders and actions) it will either require or disallow the queryClient argument.
 */

import type { RouteObject, ActionFunction, LoaderFunction } from 'react-router-dom';
import type { QueryClient } from '@tanstack/react-query';

//keys to remove from the RouteObject type
//this is lifted directly from React Router's type definitions file
type ImmutableRouteKey = 'lazy' | 'caseSensitive' | 'path' | 'id' | 'index' | 'children';
//utility to specify that at least one property of a type is required
//this is lifted directly from React Router's type definitions file
type RequireOne<T, Key = keyof T> = Exclude<{
	[K in keyof T]: K extends Key ? Omit<T, K> & Required<Pick<T, K>> : never;
}[keyof T], undefined>;

//types for queryLoader and queryAction, which are querified loaders and actions
type QueryLoaderFunction = (queryClient: QueryClient) => LoaderFunction;
type QueryActionFunction = (queryClient: QueryClient) => ActionFunction;

//this is the route object with the unwanted keys stripped
type ImmutableRouteObject = Omit<RouteObject, ImmutableRouteKey>;

//This is the argument for the function definition - it requires at least one property from either the ImmutableRouteObject, or additionally, the queryLoader or queryAction
type AnyRouteObject = RequireOne<ImmutableRouteObject & {
	queryLoader?: QueryLoaderFunction;
	queryAction?: QueryActionFunction;
}>;

//This is the argument for the first overload. It requires at least one property from the ImmutableRouteObject, and disallows both queryLoader and queryAction properties
type NonQueryRouteObject = RequireOne<ImmutableRouteObject> & {
	queryLoader?: never;
	queryAction?: never;
};

//I know this is unreadable, but this type functions as follows:
//To summarize, this route can have either queryLoader or loader, and either queryAction or action, but it MUST have one of either queryAction or queryLoader, and additionally
//it may or may not have any of the properties from ImmutableRouteObject
type QueryRouteObject = (({
	queryLoader?: QueryLoaderFunction;
	loader?: never;
} | {
	queryLoader?: never;
	loader?: RouteObject['loader'];
}) & ({
	queryAction?: QueryActionFunction;
	action?: never;
} | {
	queryAction?: never;
	action?: RouteObject['action'];
})) & ({
	queryLoader: QueryLoaderFunction;
} | {
	queryAction: QueryActionFunction;
}) & Partial<ImmutableRouteObject>;

/**
 * This function lazily imports Component, ErrorComponent, loader, action, etc from a file and attaches them to a Route
 * @param module A promise that will resolve to an imported module
 */
function veryLazy(module: Promise<NonQueryRouteObject>): () => Promise<NonQueryRouteObject>;
/**
 * This function lazily imports Component, ErrorComponent, loader, etc from a file and attaches them to a route.
 * 
 * Additionally, if the module defines either queryLoader or queryAction, it will call them with queryClient as an argument, and return the result as loader and action, respectively.
 * @param module A promise that will resolve to an imported module
 * @param queryClient The query client to be passed to the queryLoader and queryAction functions, if defined
 */
function veryLazy(module: Promise<QueryRouteObject>, queryClient: QueryClient): () => Promise<NonQueryRouteObject>;
function veryLazy<T extends AnyRouteObject>(module: Promise<T>, queryClient?: QueryClient): () => Promise<NonQueryRouteObject> {
	return async () => {
		const { loader, queryLoader, action, queryAction, ...rest } = await module;
		let resolvedLoader, resolvedAction;
		if (queryLoader != null) resolvedLoader = queryLoader(queryClient!);
		else resolvedLoader = loader;
		if (queryAction != null) resolvedAction = queryAction(queryClient!);
		else resolvedAction = action;
		return {
			loader: resolvedLoader,
			action: resolvedAction,
			...rest
		} as NonQueryRouteObject;
	};
}

export { veryLazy };