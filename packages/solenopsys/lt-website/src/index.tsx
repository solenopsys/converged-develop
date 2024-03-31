
import { lazy, render } from "@solenopsys/converged-renderer";

import { Site } from "./layout/site"
import {  Router } from "@solenopsys/converged-router";

const CONST = {
    "tabs": [
        {
            "id": "/",
            "title": "Main"
        },
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



// const LazyComponent = lazy ( async() =>{
//     try {
//         const mod = await import('/packages/solenopsys/ui-controls');
//         return mod['UiButton'];
//       } catch (error) {
//         console.error('Error loading module:', error);
//       }
// } );


// const UiButton = lazyLoadComponentFromModule('UiButton', );




//<Site logo={conf.logo} navigate={conf.navigate} routes={routes}/>
export const createLayout = (tagId: string, loadModule: (name: string) => {}, conf: any, routes: any) => {
      console.log("CONF",conf)
    // @ts-ignore
    render(() => { return ( <Router> <Site logo="/images/logo.svg" navigate={CONST} routes={routes}/></Router>) }, document.getElementById(tagId))
}

document.documentElement.style.setProperty(`--control-color`, "blue");
document.documentElement.style.setProperty(`--main-bg-color`, "white");


