import { expect } from "bun:test";
import { compileModule } from "./build";
import { readdirSync, openSync, fstatSync } from "fs";
import { uploadFileFoIpfs } from "./ipfs";
import { copileLibrary } from "./build";



function getDirs(parentDir: string) {
	const dirs = [];
	const files = readdirSync(parentDir);
	for (const file of files) {
		const filePath = parentDir + file;
		const fileDescriptor = openSync(filePath, "r");
		const idDirectory = fstatSync(fileDescriptor).isDirectory();
		if (idDirectory) {
			dirs.push(filePath);
		}
	}
	return dirs;
}

process.chdir("../");

 const packagesDirs = getDirs("./packages/solenopsys/");

// console.log("PACKAGES", packagesDirs);

//const dir = "/packages/solenopsys/lt-website/";

const CORE_LIBS = [
	"@solenopsys/converged-reactive",
	"@solenopsys/converged-renderer",
	"@solenopsys/converged-router",
	"@solenopsys/converged-style"
];

async function compileModules() {
	const distDir = "distp";

	for (const dir of packagesDirs) {
		const clearDir = dir.replace(".", "");

		console.log("COMPILE", dir);
		await compileModule("./", clearDir, distDir, true);

		const fullDistDir = `${distDir}/${dir}`;
		const js = `${fullDistDir}/index.js`;
		const hash:string = await uploadFileFoIpfs(js);
		const hashFile = `${fullDistDir}/hash.txt`;
		await Bun.write(hashFile, hash);
	}

}

async function compileCoreLibs() {
     
  for (const lib of CORE_LIBS) {
    console.log("COMPILE CORE LIB", lib);
    copileLibrary(
      "../configuration/node_modules/",
      lib,
      "distp",
    );
  }
}

let start = Bun.nanoseconds();

// compileModules().then(() => {
// 	const end = Bun.nanoseconds();
// 	console.log("DONE MODULES", (end - start) / 1000000000, "s");
// });

//  start = Bun.nanoseconds();
compileCoreLibs().then(() => {
	const end = Bun.nanoseconds();
	console.log("DONE CORE LIBS", (end - start) / 1000000000, "s");
});
