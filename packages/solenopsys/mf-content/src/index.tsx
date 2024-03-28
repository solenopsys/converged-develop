import { MdDynamic } from "./mddynamic";
import { ContentMenu } from "./contentmenu";

export const createMicrofronend = async () => {
	return {
		center: MdDynamic,
		left: ContentMenu,
	};
};
