import { createContext, useContext,loadModule } from "@solenopsys/converged-renderer";
import { store, effect, } from "@solenopsys/converged-reactive";


const uiState = store({});

effect(() => {
	console.log("UI STATE", uiState);
});

const UiContext = createContext<any>(uiState);

const fc = useContext(UiContext);



async function init(entry: any) {
	const moduleName = entry.layout.module;
	const mod = await loadModule(moduleName);
	console.log("LAYOUT", entry);
	mod.createLayout("layout",  MfCache.loadModule, entry.layout, entry.routes);

	await MfCache.load("@solenopsys/mf-landing");

	fc.center = "center";
	fc.centerData = {};
}

export { init,  MfCache, UiContext };
