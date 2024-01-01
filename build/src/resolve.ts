import { join } from "path";

export async function browserResolvePackage(packName: string, rootDir: string): Promise<string> {
    console.log("PACKNAME",packName,"ROOTDIR",rootDir)
    let packageJson;
    let currName=packName
    let sub=""
    try {
        packageJson = Bun.resolveSync(currName + "/package.json", rootDir);
    } catch (e) {
        const parts = packName.split("/");
        currName=parts[0]
         sub="/"+parts[1]
        packageJson = Bun.resolveSync(currName + "/package.json", rootDir);
    }

    console.log(packageJson)
    const jsonString = await Bun.file(packageJson).text();

    const data = JSON.parse(String(jsonString));

    const imp=data.exports["."+sub].browser.import
    console.log(imp);

    return join(currName,imp );
}