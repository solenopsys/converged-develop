import { expect } from "bun:test";
import { compileModule } from "./build";
import { readdirSync, openSync, fstatSync } from "fs";

import { $ } from "bun";

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

async function publish(file: string) {
	//${distDir}/${dir}/index.js
	const result = await $`xs publish file ${file}"`.text();
	console.log("RESULT", result);
}

process.chdir("../");

const packagesDirs = getDirs("./packages/solenopsys/");

console.log("PACKAGES", packagesDirs);

//const dir = "/packages/solenopsys/lt-website/";

async function compileAll() {
	const distDir = "distp";

	for (const dir of packagesDirs) {
		const clearDir = dir.replace(".", "");

		console.log("COMPILE", dir);
		await compileModule("./", clearDir, distDir, true);
	}
}

compileAll()
