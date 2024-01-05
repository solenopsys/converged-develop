import { SiteLayout} from "./layout/layout"
import { render } from "solid-js/web";


export const INIT=()=>{
    // @ts-ignore
    render(() => <><SiteLayout /></>, document.getElementById('layout'))
}

