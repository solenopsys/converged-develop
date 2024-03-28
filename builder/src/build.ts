
import { mkdirSync, renameSync } from "fs";
import { browserResolvePackage } from "./resolve";
import path, { join } from "path";
import lightningcssPlugin from "@solenopsys/converged-style/src/plugins/lightningcss-plugin";

const start = Bun.nanoseconds();

async function jsToResponse(jsFile: string) {
	// todo it hotfi bun bug
	const headers = {
		"Content-Type": "application/javascript",
	};
	const file = await Bun.file(jsFile).arrayBuffer();
	return new Response(file, { headers });
}

function existsFile(path: string): Promise<boolean> {
	return Bun.file(path).exists();
}

async function copyFile(source: string, target: string) {
	const file = Bun.file(source);
	await Bun.write(target, file);
}

export async function compileModule(
	rootDir: string,
	path: string,
): Promise<Response> {
	const start = Bun.nanoseconds();

	// const ngtscProgram = createCompiler("."+path,cache);
	const outPath = rootDir + "/dist" + path;

	const outJsPath = outPath + "/index.js";

	const forse = true;

	let state: string;

	console.log("COMPLILE", outJsPath);

	if (!(await existsFile(outJsPath))|| forse) {
		if (!(await existsFile(outPath))) {
			mkdirSync(outPath, { recursive: true });
		}

		const packagesFile = join(rootDir, path, "/package.json");

		const tsConfigJson: any = await Bun.file(packagesFile).json();

		const entryPoint = join(rootDir, path, "/src", "/index.tsx");

		const packagesFromExternal = tsConfigJson["external"];
		//console.log("EXTERNAL", packagesFromExternal);

		const combinedExternal = packagesFromExternal.concat([
			"@solenopsys/converged-renderer",
			"@solenopsys/converged-reactive",
			"@solenopsys/converged-style",
			"@solenopsys/converged-router",
		]);
		const out:any = await Bun.build({
			sourcemap: "none",
			entrypoints: [entryPoint],
			outdir: outPath,
			external: [...combinedExternal],
			plugins: [lightningcssPlugin()],
		}).catch((e) => {
			console.log("ERROR BUILD", e);
		});

		

		 if(!out.success){
			console.log("RES BUILD", out);
		 }

		state = "build";
	} else {
		state = "cache";
	}

	const end = Bun.nanoseconds();
	console.log("BUILD (", state, ")", (end - start) / 1000000, outPath);

	return jsToResponse(outJsPath);
}

export async function serveLibraries(
	rootDir: string,
	pathUri: string,
): Promise<Response> {
	let libName = pathUri.replace("/library/", "").replace(".mjs", "");

	let brs = await browserResolvePackage(libName, rootDir);
	console.log("BRS", brs);

	let founded = path.resolve(rootDir, "node_modules", brs);

	// console.log("search lib rootdir", rootDir, "path", pathUri,"entry",founded)

	const outPath = join(rootDir, "../dist/libraries/", libName);
	if (!(await existsFile(outPath))) {
		mkdirSync(outPath, { recursive: true });
	}

	const absoluteOutPath = path.resolve(outPath);

	const fileFromCache = absoluteOutPath + "/index.js";

	if (await existsFile(fileFromCache)) {
		//   console.log("LIB FROM CACHE", fileFromCache);

		const file = Bun.file(fileFromCache);
		const fileContent = await file.arrayBuffer();
		return jsToResponse(fileFromCache);

		// const file = Bun.file(fileFromCache);
		// return new Response(file);
	} else {
		const newPathToFile = join(absoluteOutPath, "index.js");

		console.log("FOUND", founded);
		console.log("TO", newPathToFile);
		await copyFile(founded, newPathToFile);
		//     console.log("COMPILE LIB", absoluteOutPath);
		// const out = await Bun.build(
		//   {

		//     entrypoints: [founded],
		//     outdir: absoluteOutPath,

		//     external: [
		//       "solid-js"
		//     ],

		//     plugins: [
		//     //  SolidPlugin()
		//     ],
		//     format: "esm",
		//     target: "browser"
		//   });

		//    console.log("Build result", out);

		//   const pathToFile = out.outputs[0].path;

		// const newPathToFile = renameFileToInxexJs(pathToFile)
		return jsToResponse(newPathToFile);
	}
}

function renameFileToInxexJs(pathToFile: string): string {
	const dir = path.dirname(pathToFile);
	const fileName = path.basename(pathToFile);
	const newPath = dir + "/index.js";
	renameSync(pathToFile, newPath);
	return newPath;
}
