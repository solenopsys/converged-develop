import { If, render } from "@solenopsys/converged-renderer";
import $ from "@solenopsys/converged-reactive";
import { Router } from "@solenopsys/converged-router";
import { UiEvents } from "@solenopsys/converged-renderer";
import { googleOneTap } from "./gin";
import {jwtDecode} from 'jwt-decode';




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


const options = {
	client_id: '839277684918-b4ji9lbh0a2t3qi48t9b9mb0r027l20a.apps.googleusercontent.com', // required
	auto_select: this, // optional
	cancel_on_tap_outside: false, // optional
	context: 'signin', // optional
};






export const createLayout = (
	tagId: string,
	loadModule: (name: string) => {},
	conf: any,
) => {
	

	googleOneTap(options, (response:{credential:string}) => {

		console.log("GOOGLE AUTH", response);
		// Send response to server

 
		const jwt = localStorage.getItem('jwt');

// Use jwtDecode to decode the JWT
const decoded = jwtDecode(response.credential);

		console.log( decoded);

		
	});
	// @ts-ignore
	render(() => {
	
		console.log("ROUTER INIT");
		return (
			<Router>
				ok
		
				
			</Router>
		);
	}, document.getElementById(tagId));
};
