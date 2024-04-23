import { If, Component, UiEvents } from "@solenopsys/converged-renderer";
import $ from "@solenopsys/converged-reactive";
// @ts-ignore
import styles from "./styles/toppane.module.css";
import { TabsProps, UiTabs } from "./tabs";
import { UiLogo } from "./logo";

interface RoutedPaneProps {
	logo: { image: string };
	tabs: TabsProps;
}

interface TopPaneProps extends RoutedPaneProps {
	//actions: ActionButton[];
	//tabSelect: (tab: string) => void;
	logoClick: () => void;
	//	actionSelect: (action: string) => void;
}

export const UiTopPane: Component<TopPaneProps> = (props) => {
	return () => {
		return (
			<div class={styles["top-pane"]}>
				<If when={props.logo}>
					<div
						class={styles["logo-container"]}
						style="cursor:pointer"
						onClick={props.logoClick}
					>
						<UiLogo image={props.logo.image} />
					</div>
				</If>
				<If when={props.tabs}>
					<div class={styles["tabs-container"]}>
						<UiTabs
							// tabClick={(event) => props.tabSelect(event)}
							selected={props.tabs.selected}
							tabs={props.tabs.tabs}
							tabClick={props.tabs.tabClick}
						/>
					</div>
				</If>

				<div class={styles["actions-container"]}>
					{/* <ui-button-group
          actions={props.config.actions}
          emmitAction={(event) => props.actionSelect(event)}
        ></ui-button-group> */}
				</div>
			</div>
		);
	};
};

import { useLocation } from "@solenopsys/converged-router";


export const UiRoutePane: Component<RoutedPaneProps> = (props) => {
	// $.effect(() => {
	// 	const event = UiEvents();
	// 	if (event.type === "navigate") {
	// 	}
	// });

	// inProps.tabs.tabClick=(tab: any) => {
	// 	UiEvents({ type: "navigate", tab });
	// }
	return () => {
	
		const location = useLocation();
		console.log("LOC", location);
		const inProps: TopPaneProps = {
			tabs: {
				...props.tabs,
				tabClick: (tab: any) => {
					UiEvents({ type: "navigate", location:tab });
				},
				selected: location.pathname,
			},
			logo: props.logo,
			logoClick: () => {
				UiEvents({ type: "navigate", location: "/" });
			},
		};
		return <UiTopPane {...inProps} />;
	};
};
