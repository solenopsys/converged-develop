import "./layout.css";
import {
	lazy,
	Component,
	KeepAlive,
	createContext,
	useContext,
	LazyFetcher
} from "@solenopsys/converged-renderer";
import $ from "@solenopsys/converged-reactive";
import { UiTopPane } from "@solenopsys/ui-navigate";
import { SiteLayout } from "@solenopsys/ui-layouts";
import { useNavigate, Router } from "@solenopsys/converged-router";
import {  UiContext } from "@solenopsys/ui-state";

interface Props {
	 [path: string]: any ;
}

function navigateToTab(navigate: any) {
	return Object.keys(navigate).map((key: string) => {
		return { id: key, title: navigate[key]["title"] };
	});
}

export const Site: Component<Props> = (props) => {
	console.log("SITE RERENDER",props);
	const navigate = useNavigate();
	const uiState: any = useContext(UiContext);

	for (const key in props) {
		uiState[key]=props[key];
	}

	//const tabs = navigateToTab(props.navigate);

	const tabClick = async (tabId: string) => {
		navigate(`${tabId}`);

		const rt = props.routes[tabId];
		const importPath = rt.module;

	
		// нужно взять из  загруженного модуля

		uiState.leftData = rt.data;
		uiState.centerData = rt.data;

		uiState.center = "center";
		uiState.left = "left";
	};



	return <SiteLayout />;
};
