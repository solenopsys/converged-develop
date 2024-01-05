import { SiteLayout} from "./layout/layout"
import { render } from "solid-js/web";
import { Router, Route, A } from "@solidjs/router";


export const INIT=()=>{
    // @ts-ignore
    render(() => <SiteLayout />, document.getElementById('layout'))
}

