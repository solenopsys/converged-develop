import PinnginStat from "./pinning-stat"

import { render } from "solid-js/web";


export const INIT=()=>{
    render(() => <PinnginStat />, document.getElementById('app'))
}

