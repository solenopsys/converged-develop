import { Component } from "@solenopsys/converged-renderer";
import styles from "./styles/banner.module.css";

export const Banner: Component = (conf: any) => {
	return () => (
		<div class={styles.banner}>
			<div
				class="flex items-end justify-center text-center"
				style=" ;background: transparent; font-size: 40px; word-spacing:10px; height: 525px; line-height:55px; font-weight:bold; color:white; shadow: 0px 0px 10px rgba(0, 0, 0, 0.7)"
			>
				NEXT&nbsp;VENTURE&nbsp;INFRASTRUCTURE OF&nbsp;THE&nbsp;WORLD
			</div>
		</div>
	);
};
