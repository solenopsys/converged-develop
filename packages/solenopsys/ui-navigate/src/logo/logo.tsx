import { createSignal, Component } from "solid-js";

import styles from './logo.module.css';  

export type LogoProps<P = {}> = P & {
    logo:string
    alt: string
};

export type LogoComponent<P = {}> = Component<LogoProps<P>>;
export const UiLogo: LogoComponent = (props) => {
    return (<img alt={props.alt} class={styles.logo} src={props.logo}/>)
}