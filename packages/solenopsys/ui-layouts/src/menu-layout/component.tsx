//@ts-ignore
import styles from "./styles.module.css";
import $ from "@solenopsys/converged-reactive";
import { UiContext } from "@solenopsys/ui-state";
import {
	Component,
	Dynamic,
	If,
	useContext,
} from "@solenopsys/converged-renderer";

export const MenuLayout: Component<any> = (props: any) => {

	const context:any = useContext(UiContext);
	
 
	const mobileMenu = $(false);

	return ()=> {
		const compLeft=props.components[context.left];
	//	const compCentral=props.components[context.central];
		
		return(
		<>
			<div class={styles.left_block}>
				<div class={mobileMenu() ? styles.main_menu_mobile : styles.main_menu}>
					<div class={styles.main_menu_wrapper}>
						<If when={compLeft && context.leftData}>
							{/* LD {context.leftData?.ipfs} */}
							 <Dynamic component={compLeft}  props={context.leftData}/>  
						</If>
						<If when={!compLeft}>loading..</If>
					</div>
				</div>
			</div>
			{/* <div class={styles.main_content}>
				<If when={compCentral}>
					<Dynamic component={compCentral} />
				</If>
				<If when={!compCentral}>
					loading...
				</If>
			</div> */}
		</>
	)};
};
