 
import { join } from "path";

export async function findEntryPoint(packName: string, rootDir: string): Promise<{ pack: string, path: string }> {
    let packageJson
    try {
        packageJson = Bun.resolveSync(packName + "/package.json", rootDir);
        const jsonString = await Bun.file(packageJson).text();

        const data = JSON.parse(String(jsonString));

        return { pack: packName, path: data["module"] };
    } catch (e) {
        const parts = packName.split("/");
        let shortPackName 
        try{
            shortPackName= parts[0];
            packageJson = Bun.resolveSync(shortPackName + "/package.json", rootDir);
            const jsonString = await Bun.file(packageJson).text();
            const data: any = JSON.parse(String(jsonString));
    
            const partName = "./" + parts[1];
    
            return { pack: shortPackName, path: data.exports[partName].default };
        }catch(e){
            shortPackName= parts[0]+"/"+parts[1];
            packageJson = Bun.resolveSync(shortPackName + "/package.json", rootDir);
            const jsonString = await Bun.file(packageJson).text();
           
    
            const data: any = JSON.parse(String(jsonString));
    
            const partName = "./" + parts[2];
    
            return { pack: shortPackName, path: data.exports[partName].default };
        }
      
       
    }
}

export async function findEntryPointFullPath(packName: string, rootDir: string): Promise<string> {
    const entry = await findEntryPoint(packName, rootDir)
    return join("./node_modules/", entry.pack, entry.path)
}
