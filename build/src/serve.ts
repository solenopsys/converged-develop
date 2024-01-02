import { fstat, existsSync, mkdir, mkdirSync, readdirSync, fstatSync, openSync, renameSync } from "fs";
import path, { join } from "path";
import { compileModule, serveLibraries } from "./build";

import { resolve } from "bun";

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
  hendlers["/microfrontends/*"] = (req: { path: string }) => {
    return compileModule(rootDir, req.path)
  }
  hendlers["/entry.json"] = async (req: { path: string }) => {
    return fileResponse(join(bsDir, "/entry.json"))
  }

  hendlers["/dag*"] = async (req: { path: string }) => {
    return await remoteResponse("http://solenopsys.org", req.path)
  }

  hendlers["/stat"] = async (req: { path: string }) => {
    return await remoteResponse("http://pinning.solenopsys.org", req.path)
  }

  hendlers["/select"] = async (req: { path: string }) => {
    return await remoteResponse("http://pinning.solenopsys.org", req.path)
  }


  hendlers["/"] = async (req: { path: string }) => {
    return fileResponse(join(rootDir, CONF_DIR, "/index.html"))
  }
  hendlers["/index.js"] = async (req: { path: string }) => {
    return fileResponse(join(rootDir, CONF_DIR, "/index.js"))
  }


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
