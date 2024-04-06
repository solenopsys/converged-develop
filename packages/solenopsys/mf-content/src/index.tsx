import { MdDynamic } from "./mddynamic";
import { MainMenu } from "./contentmenu";
import $ from "@solenopsys/converged-reactive"
import { UiEvents } from "@solenopsys/converged-renderer";

export const createMicrofronend = async () => {
	
	
	return {
		center: MdDynamic,
		left:MainMenu
	};
};


export {MdDynamic,MainMenu}

