import { Component, Dynamic, If } from "@solenopsys/converged-renderer";
import $ from "@solenopsys/converged-reactive";

// @ts-ignore
import styles from "./layout.module.css";
import { Router } from "@solenopsys/converged-router";
import { MenuLayout } from "../menu-layout/component";

interface MdItemComponentProps {
	top: string;
	central: string;
	bottom: string;
	components: { [name: string]: Component };
}

export const SiteLayout: Component<MdItemComponentProps> = (props) => {
	const compTop = props.components[top()];
	const compBottom = props.components[bottom()];

	return () => {
		return (
			<div class={styles.body_wrapper}>
				<div class={styles.full_height}>
					<div class={styles.top_pane_wrapper}>
						<Dynamic component={compTop} />
					</div>
					<MenuLayout />
					<div>
						<Dynamic component={compBottom} />
					</div>
				</div>
			</div>
		);
	};
};
