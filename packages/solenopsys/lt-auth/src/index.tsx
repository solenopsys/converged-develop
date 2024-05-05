import { If, render } from "@solenopsys/converged-renderer";
import $ from "@solenopsys/converged-reactive";
import { Router } from "@solenopsys/converged-router";
import { UiEvents } from "@solenopsys/converged-renderer";


function setPageTitle(title: string) {
	document.title = title;
}

function setFavicon(href: string) {
	const link = document.querySelector(
		"link[rel*='shortcut icon']",
	) as HTMLAnchorElement | null;
	if (link !== null) {
		link.href = href;
	}
}

export const createLayout = (
	tagId: string,
	loadModule: (name: string) => {},
	conf: any,
) => {
	
	// @ts-ignore
	render(() => {
		return <Router>ok</Router>;
	}, document.getElementById(tagId));
};
