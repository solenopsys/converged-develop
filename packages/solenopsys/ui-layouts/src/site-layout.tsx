import { Component, Dynamic, If,useContext,lazy } from "@solenopsys/converged-renderer";
import { UiContext,MfCache } from "@solenopsys/ui-state";

// @ts-ignore
import styles from "./styles/site-layout.module.css";
import { MenuLayout } from "./menu-layout";

interface MdItemComponentProps {
	top: string;
	central: string;
	bottom: string;
	components: { [name: string]: Component };
}

export const SiteLayout: Component<MdItemComponentProps> = (props) => {
	const uiState:any = useContext(UiContext);

	const compTop=lazy(()=>MfCache.loadComponent(uiState.top.module, uiState.top.component))

	return () => {
		return (
		<div class={styles.body_wrapper}>
			<div class={styles.full_height}>
				<div class={styles.top_pane_wrapper}>
					<If when={uiState.top}>
						<DynamicLazy props={uiState.top} />
					</If>
				</div>
				 <MenuLayout  />
				{/* <div>
					<If when={compBottom}>
						<Dynamic component={compBottom} />
					</If>
				</div>  */}
			</div>
		</div>)
	};
};
