console.log('Building...');
import { fstat, existsSync, mkdir, mkdirSync, readdirSync, fstatSync, openSync, renameSync, copyFile, copyFileSync } from "fs";
import {browserResolvePackage} from "./resolve"
import path, { join } from "path";
import { SolidPlugin } from "./plugin";
import lightningcss from 'bun-lightningcss'


// import { SolidPlugin } from "./plugin";

const start = Bun.nanoseconds()

async function jsToResponse(jsFile:string){  // todo it hotfi bun bug
    const headers = {
      'Content-Type': 'application/javascript',
    };
    const file =  await Bun.file(jsFile).arrayBuffer();
    return new Response(file,{headers});
  }
  


export async function compileModule(rootDir: string, path: string): Promise<Response> {
    console.log("Start load module: " + path);
    // const ngtscProgram = createCompiler("."+path,cache);
    const outPath = rootDir + "/dist" + path;
     if (!existsSync(outPath)) {
      mkdirSync(outPath, { recursive: true });
    }

    const packagesFile=join(rootDir, path, "/package.json");
   
    const tsConfigJson:any = await Bun.file(packagesFile).json();
  
  
  
    const entryPoint = join(rootDir, path, "/src", "/index.tsx");
    const out = await Bun.build(
      {
        entrypoints: [entryPoint],
        outdir: outPath,
        external: [
          ...tsConfigJson["external"]
        ],
        plugins: [
          SolidPlugin(),
          lightningcss()
        ]
      });

     console.log("BUILD->  ",path,out.logs) 
    return jsToResponse(outPath + "/index.js");
  }

  
export async function serveLibraries(rootDir: string, pathUri: string): Promise<Response> {

    let libName = pathUri.replace("/library/", "").replace(".mjs", "");
  
  
    let brs=await browserResolvePackage(libName, rootDir)
  
  
    let founded = path.resolve(rootDir,"node_modules",brs)
  
  
   
   // console.log("search lib rootdir", rootDir, "path", pathUri,"entry",founded)
  
  
    const outPath = join(rootDir, "../dist/libraries/", libName);
    if (!existsSync(outPath)) {
      mkdirSync(outPath, { recursive: true })
    }
  
    const absoluteOutPath = path.resolve(outPath);
  
  
    const fileFromCache = absoluteOutPath + "/index.js";
  
    if (existsSync(fileFromCache)) {
   //   console.log("LIB FROM CACHE", fileFromCache);
  
      const file =Bun.file(fileFromCache);
      const fileContent = await file.arrayBuffer();
      return jsToResponse(fileFromCache);
  
      // const file = Bun.file(fileFromCache);
      // return new Response(file);
    } else {
        const newPathToFile=join(absoluteOutPath,"index.js")
        
        copyFileSync(founded,newPathToFile)
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
    console.log("RENAME", newPath);
    renameSync(pathToFile, newPath);
    return newPath;
  }