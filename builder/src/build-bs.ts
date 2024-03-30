import { join } from "path";
import { indexHtmlTransform } from "./tools/html";
import { copileLibrary } from "./build";

function extractModules(obj: any) {
	const modules = new Set();

	function extractModulesFromObject(obj: any) {
		if (typeof obj === "object" && obj !== null) {
			if (obj.hasOwnProperty("module")) {
				modules.add(obj.module);
			}

			for (const value of Object.values(obj)) {
				extractModulesFromObject(value);
			}
		} else if (Array.isArray(obj)) {
			obj.forEach(extractModulesFromObject);
		}
	}

	extractModulesFromObject(obj);
	return Array.from(modules);
}

process.chdir("../");

async function load() {
	const fileName = "./bootstraps/solenopsys/bs-solenopsys/entry.json";

	const modules = extractModules(await Bun.file(fileName).json());
	console.log("MODULES", modules);
}

function buildConfigMap() {
	const configMap: { [key: string]: string } = {};
	
	return configMap;
}

async function buildHtml(dirBs: string) {
	const dirPath = "../configuration/";
	const htmlStrng = await Bun.file(join(dirPath, "/index.html")).text();
	const scriptString = await Bun.file(join(dirPath, "/index.js")).text();
	const entryString = await Bun.file(join(dirBs, "/entry.json")).text();




	const htmlContent = await indexHtmlTransform(
		htmlStrng,
		scriptString,
		CONFIG_MAP,
		entryString,
	);
}
