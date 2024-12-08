import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes } from './routes/routes';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/query-client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './index.css'

createRoot(document.getElementById('root')!).render(
  	<StrictMode>
		<HelmetProvider>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
				<Routes />
			</QueryClientProvider>
		</HelmetProvider>
  	</StrictMode>
);
