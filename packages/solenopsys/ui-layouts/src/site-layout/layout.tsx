
import { Component, Dynamic,If } from "@solenopsys/converged-renderer";
import $ from "@solenopsys/converged-reactive";
import styles from "./layout.module.css"


import { UiButton } from '@solenopsys/ui-controls';

interface MdItemComponentProps {
    top: string,
    central: string,
    left: string,
    components: { [name: string]: Component }
}


export const SiteLayout: Component<MdItemComponentProps> = (props) => {
    const mobileMenu = $(false);
    const top = $(props.top);
    const central = $(props.central);
    const left = $(props.left);


    return () => {
        const compTop=  props.components[top()];

        const compCentral=  props.components[central()];

        const compLeft=  props.components[left()];
        return <div class={styles.body_wrapper}>
            <div class={styles.full_height}>
                <div class={styles.top_pane_wrapper} >
                    <Dynamic component={compTop} /> 
                </div>
                <div class={styles.left_block}>
                    <div class={mobileMenu() ? styles.main_menu_mobile : styles.main_menu} >
                        <div class={styles.main_menu_wrapper}  >

                        <If when={compLeft}>
                        <Dynamic component={compLeft} /> 
                         </If>
                          
                            
                        </div>
                    </div>
                </div>
                <div class={styles.main_content}>
                    <UiButton title="bla" ></UiButton>
                    <If when={compCentral}>
                    <Dynamic component={compCentral} /> 
                    </If>
                </div>
            </div>
        </div>
    };
}






