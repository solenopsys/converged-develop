import { If,  Component } from "@solenopsys/converged-renderer";
import $ from "@solenopsys/converged-reactive";
// @ts-ignore
import styles from "./styles/toppane.module.css";
import { TabsProps, UiTabs } from "./tabs";
import { UiLogo } from "./logo";

interface TopPaneProps {
	logo: { image: string };
	tabs: TabsProps;
	//actions: ActionButton[];
	tabSelect: (tab: string) => void;
//	actionSelect: (action: string) => void;
}

export const UiTopPane: Component<TopPaneProps> = (props) => {
	console.log("TOP INIT242", props);




	return ()=>{
		console.log("ok1")
		return (
			<div class={styles["top-pane"]}>
				<If when={props.logo}>
					<div class={styles["logo-container"]}>
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
		)}
	
};
