import { MdDynamic } from "./mddynamic";
import { UiTreeMenu } from "@solenopsys/ui-navigate";
import { useResource, useResolved, If } from "@solenopsys/converged-renderer";
import $ from "@solenopsys/converged-reactive";

const fetchMenuData = async (cid: string) =>
	(await fetch(`/dag?key=menu&cid=${cid}`)).json();

export const createMicrofronend = async (conf: any) => {
	console.log("CONF2", conf);
	const menuResource = await useResolved(fetchMenuData(conf.ipfs));

	const $id = $(conf.ipfs);

	const onClickLink = (link: string) => console.log("LINK1", link);

	console.log("RES LOAD", menuResource);
	return {
		central: () => <MdDynamic menuId={$id()} />,
		left: (
			<div class="p-2">
				<UiTreeMenu data={menuResource} onClickLink={onClickLink} baseUrl="/" />
			</div>
		), //  todo need params for menu
	};
};
