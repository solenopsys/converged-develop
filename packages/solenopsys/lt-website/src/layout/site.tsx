import "./layout.css";
import {
	lazy,
	Component,
	KeepAlive,
	createContext,
	useContext,
} from "@solenopsys/converged-renderer";
import $ from "@solenopsys/converged-reactive";
import { UiTopPane } from "@solenopsys/ui-navigate";
import { SiteLayout } from "@solenopsys/ui-layouts";
import { useNavigate, Router } from "@solenopsys/converged-router";
import { MfCache, UiContext } from "@solenopsys/ui-state";

interface Props {
	navigate: { [path: string]: string };
	logo: string;
	routes: {
		[path: string]: {
			module: string;
			data: {
				ipfs: string;
			};
		};
	};
}

function navigateToTab(navigate: any) {
	return Object.keys(navigate).map((key: string) => {
		return { id: key, title: navigate[key]["title"] };
	});
}

export const Site: Component<Props> = (props) => {
	console.log("SITE RERENDER");
	const navigate = useNavigate();
	const uiState: any = useContext(UiContext);

	const tabs = navigateToTab(props.navigate);

	const tabClick = async (tabId: string) => {
		navigate(`${tabId}`);
		console.log("CLICK TAB", tabId);

		const rt = props.routes[tabId];
		const importPath = rt.module;

		uiState.leftData = rt.data;
		uiState.centerData = rt.data;

		await MfCache.load(importPath);

		uiState.center = "center";
		uiState.left = "left";

		console.log("STATE", uiState);
	};

	const topComponent: Component = () => (
		<UiTopPane
			logo={props.logo}
			tabsState={{
				selected: "/",
				tabs: props.navigate.tabs,
				tabClick: tabClick,
			}}
		/>
	);

	uiState.top = "top";

	console.log("STATE INSIDE", uiState);

	MfCache.set("top", topComponent);

	return <SiteLayout components={MfCache.components} />;
};
