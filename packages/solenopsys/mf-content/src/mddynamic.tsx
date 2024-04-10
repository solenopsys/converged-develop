import { Component, For, usePromise } from "@solenopsys/converged-renderer";
import { MdView } from "@solenopsys/ui-content";
import { cascadeFetch } from "./fetcher";

import { GROUP_SERVICE } from "./menuservice";

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
				 
					{(value) =><div id={GROUP_SERVICE.ancors[value.cid]}>
					
						<MdView  data={value} />
					</div>
				
					 }
				</For>
			</div>
		);
	};
}; //<MdView key={value?.cid} data={value} />;
