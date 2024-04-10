import { Component, For, usePromise } from "@solenopsys/converged-renderer";
import { MdView } from "@solenopsys/ui-content";
import { cascadeFetch } from "./fetcher";

interface Props {
	menuId: string;
}

export const MdDynamic: Component<Props> = (props: any) => {
	const ftch = () => cascadeFetch(props.ipfs);
	const mdData = usePromise<any[]>(ftch);

	return () => {
		const state = mdData();
		if (state.pending) return <div></div>;

		const items:any[] = state.value;
		console.log("IMTEM", items[0]);

		return (
			<div>
				<For values={items}>
					{(value) => <MdView  data={value} />}
				</For>
			</div>
		);
	};
}; //<MdView key={value?.cid} data={value} />;
