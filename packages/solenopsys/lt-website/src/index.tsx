import {Site} from "./site"
import { render } from "solid-js/web";
import { Router, Route, A,useNavigate } from "@solidjs/router";

export const INIT = () => {
    // @ts-ignore
    render(() => <Site/> , document.getElementById('layout'))
}



