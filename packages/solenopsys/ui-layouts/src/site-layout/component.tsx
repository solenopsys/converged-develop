import { Component, Dynamic, If,useContext } from "@solenopsys/converged-renderer";
import { UiContext } from "@solenopsys/ui-state";

// @ts-ignore
import styles from "./styles.module.css";
import { MenuLayout } from "../menu-layout/component";

interface MdItemComponentProps {
	top: string;
	central: string;
	bottom: string;
	components: { [name: string]: Component };
}

export const SiteLayout: Component<MdItemComponentProps> = (props) => {
	const uiState:any = useContext(UiContext);

	const compTop = props.components[uiState.top];
	const compBottom = props.components[uiState.bottom];

	return () => {
		console.log("SLR")
		
		return (
		<div class={styles.body_wrapper}>
			<div class={styles.full_height}>
				<div class={styles.top_pane_wrapper}>
					<If when={compTop}>
						<Dynamic component={compTop} />
					</If>
				
				</div>
				<MenuLayout {...props} />
				<div>
					<If when={compBottom}>
						<Dynamic component={compBottom} />
					</If>
					
				</div>
			</div>
		</div>)
	};
};
