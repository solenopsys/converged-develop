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
		const state:any = mdData();
		if (state.pending) return <div></div>;

		const articles=state.value.articles


		console.log("IMTEM",);

		return (
			<div>
				<For values={articles}>
				 
					{(article:any) =><div id={article.key}>
					
						<MdView  data={article} />
					</div>
				
					 }
				</For>
			</div>
		);
	};
}; //<MdView key={value?.cid} data={value} />;
