import { Site } from "./layout/site"
import { render } from "solid-js/web";

export const createLayout = (tagId: string,loadModule: (name:string)=>{}, conf: any,routes:any) => {
    console.log("CONF",conf,routes)
    // @ts-ignore
    render(() => { return (<Site logo={conf.logo} navigate={conf.navigate} routes={routes}/>) }, document.getElementById(tagId))
}

document.documentElement.style.setProperty(`--control-color`, "blue");
document.documentElement.style.setProperty(`--main-bg-color`, "white");


