import {
	Component,
	useContext
} from "@solenopsys/converged-renderer";
import { useNavigate } from "@solenopsys/converged-router";
import { SiteLayout } from "@solenopsys/ui-layouts";
import { UiContext } from "@solenopsys/ui-state";
import { UiEvents } from "@solenopsys/converged-renderer";
import "./layout.css";
import $ from "@solenopsys/converged-reactive"

interface Props {
	[path: string]: any;
}

function navigateToTab(navigate: any) {
	return Object.keys(navigate).map((key: string) => {
		return { id: key, title: navigate[key]["title"] };
	});
}

export const Site: Component<Props> = (props) => {
	console.log("SITE RERENDER", props);
	const navigate = useNavigate();
	const uiState: any = useContext(UiContext);

	$.effect(
		()=>{
			const event=UiEvents()
			if(event.type==="navigate"){
				navigate(`${event.tab}`)
			}
		}
	)

	navigate(props.navigation.selected)


	uiState.top = {
		component: props.ui.top, props:
		{
			logo: { image: props.page.logo },
			tabs: {
				selected: props.navigation.selected,
				tabs: props.navigation.tree.map((item: any) => ({ id: item.id, title: item.title })),
				tabClick:(tab:any)=>{
					UiEvents({type:"navigate",tab})
				}
			},
			
		}
	}

	for (const key in props) {
		uiState[key] = props[key];
	}

	//const tabs = navigateToTab(props.navigate);

	// const tabClick = async (tabId: string) => {
	// 	navigate(`${tabId}`);

	// 	const rt = props.routes[tabId];
	// 	const importPath = rt.module;


	// 	// нужно взять из  загруженного модуля

	// 	uiState.leftData = rt.data;
	// 	uiState.centerData = rt.data;

	// 	uiState.center = "center";
	// 	uiState.left = "left";
	// };



	return <SiteLayout />;
};
