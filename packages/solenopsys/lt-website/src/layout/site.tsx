import {
	Component,
	useContext,
	loadModule,
} from "@solenopsys/converged-renderer";
import { useNavigate } from "@solenopsys/converged-router";
import { SiteLayout } from "@solenopsys/ui-layouts";
import { UiContext } from "@solenopsys/ui-state";
import { UiEvents } from "@solenopsys/converged-renderer";
import "./layout.css";
import $ from "@solenopsys/converged-reactive";

interface Props {
	[path: string]: any;
}

export const Site: Component<Props> = (props) => {
	console.log("SITE RERENDER", props);
	const navigate = useNavigate();
	const uiState: any = useContext(UiContext);

	$.effect(() => {
		const event = UiEvents();
		if (event.type === "navigate") {
			console.log("NAVIGATE", event);
			navigate(`${event.tab}`);

			// wisout reload
			//window.location.href=`${event.tab}`

			const rt = props.routes[event.tab];
			// const importPath = rt.module;
			// console.log("IMPORT PATH", importPath)

			for (const key in rt) {
				console.log("KEY", key);
				uiState[key] = rt[key];
			}
		}
	});

	//	UiEvents({ type: "navigate", tab :props.navigation.selected})
	//navigate(props.navigation.selected)

	uiState.top = {
		component: props.ui.top,
		props: {
			logo: { image: props.page.logo },
			tabs: {
			
				tabs: props.navigation.tree.map((item: any) => ({
					id: item.id,
					title: item.title,
				})),
			},
			
		},
	};

	for (const key in props) {
		uiState[key] = props[key];
	}

	return <SiteLayout />;
};
