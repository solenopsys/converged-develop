
async function modProcessing(modName,mod){
  console.log("POST PROCESSING",modName)
}

async function loadModule(moduleName) {
    const modUrl = moduleName.replace("@", "/packages/");
    console.log("MODULE URL", modUrl)

    const mod = await import(modUrl);
    modProcessing(moduleName,mod)
    return mod
}


async function start() {
    const moduleName = entry.layout.module;
    const mod = await loadModule(moduleName)
    mod.createLayout("layout",loadModule, entry.layout.data, entry.routes)
}

start().then(res => {
    console.log("OK")
    console.log(res)
}).catch(e => {
    console.log("ERR", e)
})