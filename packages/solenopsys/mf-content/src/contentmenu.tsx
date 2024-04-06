import {
	Component, useContext,
	usePromise
} from "@solenopsys/converged-renderer";
import { useNavigate } from "@solenopsys/converged-router";
import { UiTreeMenu } from "@solenopsys/ui-navigate";
import { UiContext } from "@solenopsys/ui-state";

import { GROUP_SERVICE } from "./menuservice";

export const MainMenu: Component<any> = (props: any) => {
    const uiState:any = useContext(UiContext);
    const navigate = useNavigate();
	const onClickLink = (link: string) =>{
    
        navigate(link)

       const id = GROUP_SERVICE.urlToId(link);
 
       uiState.center.props={ipfs:id};
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