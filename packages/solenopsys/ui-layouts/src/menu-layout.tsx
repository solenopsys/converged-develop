//@ts-ignore
import styles from "./styles/menu-layout.module.css";
import $ from "@solenopsys/converged-reactive";
import {
	Component,
	DynamicLazy,
	If,
	useContext,
	lazy,
} from "@solenopsys/converged-renderer";

import { UiContext } from "@solenopsys/ui-state";

import { Router } from "@solenopsys/converged-router";

export const MenuLayout: Component<any> = (props: any) => {
	const uiState: any = useContext(UiContext);

	const mobileMenu = $(false);

	return () => {
		console.log("STATE", uiState.left);
		console.log("STATE", uiState.center);
		return (
			<Router>
				<div class={styles.left_block}>
					<div
						class={mobileMenu() ? styles.main_menu_mobile : styles.main_menu}
					>
						<div class={styles.main_menu_wrapper}>
							<If when={uiState.left != undefined}>
								<DynamicLazy {...uiState.left} />
							</If>
						</div>
					</div>
				</div>
				<div class={styles.main_content}>
					<If when={uiState.center != undefined}>
						<DynamicLazy {...uiState.center} />
					</If>
				</div>
			</Router>
		);
	};
};
