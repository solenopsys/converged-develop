import { fstat, existsSync, mkdir, mkdirSync, readdirSync, fstatSync, openSync, renameSync } from "fs";
import { findEntryPointFullPath } from "./utils";
import path, { join } from "path";
import { SolidPlugin } from "./plugin";
import { EXTERNALS } from "./build";
import {browserResolvePackage} from "./resolve"
import { resolve } from "bun";

const CONF_DIR = "./configuration"

function renameFileToInxexJs(pathToFile: string): string {
  const dir = path.dirname(pathToFile);
  const fileName = path.basename(pathToFile);
  const newPath = dir + "/index.js";
  console.log("RENAME", newPath);
  renameSync(pathToFile, newPath);
  return newPath;
}

async function jsToResponse(jsFile:string){  // todo it hotfi bun bug
  const headers = {
    'Content-Type': 'application/javascript',
  };
  const file =  await Bun.file(jsFile).arrayBuffer();
  return new Response(file,{headers});
}


function extractBootstrapsDirs(rootDir: string): { [name: string]: string } {
  const dirs: { [name: string]: string } = {};
  const dir = rootDir + "/bootstraps";
  console.log("DIR", dir);
  const files = readdirSync(dir);
  for (const file of files) {
    const filePath = dir + "/" + file;
    const fileDescriptor = openSync(filePath, 'r');
    const idDirectory = fstatSync(fileDescriptor).isDirectory();
    if (idDirectory) {
      const subDirs = readdirSync(filePath);
      for (const subdir of subDirs) {
        dirs[subdir] = (filePath + "/" + subdir);
      }
    }
  }
  return dirs;
}

 

async function serveLibraries(rootDir: string, pathUri: string): Promise<Response> {

  let libName = pathUri.replace("/library/", "").replace(".mjs", "");


  let brs=await browserResolvePackage(libName, rootDir)


  let founded = path.resolve(rootDir,"node_modules",brs)


 
  console.log("search lib rootdir", rootDir, "path", pathUri,"entry",founded)


  const outPath = join(rootDir, "../dist/libraries/", libName);
  if (!existsSync(outPath)) {
    mkdirSync(outPath, { recursive: true })
  }

  const absoluteOutPath = path.resolve(outPath);


  const fileFromCache = absoluteOutPath + "/index.js";

  if (existsSync(fileFromCache)) {
    console.log("LIB FROM CACHE", fileFromCache);

    const file =Bun.file(fileFromCache);
    const fileContent = await file.arrayBuffer();
    return jsToResponse(fileFromCache);

    // const file = Bun.file(fileFromCache);
    // return new Response(file);
  } else {
    console.log("COMPILE LIB", absoluteOutPath);
    const out = await Bun.build(
      {
        entrypoints: [founded],
        outdir: absoluteOutPath,
        external: [
        ],
        plugins: [
          SolidPlugin()
        ],
        format: "esm",
        target: "browser"
      });


    console.log("Build result", out);

    const pathToFile = out.outputs[0].path;


    const newPathToFile = renameFileToInxexJs(pathToFile)
    return jsToResponse(newPathToFile);
  }
}

async function compileModule(rootDir: string, path: string): Promise<Response> {
  console.log("Start load module: " + path);
  // const ngtscProgram = createCompiler("."+path,cache);
  const outPath = rootDir + "/dist" + path;
  console.log("DIST PATH", outPath);
  if (!existsSync(outPath)) {
    mkdirSync(outPath, { recursive: true });
  }


  const entryPoint = join(rootDir, path, "/src", "/index.tsx");
  console.log("ENTRY", entryPoint)
  const out = await Bun.build(
    {
      entrypoints: [entryPoint],
      outdir: outPath,
      external: [
        ...EXTERNALS
      ],
      plugins: [
        SolidPlugin()
      ]
    });
  console.log("Build result", out); 
  return jsToResponse(outPath + "/index.js");
}

function startServer(rootDir: string, name: string, bsDir: string, port: number) {
  const server = Bun.serve({

    port: port,
    async fetch(request) {
      console.log("REQUEST", request.url);
      const url = new URL(request.url)


      const path = url.pathname
      if (path.startsWith("/library/")) {
        return await serveLibraries(join(rootDir, "configuration"), path);
      } else
        if (path.startsWith("/microfrontends/")) {
          const response = compileModule(rootDir, path);
          return response;
        } else {
          let filePath = CONF_DIR + path;

          if (path === "/entry.json") {
            filePath = bsDir + "/entry.json"
          }


          if (path === "/") {
            filePath = join(rootDir, CONF_DIR, "/index.html");
          }
          if (path === "/index.js") {
            filePath = join(rootDir, CONF_DIR, "/index.js");
          }

          if (existsSync(filePath)) {
            const file = Bun.file(filePath);
            return new Response(file);
          } else {
            console.log("Not found", filePath);
            return new Response("Not Found", { status: 404 });
          }

        }

    },
  });

  //  subject.next(name)

  // message1(name);
  console.log(`Start server ${name}: ${server.port}`, Bun.nanoseconds());
}


export function runServers(rootDir: string) {
  const bootstaps = extractBootstrapsDirs(rootDir);
  console.log("BOOTSTRAPS", bootstaps);
  let port = 8080;
  for (const name of Object.keys(bootstaps)) {
    port++;
    const bsDir = bootstaps[name]
    console.log("START", name, bsDir, port);

    if (existsSync(bsDir)) {
      startServer(rootDir, name, bsDir, port);
    }
  }
}


runServers("./")
