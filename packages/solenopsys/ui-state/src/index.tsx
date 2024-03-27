async function modProcessing(modName: string, mod) {
	//console.log("POST PROCESSING", modName);
}

async function loadModule(moduleName: string) {
	console.log("LOAD MODULE", moduleName);
	const modUrl = moduleName.replace("@", "/packages/");

	//@ts-ignore
	const mod = await import(modUrl);
	modProcessing(moduleName, mod);
	return mod;
}

async function init(entry: any) {
	const moduleName = entry.layout.module;
	const mod = await loadModule(moduleName);
	console.log("LAYOUT", entry);
	mod.createLayout("layout", loadModule, entry.layout.data, entry.routes);
}

class MFCache<T> {
	public readonly components: { [key: string]: T } = {};

	async load(importPath: string, data: any) {
		const importModule = await loadModule(importPath);
		const componentsMap = await importModule.createMicrofronend(data);
		Object.keys(componentsMap).forEach((key) => {
			this.components[key] = componentsMap[key];
		});
	}

	get(key: string) {
		return this.components[key];
	}

	set(key: string, value: T) {
		this.components[key] = value;
	}
}

export { init, loadModule, MFCache };
