// import { Site } from "./layout/site"
import { render } from "solid-js/web";
import { lazy } from "solid-js";
import { lazyLoadFromModule } from "./layout/dynamic-lazy"


const CONST = {
    "tabs": [
        {
            "id": "/solenopsys",
            "title": "Solenopsys"
        },
        {
            "id": "/robotization",
            "title": "Robotization"
        },

    ]
}

 

const UiButton = lazyLoadFromModule('UiButton', '/packages/solenopsys/ui-controls');

 


//<Site logo={conf.logo} navigate={conf.navigate} routes={routes}/>
export const createLayout = (tagId: string, loadModule: (name: string) => {}, conf: any, routes: any) => {
    //   console.log("CONF",conf,routes)
    // @ts-ignore
    render(() => { return (UiButton &&<UiButton  ></UiButton>) }, document.getElementById(tagId))
}

document.documentElement.style.setProperty(`--control-color`, "blue");
document.documentElement.style.setProperty(`--main-bg-color`, "white");


