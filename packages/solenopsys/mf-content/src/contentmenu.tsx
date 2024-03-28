import { UiTreeMenu } from "@solenopsys/ui-navigate";
import {
	usePromise,
	useResolved,
	If,
	Component,
} from "@solenopsys/converged-renderer";
import $ from "@solenopsys/converged-reactive";

const fetchMenuData = async (cid: string) =>
	(await fetch(`/dag?key=menu&cid=${cid}`)).json();

export const ContentMenu: Component<any> = (props: any) => {
	const onClickLink = (link: string) => console.log("LINK1", link);

	const menuResource = usePromise(fetchMenuData(props.ipfs));

	return () => {
		const state = menuResource();
		if (state.pending) return <div>pending...</div>;
		if (state.error) return <div>{state.error.message}</div>;
		return (
			<div class="p-7">
				<UiTreeMenu data={state.value} onClickLink={onClickLink} baseUrl="/" />
			</div>
		);
	};
};