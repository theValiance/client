import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom";
import { veryLazy } from "../util/very-lazy";
//import { type QueryClient, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";


function createRouter() {
	return createBrowserRouter(
		createRoutesFromElements([
			<Route lazy={veryLazy(import('../layouts/main'))} >
				<Route path='/home' lazy={veryLazy(import('./home'))} />
				<Route path='/rate/:vid' lazy={veryLazy(import('./rate'))} />
			</Route>,
			<Route path='*' element={<Navigate to='/home' />} />,
		])
	);
}

export function Routes() {
	//const queryClient = useQueryClient();
	const router = useMemo(() => createRouter(), []);
	return <RouterProvider router={router} />;
}