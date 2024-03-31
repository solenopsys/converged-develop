import { createContext, useContext } from "@solenopsys/converged-renderer";
import { store,effect } from "@solenopsys/converged-reactive";


import { MicroFrontendsCache,loadModule } from "./microfrontends";

const uiState = store ({
	top: undefined,
	center: undefined,
	left: undefined,
	bottom: undefined,
	leftData:undefined,
	centerData:undefined
});


effect(()=>{
	console.log("UI STATE",uiState)
})


const UiContext = createContext<any>(uiState);

const fc=useContext(UiContext);
 
const MfCache=new MicroFrontendsCache<any>();

async function init(entry: any) {
	const moduleName = entry.layout.module;
	const mod = await loadModule(moduleName);
	console.log("LAYOUT", entry);
	mod.createLayout("layout", loadModule, entry.layout.data, entry.routes);

	await MfCache.load("@solenopsys/mf-landing");
	setTimeout(()=>{
		console.log("MF CACHE",MfCache.components)
		fc.center="center";
		fc.centerData={}
	})
	

}

export { init, loadModule, MfCache,UiContext };
