import { PRO_DIST, REMOTE_PREFEIX } from "../confs";
import { getDirs } from "./dirs";

export function extractModules(obj: any) {
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


async function loadTest() {
	const fileName = "./bootstraps/solenopsys/bs-solenopsys/entry.json";

	const modules = extractModules(await Bun.file(fileName).json());
	console.log("MODULES", modules);
}



export async function genMap() {
	const packages = getDirs(`./${PRO_DIST}/packages/solenopsys/`);
	const libaries = getDirs(`./${PRO_DIST}/libraries/@solenopsys/`);
	const all = packages.concat(libaries);
	const res:any={}
	for (const dir of all) {
		const file = `${dir}/hash.txt`;
		const fileContent = await Bun.file(file).text();
		const end=dir.split("\/").pop();
		 
		res["@solenopsys/"+end]=REMOTE_PREFEIX+fileContent;
	}

	return res;
}