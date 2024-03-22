
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
    console.log("LAYOUT",entry)
    mod.createLayout("layout",loadModule, entry.layout.data, entry.routes)
}


function resFunc(res){
        console.log("OK")
}

function errFunc(e){
    console.log("ERR", e)
}
start().then( resFunc).catch(errFunc)