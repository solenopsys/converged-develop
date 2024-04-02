import { lazy, render } from "@solenopsys/converged-renderer";

import { Site } from "./layout/site";
import { Router } from "@solenopsys/converged-router";



export const createLayout = (
	tagId: string,
	loadModule: (name: string) => {},
	conf: any,
	routes: any,
) => {

	
	// @ts-ignore
	render(() => {
		return (
			<Router>
				{" "}
				<Site  {...conf.props}  />
			</Router>
		);
	}, document.getElementById(tagId));
};

document.documentElement.style.setProperty(`--control-color`, "blue");
document.documentElement.style.setProperty(`--main-bg-color`, "white");
