export const IMPORT_MAP = {
	"@solenopsys/converged-reactive":
		"/library/solenopsys/converged-reactive.mjs",
	"@solenopsys/converged-renderer":
		"/library/solenopsys/converged-renderer.mjs",
	"@solenopsys/converged-router": "/library/solenopsys/converged-router.mjs",
	"@solenopsys/converged-style": "/library/solenopsys/converged-style.mjs",
	"@solenopsys/converged-renderer/jsx-dev-runtime":
		"/library/solenopsys/converged-renderer.mjs",
	"@solenopsys/ui-navigate": "/packages/solenopsys/ui-navigate",
	"@solenopsys/ui-controls": "/packages/solenopsys/ui-controls",
	"@solenopsys/ui-layouts": "/packages/solenopsys/ui-layouts",
	"@solenopsys/mf-landing": "/packages/solenopsys/mf-landing",
	"@solenopsys/mf-content": "/packages/solenopsys/mf-content",
	"@solenopsys/ui-content": "/packages/solenopsys/ui-content",
	"@solenopsys/ui-state": "/packages/solenopsys/ui-state",
	"@solenopsys/lt-website": "/packages/solenopsys/lt-website",

};

export const PACKAGE = "package.json";

export const CORE_LIBS = [
	"@solenopsys/converged-reactive",
	"@solenopsys/converged-renderer",
	"@solenopsys/converged-router",
	"@solenopsys/converged-style",
];

export const DEFAULT_EXTERNAL = [...CORE_LIBS];

export const REMOTE_HOST = "http://solenopsys.org";
export const REMOTE_HOST_PINNING = "http://pinning.solenopsys.org";

export const REMOTE_PREFEIX = "https://zero.node.solenopsys.org/ipfs/";

export const PRO_DIST = "distp";


export const IPFS_HOST = "ipfs-api.solenopsys.org";
export const IPFS_PORT = 80;