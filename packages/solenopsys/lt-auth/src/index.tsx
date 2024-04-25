import { lazy, render } from "@solenopsys/converged-renderer";

import { Site } from "./layout/site";
import { Router } from "@solenopsys/converged-router";
import { UiEvents } from "@solenopsys/converged-renderer";

function setPageTitle(title:string){
	document.title=title
}

function setFavicon(href:string){
	const link=document.querySelector("link[rel*='shortcut icon']") as HTMLAnchorElement | null
	if(link !== null){
		link.href=href
	}
}


function initGoogleApi(){
	const script = document.createElement("script");
	script.src = "https://apis.google.com/js/platform.js";
	script.async = true;
	script.defer = true;
	document.body.appendChild(script);
}




function onSignIn(googleUser) {
	var profile = googleUser.getBasicProfile();
	console.log('ID: ' + profile.getId());
	console.log('Name: ' + profile.getName());
	console.log('Image URL: ' + profile.getImageUrl());
	console.log('Email: ' + profile.getEmail());
  }

  function renderButton() {
	gapi.signin2.render('my-signin2', {
	  'scope': 'profile email',
	  'width': 240,
	  'height': 50,
	  'longtitle': true,
	  'theme': 'dark',
	  'onsuccess': onSignIn
	});
  }
  
  gapi.load('auth2', function() {
	gapi.auth2.init();
	renderButton();
  });

export const createLayout = (
	tagId: string,
	loadModule: (name: string) => {},
	conf: any
) => {
	UiEvents({type:"LayoutInit",tag:tagId})
	setPageTitle(conf.page.title)
	setFavicon(conf.page.favicon)
	initGoogleApi()
	renderButton() 
	
	// @ts-ignore
	render(() => {

		console.log("ROUTER INIT")
		return (
			<Router>
				ok
				<div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>

			</Router>
		);
	}, document.getElementById(tagId));
};
