export async function modProcessing(modName: string, mod) {
	//console.log("POST PROCESSING", modName);
}

export async function loadModule(moduleName: string) {
	console.log("LOAD MODULE", moduleName);
	const modUrl =moduleName // moduleName.replace("@", "/packages/");

	//@ts-ignore
	const mod = await import(modUrl);
	//modProcessing(moduleName, mod);
	return mod;
}



export class MicroFrontendsCache<T> {
	public readonly components: { [key: string]: T } = {};
	modules: { [key: string]: any } = {};

	async load(importPath: string) {
		if(this.modules[importPath]){
			console.log("LOADED",importPath)
		}else{
			const importModule = await loadModule(importPath);
			const componentsMap = await importModule.createMicrofronend();
			Object.keys(componentsMap).forEach((key) => {
                console.log("COMPONENT Set",key)
				this.components[key] = componentsMap[key];
			});
			this.modules[importPath]=componentsMap;
		}
	
	}

	get(key: string) {
		return this.components[key];
	}

	set(key: string, value: T) {
		this.components[key] = value;
	}
}