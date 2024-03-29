
function extractModules(obj) {
    const modules = new Set();
  
    function extractModulesFromObject(obj) {
      if (typeof obj === 'object' && obj !== null) {
        if (obj.hasOwnProperty('module')) {
          modules.add(obj.module);
        }
  
        for (const value of Object.values(obj)) {
          extractModulesFromObject(value);
        }
      } else if (Array.isArray(obj)) {
        obj.forEach(extractModulesFromObject);
      }
    }
  
    extractModulesFromObject(obj);
    return Array.from(modules);
  }



  process.chdir("../");

  async function load(){

    const fileName="./bootstraps/solenopsys/bs-solenopsys/entry.json"

    const modules = extractModules(await Bun.file(fileName).json());
    console.log("MODULES",modules)
  }

  load()
