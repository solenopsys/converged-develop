import PinnginStat from "./pinning-stat"
import {Counter} from "./counter"
import { render } from "solid-js/web";


export const INIT=()=>{
    // @ts-ignore
    render(() => <><PinnginStat /><Counter/></>, document.getElementById('app'))
}

