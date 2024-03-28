import { createContext, useContext } from "@solenopsys/converged-renderer";
import { store,effect } from "@solenopsys/converged-reactive";
import $ from "@solenopsys/converged-reactive";


async function modProcessing(modName: string, mod) {
	//console.log("POST PROCESSING", modName);
}

async function loadModule(moduleName: string) {
	console.log("LOAD MODULE", moduleName);
	const modUrl = moduleName.replace("@", "/packages/");

	//@ts-ignore
	const mod = await import(modUrl);
	//modProcessing(moduleName, mod);
	return mod;
}

async function init(entry: any) {
	const moduleName = entry.layout.module;
	const mod = await loadModule(moduleName);
	console.log("LAYOUT", entry);
	mod.createLayout("layout", loadModule, entry.layout.data, entry.routes);
}

class MicroFrontendsCache<T> {
	public readonly components: { [key: string]: T } = {};
	modules: { [key: string]: any } = {};

	async load(importPath: string) {
		if(this.modules[importPath]){
			console.log("LOADED",importPath)
		}else{
			const importModule = await loadModule(importPath);
			const componentsMap = await importModule.createMicrofronend();
			Object.keys(componentsMap).forEach((key) => {
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

const uiState = store ({
	top: undefined,
	central: undefined,
	left: undefined,
	bottom: undefined,
	leftData:undefined,
});


effect(()=>{
	console.log("UI STATE",uiState)
})




const UiContext = createContext<any>(uiState);

const fc=useContext(UiContext);
//fc.top="top-comp2";
const MfCache=new MicroFrontendsCache<any>();

export { init, loadModule, MfCache,UiContext };
