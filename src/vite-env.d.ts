/// <reference types="vite/client" />

//interface to define the injected env variables' types for typechecking
interface ImportMetaEnv {
	readonly EXPOSED_API_ADDRESS: string;
	// more env variables...
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}