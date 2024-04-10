//@ts-ignore
import styles from "./styles/menu-layout.module.css";
import $ from "@solenopsys/converged-reactive";
import {
	Component,
	DynamicLazy,
	If,
	useContext,
	lazy, useMemo
} from "@solenopsys/converged-renderer";

import { UiContext } from "@solenopsys/ui-state";

import { Router } from "@solenopsys/converged-router";

export const CenterComponent: Component<any> = (props: any) => {
	const uiState: any = useContext(UiContext);

	return () => (
		<div class={styles.main_content}>
			<If when={uiState.center}>

				<DynamicLazy component={uiState.center?.component} props={uiState.center?.props} />
			</If>
		</div>
	)

}



export const MenuLayout: Component<any> = (props: any) => {

	console.log("MENU LAYOUT", props);
	const uiState: any = useContext(UiContext);

	const mobileMenu = $(false);

	return () => {
		console.log("MENU LAYOUT STATE2", uiState.center);


		return (

			<>
				<div class={styles.left_block}>
					<div
						class={mobileMenu() ? styles.main_menu_mobile : styles.main_menu}
					>
						<div class={styles.main_menu_wrapper} >
							<If when={uiState.left}>
								<div class={styles.scrollable}>
									<DynamicLazy {...uiState.left} />
								</div>
							</If>
						</div>
					</div>
				</div>
				<CenterComponent />
			</>)

	};
};
