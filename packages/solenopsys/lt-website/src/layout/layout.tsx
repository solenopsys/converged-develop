import { Dynamic } from "solid-js/web";
import { createSignal, Component, createResource } from "solid-js";
import styles from "./layout.module.css"
import "./layout.css"

import { UiButton } from '@solenopsys/ui-controls';

interface MdItemComponentProps {
    top: Component,
    central: Component,
    left: Component,
    components: { [name: string]: Component }
}


export const SiteLayout: Component<MdItemComponentProps> = (props) => {
    const [mobileMenu, mobileMenuTop] = createSignal(false);

    const [top, setTop] = createSignal(props.top);
    const [central, setCentral] = createSignal(props.central);
    const [left, setLeft] = createSignal(props.left);


    return (
        <div class={styles.body_wrapper}>
            <div class={styles.full_height}>
                <div class={styles.top_pane_wrapper} >
                    <Dynamic component={props.components[top()]} />
                </div>
                <div class={styles.left_block}>
                    <div class={mobileMenu() ? styles.main_menu_mobile : styles.main_menu} >
                        <div class={styles.main_menu_wrapper}  >
                            <Dynamic component={props.components[left()]} />
                        </div>
                    </div>
                </div>
                <div class={styles.main_content}>
                    <Dynamic component={props.components[central()]} />
                </div>
            </div>

        </div>
    );
}






