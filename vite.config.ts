import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  envPrefix: ["EXPOSED_", "VITE_"],
	css: {
		modules: {
			localsConvention: 'camelCaseOnly'
		}
	}
})
