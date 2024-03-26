import type { Component } from "@solenopsys/converged-renderer";
import { css } from "../css";

import styles from "./logo.module.css";

const logo = css(styles, ".logo");

export type LogoProps = {
	logo: string;
	alt: string;
};

export type LogoComponent = Component<LogoProps>;

export const UiLogo: LogoComponent = (props: LogoProps) => {
	return <img alt={props.alt} class={logo} src={props.logo} />;
};
