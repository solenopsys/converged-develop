//@ts-ignore
import styles from "./styles/menu-layout.module.css";
import $ from "@solenopsys/converged-reactive";
import {
	Component,
	Dynamic,
	If,
	useContext,
	lazy,
} from "@solenopsys/converged-renderer";

import { UiContext, MfCache } from "@solenopsys/ui-state";

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
							<If when={uiState.left!=undefined}>
								{/* LD {context.leftData?.ipfs} */}
								<Dynamic
									component={lazy(() =>
										MfCache.loadComponent(
											uiState.left.module,
											uiState.left.component,
										),
									)}
									props={uiState.left.props}
								/>
							</If>
						</div>
					</div>
				</div>
				<div class={styles.main_content}>
					<If when={uiState.center!=undefined}>
						<Dynamic
							component={lazy(() =>
								MfCache.loadComponent(
									uiState.center.module,
									uiState.center.component,
								),
							)}
							props={uiState.center.props}
						/>
					</If>
				</div>
			</Router>
		);
	};
};
