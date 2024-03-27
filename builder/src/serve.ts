import { fstat, existsSync, mkdir, mkdirSync, readdirSync, fstatSync, openSync, renameSync } from "fs";
import path, { join } from "path";
import { compileModule, serveLibraries } from "./build";

import { indexHtmlTransform } from "./html";
import { resolve } from "bun";

process.chdir('../');


const CONF_DIR = "./configuration"



function extractBootstrapsDirs(rootDir: string): { [name: string]: string } {
  const dirs: { [name: string]: string } = {};
  const dir = rootDir + "/bootstraps";
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


async function indexResponse(dirPath: string, dirBs: string): Promise<Response> {

  const htmlStrng = await Bun.file(join(dirPath, "/index.html")).text();
  const scriptString = await Bun.file(join(dirPath, "/index.js")).text();
  const entryString = await Bun.file(join(dirBs, "/entry.json")).text();

  const imports= {
    "@solenopsys/converged-reactive":"/library/solenopsys/converged-reactive.mjs",
    "@solenopsys/converged-renderer":"/library/solenopsys/converged-renderer.mjs",
    "@solenopsys/converged-router":"/library/solenopsys/converged-router.mjs",
    "@solenopsys/converged-renderer/jsx-dev-runtime":"/library/solenopsys/converged-renderer.mjs",
    
    "@solenopsys/converged-style":"/library/solenopsys/converged-style.mjs",

    "@solenopsys/ui-navigate": "/packages/solenopsys/ui-navigate",
    "@solenopsys/ui-controls": "/packages/solenopsys/ui-controls",
    "@solenopsys/ui-layouts": "/packages/solenopsys/ui-layouts",
    "@solenopsys/mf-conten": "/packages/solenopsys/ui-conten",
    "@solenopsys/ui-content": "/packages/solenopsys/ui-content",
    "@solenopsys/ui-state": "/packages/solenopsys/ui-state"
}

  const htmlContent = await indexHtmlTransform(htmlStrng, scriptString, imports, entryString);
  return new Response(htmlContent, {
    headers: {
      'Content-Type': 'text/html',
    }
  });

}


function fileResponse(filePath: string): Response {
  if (existsSync(filePath)) {
    const file = Bun.file(filePath);
    return new Response(file);
  } else {
    console.log("Not found", filePath);
    return new Response("Not Found", { status: 404 });
  }
}

async function remoteResponse(host: string, path: string): Promise<Response> {
  const remoteUrl = host + path;
  console.log("REMOTE URL", remoteUrl)
  const data = await fetch(remoteUrl);
  const buffer = await data.arrayBuffer();
  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
}

interface HendlerFunc {
  (req: { path: string }): Promise<Response>;
}


function startServer(rootDir: string, name: string, bsDir: string, port: number) {

  const hendlers: { [key: string]: HendlerFunc } = {}

  hendlers["/library/*"] = (req: { path: string }) => {
    return serveLibraries(join(rootDir, "configuration"), req.path)
  }
  hendlers["/packages/*"] = async (req: { path: string }) => {
    return await compileModule(rootDir, req.path)
  }
  // hendlers["/entry.json"] = async (req: { path: string }) => {
  //   return fileResponse(join(bsDir, "/entry.json"))
  // }

  hendlers["/dag*"] = async (req: { path: string }) => {
    return await remoteResponse("http://solenopsys.org", req.path)
  }
  hendlers["/ipfs*"] = async (req: { path: string }) => {
    return await remoteResponse("http://solenopsys.org", req.path)
  }

  hendlers["/ipns*"] = async (req: { path: string }) => {
    return await remoteResponse("http://solenopsys.org", req.path)
  }

  hendlers["/stat"] = async (req: { path: string }) => {
    return await remoteResponse("http://pinning.solenopsys.org", req.path)
  }

  hendlers["/select"] = async (req: { path: string }) => {
    return await remoteResponse("http://pinning.solenopsys.org", req.path)
  }




  hendlers["*/"] = async (req: { path: string }) => {
    return await indexResponse(join(rootDir, CONF_DIR), join(rootDir, bsDir))
  }
  // hendlers["*/index.js"] = async (req: { path: string }) => {
  //   return fileResponse(join(rootDir, CONF_DIR, "/index.js"))
  // }


  const server = Bun.serve({
    port: port,
    async fetch(request) {

      const url = new URL(request.url)
      const path = url.pathname + url.search

      const handlerKey: string | undefined = Object.keys(hendlers).find(item => {
        const pattern = "^" + item.replace("*", ".*") + "$";
        return path.match(pattern)
      });

      if (handlerKey) {
        const h: HendlerFunc = hendlers[handlerKey]
        return h({ path })
      }
      let filePath = CONF_DIR + path;
      return fileResponse(filePath)
    },
  });

  //  subject.next(name)

  // message1(name);
  console.log(`Start server ${name}: ${server.port}`, Bun.nanoseconds());
}


export function runServers(rootDir: string) {
  const bootstaps = extractBootstrapsDirs(rootDir);
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
