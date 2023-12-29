

async function start() {
    const entry = await (await fetch("/entry.json")).json()
    console.log("ENTRY", entry)

    const modUrl = entry.layout.module.replace("@", "/microfrontends/");
    console.log("MODULE URL", modUrl)
    const mod = await import(modUrl)
     mod.INIT()

   

}

console.log("START")

start().then(res => {
    
console.log("OK")
    console.log(res)
}).catch(e=>{
    console.log("ERR",e)
})