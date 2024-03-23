
import { Component, Dynamic,If } from "@solenopsys/converged-renderer";
import $ from "@solenopsys/converged-reactive";
import styles from "./layout.module.css"
import { Router } from "@solenopsys/converged-router";



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
        console.log("COMP LEFT UPDATE",compLeft)

        return <Router><div class={styles.body_wrapper}>
            <div class={styles.full_height}>
                <div class={styles.top_pane_wrapper} >
                <If when={compTop}>
                    <Dynamic component={compTop} /> 
                    </If>
                </div>
                <div class={styles.left_block}>
                    <div class={mobileMenu() ? styles.main_menu_mobile : styles.main_menu} >
                        <div class={styles.main_menu_wrapper}  >
                        ok left1
                        <If when={compLeft}>
                        ok left2
                        {/* <Dynamic component={compLeft} />  */}
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
        </Router>
    };
}






