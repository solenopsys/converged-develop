import { MdDynamic } from "./mddynamic";
import { MainMenu } from "./contentmenu";
import $ from "@solenopsys/converged-reactive"
import { UiEvents } from "@solenopsys/converged-renderer";

export const createMicrofronend = async () => {
	$.effect(()=>{
		const event=UiEvents()
		if(event.type==="navigate"){
			console.log("INSIDE MD",event	)
		}
	})
	
	return {
		center: MdDynamic,
		left:MainMenu
	};
};


export {MdDynamic,MainMenu}

