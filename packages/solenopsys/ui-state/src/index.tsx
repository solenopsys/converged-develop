import $, { store } from "@solenopsys/converged-reactive";
import { createContext, loadModule } from "@solenopsys/converged-renderer";
import { UiEvents } from "@solenopsys/converged-renderer";


let UiContext



type ConfigEntry={
	module:string;
	state:any;
}

async function init(entry: ConfigEntry) {
	const moduleName = entry.module;
	const mod = await loadModule(moduleName);
	const uiState = store(entry.state);
	UiContext = createContext<any>(uiState);
	
	mod.createLayout("layout", loadModule, entry.state);



//	await load("@solenopsys/mf-landing");
}

export { UiContext, init };

