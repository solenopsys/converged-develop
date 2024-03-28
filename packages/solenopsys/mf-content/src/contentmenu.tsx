import { UiTreeMenu } from "@solenopsys/ui-navigate";
import {
	usePromise,
	useResolved,
	If,
	Component,useContext
} from "@solenopsys/converged-renderer";
import $ from "@solenopsys/converged-reactive";
import { useNavigate } from "@solenopsys/converged-router";
import { UiContext } from "@solenopsys/ui-state";

import { GROUP_SERVICE } from "./menuservice";

export const ContentMenu: Component<any> = (props: any) => {
    const uiState:any = useContext(UiContext);
    const navigate = useNavigate();
	const onClickLink = (link: string) =>{
        console.log("LINK1", link);
        navigate(link)

       const id = GROUP_SERVICE.urlToId(link);
       console.log("ID",uiState);
       uiState.centerData={ipfs:id};
    } 

	const menuResource = usePromise(GROUP_SERVICE.loadMenu(props.ipfs));

	return () => {
		const state = menuResource();
		if (state.pending) return <div>pending...</div>;
		if (state.error) return <div>{state.error.message}</div>;
		return (
			<div class="p-5">
				<UiTreeMenu data={state.value} onClickLink={onClickLink} baseUrl="" />
			</div>
		);
	};
};