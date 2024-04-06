import {
	Component,
	usePromise
} from "@solenopsys/converged-renderer";
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

		return <MdView key={state.value?.cid} data={state.value} />;
	};
};
